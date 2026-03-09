"use client";

/**
 * ▲ Next.js 학습 4: Server Actions
 *
 * 학습 목표:
 * - Server Action = 서버에서 실행되는 함수를 클라이언트에서 호출
 * - 'use server' 지시어
 * - 폼(Form) 처리 패턴
 * - useActionState로 상태 관리
 * - API Route 없이 DB 조작하는 방법
 */

import { useState } from "react";

// ─────────────────────────────────────────
// Server Action 개념 설명 탭
// ─────────────────────────────────────────

const codeExamples = {
  basic: {
    title: "기본 Server Action",
    code: `// app/actions.ts
'use server'; // 이 파일의 모든 함수가 Server Action

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;

  // 서버에서 직접 DB 저장!
  await db.post.create({ data: { title, body } });

  // 페이지 재검증 (캐시 무효화)
  revalidatePath('/posts');
}`,
  },
  form: {
    title: "Form에 Server Action 연결",
    code: `// app/new-post/page.tsx
import { createPost } from '@/app/actions';

export default function NewPostPage() {
  return (
    // action에 Server Action 함수를 직접 연결!
    <form action={createPost}>
      <input name="title" placeholder="제목" />
      <textarea name="body" placeholder="내용" />
      <button type="submit">저장</button>
    </form>
  );
}

// JavaScript 비활성화 환경에서도 동작!`,
  },
  client: {
    title: "클라이언트에서 호출",
    code: `// 클라이언트 컴포넌트에서도 Server Action 호출 가능
'use client';
import { createPost } from '@/app/actions';
import { useTransition } from 'react';

export default function PostForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    startTransition(async () => {
      await createPost(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" />
      <button disabled={isPending}>
        {isPending ? '저장 중...' : '저장'}
      </button>
    </form>
  );
}`,
  },
  supabase: {
    title: "Supabase와 함께 사용",
    code: `// app/actions.ts
'use server';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addTodo(formData: FormData) {
  const supabase = await createClient();
  const text = formData.get('text') as string;

  const { error } = await supabase
    .from('todos')
    .insert({ text, completed: false });

  if (error) throw new Error(error.message);
  revalidatePath('/todos'); // 페이지 캐시 무효화
}

export async function toggleTodo(id: number, completed: boolean) {
  const supabase = await createClient();
  await supabase.from('todos').update({ completed }).eq('id', id);
  revalidatePath('/todos');
}`,
  },
};

// ─────────────────────────────────────────
// 인터랙티브 데모 (클라이언트 시뮬레이션)
// ─────────────────────────────────────────

interface MockTodo {
  id: number;
  text: string;
  completed: boolean;
}

const INITIAL: MockTodo[] = [
  { id: 1, text: "Next.js App Router 이해하기", completed: true },
  { id: 2, text: "Server Actions 배우기", completed: false },
  { id: 3, text: "Supabase 연동하기", completed: false },
];

