/**
 * ▲ Next.js 학습 1: 폴더 구조 & 라우팅
 *
 * 학습 목표:
 * - app/ 디렉토리 기반 파일 시스템 라우팅 이해
 * - page.tsx, layout.tsx, loading.tsx, error.tsx 역할
 * - 동적 라우트 [slug], 중첩 라우트
 * - Link 컴포넌트로 클라이언트 사이드 네비게이션
 */

import Link from "next/link";

// ─────────────────────────────────────────
// 파일 → URL 매핑 시각화
// ─────────────────────────────────────────

const routeMap = [
  { file: "app/page.tsx", url: "/", note: "루트 페이지" },
  { file: "app/about/page.tsx", url: "/about", note: "about 페이지" },
  { file: "app/blog/page.tsx", url: "/blog", note: "블로그 목록" },
  { file: "app/blog/[slug]/page.tsx", url: "/blog/hello-world", note: "동적 라우트" },
  { file: "app/blog/[slug]/page.tsx", url: "/blog/nextjs-guide", note: "동적 라우트 (같은 파일!)" },
  { file: "app/(auth)/login/page.tsx", url: "/login", note: "라우트 그룹 (URL에 안 보임)" },
  { file: "app/dashboard/layout.tsx", url: "-", note: "dashboard 하위 공통 레이아웃" },
  { file: "app/dashboard/page.tsx", url: "/dashboard", note: "대시보드 홈" },
  { file: "app/dashboard/settings/page.tsx", url: "/dashboard/settings", note: "중첩 라우트" },
];

// ─────────────────────────────────────────
// 특수 파일들
// ─────────────────────────────────────────

const specialFiles = [
  {
    file: "page.tsx",
    role: "URL에 대응하는 페이지 UI",
    example: `export default function Page() {\n  return <h1>페이지</h1>;\n}`,
  },
  {
    file: "layout.tsx",
    role: "하위 페이지를 감싸는 공통 레이아웃. 리렌더링 없이 유지됨",
    example: `export default function Layout({ children }: { children: React.ReactNode }) {\n  return <div><nav>...</nav>{children}</div>;\n}`,
  },
  {
    file: "loading.tsx",
    role: "데이터 로딩 중 자동으로 Suspense fallback으로 사용",
    example: `export default function Loading() {\n  return <div>로딩 중...</div>;\n}`,
  },
  {
    file: "error.tsx",
    role: "에러 발생 시 자동으로 ErrorBoundary로 사용 ('use client' 필수)",
    example: `'use client';\nexport default function Error({ error, reset }) {\n  return <button onClick={reset}>다시 시도</button>;\n}`,
  },
  {
    file: "not-found.tsx",
    role: "notFound() 호출 또는 404 시 자동으로 표시",
    example: `export default function NotFound() {\n  return <h1>404 — 페이지를 찾을 수 없습니다</h1>;\n}`,
  },
];

// ─────────────────────────────────────────
// 동적 라우트 설명
// ─────────────────────────────────────────

const dynamicRoutes = [
  { pattern: "app/blog/[slug]/page.tsx", match: "/blog/hello, /blog/world", desc: "단일 동적 세그먼트" },
  { pattern: "app/shop/[...slug]/page.tsx", match: "/shop/a, /shop/a/b/c", desc: "여러 세그먼트 캐치올" },
  { pattern: "app/shop/[[...slug]]/page.tsx", match: "/shop, /shop/a, /shop/a/b", desc: "선택적 캐치올" },
];

export default function RoutingPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">▲ Next.js — 폴더 구조 & 라우팅</h1>
        <p className="text-gray-500 text-sm mb-6">
          Next.js App Router는 <strong>파일 시스템 = URL</strong>입니다. 폴더를 만들고 page.tsx를 넣으면 그게 라우트가 됩니다.
        </p>

        {/* 파일 → URL 매핑 */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">📁 파일 → URL 매핑</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500">
                  <th className="text-left py-2 font-medium">파일 경로</th>
                  <th className="text-left py-2 font-medium">URL</th>
                  <th className="text-left py-2 font-medium">설명</th>
                </tr>
              </thead>
              <tbody>
                {routeMap.map((r) => (
                  <tr key={r.file} className="border-b border-gray-50">
                    <td className="py-2 font-mono text-violet-600">{r.file}</td>
                    <td className="py-2 font-mono text-gray-500">{r.url}</td>
                    <td className="py-2 text-gray-400">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 특수 파일 */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">📄 특수 파일들</h2>
          <div className="space-y-3">
            {specialFiles.map((f) => (
              <div key={f.file} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <code className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded text-xs font-bold">{f.file}</code>
                </div>
                <p className="text-xs text-gray-600 mb-2">{f.role}</p>
                <pre className="text-xs font-mono bg-gray-50 rounded p-2 text-gray-600 overflow-x-auto">{f.example}</pre>
              </div>
            ))}
          </div>
        </section>

        {/* 동적 라우트 */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">🔀 동적 라우트</h2>
          <div className="space-y-2">
            {dynamicRoutes.map((r) => (
              <div key={r.pattern} className="bg-gray-50 rounded-lg p-3">
                <code className="text-xs font-mono text-violet-600">{r.pattern}</code>
                <p className="text-xs text-gray-500 mt-1">매칭: {r.match}</p>
                <p className="text-xs text-gray-400">{r.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 font-mono mb-2">// 동적 라우트에서 params 받기</p>
            <pre className="text-xs font-mono text-gray-700">{`// app/blog/[slug]/page.tsx
interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  // slug = "hello-world"
  return <h1>{slug}</h1>;
}`}</pre>
          </div>
        </section>

        {/* Link 컴포넌트 */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">🔗 Link 컴포넌트</h2>
          <pre className="text-xs font-mono bg-gray-50 rounded p-3 text-gray-700 mb-3">{`import Link from "next/link";

// ✅ 클라이언트 사이드 네비게이션 (빠름)
<Link href="/about">소개 페이지</Link>
<Link href={\`/blog/\${slug}\`}>블로그 글</Link>

// ❌ 이렇게 하면 전체 페이지 새로고침
<a href="/about">소개 페이지</a>`}</pre>
          <div className="flex gap-2">
            <Link href="/phase3/nextjs/02-server-client"
              className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white text-sm rounded-lg font-semibold transition">
              Link로 이동하기 →
            </Link>
          </div>
        </section>

        <div className="flex gap-3 mt-2">
          <a href="/phase3" className="text-sm text-gray-500 underline">← Phase 3 홈</a>
          <a href="/phase3/nextjs/02-server-client" className="text-sm text-violet-600 underline ml-auto">다음: 서버 vs 클라이언트 →</a>
        </div>
      </div>
    </div>
  );
}
