/**
 * 💨 Tailwind 학습 1: 유틸리티 기초
 *
 * 학습 목표:
 * - Tailwind의 "유틸리티 퍼스트" 철학 이해
 * - spacing(p, m), color, typography, border, shadow 클래스
 * - 클래스 이름의 패턴을 읽는 법
 */

// ─────────────────────────────────────────
// Tailwind 숫자 스케일
// 1 = 4px, 2 = 8px, 4 = 16px, 8 = 32px, 16 = 64px
// ─────────────────────────────────────────

function SpacingDemo() {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="font-bold text-lg mb-1">📐 Spacing — p(padding), m(margin)</h2>
      <p className="text-xs text-gray-400 mb-4">숫자 1 = 4px · 각 방향: t(top) r(right) b(bottom) l(left) x(수평) y(수직)</p>
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          {[1, 2, 4, 6, 8, 12].map((n) => (
            <div key={n} className="bg-teal-100 border border-teal-300 rounded text-xs font-mono text-teal-800"
              style={{ padding: `${n * 4}px` }}>
              p-{n}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 font-mono">p-4 = padding: 16px · px-4 = 좌우 · py-4 = 상하 · pt-4 = 위만</p>
      </div>
    </section>
  );
}

function ColorDemo() {
  const colors = [
    { name: "slate", shades: [100, 200, 400, 600, 800] },
    { name: "blue", shades: [100, 200, 400, 600, 800] },
    { name: "teal", shades: [100, 200, 400, 600, 800] },
    { name: "violet", shades: [100, 200, 400, 600, 800] },
    { name: "rose", shades: [100, 200, 400, 600, 800] },
    { name: "amber", shades: [100, 200, 400, 600, 800] },
  ];

  // Tailwind는 동적 클래스 생성이 안 되므로 inline style로 시각화
  const colorMap: Record<string, Record<number, string>> = {
    slate: { 100: "#f1f5f9", 200: "#e2e8f0", 400: "#94a3b8", 600: "#475569", 800: "#1e293b" },
    blue:  { 100: "#dbeafe", 200: "#bfdbfe", 400: "#60a5fa", 600: "#2563eb", 800: "#1e40af" },
    teal:  { 100: "#ccfbf1", 200: "#99f6e4", 400: "#2dd4bf", 600: "#0d9488", 800: "#115e59" },
    violet:{ 100: "#ede9fe", 200: "#ddd6fe", 400: "#a78bfa", 600: "#7c3aed", 800: "#3730a3" },
    rose:  { 100: "#ffe4e6", 200: "#fecdd3", 400: "#fb7185", 600: "#e11d48", 800: "#9f1239" },
    amber: { 100: "#fef3c7", 200: "#fde68a", 400: "#fbbf24", 600: "#d97706", 800: "#92400e" },
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="font-bold text-lg mb-1">🎨 Color 시스템</h2>
      <p className="text-xs text-gray-400 mb-4">bg-&#123;색상&#125;-&#123;농도&#125; · text-&#123;색상&#125;-&#123;농도&#125; · border-&#123;색상&#125;-&#123;농도&#125; (농도: 50~950)</p>
      <div className="space-y-2">
        {colors.map((c) => (
          <div key={c.name} className="flex items-center gap-2">
            <span className="text-xs text-gray-400 w-12 font-mono">{c.name}</span>
            <div className="flex gap-1 flex-1">
              {c.shades.map((shade) => (
                <div key={shade}
                  className="flex-1 h-7 rounded text-center text-xs flex items-center justify-center font-mono"
                  style={{ backgroundColor: colorMap[c.name][shade], color: shade >= 500 ? "white" : "#555" }}>
                  {shade}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TypographyDemo() {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="font-bold text-lg mb-4">✍️ Typography</h2>
      <div className="space-y-3">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-xs text-gray-800">text-xs</span>
          <span className="text-sm text-gray-800">text-sm</span>
          <span className="text-base text-gray-800">text-base</span>
          <span className="text-lg text-gray-800">text-lg</span>
          <span className="text-xl text-gray-800">text-xl</span>
          <span className="text-2xl text-gray-800">text-2xl</span>
          <span className="text-3xl text-gray-800">text-3xl</span>
        </div>
        <div className="flex items-center gap-4 flex-wrap text-sm">
          <span className="font-thin">font-thin</span>
          <span className="font-normal">font-normal</span>
          <span className="font-medium">font-medium</span>
          <span className="font-semibold">font-semibold</span>
          <span className="font-bold">font-bold</span>
          <span className="font-extrabold">font-extrabold</span>
        </div>
        <div className="flex items-center gap-4 flex-wrap text-sm">
          <span className="text-left">text-left</span>
          <span className="text-center w-24">text-center</span>
          <span className="italic">italic</span>
          <span className="underline">underline</span>
          <span className="line-through">line-through</span>
          <span className="tracking-widest">tracking-widest</span>
        </div>
      </div>
    </section>
  );
}

function BorderShadowDemo() {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="font-bold text-lg mb-4">🔲 Border & Shadow & Rounded</h2>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { cls: "border border-gray-300", label: "border" },
          { cls: "border-2 border-blue-400", label: "border-2" },
          { cls: "border-4 border-teal-400", label: "border-4" },
          { cls: "border border-dashed border-gray-400", label: "border-dashed" },
          { cls: "border border-dotted border-gray-400", label: "border-dotted" },
          { cls: "ring-2 ring-violet-400", label: "ring-2" },
        ].map(({ cls, label }) => (
          <div key={label} className={`${cls} rounded-lg h-12 flex items-center justify-center text-xs font-mono text-gray-600`}>
            {label}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
          { cls: "rounded-sm", label: "rounded-sm" },
          { cls: "rounded", label: "rounded" },
          { cls: "rounded-xl", label: "rounded-xl" },
          { cls: "rounded-full", label: "rounded-full" },
        ].map(({ cls, label }) => (
          <div key={label} className={`${cls} bg-teal-100 h-10 flex items-center justify-center text-xs font-mono text-teal-800 border border-teal-200`}>
            {label}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {["shadow-sm", "shadow", "shadow-md", "shadow-xl"].map((s) => (
          <div key={s} className={`${s} bg-white rounded-lg h-12 flex items-center justify-center text-xs font-mono text-gray-600 border border-gray-100`}>
            {s}
          </div>
        ))}
      </div>
    </section>
  );
}

function HoverTransitionDemo() {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="font-bold text-lg mb-2">✨ Hover & Transition</h2>
      <p className="text-xs text-gray-400 mb-4">hover:클래스 + transition으로 인터랙션 구현</p>
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors">
          hover:bg-blue-600
        </button>
        <button className="px-4 py-2 border-2 border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white rounded-lg text-sm font-semibold transition-all">
          hover:bg-teal
        </button>
        <button className="px-4 py-2 bg-gray-100 hover:scale-105 rounded-lg text-sm font-semibold transition-transform">
          hover:scale-105
        </button>
        <button className="px-4 py-2 bg-violet-500 hover:shadow-lg hover:-translate-y-1 text-white rounded-lg text-sm font-semibold transition-all">
          hover:shadow + translate
        </button>
      </div>
    </section>
  );
}

export default function UtilitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">💨 Tailwind CSS — 유틸리티 기초</h1>
        <p className="text-gray-500 text-sm mb-2">
          Tailwind = CSS 속성을 클래스 이름으로. <code className="bg-gray-100 px-1 rounded text-xs">bg-blue-500</code> = <code className="bg-gray-100 px-1 rounded text-xs">background-color: #3b82f6</code>
        </p>
        <div className="bg-teal-50 border border-teal-200 rounded-lg px-4 py-2 text-xs font-mono text-teal-800 mb-6">
          &#123;속성&#125;-&#123;값&#125; 패턴: p-4, text-lg, bg-blue-500, rounded-xl, shadow-md
        </div>

        <SpacingDemo />
        <ColorDemo />
        <TypographyDemo />
        <BorderShadowDemo />
        <HoverTransitionDemo />

        <div className="flex gap-3 mt-2">
          <a href="/phase2" className="text-sm text-gray-500 underline">← Phase 2 홈</a>
          <a href="/phase2/tailwind/02-layout" className="text-sm text-teal-600 underline ml-auto">다음: Flexbox & Grid →</a>
        </div>
      </div>
    </div>
  );
}
