'use client';

import { useState } from 'react';

type SubmitState =
  | { type: 'idle'; message: '' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string };

const initialSubmitState: SubmitState = { type: 'idle', message: '' };

export const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] =
    useState<SubmitState>(initialSubmitState);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = e.currentTarget;

    if (typeof grecaptcha === 'undefined') {
      console.error('reCAPTCHA not ready.');
      setSubmitState({
        type: 'error',
        message:
          'Odoslanie je teraz nedostupné. Skúste to, prosím, znova o chvíľu.',
      });
      return;
    }

    const formEntries = Array.from(new FormData(form).entries()).map(
      ([key, value]) => [key, String(value)],
    );
    const formData = new URLSearchParams(formEntries);
    const action = form.action;
    const method = form.method;

    setIsSubmitting(true);
    setSubmitState(initialSubmitState);

    try {
      const token = await new Promise<string>((resolve, reject) => {
        grecaptcha.ready(() => {
          grecaptcha
            .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string, {
              action: 'submit',
            })
            .then(resolve, reject);
        });
      });

      formData.append('token', token);

      const response = await fetch(action, {
        method,
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.ok) {
        let errorMessage =
          'Správu sa nepodarilo odoslať. Skúste to, prosím, znova.';

        try {
          const data = (await response.json()) as { error?: string };

          if (data.error) {
            errorMessage =
              'Správu sa nepodarilo odoslať. Skontrolujte údaje a skúste to znova.';
          }
        } catch {
          // Ignore JSON parsing failures and keep the default message.
        }

        setSubmitState({
          type: 'error',
          message: errorMessage,
        });
        return;
      }

      form.reset();
      setSubmitState({
        type: 'success',
        message: 'Správa bola úspešne odoslaná. Odpoviem vám čo najskôr.',
      });
    } catch (error) {
      console.error(error);
      setSubmitState({
        type: 'error',
        message: 'Správu sa nepodarilo odoslať. Skúste to, prosím, znova.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      action="/api/contact-us"
      method="POST"
      className="footer__item-form"
      noValidate
      onSubmit={handleOnSubmit}
    >
      <label>
        Váš e-mail:
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          className="footer__item-input"
          autoComplete="email"
          disabled={isSubmitting}
          required
        />
      </label>

      <label>
        Správa:
        <textarea
          name="message"
          placeholder="Správa"
          className="footer__item-textarea"
          autoComplete="on"
          disabled={isSubmitting}
          required
        ></textarea>
      </label>

      <button
        type="submit"
        className="footer__item-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="footer__item-button-spinner" aria-hidden="true" />
            Odosielam...
          </>
        ) : (
          'Odoslať'
        )}
      </button>

      <p
        className={
          submitState.type === 'idle'
            ? 'footer__item-status'
            : `footer__item-status is-${submitState.type}`
        }
        aria-live="polite"
        role={submitState.type === 'error' ? 'alert' : 'status'}
      >
        {submitState.message}
      </p>
    </form>
  );
};
