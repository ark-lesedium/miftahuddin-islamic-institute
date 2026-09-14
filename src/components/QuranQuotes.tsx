"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Quote = {
  theme: string;
  text: string;
  secondary?: string;
  reference: string;
};

export function QuranQuotes({
  items,
  intervalMs = 9000,
}: {
  items: Quote[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || items.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [items.length, intervalMs, shouldReduceMotion]);

  if (items.length === 0) return null;

  const quote = items[index];

  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="relative min-h-[220px] sm:min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.5 }}
          >
            <span className="mb-5 inline-block rounded-full bg-teal-800/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
              {quote.theme}
            </span>
            <p className="text-balance font-serif text-2xl italic leading-relaxed text-ink-900 sm:text-3xl">
              &ldquo;{quote.text}&rdquo;
            </p>
            {quote.secondary ? (
              <p
                dir="rtl"
                lang="ar"
                className="mt-4 text-balance font-arabic-serif text-xl leading-loose text-bronze-600 sm:text-2xl"
              >
                {quote.secondary}
              </p>
            ) : null}
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-bronze-500">
              {quote.reference}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {items.length > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {items.map((it, i) => (
            <button
              key={it.reference}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to quote ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-teal-700" : "w-1.5 bg-bronze-200"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
