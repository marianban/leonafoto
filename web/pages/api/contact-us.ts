import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

// need to disable body parser for formidable to work
export const config = {
  api: {
    bodyParser: false,
  },
};

type ValidationResult = [false, string] | [true];

type RecaptchaData = {
  success: boolean;
  hostname: string;
  'error-codes': string[];
};

const getSingleFieldValue = (field: string | string[] | undefined) => {
  if (Array.isArray(field)) {
    return field.length === 1 ? field[0] : undefined;
  }

  return field;
};

const parseForm = (req: NextApiRequest) => {
  return new Promise<{
    fields: formidable.Fields;
    files: formidable.Files;
  }>((resolve, reject) => {
    try {
      const form = formidable({
        multiples: false,
        maxFieldsSize: 1 * 1024 * 1024, // 1 MB
        maxFiles: 0,
      });
      form.parse(req, (err, fields, files) => {
        if (err) reject({ err });
        resolve({ fields, files });
      });
      // resolve({ fields: {}, files: {} });
    } catch (err) {
      reject({ err });
    }
  });
};

const sendEmail = async (email: string, message: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: email, // sender address
    to: process.env.CONTACT_US_TO, // list of receivers
    subject: 'Test email', // Subject line
    text: message, // plain text body
  });
};

const validateForm = async (data: {
  fields: formidable.Fields;
}): Promise<ValidationResult> => {
  const email = getSingleFieldValue(data.fields.email);
  const message = getSingleFieldValue(data.fields.message);
  const token = getSingleFieldValue(data.fields.token);

  if (!email || !message || !token) {
    return [false, 'Missing required fields'];
  }

  if (!email.includes('@') || email.length < 3) {
    return [false, 'Invalid email'];
  }

  if (message.length < 10) {
    return [false, 'Message too short'];
  }

  // Prevent XSS
  if (message.includes('<') || message.includes('>')) {
    return [false, 'Invalid message'];
  }

  // validate token
  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    },
  );

  const recaptchaData = (await response.json()) as RecaptchaData;

  if (!recaptchaData.success) {
    console.error(recaptchaData);
    return [false, 'Invalid token'];
  }

  if (
    recaptchaData.hostname !== 'leonafoto.sk' &&
    recaptchaData.hostname !== 'localhost'
  ) {
    console.error(recaptchaData);
    return [false, 'Invalid token 2'];
  }

  return [true];
};

const validateRequest = (req: NextApiRequest): ValidationResult => {
  if (req.method !== 'POST') {
    return [false, 'Invalid request method'];
  }

  if (
    !req.headers['content-type']?.startsWith(
      'application/x-www-form-urlencoded',
    )
  ) {
    return [false, 'Invalid content type'];
  }

  // validate referrer (prevent CSRF)
  const referrer = req.headers.referer;
  if (
    !referrer ||
    (!referrer.startsWith('http://localhost:3000') &&
      !referrer.startsWith('https://leonafoto.sk'))
  ) {
    return [false, 'Invalid request'];
  }

  return [true];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const [isRequestValid, requestError] = validateRequest(req);

    if (!isRequestValid) {
      res.status(400).json({ error: requestError });
      return;
    }

    const data = await parseForm(req);

    const [isValid, error] = await validateForm(data);

    if (!isValid) {
      res.status(400).json({ error });
      return;
    }

    const email = getSingleFieldValue(data.fields.email);
    const message = getSingleFieldValue(data.fields.message);

    if (!email || !message) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    await sendEmail(email, message);

    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
