"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Newspaper } from "lucide-react";

type NewsItem = { id: string; title: string; summary: string };

export function NewsSlideshow({
  items,
  intervalMs = 8000,
}: {
  items: NewsItem[];
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

  const item = items[index];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-bronze-200/70 bg-ivory-50 shadow-sm">
      <div className="relative min-h-[220px] px-8 py-10 sm:px-12 sm:py-12">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bronze-100 text-bronze-700">
          <Newspaper size={22} strokeWidth={1.5} />
        </span>
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.4 }}
          >
            <h3 className="mt-5 font-serif text-2xl text-ink-900 sm:text-3xl">{item.title}</h3>
            <p className="mt-3 max-w-2xl text-balance leading-relaxed text-ink-500">
              {item.summary}
            </p>
          </motion.div>
        </AnimatePresence>

        {items.length > 1 ? (
          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-bronze-200 text-bronze-700 hover:bg-bronze-50"
              aria-label="Previous update"
            >
              <ChevronLeft size={16} className="rtl:rotate-180" />
            </button>
            <div className="flex items-center gap-1.5">
              {items.map((it, i) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to update ${i + 1}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-teal-700" : "w-1.5 bg-bronze-200"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % items.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-bronze-200 text-bronze-700 hover:bg-bronze-50"
              aria-label="Next update"
            >
              <ChevronRight size={16} className="rtl:rotate-180" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
