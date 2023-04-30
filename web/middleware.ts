// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export const config = {
  matcher: [
    '/admin',
    '/admin/(.*)',
    '/api/((?!login$|images$|contact-us$|random-images|revalidate$)[^?]*)',
  ],
};

// https://github.com/vercel/examples/blob/main/edge-middleware/jwt-authentication/lib/auth.ts

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let cookie = request.cookies.get('auth_token')?.value;

  if (!cookie) {
    return NextResponse.redirect(new URL('/login', request.url));
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

  try {
    await jwtVerify(
      cookie,
      new TextEncoder().encode(process.env.AUTH_SECRET_KEY),
      {
        issuer: process.env.AUTH_ISSUER,
        audience: process.env.AUTH_AUDIENCE,
      }
    );
  } catch (err) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const response = NextResponse.next();
  return response;
}
