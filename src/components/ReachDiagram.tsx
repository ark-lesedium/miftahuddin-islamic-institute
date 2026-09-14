function radiusForKm(km: number) {
  return 30 + Math.sqrt(km) * 9;
}

function mapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${query}, South Africa`)}`;
}

export function ReachDiagram({
  center,
  unit,
  towns,
  mapsHint,
  mapsButtonLabel,
}: {
  center: string;
  unit: string;
  towns: { name: string; km: number }[];
  mapsHint?: string;
  mapsButtonLabel?: string;
}) {
  const size = 520;
  const c = size / 2;

  // Angles are evenly spaced for legibility, not compass-accurate — this is
  // a distance diagram (radius = real km from Kimberley), not a geographic
  // map, so there's no "correct" bearing to plot each town at.
  const points = towns.map((town, i) => {
    const angleDeg = -90 + (360 / towns.length) * i;
    const angle = (angleDeg * Math.PI) / 180;
    const r = radiusForKm(town.km);
    return {
      ...town,
      x: c + r * Math.cos(angle),
      y: c + r * Math.sin(angle),
    };
  });

  return (
    <div>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="mx-auto w-full max-w-md"
        role="img"
        aria-label={center}
      >
        {[95, 145, 195].map((r) => (
          <circle
            key={r}
            cx={c}
            cy={c}
            r={r}
            fill="none"
            className="stroke-bronze-300/35"
            strokeWidth={1}
            strokeDasharray="2 5"
          />
        ))}

        {points.map((p) => (
          <line
            key={`line-${p.name}`}
            x1={c}
            y1={c}
            x2={p.x}
            y2={p.y}
            className="stroke-bronze-400/60"
            strokeWidth={1}
          />
        ))}

        {points.map((p) => (
          <a
            key={p.name}
            href={mapsSearchUrl(p.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer"
          >
            <title>{`${p.name} — open in Google Maps`}</title>
            <circle
              cx={p.x}
              cy={p.y}
              r={5.5}
              className="fill-bronze-500 stroke-ivory-50 transition-all duration-200 group-hover:fill-teal-700 group-focus-visible:fill-teal-700"
              strokeWidth={2}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            />
            <circle
              cx={p.x}
              cy={p.y}
              r={11}
              className="fill-teal-700/0 transition-all duration-200 group-hover:fill-teal-700/10"
            />
            <text
              x={p.x}
              y={p.y - 13}
              textAnchor="middle"
              className="fill-ink-900 transition-colors duration-200 group-hover:fill-teal-800"
              style={{ fontSize: 13, fontWeight: 600 }}
            >
              {p.name}
            </text>
            <text
              x={p.x}
              y={p.y + 21}
              textAnchor="middle"
              className="fill-teal-700 transition-colors duration-200 group-hover:fill-teal-800"
              style={{ fontSize: 11, fontWeight: 600 }}
            >
              {p.km} {unit}
            </text>
          </a>
        ))}

        <a
          href={mapsSearchUrl(center)}
          target="_blank"
          rel="noopener noreferrer"
          className="group cursor-pointer"
        >
          <title>{`${center} — open in Google Maps`}</title>
          <circle
            cx={c}
            cy={c}
            r={11}
            className="fill-teal-700 stroke-ivory-50 transition-all duration-200 group-hover:fill-teal-800"
            strokeWidth={3}
          />
          <text
            x={c}
            y={c - 19}
            textAnchor="middle"
            className="fill-ink-900 font-serif transition-colors duration-200 group-hover:fill-teal-800"
            style={{ fontSize: 16, fontWeight: 600 }}
          >
            {center}
          </text>
        </a>
      </svg>

      {mapsHint || mapsButtonLabel ? (
        <div className="mt-6 flex flex-col items-center gap-4">
          {mapsHint ? <p className="text-xs text-ink-300">{mapsHint}</p> : null}
          {mapsButtonLabel ? (
            <a
              href={mapsSearchUrl(center)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-bronze-300 bg-ivory-50 px-5 py-2.5 text-sm font-semibold text-teal-700 shadow-sm transition-colors hover:border-teal-600 hover:text-teal-800"
            >
              {mapsButtonLabel}
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
