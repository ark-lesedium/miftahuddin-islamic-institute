"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import { Marquee } from "./Marquee";
import { GALLERY_IMAGES, type GalleryImageId } from "@/data/gallery";

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  body?: string;
  image?: GalleryImageId;
  imagePosition?: "center" | "bottom";
  live?: boolean;
  badgeLabel?: string;
  marquee?: string[];
};

export function NewsSlideshow({
  items,
  intervalMs = 8000,
  expanded = false,
}: {
  items: NewsItem[];
  intervalMs?: number;
  expanded?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("news");

  useEffect(() => {
    if (shouldReduceMotion || items.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [items.length, intervalMs, shouldReduceMotion]);

  if (items.length === 0) return null;

  const item = items[index];
  const text = (expanded ? item.body : undefined) ?? item.summary;
  const image = item.image ? GALLERY_IMAGES[item.image] : null;

  return (
    <div className="overflow-hidden rounded-3xl border border-bronze-200/70 bg-ivory-50 shadow-sm">
      <div>
        {image ? (
          <div className="relative aspect-[4/5] w-full sm:aspect-[3/4]">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={image.src}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className={
                    item.imagePosition === "bottom" ? "object-cover object-bottom" : "object-cover"
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/35 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
            {item.live ? (
              <span className="absolute start-4 top-4 flex items-center gap-1.5 rounded-full bg-ink-900/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ivory-50 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
                </span>
                {item.badgeLabel ?? t("liveBadge")}
              </span>
            ) : null}
          </div>
        ) : null}

        <div className="relative flex min-h-[220px] flex-col justify-center px-8 py-10 sm:px-12 sm:py-12">
          {!image ? (
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-bronze-100 text-bronze-700">
              <Newspaper size={22} strokeWidth={1.5} />
            </span>
          ) : null}
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.4 }}
            >
              <h3 className="font-serif text-2xl text-ink-900 sm:text-3xl">{item.title}</h3>
              <p className="mt-3 text-balance leading-relaxed text-ink-500">{text}</p>
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

      {item.marquee && item.marquee.length > 0 ? (
        <div className="border-t border-bronze-200/70 bg-bronze-50/70 py-3 text-bronze-700">
          <Marquee items={item.marquee} />
        </div>
      ) : null}
    </div>
  );
}
