"use client";

/**
 * ⚛️ React 학습 3: 종합 실습 — TypeScript Todo 앱
 *
 * 이 파일에서 배우는 것:
 * - interface로 데이터 타입 정의
 * - useState로 목록 상태 관리
 * - useEffect로 로컬 스토리지에 저장/불러오기
 * - props와 타입 정의
 * - 이벤트 핸들링 (input, button, form)
 * - 조건부 렌더링
 * - 리스트 렌더링 (key)
 * - 필터링 기능
 */

import { useState, useEffect } from "react";

// ─────────────────────────────────────────
// 타입 정의
// ─────────────────────────────────────────

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  priority: "high" | "medium" | "low";
}

type FilterType = "all" | "active" | "completed";


// ─────────────────────────────────────────
// 하위 컴포넌트: TodoItem
// ─────────────────────────────────────────

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const PRIORITY_STYLES: Record<Todo["priority"], string> = {
  high: "bg-red-100 text-red-600",
  medium: "bg-yellow-100 text-yellow-600",
  low: "bg-gray-100 text-gray-500",
};

const PRIORITY_LABELS: Record<Todo["priority"], string> = {
  high: "높음",
  medium: "보통",
  low: "낮음",
};

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${todo.completed ? "bg-gray-50 border-gray-100" : "bg-white border-gray-200"}`}>
      {/* 체크박스 */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${todo.completed ? "bg-green-500 border-green-500 text-white" : "border-gray-300 hover:border-green-400"}`}
      >
        {todo.completed && <span className="text-xs">✓</span>}
      </button>

      {/* 내용 */}
      <span className={`flex-1 text-sm ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
        {todo.text}
      </span>

      {/* 우선순위 배지 */}
      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${PRIORITY_STYLES[todo.priority]}`}>
        {PRIORITY_LABELS[todo.priority]}
      </span>

      {/* 삭제 */}
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
      >
        ×
      </button>
    </li>
  );
}


// ─────────────────────────────────────────
// 메인 컴포넌트
// ─────────────────────────────────────────

const INITIAL_TODOS: Todo[] = [
  { id: 1, text: "TypeScript 기본 타입 배우기", completed: true, createdAt: new Date().toISOString(), priority: "high" },
  { id: 2, text: "React useState 이해하기", completed: true, createdAt: new Date().toISOString(), priority: "high" },
  { id: 3, text: "useEffect 사이드 이펙트 실습", completed: false, createdAt: new Date().toISOString(), priority: "medium" },
  { id: 4, text: "Tailwind CSS로 스타일링", completed: false, createdAt: new Date().toISOString(), priority: "medium" },
  { id: 5, text: "Next.js App Router 배우기", completed: false, createdAt: new Date().toISOString(), priority: "low" },
];

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);
  const [input, setInput] = useState<string>("");
  const [priority, setPriority] = useState<Todo["priority"]>("medium");
  const [filter, setFilter] = useState<FilterType>("all");

  // 필터링된 목록
  const filtered: Todo[] = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.length - completedCount;

  // 추가
  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
      createdAt: new Date().toISOString(),
      priority,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setInput("");
  };

  // 토글
  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // 삭제
  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // 완료된 항목 전체 삭제
  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-lg mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">📝 학습 Todo</h1>
          <p className="text-gray-500 text-sm mt-1">Phase 1 실습 — TypeScript + React</p>
          <div className="flex justify-center gap-4 mt-3 text-sm">
            <span className="text-blue-600 font-semibold">{activeCount}개 남음</span>
            <span className="text-gray-400">|</span>
            <span className="text-green-600 font-semibold">{completedCount}개 완료</span>
          </div>
        </div>

        {/* 입력창 */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="할 일을 입력하세요 (Enter로 추가)"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition"
            >
              추가
            </button>
          </div>

          {/* 우선순위 선택 */}
          <div className="flex gap-2">
            {(["high", "medium", "low"] as Todo["priority"][]).map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`flex-1 text-xs py-1 rounded-lg font-semibold transition ${priority === p ? PRIORITY_STYLES[p] + " ring-2 ring-offset-1 ring-current" : "bg-gray-50 text-gray-400"}`}
              >
                {PRIORITY_LABELS[p]}
              </button>
            ))}
          </div>
        </div>

        {/* 필터 탭 */}
        <div className="flex bg-white rounded-xl shadow-sm p-1 mb-4">
          {(["all", "active", "completed"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-1.5 text-sm font-semibold rounded-lg transition ${filter === f ? "bg-blue-500 text-white" : "text-gray-400 hover:text-gray-600"}`}
            >
              {f === "all" ? "전체" : f === "active" ? "진행중" : "완료"}
            </button>
          ))}
        </div>

        {/* 목록 */}
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm">
            {filter === "completed" ? "완료된 항목이 없어요!" : "할 일을 추가해보세요 🎉"}
          </div>
        ) : (
          <ul className="space-y-2 mb-4">
            {filtered.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
            ))}
          </ul>
        )}

        {/* 하단 액션 */}
        {completedCount > 0 && (
          <button
            onClick={clearCompleted}
            className="w-full py-2 text-sm text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
          >
            완료된 항목 {completedCount}개 삭제
          </button>
        )}

        {/* 내비게이션 */}
        <div className="flex gap-3 mt-6">
          <a href="/phase1/react/02-useEffect" className="text-sm text-gray-500 underline">← 이전: useEffect</a>
          <a href="/phase1" className="text-sm text-blue-600 underline ml-auto">Phase 1 홈 →</a>
        </div>
      </div>
    </div>
  );
}
