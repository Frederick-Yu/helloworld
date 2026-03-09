/**
 * ▲ Next.js 학습 3: 데이터 패칭
 *
 * 학습 목표:
 * - 서버 컴포넌트에서 async/await fetch
 * - revalidate로 ISR 구현
 * - loading.tsx / error.tsx 활용
 * - Suspense로 부분적 로딩 UI
 * - 클라이언트 데이터 패칭 (useEffect vs SWR)
 */

import { Suspense } from "react";

// ─────────────────────────────────────────
// 타입
// ─────────────────────────────────────────

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

// ─────────────────────────────────────────
// 서버 컴포넌트 데이터 패칭 예제
// ─────────────────────────────────────────

// 실제 API 호출하는 서버 컴포넌트
async function PostList() {
  // 서버에서 직접 fetch — 브라우저 없이 실행
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", {
    next: { revalidate: 60 }, // 60초마다 재검증 (ISR)
  });

  if (!res.ok) throw new Error("포스트를 불러오지 못했습니다.");
  const posts: Post[] = await res.json();

  return (
    <div className="space-y-2">
      {posts.map((post) => (
        <div key={post.id} className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded font-mono">#{post.id}</span>
            <h3 className="font-semibold text-sm text-gray-800 line-clamp-1">{post.title}</h3>
          </div>
          <p className="text-xs text-gray-400 line-clamp-2">{post.body}</p>
        </div>
      ))}
    </div>
  );
}

async function UserList() {
  // 병렬 fetch — 동시에 두 API 호출
  const res = await fetch("https://jsonplaceholder.typicode.com/users?_limit=3", {
    cache: "force-cache", // 정적 캐시 (SSG처럼)
  });
  const users: User[] = await res.json();

  return (
    <div className="space-y-2">
      {users.map((user) => (
        <div key={user.id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center text-violet-700 font-bold text-sm shrink-0">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email} · {user.company.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// 스켈레톤 로딩 UI
function PostSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 animate-pulse">
          <div className="flex gap-2 mb-2">
            <div className="h-5 w-8 bg-gray-100 rounded" />
            <div className="h-5 flex-1 bg-gray-100 rounded" />
          </div>
          <div className="h-4 bg-gray-100 rounded w-3/4" />
        </div>
      ))}
    </div>
  );
}

function UserSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 flex gap-3 animate-pulse">
          <div className="w-10 h-10 bg-gray-100 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-100 rounded w-1/2" />
            <div className="h-3 bg-gray-100 rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
// 캐싱 전략 설명
// ─────────────────────────────────────────

const cachingStrategies = [
  {
    label: "force-cache",
    code: `fetch(url, { cache: 'force-cache' })`,
    desc: "빌드 시 한 번만 호출 (SSG). 변경되지 않는 정적 데이터에 사용.",
    badge: "SSG",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    label: "revalidate",
    code: `fetch(url, { next: { revalidate: 60 } })`,
    desc: "60초마다 백그라운드에서 재검증 (ISR). 자주 바뀌지 않는 데이터에 사용.",
    badge: "ISR",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    label: "no-store",
    code: `fetch(url, { cache: 'no-store' })`,
    desc: "매 요청마다 새로 호출 (SSR). 실시간 데이터에 사용.",
    badge: "SSR",
    badgeColor: "bg-orange-100 text-orange-700",
  },
];

export default async function DataFetchingPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">▲ Next.js — 데이터 패칭</h1>
        <p className="text-gray-500 text-sm mb-6">
          서버 컴포넌트에서 async/await으로 바로 데이터 패칭! useEffect, loading state 불필요.
        </p>

        {/* 캐싱 전략 */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">⚡ 캐싱 전략</h2>
          <div className="space-y-3">
            {cachingStrategies.map((s) => (
              <div key={s.label} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded font-bold ${s.badgeColor}`}>{s.badge}</span>
                  <code className="text-xs font-mono text-gray-600">{s.label}</code>
                </div>
                <pre className="text-xs font-mono bg-gray-900 text-green-300 rounded p-2 mb-2 overflow-x-auto">{s.code}</pre>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Suspense + 실제 데이터 */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-2">⏳ Suspense로 스트리밍</h2>
          <p className="text-xs text-gray-400 mb-4">
            Suspense로 감싸면 데이터 로딩 중 fallback UI가 표시되고, 준비되면 자동으로 교체됩니다.
          </p>
          <pre className="text-xs font-mono bg-gray-900 text-green-300 rounded-xl p-3 mb-4 overflow-x-auto">{`<Suspense fallback={<PostSkeleton />}>
  <PostList />  {/* 서버에서 데이터 준비되면 교체 */}
</Suspense>`}</pre>

          <h3 className="font-semibold text-sm mb-2 text-gray-700">📝 포스트 목록 (revalidate: 60)</h3>
          <Suspense fallback={<PostSkeleton />}>
            <PostList />
          </Suspense>
        </section>

        <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">👥 유저 목록 (force-cache)</h2>
          <Suspense fallback={<UserSkeleton />}>
            <UserList />
          </Suspense>
        </section>

        {/* loading.tsx 설명 */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">📄 loading.tsx — 자동 Suspense</h2>
          <p className="text-xs text-gray-500 mb-3">
            같은 폴더에 loading.tsx를 만들면 page.tsx 전체를 자동으로 Suspense로 감싸줍니다.
          </p>
          <pre className="text-xs font-mono bg-gray-900 text-green-300 rounded-xl p-3 overflow-x-auto">{`// app/posts/loading.tsx
export default function Loading() {
  return (
    <div className="space-y-2">
      {[1,2,3].map(i => (
        <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
      ))}
    </div>
  );
}

// app/posts/error.tsx  ('use client' 필수!)
'use client';
export default function Error({ error, reset }) {
  return (
    <div>
      <p>에러: {error.message}</p>
      <button onClick={reset}>다시 시도</button>
    </div>
  );
}`}</pre>
        </section>

        <div className="flex gap-3 mt-2">
          <a href="/phase3/nextjs/02-server-client" className="text-sm text-gray-500 underline">← 이전: 서버 vs 클라이언트</a>
          <a href="/phase3/nextjs/04-server-actions" className="text-sm text-violet-600 underline ml-auto">다음: Server Actions →</a>
        </div>
      </div>
    </div>
  );
}
