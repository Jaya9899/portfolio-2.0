import { useEffect, useState } from 'react';

import './ContactForm.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_MESSAGE = 10;

const TOPICS = [
  { value: 'hello', label: 'Just saying hi' },
  { value: 'project', label: 'A project idea' },
  { value: 'work', label: 'Work or internship' },
  { value: 'other', label: 'Something else' },
];

const EMPTY_FORM = { name: '', email: '', topic: 'hello', message: '' };

/* One validator per field, each returning an error string or '' when valid.
   Keeping them in a lookup means submit can validate everything with a loop
   instead of repeating the rules. */
const validators = {
  name(value) {
    const trimmed = value.trim();
    if (!trimmed) return 'Please enter your name.';
    if (trimmed.length < 2) return 'That is a bit short, use at least 2 characters.';
    return '';
  },

  email(value) {
    const trimmed = value.trim();
    if (!trimmed) return 'Please enter an email address.';
    if (!EMAIL_PATTERN.test(trimmed)) return 'That does not look like an email address.';
    return '';
  },

  topic(value) {
    return value ? '' : 'Please pick a topic.';
  },

  message(value) {
    const trimmed = value.trim();
    if (!trimmed) return 'Please write a message.';
    if (trimmed.length < MIN_MESSAGE) {
      const remaining = MIN_MESSAGE - trimmed.length;
      return `A little more, please. ${remaining} more character${remaining === 1 ? '' : 's'}.`;
    }
    return '';
  },
};

export default function ContactForm() {
  /* All form state is local to this component. Nothing outside the form reads
     a field value, so lifting it to Contact or App would only mean re-rendering
     the page on every keystroke for no benefit. */
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);

  /* Effect 8: auto-dismiss the confirmation dialog.
     CLEANUP: clearTimeout, so a second submit inside the 6 s window cannot
     leave an earlier timer running that hides the newer confirmation. */
  useEffect(() => {
    if (!sent) {
      return undefined;
    }

    const timerId = window.setTimeout(() => setSent(false), 6000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [sent]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));

    // Re-check on every keystroke only once the field has been blurred, so
    // the error disappears as it is fixed but never appears mid-typing.
    if (touched[name]) {
      setErrors((current) => ({ ...current, [name]: validators[name](value) }));
    }
  }

  function handleBlur(event) {
    const { name, value } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({ ...current, [name]: validators[name](value) }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};
    Object.keys(validators).forEach((field) => {
      nextErrors[field] = validators[field](values[field]);
    });

    setErrors(nextErrors);
    setTouched({ name: true, email: true, topic: true, message: true });

    const firstInvalid = Object.keys(validators).find((field) => nextErrors[field]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setSent(true);
    setValues(EMPTY_FORM);
    setTouched({});
    setErrors({});
  }

  // A field shows its error only once it has been blurred or submit was tried.
  function errorFor(field) {
    return touched[field] ? errors[field] || '' : '';
  }

  function fieldProps(field) {
    const error = errorFor(field);
    return {
      id: field,
      name: field,
      value: values[field],
      onChange: handleChange,
      onBlur: handleBlur,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? `${field}-error` : undefined,
    };
  }

  return (
    <div className="contact__form-wrap">
      {/* noValidate turns off the browser's own bubbles so the React
          validation below is the single source of truth. */}
      <form className="contact__form" onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend className="contact__legend">Send a message</legend>

          <p className="field">
            <label htmlFor="name">Your name</label>
            <input type="text" autoComplete="name" placeholder="ada lovelace" {...fieldProps('name')} />
            {errorFor('name') && (
              <span className="field__error" id="name-error" role="alert">
                {errorFor('name')}
              </span>
            )}
          </p>

          <p className="field">
            <label htmlFor="email">Email address</label>
            <input type="email" autoComplete="email" placeholder="you@example.com" {...fieldProps('email')} />
            {errorFor('email') && (
              <span className="field__error" id="email-error" role="alert">
                {errorFor('email')}
              </span>
            )}
          </p>

          <p className="field">
            <label htmlFor="topic">What&apos;s this about?</label>
            <select {...fieldProps('topic')}>
              {TOPICS.map((topic) => (
                <option key={topic.value} value={topic.value}>{topic.label}</option>
              ))}
            </select>
            {errorFor('topic') && (
              <span className="field__error" id="topic-error" role="alert">
                {errorFor('topic')}
              </span>
            )}
          </p>

          <p className="field">
            <label htmlFor="message">Message</label>
            <textarea rows="5" placeholder="Say whatever you like." {...fieldProps('message')} />
            <span className="field__count">
              {values.message.trim().length} / {MIN_MESSAGE} characters minimum
            </span>
            {errorFor('message') && (
              <span className="field__error" id="message-error" role="alert">
                {errorFor('message')}
              </span>
            )}
          </p>

          <button type="submit" className="button">Send it</button>
        </fieldset>
      </form>

      {sent && (
        <div className="dialog" role="status">
          <p className="dialog__bar">
            <span className="dialog__title">Message</span>
            <button
              type="button"
              className="dialog__close"
              onClick={() => setSent(false)}
              aria-label="Close confirmation"
            >
              &times;
            </button>
          </p>
          <div className="dialog__body">
            <span className="dialog__icon" aria-hidden="true">i</span>
            <p>
              Everything checks out. This form is front-end only, though. There is
              no backend yet, so nothing was actually delivered.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
