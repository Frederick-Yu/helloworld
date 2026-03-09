/**
 * Phase 3 학습 홈 — Next.js App Router
 */

const lessons = [
  {
    category: "Next.js App Router",
    icon: "▲",
    color: "bg-violet-500",
    bgLight: "bg-violet-50",
    border: "border-violet-200",
    items: [
      { title: "01. 폴더 구조 & 라우팅", desc: "app/ 구조, page.tsx, layout.tsx, 동적 라우트", href: "/phase3/nextjs/01-routing" },
      { title: "02. Server vs Client 컴포넌트", desc: "'use client', 렌더링 차이, 언제 무엇을 쓸까", href: "/phase3/nextjs/02-server-client" },
      { title: "03. 데이터 패칭", desc: "fetch + revalidate, 로딩/에러 UI, Suspense", href: "/phase3/nextjs/03-data-fetching" },
      { title: "04. Server Actions", desc: "폼 처리, DB 조작, API Route 없이 서버 로직", href: "/phase3/nextjs/04-server-actions" },
    ],
  },
];

export default function Phase3Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <a href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-2 inline-block">← 전체 로드맵</a>
          <h1 className="text-3xl font-bold text-gray-900">Phase 3 — Next.js 풀스택</h1>
          <p className="text-gray-500 mt-1">App Router, 서버 컴포넌트, 데이터 패칭, Server Actions</p>
          <div className="mt-3 inline-block bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full">
            ⏱ 예상 기간: 2~3주
          </div>
        </div>

        {/* Next.js 핵심 아키텍처 요약 */}
        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 mb-6">
          <h3 className="font-bold text-violet-800 mb-3">🏛 App Router 핵심 개념</h3>
          <div className="space-y-2 text-sm text-violet-800">
            <div className="flex items-start gap-2">
              <span className="font-mono bg-violet-100 px-2 py-0.5 rounded text-xs shrink-0">page.tsx</span>
              <span>URL에 대응하는 페이지 컴포넌트 (기본 Server Component)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-mono bg-violet-100 px-2 py-0.5 rounded text-xs shrink-0">layout.tsx</span>
              <span>여러 페이지를 감싸는 공통 레이아웃</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-mono bg-violet-100 px-2 py-0.5 rounded text-xs shrink-0">loading.tsx</span>
              <span>데이터 로딩 중 자동으로 보여줄 스켈레톤 UI</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-mono bg-violet-100 px-2 py-0.5 rounded text-xs shrink-0">error.tsx</span>
              <span>에러 발생 시 자동으로 보여줄 에러 UI</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-mono bg-violet-100 px-2 py-0.5 rounded text-xs shrink-0">[slug]/</span>
              <span>동적 라우트 — /posts/123, /posts/hello 모두 대응</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {lessons.map((section) => (
            <div key={section.category} className={`rounded-2xl border ${section.border} ${section.bgLight} p-5`}>
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-8 h-8 ${section.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                  {section.icon}
                </span>
                <h2 className="font-bold text-gray-800 text-lg">{section.category}</h2>
              </div>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <a key={item.href} href={item.href}
                    className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition group">
                    <div>
                      <p className="font-semibold text-sm text-gray-800 group-hover:text-violet-600">{item.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                    <span className="text-gray-300 group-hover:text-violet-400 text-lg">→</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
          <h3 className="font-semibold text-yellow-800 mb-2">💡 Phase 3 학습 팁</h3>
          <ul className="space-y-1 text-sm text-yellow-800">
            <li>• Pages Router는 무시하세요. App Router(v13+)가 현재 표준입니다.</li>
            <li>• "서버 컴포넌트 vs 클라이언트 컴포넌트"를 이해하면 나머지는 쉬워집니다.</li>
            <li>• Server Actions 하나로 API 라우트 없이 DB 조작이 가능합니다.</li>
            <li>• nextjs.org/learn 공식 코스를 함께 따라가면 더욱 효과적입니다.</li>
          </ul>
        </div>

        <div className="flex gap-3 mt-6">
          <a href="/phase2" className="text-sm text-gray-500 underline">← Phase 2</a>
        </div>
      </div>
    </div>
  );
}
