"use client";

/**
 * 💨 Tailwind 학습 3: 반응형 & 다크모드
 *
 * 학습 목표:
 * - sm: md: lg: xl: 브레이크포인트 프리픽스
 * - 모바일 퍼스트 전략
 * - dark: 프리픽스로 다크모드 처리
 * - 브레이크포인트 시각화
 */

import { useState } from "react";

// Tailwind 브레이크포인트 표
// sm:  640px+
// md:  768px+
// lg:  1024px+
// xl:  1280px+
// 2xl: 1536px+
// 모바일 퍼스트 = 기본 스타일이 모바일, 큰 화면에 추가 스타일

function BreakpointInfo() {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="font-bold text-lg mb-4">📱 브레이크포인트</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 text-gray-500 font-medium">프리픽스</th>
              <th className="text-left py-2 text-gray-500 font-medium">최소 너비</th>
              <th className="text-left py-2 text-gray-500 font-medium">CSS</th>
            </tr>
          </thead>
          <tbody className="font-mono text-xs">
            {[
              { prefix: "(없음)", width: "0px+", css: "기본 스타일 (모바일)" },
              { prefix: "sm:", width: "640px+", css: "@media (min-width: 640px)" },
              { prefix: "md:", width: "768px+", css: "@media (min-width: 768px)" },
              { prefix: "lg:", width: "1024px+", css: "@media (min-width: 1024px)" },
              { prefix: "xl:", width: "1280px+", css: "@media (min-width: 1280px)" },
            ].map((row) => (
              <tr key={row.prefix} className="border-b border-gray-50">
                <td className="py-2 text-teal-600 font-semibold">{row.prefix}</td>
                <td className="py-2 text-gray-600">{row.width}</td>
                <td className="py-2 text-gray-400">{row.css}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ResponsiveTextDemo() {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="font-bold text-lg mb-2">📝 반응형 텍스트 & 레이아웃</h2>
      <p className="text-xs text-gray-400 mb-4">창 크기를 줄여서 변화를 확인해보세요!</p>

      {/* 반응형 텍스트 크기 */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <p className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold text-teal-700">
          반응형 텍스트 크기
        </p>
        <p className="text-xs text-gray-400 font-mono mt-1">
          text-sm sm:text-lg md:text-2xl lg:text-3xl
        </p>
      </div>

      {/* 반응형 레이아웃 전환 */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <p className="text-xs text-gray-500 font-mono mb-2">flex-col md:flex-row (모바일: 세로 / 데스크탑: 가로)</p>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="bg-teal-400 text-white text-xs font-bold px-4 py-3 rounded-lg">섹션 A</div>
          <div className="bg-teal-500 text-white text-xs font-bold px-4 py-3 rounded-lg">섹션 B</div>
          <div className="bg-teal-600 text-white text-xs font-bold px-4 py-3 rounded-lg">섹션 C</div>
        </div>
      </div>

      {/* 반응형 그리드 */}
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-xs text-gray-500 font-mono mb-2">grid-cols-1 sm:grid-cols-2 lg:grid-cols-4</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {["🍎", "🍊", "🍋", "🍇"].map((emoji, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-3 text-center text-xl">{emoji}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HiddenShowDemo() {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="font-bold text-lg mb-2">👁 반응형 표시/숨김</h2>
      <p className="text-xs text-gray-400 mb-4">창 크기를 조절하면 표시되는 요소가 달라집니다</p>
      <div className="space-y-2">
        <div className="block sm:hidden bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-lg">
          📱 모바일에서만 보임 (block sm:hidden)
        </div>
        <div className="hidden sm:block md:hidden bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-lg">
          💻 sm~md 사이에서만 보임 (hidden sm:block md:hidden)
        </div>
        <div className="hidden md:block bg-violet-100 text-violet-700 text-sm font-semibold px-4 py-2 rounded-lg">
          🖥 md 이상에서만 보임 (hidden md:block)
        </div>
        <div className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-lg">
          ✅ 항상 보임 (클래스 없음)
        </div>
      </div>
    </section>
  );
}

function DarkModeDemo() {
  const [isDark, setIsDark] = useState(false);

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="font-bold text-lg mb-2">🌙 다크모드 시뮬레이션</h2>
      <p className="text-xs text-gray-400 mb-4">
        실제 Tailwind 다크모드는 <code className="bg-gray-100 px-1 rounded">dark:</code> 프리픽스를 사용합니다.
        여기서는 클래스 토글로 시뮬레이션합니다.
      </p>

      <button
        onClick={() => setIsDark(!isDark)}
        className="mb-4 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition"
      >
        {isDark ? "☀️ 라이트 모드" : "🌙 다크 모드"} 전환
      </button>

      {/* 다크모드 카드 시뮬레이션 */}
      <div className={`rounded-2xl p-5 transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className={`rounded-xl p-4 mb-3 transition-colors ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
          <h3 className={`font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>카드 제목</h3>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            다크모드에서는 배경이 어둡고 텍스트가 밝아집니다.
          </p>
        </div>
        <div className="flex gap-2">
          <button className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${isDark ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>
            확인
          </button>
          <button className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${isDark ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}>
            취소
          </button>
        </div>
        <p className={`text-xs font-mono mt-3 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          실제 코드: dark:bg-gray-900 dark:text-white
        </p>
      </div>
    </section>
  );
}

export default function ResponsivePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">💨 Tailwind CSS — 반응형 & 다크모드</h1>
        <p className="text-gray-500 text-sm mb-6">
          모바일 퍼스트: 기본 스타일 = 모바일, 그 위에 sm: md: lg: 로 큰 화면을 덮어씁니다.
        </p>

        <BreakpointInfo />
        <ResponsiveTextDemo />
        <HiddenShowDemo />
        <DarkModeDemo />

        <div className="flex gap-3 mt-2">
          <a href="/phase2/tailwind/02-layout" className="text-sm text-gray-500 underline">← 이전: 레이아웃</a>
          <a href="/phase2/tailwind/04-components" className="text-sm text-teal-600 underline ml-auto">다음: 컴포넌트 라이브러리 →</a>
        </div>
      </div>
    </div>
  );
}
