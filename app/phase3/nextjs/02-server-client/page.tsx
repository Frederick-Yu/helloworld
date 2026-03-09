"use client";

/**
 * ▲ Next.js 학습 2: Server Component vs Client Component
 *
 * 학습 목표:
 * - Server Component: 기본값, 서버에서만 실행
 * - Client Component: 'use client', 브라우저에서 실행
 * - 언제 무엇을 써야 하는가
 * - 두 컴포넌트를 함께 사용하는 패턴
 */

import { useState } from "react";

type ComponentType = "server" | "client";

const comparison = [
  { feature: "기본값", server: "✅ 기본값", client: "❌ 'use client' 명시 필요" },
  { feature: "실행 위치", server: "서버에서만 실행", client: "브라우저(+서버 SSR)" },
  { feature: "useState / useEffect", server: "❌ 사용 불가", client: "✅ 사용 가능" },
  { feature: "이벤트 핸들러 (onClick)", server: "❌ 사용 불가", client: "✅ 사용 가능" },
  { feature: "브라우저 API (window, document)", server: "❌ 사용 불가", client: "✅ 사용 가능" },
  { feature: "DB 직접 접근", server: "✅ 가능 (보안 ✓)", client: "❌ 노출 위험" },
  { feature: "API 키, 환경변수", server: "✅ 안전하게 사용", client: "❌ 노출됨" },
  { feature: "번들 크기", server: "✅ 0 (JS 전송 없음)", client: "번들에 포함됨" },
  { feature: "async/await 직접 사용", server: "✅ 가능", client: "❌ useEffect 필요" },
];

const useServerWhen = [
  "데이터 패칭 (DB, API 호출)",
  "환경변수 / API 키 사용",
  "대용량 라이브러리 import",
  "SEO가 중요한 정적 콘텐츠",
  "레이아웃, 네비게이션 (상태 없음)",
];

const useClientWhen = [
  "useState, useEffect 필요",
  "onClick 등 이벤트 핸들러",
  "브라우저 API (localStorage, window)",
  "실시간 업데이트 (WebSocket 등)",
  "서드파티 클라이언트 라이브러리",
];

function ComparisonTable() {
  const [highlight, setHighlight] = useState<ComponentType | null>(null);

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
      <h2 className="font-semibold text-lg mb-3">🆚 비교표</h2>
      <div className="flex gap-2 mb-3">
        <button onClick={() => setHighlight(highlight === "server" ? null : "server")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${highlight === "server" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600"}`}>
          서버 컴포넌트 강조
        </button>
        <button onClick={() => setHighlight(highlight === "client" ? null : "client")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${highlight === "client" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}>
          클라이언트 컴포넌트 강조
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 text-gray-500 font-medium">특성</th>
              <th className={`text-left py-2 font-medium px-2 rounded-t ${highlight === "server" ? "bg-green-50 text-green-700" : "text-gray-500"}`}>
                Server Component
              </th>
              <th className={`text-left py-2 font-medium px-2 rounded-t ${highlight === "client" ? "bg-blue-50 text-blue-700" : "text-gray-500"}`}>
                Client Component
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.feature} className="border-b border-gray-50">
                <td className="py-2 text-gray-700 font-medium">{row.feature}</td>
                <td className={`py-2 px-2 ${highlight === "server" ? "bg-green-50 text-green-800 font-semibold" : "text-gray-500"}`}>{row.server}</td>
                <td className={`py-2 px-2 ${highlight === "client" ? "bg-blue-50 text-blue-800 font-semibold" : "text-gray-500"}`}>{row.client}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function WhenToUse() {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
      <h2 className="font-semibold text-lg mb-3">🤔 언제 무엇을?</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h3 className="font-semibold text-green-800 mb-2 text-sm">✅ Server Component 쓸 때</h3>
          <ul className="space-y-1">
            {useServerWhen.map((item) => (
              <li key={item} className="text-xs text-green-700 flex items-start gap-1">
                <span className="shrink-0">•</span>{item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-800 mb-2 text-sm">✅ Client Component 쓸 때</h3>
          <ul className="space-y-1">
            {useClientWhen.map((item) => (
              <li key={item} className="text-xs text-blue-700 flex items-start gap-1">
                <span className="shrink-0">•</span>{item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CodeExamples() {
  const [tab, setTab] = useState<"server" | "client" | "mixed">("server");

  const examples = {
    server: `// app/posts/page.tsx (서버 컴포넌트 — 기본값)
// 'use client' 없음!

import { db } from "@/lib/db";

export default async function PostsPage() {
  // 서버에서 직접 DB 조회 — API 라우트 불필요!
  const posts = await db.post.findMany();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`,
    client: `// app/counter/page.tsx (클라이언트 컴포넌트)
"use client"; // 이 한 줄로 클라이언트 컴포넌트!

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      클릭: {count}
    </button>
  );
}`,
    mixed: `// ✅ 권장 패턴: 서버에서 데이터 받아 클라이언트에 전달

// app/posts/page.tsx (서버 컴포넌트)
import LikeButton from "./LikeButton"; // 클라이언트 컴포넌트

export default async function PostPage() {
  const post = await fetch('/api/post/1').then(r => r.json());

  return (
    <article>
      <h1>{post.title}</h1>  {/* 서버에서 렌더링 */}
      <LikeButton postId={post.id} />  {/* 클라이언트 */}
    </article>
  );
}

// app/posts/LikeButton.tsx (클라이언트 컴포넌트)
"use client";
import { useState } from "react";

export default function LikeButton({ postId }: { postId: number }) {
  const [liked, setLiked] = useState(false);
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? "❤️" : "🤍"} 좋아요
    </button>
  );
}`,
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
      <h2 className="font-semibold text-lg mb-3">💻 코드 예제</h2>
      <div className="flex gap-1 mb-3">
        {(["server", "client", "mixed"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${tab === t ? "bg-violet-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {t === "server" ? "서버 컴포넌트" : t === "client" ? "클라이언트 컴포넌트" : "혼합 패턴 ⭐"}
          </button>
        ))}
      </div>
      <pre className="text-xs font-mono bg-gray-900 text-green-300 rounded-xl p-4 overflow-x-auto whitespace-pre-wrap">
        {examples[tab]}
      </pre>
      {tab === "mixed" && (
        <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
          💡 <strong>핵심 원칙:</strong> 서버 컴포넌트를 최대한 많이, 클라이언트 컴포넌트는 필요한 곳에만!
          클라이언트 컴포넌트는 트리의 가장 아래(leaf)에 위치시키는 것이 이상적입니다.
        </div>
      )}
    </section>
  );
}

export default function ServerClientPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">▲ Next.js — Server vs Client 컴포넌트</h1>
        <p className="text-gray-500 text-sm mb-2">
          App Router의 가장 중요한 개념! 기본값은 서버 컴포넌트, 인터랙션이 필요하면 클라이언트 컴포넌트.
        </p>
        <div className="bg-violet-50 border border-violet-200 rounded-lg px-4 py-2 text-xs font-mono text-violet-800 mb-6">
          'use client' 한 줄 = 클라이언트 컴포넌트 선언
        </div>

        <ComparisonTable />
        <WhenToUse />
        <CodeExamples />

        <div className="flex gap-3 mt-2">
          <a href="/phase3/nextjs/01-routing" className="text-sm text-gray-500 underline">← 이전: 라우팅</a>
          <a href="/phase3/nextjs/03-data-fetching" className="text-sm text-violet-600 underline ml-auto">다음: 데이터 패칭 →</a>
        </div>
      </div>
    </div>
  );
}
