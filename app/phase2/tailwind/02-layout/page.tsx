/**
 * 💨 Tailwind 학습 2: Flexbox & Grid 레이아웃
 *
 * 학습 목표:
 * - flex, grid 컨테이너 설정
 * - 정렬: justify-*, items-*, gap-*
 * - grid-cols-*, col-span-*
 * - 반응형 그리드 (sm:, md:, lg:)
 */

// ─────────────────────────────────────────
// Flexbox 데모
// ─────────────────────────────────────────

function FlexDemo() {
  const Box = ({ label }: { label: string }) => (
    <div className="bg-teal-400 text-white text-xs font-bold px-3 py-2 rounded">{label}</div>
  );

  const configs = [
    { cls: "flex gap-2", label: "flex gap-2 (기본 가로 배치)" },
    { cls: "flex flex-col gap-2", label: "flex-col (세로 배치)" },
    { cls: "flex gap-2 justify-between", label: "justify-between (양 끝 정렬)" },
    { cls: "flex gap-2 justify-center", label: "justify-center (가운데 정렬)" },
    { cls: "flex gap-2 items-end h-16 bg-gray-100 rounded p-2", label: "items-end (아래 정렬)" },
    { cls: "flex gap-2 flex-wrap", label: "flex-wrap (줄 바꿈)" },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="font-bold text-lg mb-4">📦 Flexbox</h2>
      <div className="space-y-4">
        {configs.map(({ cls, label }) => (
          <div key={label}>
            <p className="text-xs font-mono text-gray-500 mb-1">{label}</p>
            <div className={cls}>
              <Box label="A" />
              <Box label="B" />
              <Box label="C" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Grid 데모
// ─────────────────────────────────────────

function GridDemo() {
  const Cell = ({ label, span }: { label: string; span?: string }) => (
    <div className={`${span ?? ""} bg-violet-400 text-white text-xs font-bold rounded flex items-center justify-center h-10`}>
      {label}
    </div>
  );

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="font-bold text-lg mb-4">🔢 Grid</h2>
      <div className="space-y-5">
        <div>
          <p className="text-xs font-mono text-gray-500 mb-2">grid grid-cols-3 gap-3</p>
          <div className="grid grid-cols-3 gap-3">
            {["1", "2", "3", "4", "5", "6"].map((n) => <Cell key={n} label={n} />)}
          </div>
        </div>
        <div>
          <p className="text-xs font-mono text-gray-500 mb-2">grid grid-cols-4 gap-3 + col-span-*</p>
          <div className="grid grid-cols-4 gap-3">
            <Cell label="col-span-2" span="col-span-2" />
            <Cell label="1" />
            <Cell label="1" />
            <Cell label="1" />
            <Cell label="col-span-3" span="col-span-3" />
          </div>
        </div>
        <div>
          <p className="text-xs font-mono text-gray-500 mb-2">반응형 grid (1 → 2 → 3 컬럼)</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {["A", "B", "C"].map((n) => <Cell key={n} label={n} />)}
          </div>
          <p className="text-xs text-gray-400 mt-2">창 크기를 바꿔서 확인해보세요 →</p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// 실전 레이아웃 패턴
// ─────────────────────────────────────────

function RealLayoutDemo() {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="font-bold text-lg mb-4">🏗 실전 레이아웃 패턴</h2>

      {/* 헤더 + 사이드바 + 콘텐츠 */}
      <div>
        <p className="text-xs font-mono text-gray-500 mb-2">헤더 / 사이드바 + 콘텐츠 / 푸터</p>
        <div className="border border-gray-200 rounded-xl overflow-hidden text-xs font-mono">
          {/* 헤더 */}
          <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
            <span>🏠 로고</span>
            <div className="flex gap-3 text-gray-300">
              <span>홈</span><span>소개</span><span>연락</span>
            </div>
          </div>
          {/* 바디 */}
          <div className="flex min-h-24">
            <aside className="w-24 bg-gray-100 p-3 text-gray-500 border-r border-gray-200">
              <p className="mb-2 font-semibold text-gray-700">사이드바</p>
              <p>메뉴 1</p>
              <p>메뉴 2</p>
            </aside>
            <main className="flex-1 p-3 text-gray-700">
              <p className="font-semibold mb-1">메인 콘텐츠</p>
              <p className="text-gray-400">flex-1로 남은 공간 채우기</p>
            </main>
          </div>
          {/* 푸터 */}
          <div className="bg-gray-800 text-gray-400 px-4 py-2 text-center">
            © 2025 My App
          </div>
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="mt-5">
        <p className="text-xs font-mono text-gray-500 mb-2">카드 그리드 — grid grid-cols-1 sm:grid-cols-3</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: "📈", title: "매출", value: "₩1,240만", change: "+12%" },
            { icon: "👥", title: "사용자", value: "8,420명", change: "+5%" },
            { icon: "🛒", title: "주문", value: "342건", change: "-2%" },
          ].map((card) => (
            <div key={card.title} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{card.icon}</span>
                <span className="text-xs text-gray-500">{card.title}</span>
              </div>
              <p className="font-bold text-gray-800">{card.value}</p>
              <p className={`text-xs font-semibold mt-1 ${card.change.startsWith("+") ? "text-green-500" : "text-red-400"}`}>
                {card.change}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LayoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">💨 Tailwind CSS — Flexbox & Grid</h1>
        <p className="text-gray-500 text-sm mb-6">
          Tailwind로 복잡한 레이아웃도 클래스만으로 구현할 수 있습니다.
        </p>

        <FlexDemo />
        <GridDemo />
        <RealLayoutDemo />

        <div className="flex gap-3 mt-2">
          <a href="/phase2/tailwind/01-utilities" className="text-sm text-gray-500 underline">← 이전: 유틸리티 기초</a>
          <a href="/phase2/tailwind/03-responsive" className="text-sm text-teal-600 underline ml-auto">다음: 반응형 & 다크모드 →</a>
        </div>
      </div>
    </div>
  );
}
