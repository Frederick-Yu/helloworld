/**
 * Phase 2 학습 홈 — Tailwind CSS
 */

const lessons = [
  {
    category: "Tailwind CSS",
    icon: "💨",
    color: "bg-teal-500",
    bgLight: "bg-teal-50",
    border: "border-teal-200",
    items: [
      { title: "01. 유틸리티 기초", desc: "spacing, color, typography, border, shadow", href: "/phase2/tailwind/01-utilities" },
      { title: "02. Flexbox & Grid", desc: "레이아웃 시스템, 정렬, 반응형 그리드", href: "/phase2/tailwind/02-layout" },
      { title: "03. 반응형 & 다크모드", desc: "sm/md/lg 브레이크포인트, dark: 프리픽스", href: "/phase2/tailwind/03-responsive" },
      { title: "04. 실습: 컴포넌트 라이브러리", desc: "버튼, 카드, 뱃지, 폼, 모달 직접 만들기", href: "/phase2/tailwind/04-components" },
    ],
  },
];

export default function Phase2Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <a href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-2 inline-block">← 전체 로드맵</a>
          <h1 className="text-3xl font-bold text-gray-900">Phase 2 — 스타일링 & UI</h1>
          <p className="text-gray-500 mt-1">Tailwind CSS 유틸리티 퍼스트 스타일링</p>
          <div className="mt-3 inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full">
            ⏱ 예상 기간: 3~5일
          </div>
        </div>

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
                  <a key={item.href} href={item.href}
                    className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition group">
                    <div>
                      <p className="font-semibold text-sm text-gray-800 group-hover:text-teal-600">{item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                    <span className="text-gray-300 group-hover:text-teal-400 text-lg">→</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
          <h3 className="font-semibold text-yellow-800 mb-2">💡 Phase 2 학습 팁</h3>
          <ul className="space-y-1 text-sm text-yellow-800">
            <li>• 클래스 이름을 외우려 하지 말고, 패턴을 익히세요. (p-4 = padding 1rem)</li>
            <li>• IntelliJ에 Tailwind CSS IntelliSense 플러그인을 설치하면 자동완성이 됩니다.</li>
            <li>• Phase 1에서 만든 Todo 앱에 Tailwind를 적용해보세요.</li>
          </ul>
        </div>

        <div className="flex gap-3 mt-6">
          <a href="/phase1" className="text-sm text-gray-500 underline">← Phase 1</a>
          <a href="/phase3" className="text-sm text-blue-600 underline ml-auto">Phase 3 →</a>
        </div>
      </div>
    </div>
  );
}
