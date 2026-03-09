/**
 * Phase 1 학습 홈
 */

const lessons = [
  {
    category: "TypeScript",
    icon: "🔷",
    color: "bg-blue-500",
    bgLight: "bg-blue-50",
    border: "border-blue-200",
    items: [
      { title: "01. 기본 타입", desc: "string, number, boolean, array, union", href: "/phase1/typescript/01-basic-types" },
      { title: "02. 인터페이스", desc: "interface, type alias, 함수 타입, extends", href: "/phase1/typescript/02-interface" },
      { title: "03. 제네릭", desc: "Array<T>, 유틸리티 타입, 제네릭 컴포넌트", href: "/phase1/typescript/03-generics" },
    ],
  },
  {
    category: "React + Hooks",
    icon: "⚛️",
    color: "bg-cyan-500",
    bgLight: "bg-cyan-50",
    border: "border-cyan-200",
    items: [
      { title: "01. useState", desc: "상태 관리, 카운터, 폼, 토글, 객체 상태", href: "/phase1/react/01-useState" },
      { title: "02. useEffect", desc: "사이드 이펙트, 타이머, API 패칭, 디바운스", href: "/phase1/react/02-useEffect" },
      { title: "03. 실습: Todo 앱", desc: "TypeScript + React 종합 실습", href: "/phase1/react/03-todo-app" },
    ],
  },
];

export default function Phase1Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <a href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-2 inline-block">← 전체 로드맵</a>
          <h1 className="text-3xl font-bold text-gray-900">Phase 1 — 기반 다지기</h1>
          <p className="text-gray-500 mt-1">TypeScript 기초 + React 핵심 훅</p>
          <div className="mt-3 inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            ⏱ 예상 기간: 1~2주
          </div>
        </div>

        {/* 학습 목록 */}
        <div className="space-y-6">
          {lessons.map((section) => (
            <div key={section.category} className={`rounded-2xl border ${section.border} ${section.bgLight} p-5`}>
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-8 h-8 ${section.color} rounded-lg flex items-center justify-center text-white text-lg`}>
                  {section.icon}
                </span>
                <h2 className="font-bold text-gray-800 text-lg">{section.category}</h2>
              </div>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition group"
                  >
                    <div>
                      <p className="font-semibold text-sm text-gray-800 group-hover:text-blue-600">{item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                    <span className="text-gray-300 group-hover:text-blue-400 text-lg">→</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 학습 팁 */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
          <h3 className="font-semibold text-yellow-800 mb-2">💡 Phase 1 학습 팁</h3>
          <ul className="space-y-1 text-sm text-yellow-800">
            <li>• TypeScript와 React를 처음부터 같이 쓰세요 — 나중에 따로 배우면 더 어렵습니다.</li>
            <li>• 각 페이지의 코드를 직접 수정해보면서 실험해보세요.</li>
            <li>• 에러가 나면 TypeScript가 뭐라고 하는지 읽어보세요 — 그게 학습입니다.</li>
            <li>• Todo 앱을 완전히 이해했다면 Phase 2로 넘어가세요!</li>
          </ul>
        </div>

        <div className="mt-4 text-center">
          <a href="/phase1/react/03-todo-app" className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-6 py-2 rounded-xl transition">
            🚀 Todo 앱 실습 바로가기
          </a>
        </div>
      </div>
    </div>
  );
}
