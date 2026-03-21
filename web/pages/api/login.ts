import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import fs from 'fs/promises';

type ValidationResult = [false, string] | [true];

type LoginRequestBody = {
  username?: unknown;
  password?: unknown;
  token?: unknown;
};

type RecaptchaData = {
  success: boolean;
  hostname: string;
  'error-codes': string[];
};

const getSingleBodyValue = (value: unknown) => {
  if (typeof value === 'string') {
    return value;
  }

  if (
    Array.isArray(value) &&
    value.length === 1 &&
    typeof value[0] === 'string'
  ) {
    return value[0];
  }

  return undefined;
};

const validateForm = async (
  body: LoginRequestBody,
): Promise<ValidationResult> => {
  const username = getSingleBodyValue(body.username);
  const password = getSingleBodyValue(body.password);
  const token = getSingleBodyValue(body.token);

  if (!username || !password || !token) {
    return [false, 'Missing required fields'];
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
    },
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
  res: NextApiResponse,
) {
  try {
    const [isRequestValid, requestError] = validateRequest(req);

    if (!isRequestValid) {
      res.status(400).json({ error: requestError });
      return;
    }

    const body = (req.body ?? {}) as LoginRequestBody;

    const [isValid, error] = await validateForm(body);

    if (!isValid) {
      res.status(400).json({ error });
      return;
    }

    const username = getSingleBodyValue(body.username);
    const password = getSingleBodyValue(body.password);

    if (!username || !password) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    if (!(await checkCredentials(username, password))) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    if (!process.env.AUTH_SECRET_KEY) {
      throw new Error('Missing AUTH_SECRET_KEY env variable');
    }

    if (!process.env.AUTH_ISSUER) {
      throw new Error('Missing AUTH_ISSUER env variable');
    }

    if (!process.env.AUTH_AUDIENCE) {
      throw new Error('Missing AUTH_AUDIENCE env variable');
    }

    // If the credentials are correct, generate a JWT token
    const token = jwt.sign({ username }, process.env.AUTH_SECRET_KEY, {
      expiresIn: '2h',
      issuer: process.env.AUTH_ISSUER,
      audience: process.env.AUTH_AUDIENCE,
    });

    // Set the token as a cookie and return a response
    if (process.env.NODE_ENV === 'production') {
      res.setHeader(
        'Set-Cookie',
        `auth_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      );
    } else {
      res.setHeader(
        'Set-Cookie',
        `auth_token=${token}; Path=/; HttpOnly; SameSite=Strict`,
      );
    }

    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
