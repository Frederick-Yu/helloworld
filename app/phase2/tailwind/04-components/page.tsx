"use client";

/**
 * 💨 Tailwind 학습 4: 실습 — 컴포넌트 라이브러리
 *
 * 학습 목표:
 * - Tailwind로 재사용 가능한 UI 컴포넌트 만들기
 * - TypeScript Props로 variant/size 시스템 구성
 * - 버튼, 뱃지, 카드, 입력, 알림, 모달
 */

import { useState } from "react";

// ─────────────────────────────────────────
// 1. Button 컴포넌트
// ─────────────────────────────────────────

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  ghost: "hover:bg-gray-100 text-gray-700",
  outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-50",
};
const BUTTON_SIZE: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-4 py-2 text-sm rounded-lg",
  lg: "px-6 py-3 text-base rounded-xl",
};

function Button({ variant = "primary", size = "md", children, disabled, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-semibold transition-all ${BUTTON_VARIANT[variant]} ${BUTTON_SIZE[size]} disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────
// 2. Badge 컴포넌트
// ─────────────────────────────────────────

type BadgeColor = "blue" | "green" | "red" | "yellow" | "purple" | "gray";

interface BadgeProps {
  color?: BadgeColor;
  children: React.ReactNode;
  dot?: boolean;
}

const BADGE_COLOR: Record<BadgeColor, string> = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
  yellow: "bg-yellow-100 text-yellow-700",
  purple: "bg-purple-100 text-purple-700",
  gray: "bg-gray-100 text-gray-600",
};
const DOT_COLOR: Record<BadgeColor, string> = {
  blue: "bg-blue-500", green: "bg-green-500", red: "bg-red-500",
  yellow: "bg-yellow-500", purple: "bg-purple-500", gray: "bg-gray-400",
};

function Badge({ color = "blue", children, dot }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${BADGE_COLOR[color]}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${DOT_COLOR[color]}`} />}
      {children}
    </span>
  );
}

// ─────────────────────────────────────────
// 3. Card 컴포넌트
// ─────────────────────────────────────────

interface CardProps {
  title: string;
  description: string;
  badge?: { label: string; color: BadgeColor };
  footer?: React.ReactNode;
  image?: string;
}

function Card({ title, description, badge, footer }: CardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {badge && <Badge color={badge.color}>{badge.label}</Badge>}
        </div>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      {footer && (
        <div className="border-t border-gray-50 px-5 py-3 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// 4. Input 컴포넌트
// ─────────────────────────────────────────

type InputState = "default" | "error" | "success";

interface InputProps {
  label: string;
  placeholder?: string;
  state?: InputState;
  helperText?: string;
  type?: string;
}

const INPUT_STATE: Record<InputState, string> = {
  default: "border-gray-200 focus:ring-blue-300",
  error: "border-red-400 focus:ring-red-300",
  success: "border-green-400 focus:ring-green-300",
};

function Input({ label, placeholder, state = "default", helperText, type = "text" }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${INPUT_STATE[state]}`}
      />
      {helperText && (
        <p className={`text-xs mt-1 ${state === "error" ? "text-red-500" : state === "success" ? "text-green-500" : "text-gray-400"}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// 5. Alert 컴포넌트
// ─────────────────────────────────────────

type AlertType = "info" | "success" | "warning" | "error";

interface AlertProps {
  type?: AlertType;
  title: string;
  message: string;
  onClose?: () => void;
}

const ALERT_STYLES: Record<AlertType, { bg: string; icon: string }> = {
  info: { bg: "bg-blue-50 border-blue-200 text-blue-800", icon: "ℹ️" },
  success: { bg: "bg-green-50 border-green-200 text-green-800", icon: "✅" },
  warning: { bg: "bg-yellow-50 border-yellow-200 text-yellow-800", icon: "⚠️" },
  error: { bg: "bg-red-50 border-red-200 text-red-800", icon: "❌" },
};

function Alert({ type = "info", title, message, onClose }: AlertProps) {
  const style = ALERT_STYLES[type];
  return (
    <div className={`flex items-start gap-3 border rounded-xl p-4 ${style.bg}`}>
      <span className="text-lg shrink-0">{style.icon}</span>
      <div className="flex-1">
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-sm opacity-80 mt-0.5">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="opacity-60 hover:opacity-100 text-lg leading-none">×</button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// 6. Modal 컴포넌트
// ─────────────────────────────────────────

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      {/* 모달 */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// 페이지
// ─────────────────────────────────────────

export default function ComponentsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [alerts, setAlerts] = useState<AlertType[]>(["info", "success", "warning", "error"]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">💨 실습 — 컴포넌트 라이브러리</h1>
        <p className="text-gray-500 text-sm mb-6">Tailwind + TypeScript로 만든 재사용 가능한 UI 컴포넌트들</p>

        {/* 버튼 */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-4">Button</h2>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </section>

        {/* 뱃지 */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-4">Badge</h2>
          <div className="flex flex-wrap gap-2">
            {(["blue", "green", "red", "yellow", "purple", "gray"] as BadgeColor[]).map((c) => (
              <Badge key={c} color={c} dot>{c}</Badge>
            ))}
          </div>
        </section>

        {/* 카드 */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-4">Card</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card
              title="Next.js App Router"
              description="서버 컴포넌트, 파일 기반 라우팅, Server Actions를 배웁니다."
              badge={{ label: "Phase 3", color: "blue" }}
              footer={<Button size="sm">자세히 보기</Button>}
            />
            <Card
              title="Supabase 연동"
              description="PostgreSQL + Auth + Realtime을 Next.js와 연동합니다."
              badge={{ label: "Phase 4", color: "green" }}
              footer={<Button size="sm" variant="secondary">자세히 보기</Button>}
            />
          </div>
        </section>

        {/* 입력 */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-4">Input</h2>
          <div className="space-y-3">
            <Input label="이메일" placeholder="hello@example.com" type="email" />
            <Input label="비밀번호 (에러)" placeholder="••••••••" state="error" helperText="비밀번호가 올바르지 않습니다." type="password" />
            <Input label="사용자명 (성공)" placeholder="my-username" state="success" helperText="사용 가능한 아이디입니다! ✓" />
          </div>
        </section>

        {/* 알림 */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-4">Alert</h2>
          <div className="space-y-2">
            {alerts.map((type) => (
              <Alert
                key={type}
                type={type}
                title={type.charAt(0).toUpperCase() + type.slice(1)}
                message={`${type} 상태의 알림 메시지입니다.`}
                onClose={() => setAlerts((prev) => prev.filter((t) => t !== type))}
              />
            ))}
            {alerts.length === 0 && (
              <div className="text-center py-4">
                <p className="text-gray-400 text-sm">모든 알림을 닫았습니다!</p>
                <button onClick={() => setAlerts(["info", "success", "warning", "error"])}
                  className="mt-2 text-blue-500 underline text-sm">다시 보기</button>
              </div>
            )}
          </div>
        </section>

        {/* 모달 */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-4">Modal</h2>
          <Button onClick={() => setModalOpen(true)}>모달 열기</Button>
        </section>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="🎉 모달 완성!">
          <p className="text-gray-600 text-sm mb-4">
            이 모달은 Tailwind CSS만으로 만들어졌습니다. 외부 라이브러리 없이도 충분히 예쁜 UI를 만들 수 있어요!
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>취소</Button>
            <Button onClick={() => setModalOpen(false)}>확인</Button>
          </div>
        </Modal>

        <div className="flex gap-3 mt-4">
          <a href="/phase2/tailwind/03-responsive" className="text-sm text-gray-500 underline">← 이전: 반응형</a>
          <a href="/phase3" className="text-sm text-violet-600 underline ml-auto">Phase 3: Next.js →</a>
        </div>
      </div>
    </div>
  );
}
