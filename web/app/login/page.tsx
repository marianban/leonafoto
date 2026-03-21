'use client';
import { Logo } from '../(components)/Logo/Logo';
import localFont from 'next/font/local';
import { FormEvent, useState } from 'react';
import './page.css';
import Link from 'next/link';

const bebasNeueFont = localFont({
  src: '../(fonts)/BebasNeue-RegularSubset.woff2',
  weight: '400',
});

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (typeof grecaptcha === 'undefined') {
      setError('reCAPTCHA not ready. Please try again.');
      return;
    }

    grecaptcha.ready(() => {
      grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string, {
          action: 'submit',
        })
        .then(async (token) => {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, token }),
          });

          if (response.ok) {
            window.location.href = '/admin';
          } else {
            setError('Nesprávne meno alebo heslo');
          }
        });
    });
  };

  return (
    <>
      <header>
        <h1 className={`logo ${bebasNeueFont.className}`}>
          <Link href="/">
            <Logo /> LeonaFoto
          </Link>
        </h1>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Meno
            <input
              type="text"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Heslo
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit">Prihlásiť</button>
          <p className="recaptcha-disclosure login-form__recaptcha-disclosure">
            This site is protected by reCAPTCHA and the Google{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noreferrer"
            >
              Terms of Service
            </a>{' '}
            apply.
          </p>
        </form>
      </main>
    </>
  );
}
