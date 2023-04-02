import formidable from 'formidable';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import fs from 'fs/promises';

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

const validateForm = async (data: {
  fields: formidable.Fields;
}): Promise<ValidationResult> => {
  const { username, password, token } = data.fields;

  if (!username || !username || !token) {
    return [false, 'Missing required fields'];
  }

  if (
    Array.isArray(username) ||
    Array.isArray(password) ||
    Array.isArray(token)
  ) {
    return [false, 'Invalid data'];
  }

  if (username.length > 100) {
    return [false, 'Username too long'];
  }

  if (password.length > 100) {
    return [false, 'Password too long'];
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
    }
  );

  const recaptchaData = (await response.json()) as RecaptchaData;

  if (!recaptchaData.success) {
    console.error(recaptchaData);
    return [false, 'Invalid token'];
  }

  if (
    recaptchaData.hostname !== 'leonafoto.sk' &&
    recaptchaData.hostname !== 'leonafoto.closure.sk' &&
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

  if (!req.headers['content-type']?.startsWith('application/json')) {
    return [false, 'Invalid content type'];
  }

  // validate referrer (prevent CSRF)
  const referrer = req.headers.referer;
  if (
    !referrer ||
    (!referrer.startsWith('http://localhost:3000') &&
      !referrer.startsWith('https://leonafoto.sk') &&
      !referrer.startsWith('https://leonafoto.closure.sk'))
  ) {
    return [false, 'Invalid request'];
  }

  return [true];
};

async function checkCredentials(username: string, password: string) {
  try {
    if (!process.env.AUTH_USERS) {
      throw new Error('Missing AUTH_USERS env variable');
    }

    const fileData = await fs.readFile(process.env.AUTH_USERS, 'utf8');
    const users = JSON.parse(fileData) as Record<
      string,
      { password: string; salt: string }
    >;

    const user = users[username];
    if (!user) {
      return false;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!validateRequest(req)) {
      res.status(400).json({ error: 'Invalid request' });
      return;
    }

    const data = await parseForm(req);

    const [isValid, error] = await validateForm(data);

    if (!isValid) {
      res.status(400).json({ error });
      return;
    }

    const { username, password } = data.fields;
    if (!(await checkCredentials(username as string, password as string))) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    if (!process.env.AUTH_SECRET_KEY) {
      throw new Error('Missing AUTH_SECRET_KEY env variable');
    }

    // If the credentials are correct, generate a JWT token
    const token = jwt.sign({ username }, process.env.AUTH_SECRET_KEY, {
      expiresIn: '2h',
    });

    // Set the token as a cookie and return a response
    res.setHeader(
      'Set-Cookie',
      `auth_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`
    );

    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
