'use client';

export function ZoneLegend() {
  const items = [
    { label: 'PINK ZONE',  color: 'rgba(232,38,110,0.5)', border: '#E8266E' },
    { label: 'RANGE',      color: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.15)' },
    { label: 'CYAN ZONE',  color: 'rgba(13,184,204,0.5)', border: '#0DB8CC' },
  ];

  return (
    <div
      className="absolute top-2 left-2 flex flex-col gap-1 pointer-events-none"
      aria-hidden="true"
    >
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <span
            className="w-3 h-2 rounded-[1px] border"
            style={{ backgroundColor: item.color, borderColor: item.border }}
          />
          <span className="font-mono text-[9px] text-iron uppercase tracking-[0.15em]">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
