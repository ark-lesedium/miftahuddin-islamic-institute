"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";

const CONTACT_EMAIL = "miftahuddininstitute@gmail.com";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [touched, setTouched] = useState(false);

  const isValid = values.name.trim() && values.email.trim() && values.message.trim();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;

    const subject = values.subject.trim() || `Message from ${values.name}`;
    const body = `${values.message}\n\n— ${values.name} (${values.email})`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  const inputClasses =
    "w-full rounded-xl border border-bronze-200 bg-ivory-50 px-4 py-3 text-ink-900 placeholder:text-ink-300 transition-colors focus:border-teal-600";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-700">
            {t("nameLabel")}
          </label>
          <input
            id="name"
            type="text"
            required
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            placeholder={t("namePlaceholder")}
            className={inputClasses}
            aria-invalid={touched && !values.name.trim()}
          />
          {touched && !values.name.trim() && (
            <p className="mt-1 text-xs text-red-700">{t("required")}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
            {t("emailLabel")}
          </label>
          <input
            id="email"
            type="email"
            required
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            placeholder={t("emailPlaceholder")}
            className={inputClasses}
            dir="ltr"
            aria-invalid={touched && !values.email.trim()}
          />
          {touched && !values.email.trim() && (
            <p className="mt-1 text-xs text-red-700">{t("required")}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-ink-700">
          {t("subjectLabel")}
        </label>
        <input
          id="subject"
          type="text"
          value={values.subject}
          onChange={(e) => setValues((v) => ({ ...v, subject: e.target.value }))}
          placeholder={t("subjectPlaceholder")}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-700">
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          placeholder={t("messagePlaceholder")}
          className={inputClasses}
          aria-invalid={touched && !values.message.trim()}
        />
        {touched && !values.message.trim() && (
          <p className="mt-1 text-xs text-red-700">{t("required")}</p>
        )}
      </div>

      <p className="text-xs leading-relaxed text-ink-500">{t("note")}</p>

      <Button type="submit" variant="teal">
        {t("submit")}
      </Button>
    </form>
  );
}
