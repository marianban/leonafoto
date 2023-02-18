'use client';

export const ContactUs = () => {
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new URLSearchParams(new FormData(e.currentTarget) as any);
    const action = e.currentTarget.action;
    const method = e.currentTarget.method;

    grecaptcha.ready(() => {
      grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string, {
          action: 'submit',
        })
        .then((token) => {
          formData.append('token', token);
          fetch(action, {
            method: method,
            body: formData,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
            .then((res) => res.status === 200 && alert('Správa bola odoslaná.'))
            .catch((err) => console.error(err));
        });
    });
  };

  return (
    <form
      action="/api/contact-us"
      method="POST"
      className="footer__item-form"
      onSubmit={handleOnSubmit}
    >
      <label>
        Váš email:
        <input
          type="mail"
          name="email"
          placeholder="Email"
          className="footer__item-input"
        />
      </label>

      <label>
        Správa:
        <textarea
          name="message"
          placeholder="Správa"
          className="footer__item-textarea"
        ></textarea>
      </label>

      <button type="submit" className="footer__item-button">
        Odoslať
      </button>
    </form>
  );
};
