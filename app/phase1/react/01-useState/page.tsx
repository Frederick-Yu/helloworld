"use client";

/**
 * ⚛️ React 학습 1: useState 훅
 *
 * 학습 목표:
 * - useState로 상태(state) 관리하기
 * - TypeScript와 함께 상태 타입 정의
 * - 상태 변화 → 화면 자동 업데이트 원리 이해
 */

import { useState } from "react";

// ─────────────────────────────────────────
// 예제 1: 카운터 (가장 기본적인 useState)
// ─────────────────────────────────────────

function Counter() {
  // useState<number>(초기값) → [현재값, 값을 바꾸는 함수]
  const [count, setCount] = useState<number>(0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-semibold mb-3">🔢 카운터</h3>
      <p className="text-4xl font-bold text-center text-blue-600 mb-4">{count}</p>
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-xl transition"
        >
          −
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition"
        >
          초기화
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold text-xl transition"
        >
          +
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-3 text-center font-mono">
        const [count, setCount] = useState(0)
      </p>
    </div>
  );
}


// ─────────────────────────────────────────
// 예제 2: 텍스트 입력 (input 상태 관리)
// ─────────────────────────────────────────

function NameInput() {
  const [name, setName] = useState<string>("");

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-semibold mb-3">✍️ 이름 입력</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력하세요"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 mb-3"
      />
      <p className="text-sm">
        {name
          ? <span>안녕하세요, <strong className="text-blue-600">{name}</strong>님! 👋</span>
          : <span className="text-gray-400">이름을 입력하면 인사해요!</span>
        }
      </p>
    </div>
  );
}


// ─────────────────────────────────────────
// 예제 3: 토글 (boolean 상태)
// ─────────────────────────────────────────

function DarkModeToggle() {
  const [isDark, setIsDark] = useState<boolean>(false);

  return (
    <div className={`rounded-xl shadow-sm p-5 transition-colors ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      <h3 className="font-semibold mb-3">🌙 다크모드 토글</h3>
      <div className="flex items-center gap-3">
        <span className="text-sm">{isDark ? "🌙 다크" : "☀️ 라이트"}</span>
        <button
          onClick={() => setIsDark(!isDark)}  // 현재 값의 반대로 토글
          className={`w-12 h-6 rounded-full transition-colors relative ${isDark ? "bg-blue-500" : "bg-gray-200"}`}
        >
          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${isDark ? "left-7" : "left-1"}`} />
        </button>
      </div>
      <p className="text-xs mt-3 font-mono opacity-60">
        setIsDark(!isDark) — 반대로 토글
      </p>
    </div>
  );
}


// ─────────────────────────────────────────
// 예제 4: 객체 상태 (interface 활용)
// ─────────────────────────────────────────

interface FormData {
  username: string;
  age: number | "";
  agree: boolean;
}

function SimpleForm() {
  const [form, setForm] = useState<FormData>({
    username: "",
    age: "",
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);

  // 객체 상태 업데이트: 스프레드로 나머지 필드 유지
  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <h3 className="font-semibold mb-2 text-green-800">✅ 제출 완료!</h3>
        <pre className="text-sm font-mono text-green-700">{JSON.stringify(form, null, 2)}</pre>
        <button onClick={() => { setForm({ username: "", age: "", agree: false }); setSubmitted(false); }}
          className="mt-3 text-sm text-green-700 underline">다시 입력하기</button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-semibold mb-3">📝 간단한 폼</h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="사용자명"
          value={form.username}
          onChange={(e) => handleChange("username", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="number"
          placeholder="나이"
          value={form.age}
          onChange={(e) => handleChange("age", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={form.agree}
            onChange={(e) => handleChange("agree", e.target.checked)}
            className="w-4 h-4 rounded"
          />
          이용약관에 동의합니다
        </label>
        <button
          onClick={() => setSubmitted(true)}
          disabled={!form.username || !form.age || !form.agree}
          className="w-full py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600 transition"
        >
          제출
        </button>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────
// 페이지
// ─────────────────────────────────────────

export default function UseStatePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">⚛️ React — useState 훅</h1>
        <p className="text-gray-500 text-sm mb-2">
          상태(state)란 시간이 지나면서 변할 수 있는 값입니다. 상태가 바뀌면 화면이 자동으로 다시 렌더링됩니다.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-xs font-mono text-blue-800 mb-6">
          const [상태값, 상태변경함수] = useState(초기값)
        </div>

        <div className="space-y-4">
          <Counter />
          <NameInput />
          <DarkModeToggle />
          <SimpleForm />
        </div>

        <div className="flex gap-3 mt-6">
          <a href="/phase1/typescript/03-generics" className="text-sm text-gray-500 underline">← 이전: 제네릭</a>
          <a href="/phase1/react/02-useEffect" className="text-sm text-blue-600 underline ml-auto">다음: useEffect →</a>
        </div>
      </div>
    </div>
  );
}
