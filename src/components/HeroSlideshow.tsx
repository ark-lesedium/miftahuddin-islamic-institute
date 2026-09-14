"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function HeroSlideshow({
  images,
  intervalMs = 7000,
}: {
  images: string[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs, shouldReduceMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <AnimatePresence>
        <motion.div
          key={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 2.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
