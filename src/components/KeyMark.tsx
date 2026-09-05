/**
 * A small signature glyph unique to this institute: "Miftah" literally means
 * "key" — so the mark is a key with an Islamic star set into its bow, rather
 * than a generic ornament. Uses currentColor so callers set colour via text-*.
 */
export function KeyMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 150" fill="none" className={className} aria-hidden>
      <circle cx="50" cy="30" r="22" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M50 16 L54 26 L64 30 L54 34 L50 44 L46 34 L36 30 L46 26 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <line x1="50" y1="52" x2="50" y2="116" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="98" x2="68" y2="98" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="112" x2="62" y2="112" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
