"use client";

/**
 * ⚛️ React 학습 2: useEffect 훅
 *
 * 학습 목표:
 * - 사이드 이펙트의 개념 이해 (API 호출, 타이머, 이벤트 리스너)
 * - 의존성 배열 [] 의 역할
 * - 클린업 함수 사용법
 * - TypeScript와 함께 async 데이터 패칭
 */

import { useState, useEffect } from "react";


// ─────────────────────────────────────────
// 예제 1: 타이머 (mount 시 실행, unmount 시 정리)
// ─────────────────────────────────────────

function LiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    // 컴포넌트가 화면에 나타났을 때(mount) 실행
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("ko-KR"));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    // 클린업 함수: 컴포넌트가 사라질 때(unmount) 실행 → 메모리 누수 방지
    return () => clearInterval(timer);
  }, []); // [] = 처음 마운트할 때 한 번만 실행

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-semibold mb-2">🕐 실시간 시계</h3>
      <p className="text-3xl font-mono text-blue-600 text-center">{time}</p>
      <p className="text-xs text-gray-400 mt-2 font-mono text-center">useEffect(() =&gt; &#123; setInterval &#125;, [])</p>
    </div>
  );
}


// ─────────────────────────────────────────
// 예제 2: 의존성 배열 — 값이 바뀔 때마다 실행
// ─────────────────────────────────────────

function SearchDemo() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const mockData = ["사과", "사탕", "사이다", "바나나", "바게트", "오렌지", "오이", "포도"];

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    // 300ms 디바운스 (사용자가 타이핑 멈추면 검색)
    const timer = setTimeout(() => {
      const filtered = mockData.filter((item) => item.includes(query));
      setResults(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer); // 클린업으로 이전 타이머 취소
  }, [query]); // query가 바뀔 때마다 실행

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-semibold mb-3">🔍 디바운스 검색</h3>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요 (사, 바, 오...)"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 mb-3"
      />
      {isSearching && <p className="text-xs text-gray-400">검색 중...</p>}
      {results.length > 0 && (
        <ul className="space-y-1">
          {results.map((r) => (
            <li key={r} className="text-sm bg-blue-50 text-blue-800 px-3 py-1 rounded">{r}</li>
          ))}
        </ul>
      )}
      {query && !isSearching && results.length === 0 && (
        <p className="text-sm text-gray-400">"{query}"에 대한 결과가 없습니다</p>
      )}
      <p className="text-xs text-gray-400 mt-3 font-mono">useEffect(() =&gt; &#123;...&#125;, [query])</p>
    </div>
  );
}


// ─────────────────────────────────────────
// 예제 3: API 데이터 패칭
// ─────────────────────────────────────────

interface Post {
  id: number;
  title: string;
  userId: number;
}

function PostFetcher() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // async 함수는 useEffect 안에서 직접 쓸 수 없으므로 내부에 선언
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
        if (!res.ok) throw new Error("데이터를 불러오지 못했습니다.");
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // 마운트 시 한 번만 실행

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-semibold mb-3">📡 API 데이터 패칭</h3>
      <p className="text-xs text-gray-400 font-mono mb-3">jsonplaceholder.typicode.com/posts</p>
      {loading && (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      )}
      {error && <p className="text-sm text-red-500">❌ {error}</p>}
      {!loading && !error && (
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.id} className="text-sm border-b border-gray-100 pb-2 last:border-0">
              <span className="text-xs text-gray-400 mr-2">#{post.id}</span>
              {post.title.slice(0, 50)}...
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


// ─────────────────────────────────────────
// 페이지
// ─────────────────────────────────────────

export default function UseEffectPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">⚛️ React — useEffect 훅</h1>
        <p className="text-gray-500 text-sm mb-2">
          사이드 이펙트 = 렌더링 외의 작업 (API 호출, 타이머, 이벤트 리스너 등)
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-xs font-mono text-blue-800 mb-6">
          useEffect(실행할함수, [의존성배열])
        </div>

        <div className="space-y-4">
          <LiveClock />
          <SearchDemo />
          <PostFetcher />
        </div>

        <div className="flex gap-3 mt-6">
          <a href="/phase1/react/01-useState" className="text-sm text-gray-500 underline">← 이전: useState</a>
          <a href="/phase1/react/03-todo-app" className="text-sm text-blue-600 underline ml-auto">다음: 실습 - Todo 앱 →</a>
        </div>
      </div>
    </div>
  );
}
