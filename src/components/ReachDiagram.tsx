function radiusForKm(km: number) {
  return 30 + Math.sqrt(km) * 9;
}

export function ReachDiagram({
  center,
  unit,
  towns,
}: {
  center: string;
  unit: string;
  towns: { name: string; km: number }[];
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
        <g key={p.name}>
          <circle cx={p.x} cy={p.y} r={5.5} className="fill-bronze-500 stroke-ivory-50" strokeWidth={2} />
          <text
            x={p.x}
            y={p.y - 13}
            textAnchor="middle"
            className="fill-ink-900"
            style={{ fontSize: 13, fontWeight: 600 }}
          >
            {p.name}
          </text>
          <text
            x={p.x}
            y={p.y + 21}
            textAnchor="middle"
            className="fill-teal-700"
            style={{ fontSize: 11, fontWeight: 600 }}
          >
            {p.km} {unit}
          </text>
        </g>
      ))}

      <circle cx={c} cy={c} r={11} className="fill-teal-700 stroke-ivory-50" strokeWidth={3} />
      <text
        x={c}
        y={c - 19}
        textAnchor="middle"
        className="fill-ink-900 font-serif"
        style={{ fontSize: 16, fontWeight: 600 }}
      >
        {center}
      </text>
    </svg>
  );
}
