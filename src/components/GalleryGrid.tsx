"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { GALLERY_IMAGES, GALLERY_ORDER, type GalleryImageId } from "@/data/gallery";
import { MotionReveal } from "./MotionReveal";
import { cn } from "@/lib/utils";

type Item = { id: GalleryImageId; title: string; location: string };

export function GalleryGrid({ items }: { items: Item[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length],
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, showNext, showPrev]);

  const ordered = GALLERY_ORDER.map((id) => items.find((i) => i.id === id)).filter(
    (i): i is Item => Boolean(i),
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:auto-rows-[14rem] md:grid-flow-dense">
        {ordered.map((item, index) => {
          const meta = GALLERY_IMAGES[item.id];
          const spanClass =
            meta.span === "tall"
              ? "md:row-span-2"
              : meta.span === "wide"
                ? "md:col-span-2"
                : "";
          return (
            <MotionReveal
              key={item.id}
              delay={index * 0.05}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-ink-900",
                "aspect-[3/4] md:aspect-auto",
                spanClass,
              )}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="block h-full w-full"
                aria-label={item.title}
              >
                <Image
                  src={meta.src}
                  alt={`${item.title} — ${item.location}`}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-medium text-ivory-50">{item.title}</p>
                  <p className="text-xs text-ivory-200">{item.location}</p>
                </div>
              </button>
            </MotionReveal>
          );
        })}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/92 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={close}
              className="absolute end-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-ivory-50/30 text-ivory-50 hover:bg-ivory-50/10"
              aria-label="Close"
            >
              <X size={20} strokeWidth={1.75} aria-hidden />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute start-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory-50/30 text-ivory-50 hover:bg-ivory-50/10 sm:start-6"
              aria-label="Previous"
            >
              <ChevronLeft size={20} strokeWidth={1.75} aria-hidden className="rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute end-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory-50/30 text-ivory-50 hover:bg-ivory-50/10 sm:end-6"
              aria-label="Next"
            >
              <ChevronRight size={20} strokeWidth={1.75} aria-hidden className="rtl:rotate-180" />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="relative flex max-h-[85vh] w-full max-w-3xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[65vh] w-full">
                <Image
                  src={GALLERY_IMAGES[ordered[activeIndex].id].src}
                  alt={ordered[activeIndex].title}
                  fill
                  sizes="90vw"
                  className="rounded-lg object-contain"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="font-serif text-lg text-ivory-50">
                  {ordered[activeIndex].title}
                </p>
                <p className="text-sm text-ivory-300">{ordered[activeIndex].location}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
