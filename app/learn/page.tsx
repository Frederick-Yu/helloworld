/**
 * 전체 학습 로드맵 인덱스
 * 접속: /learn
 */

const phases = [
  {
    id: 1,
    title: "Phase 1 — 기반 다지기",
    duration: "1~2주",
    icon: "🧱",
    color: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    border: "border-blue-200",
    textColor: "text-blue-700",
    href: "/phase1",
    lessons: [
      { title: "TypeScript 기본 타입", href: "/phase1/typescript/01-basic-types" },
      { title: "인터페이스 & 타입 Alias", href: "/phase1/typescript/02-interface" },
      { title: "제네릭", href: "/phase1/typescript/03-generics" },
      { title: "React useState", href: "/phase1/react/01-useState" },
      { title: "React useEffect", href: "/phase1/react/02-useEffect" },
      { title: "실습: Todo 앱", href: "/phase1/react/03-todo-app" },
    ],
  },
  {
    id: 2,
    title: "Phase 2 — 스타일링 & UI",
    duration: "3~5일",
    icon: "🎨",
    color: "from-teal-500 to-teal-600",
    bgLight: "bg-teal-50",
    border: "border-teal-200",
    textColor: "text-teal-700",
    href: "/phase2",
    lessons: [
      { title: "유틸리티 기초", href: "/phase2/tailwind/01-utilities" },
      { title: "Flexbox & Grid", href: "/phase2/tailwind/02-layout" },
      { title: "반응형 & 다크모드", href: "/phase2/tailwind/03-responsive" },
      { title: "실습: 컴포넌트 라이브러리", href: "/phase2/tailwind/04-components" },
    ],
  },
  {
    id: 3,
    title: "Phase 3 — Next.js 풀스택",
    duration: "2~3주",
    icon: "🚀",
    color: "from-violet-500 to-violet-600",
    bgLight: "bg-violet-50",
    border: "border-violet-200",
    textColor: "text-violet-700",
    href: "/phase3",
    lessons: [
      { title: "폴더 구조 & 라우팅", href: "/phase3/nextjs/01-routing" },
      { title: "Server vs Client 컴포넌트", href: "/phase3/nextjs/02-server-client" },
      { title: "데이터 패칭 & Suspense", href: "/phase3/nextjs/03-data-fetching" },
      { title: "Server Actions", href: "/phase3/nextjs/04-server-actions" },
    ],
  },
  {
    id: 4,
    title: "Phase 4 — Supabase 백엔드",
    duration: "1~2주",
    icon: "🗄️",
    color: "from-green-500 to-green-600",
    bgLight: "bg-green-50",
    border: "border-green-200",
    textColor: "text-green-700",
    href: "#",
    comingSoon: true,
    lessons: [
      { title: "Supabase 세팅 & CRUD", href: "#" },
      { title: "Row Level Security", href: "#" },
      { title: "Auth — 이메일/소셜 로그인", href: "#" },
      { title: "Realtime & Storage", href: "#" },
    ],
  },
  {
    id: 5,
    title: "Phase 5 — 통합 프로젝트",
    duration: "2~4주",
    icon: "🏗️",
    color: "from-orange-500 to-orange-600",
    bgLight: "bg-orange-50",
    border: "border-orange-200",
    textColor: "text-orange-700",
    href: "#",
    comingSoon: true,
    lessons: [
      { title: "인증 + CRUD 메모 앱", href: "#" },
      { title: "실시간 채팅 앱", href: "#" },
      { title: "SaaS 대시보드", href: "#" },
      { title: "Vercel 배포", href: "#" },
    ],
  },
];

export default function LearnHome() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">풀스택 학습 로드맵</h1>
          <p className="text-gray-500">React · Next.js · Tailwind · TypeScript · Supabase</p>
          <div className="mt-3 inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
            ⏱ 총 예상 기간: 7~10주 (매일 2~3시간 기준)
          </div>
        </div>

        {/* Phase 카드 목록 */}
        <div className="space-y-4">
          {phases.map((phase) => (
            <div key={phase.id} className={`rounded-2xl border ${phase.border} ${phase.bgLight} overflow-hidden ${phase.comingSoon ? "opacity-60" : ""}`}>
              {/* 헤더 */}
              <div className={`bg-gradient-to-r ${phase.color} px-6 py-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{phase.icon}</span>
                  <div>
                    <h2 className="font-bold text-white text-lg">{phase.title}</h2>
                    <span className="text-white/70 text-xs">{phase.duration}</span>
                  </div>
                </div>
                {phase.comingSoon ? (
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-semibold">준비 중</span>
                ) : (
                  <a href={phase.href} className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded-full font-semibold transition">
                    시작하기 →
                  </a>
                )}
              </div>

              {/* 레슨 목록 */}
              <div className="px-6 py-4">
                <div className="grid grid-cols-2 gap-2">
                  {phase.lessons.map((lesson) => (
                    <a key={lesson.title} href={lesson.href}
                      className={`flex items-center gap-2 text-sm py-1.5 group ${phase.comingSoon ? "pointer-events-none" : ""}`}>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${phase.textColor.replace("text-", "bg-")}`} />
                      <span className={`${phase.textColor} group-hover:underline`}>{lesson.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 학습 원칙 */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4">✅ 학습 원칙</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ["🔨", "이론보다 코드 먼저", "읽는 시간 30%, 직접 치는 시간 70%"],
              ["📦", "작은 프로젝트 중심", "개념 하나 배우면 즉시 미니 앱에 적용"],
              ["🔗", "스택을 같이 써보기", "TypeScript는 처음부터 React와 함께"],
              ["🐛", "에러를 두려워 말기", "에러 메시지 읽고 해결하는 게 가장 빠른 학습"],
              ["🚀", "배포는 빠를수록 좋다", "Phase 3 끝나면 바로 Vercel에 올려보기"],
              ["🔁", "반복이 이해를 만든다", "같은 개념을 다른 프로젝트에 다시 써보기"],
            ].map(([icon, title, desc]) => (
              <div key={title as string} className="flex items-start gap-3">
                <span className="text-xl shrink-0">{icon}</span>
                <div className="text-sm">
                  <span className="font-semibold text-gray-800">{title}</span>
                  <span className="text-gray-500"> — {desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
