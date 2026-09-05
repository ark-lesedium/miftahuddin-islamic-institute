import { MotionReveal } from "./MotionReveal";

export type TimelineItem = {
  title: string;
  period: string;
  body: string;
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative border-s border-bronze-300/70 ps-8 sm:ps-10">
      {items.map((item, index) => (
        <MotionReveal as="li" key={item.title} delay={index * 0.06} className="pb-12 last:pb-0">
          <span
            aria-hidden
            className="absolute -start-[7px] mt-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-teal-700 bg-ivory-50"
          />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
            {item.period}
          </p>
          <h3 className="mt-1.5 font-serif text-xl text-ink-900 sm:text-2xl">{item.title}</h3>
          <p className="mt-2 max-w-2xl text-balance leading-relaxed text-ink-500">{item.body}</p>
        </MotionReveal>
      ))}
    </ol>
  );
}