function SimulatedServerAction() {
  const [todos, setTodos] = useState<MockTodo[]>(INITIAL);
  const [input, setInput] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 4)]);

  // 실제로는 'use server' 함수 호출
  const simulateServerAction = async (action: string) => {
    setIsPending(true);
    addLog(`→ Server Action 호출: ${action}`);
    await new Promise((r) => setTimeout(r, 600)); // 서버 처리 시뮬레이션
    setIsPending(false);
    addLog(`← 완료: revalidatePath('/todos')`);
  };

  const handleAdd = async () => {
    if (!input.trim()) return;
    await simulateServerAction(`addTodo("${input}")`);
    setTodos((prev) => [...prev, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const handleToggle = async (id: number) => {
    const todo = todos.find((t) => t.id === id)!;
    await simulateServerAction(`toggleTodo(${id}, ${!todo.completed})`);
    setTodos((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = async (id: number) => {
    await simulateServerAction(`deleteTodo(${id})`);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
      <h2 className="font-semibold text-lg mb-2">🚀 Server Action 시뮬레이터</h2>
      <p className="text-xs text-gray-400 mb-4">실제 Server Action처럼 동작하는 데모입니다. (서버 요청 600ms 시뮬레이션)</p>

      {/* 입력 */}
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="새 할 일 입력..."
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
          disabled={isPending}
        />
        <button onClick={handleAdd} disabled={isPending || !input.trim()}
          className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg text-sm font-semibold transition disabled:opacity-40">
          {isPending ? "처리 중..." : "추가"}
        </button>
      </div>

      {/* 목록 */}
      <ul className="space-y-2 mb-4">
        {todos.map((todo) => (
          <li key={todo.id} className={`flex items-center gap-3 p-3 rounded-xl border transition ${todo.completed ? "bg-gray-50 border-gray-100" : "bg-white border-gray-200"}`}>
            <button onClick={() => handleToggle(todo.id)} disabled={isPending}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${todo.completed ? "bg-green-500 border-green-500 text-white" : "border-gray-300"}`}>
              {todo.completed && <span className="text-xs">✓</span>}
            </button>
            <span className={`flex-1 text-sm ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}>{todo.text}</span>
            <button onClick={() => handleDelete(todo.id)} disabled={isPending}
              className="text-gray-300 hover:text-red-400 transition text-lg leading-none disabled:opacity-40">×</button>
          </li>
        ))}
      </ul>

      {/* 서버 로그 */}
      <div className="bg-gray-900 rounded-xl p-3">
        <p className="text-xs text-gray-400 mb-2 font-mono">// 서버 로그</p>
        {log.length === 0 ? (
          <p className="text-xs text-gray-500 font-mono">— 아직 Server Action이 호출되지 않았습니다 —</p>
        ) : (
          log.map((l, i) => (
            <p key={i} className={`text-xs font-mono ${l.includes("←") ? "text-green-400" : "text-yellow-300"}`}>{l}</p>
          ))
        )}
        {isPending && <p className="text-xs font-mono text-blue-400 animate-pulse">⏳ 서버 처리 중...</p>}
      </div>
    </section>
  );
}

export default function ServerActionsPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof codeExamples>("basic");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">▲ Next.js — Server Actions</h1>
        <p className="text-gray-500 text-sm mb-2">
          Server Actions = API 라우트 없이 서버 코드를 클라이언트에서 호출하는 마법!
        </p>
        <div className="bg-violet-50 border border-violet-200 rounded-lg px-4 py-2 text-xs font-mono text-violet-800 mb-6">
          'use server' → 서버에서 실행 · 클라이언트에서 함수처럼 호출 가능
        </div>

        {/* 코드 예제 */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">💻 코드 패턴</h2>
          <div className="flex flex-wrap gap-1 mb-3">
            {(Object.keys(codeExamples) as (keyof typeof codeExamples)[]).map((key) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === key ? "bg-violet-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {codeExamples[key].title}
              </button>
            ))}
          </div>
          <pre className="text-xs font-mono bg-gray-900 text-green-300 rounded-xl p-4 overflow-x-auto whitespace-pre-wrap">
            {codeExamples[activeTab].code}
          </pre>
        </section>

        {/* 장점 */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">✅ Server Actions의 장점</h2>
          <div className="space-y-2">
            {[
              { icon: "🗑", title: "API Route 불필요", desc: "별도의 /api 라우트를 만들지 않아도 됩니다." },
              { icon: "🔐", title: "자동 보안", desc: "서버에서만 실행되므로 API 키, DB 연결이 노출되지 않습니다." },
              { icon: "📝", title: "TypeScript 타입 공유", desc: "서버-클라이언트 간 타입을 그대로 공유할 수 있습니다." },
              { icon: "⚡", title: "Progressive Enhancement", desc: "JavaScript 비활성화 환경에서도 폼이 동작합니다." },
              { icon: "🔄", title: "자동 revalidation", desc: "revalidatePath/revalidateTag로 캐시를 정밀하게 무효화합니다." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 시뮬레이터 */}
        <SimulatedServerAction />

        {/* Phase 3 완료 배너 */}
        <div className="bg-gradient-to-r from-violet-500 to-indigo-500 rounded-2xl p-6 text-white text-center">
          <p className="text-2xl mb-2">🎉</p>
          <h3 className="font-bold text-lg mb-1">Phase 3 완료!</h3>
          <p className="text-sm opacity-90 mb-3">라우팅 · 서버/클라이언트 컴포넌트 · 데이터 패칭 · Server Actions</p>
          <p className="text-xs opacity-75">다음은 Phase 4 — Supabase로 실제 DB, 인증, 실시간 기능을 연결해보세요!</p>
        </div>

        <div className="flex gap-3 mt-4">
          <a href="/phase3/nextjs/03-data-fetching" className="text-sm text-gray-500 underline">← 이전: 데이터 패칭</a>
          <a href="/phase3" className="text-sm text-violet-600 underline ml-auto">Phase 3 홈 →</a>
        </div>
      </div>
    </div>
  );
}
