/**
 * 📘 TypeScript 학습 2: 인터페이스 & 타입 Alias
 *
 * 학습 목표:
 * - interface로 객체 형태 정의
 * - type alias와의 차이 이해
 * - 인터페이스 확장 (extends)
 * - 함수 타입 정의
 */

// ─────────────────────────────────────────
// 1. interface — 객체의 "설계도"
// ─────────────────────────────────────────

interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // ? = 있어도 되고 없어도 됨 (optional)
}

const user1: User = { id: 1, name: "Alice", email: "alice@example.com" };
const user2: User = { id: 2, name: "Bob", email: "bob@example.com", age: 28 };


// ─────────────────────────────────────────
// 2. interface 확장 (extends)
// ─────────────────────────────────────────

interface Admin extends User {
  role: "superadmin" | "editor"; // 리터럴 유니온 타입
  createdAt: string;
}

const admin: Admin = {
  id: 99,
  name: "관리자",
  email: "admin@example.com",
  role: "superadmin",
  createdAt: "2024-01-01",
};


// ─────────────────────────────────────────
// 3. type alias — interface와 비슷하지만 더 유연
// ─────────────────────────────────────────

type Point = {
  x: number;
  y: number;
};

// type은 유니온, 인터섹션에 더 강력
type Status = "loading" | "success" | "error";
type ID = string | number;

// 인터섹션: 두 타입을 합침
type TimestampedPoint = Point & { createdAt: string };


// ─────────────────────────────────────────
// 4. 함수 타입 정의
// ─────────────────────────────────────────

// 매개변수와 반환 타입 명시
function greet(user: User): string {
  return `안녕하세요, ${user.name}님!`;
}

// 화살표 함수
const add = (a: number, b: number): number => a + b;

// 반환값이 없을 때 void
const logStatus = (status: Status): void => {
  console.log("현재 상태:", status);
};


// ─────────────────────────────────────────
// 5. 인터페이스로 컴포넌트 Props 타입 정의
// ─────────────────────────────────────────

interface UserCardProps {
  user: User;
  isHighlighted?: boolean;
}

function UserCard({ user, isHighlighted = false }: UserCardProps) {
  return (
    <div className={`p-4 rounded-lg border ${isHighlighted ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white"}`}>
      <p className="font-semibold">{user.name}</p>
      <p className="text-sm text-gray-500">{user.email}</p>
      {user.age && <p className="text-xs text-gray-400">나이: {user.age}</p>}
    </div>
  );
}

interface AdminBadgeProps {
  role: Admin["role"]; // 인터페이스의 특정 필드 타입만 가져오기
}

function AdminBadge({ role }: AdminBadgeProps) {
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${role === "superadmin" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
      {role}
    </span>
  );
}


// ─────────────────────────────────────────
// 페이지 컴포넌트
// ─────────────────────────────────────────

export default function InterfacePage() {
  const users: User[] = [user1, user2];
  const greeting = greet(user1);
  const sum = add(10, 32);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">📘 인터페이스 & 타입 Alias</h1>
        <p className="text-gray-500 text-sm mb-6">
          인터페이스는 객체의 "설계도"입니다. 컴포넌트 Props 타입도 이렇게 정의해요.
        </p>

        {/* 유저 목록 */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">User 인터페이스로 만든 카드</h2>
          <div className="space-y-3">
            {users.map((u) => (
              <UserCard key={u.id} user={u} isHighlighted={u.id === 1} />
            ))}
          </div>
        </section>

        {/* Admin */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">Admin (extends User)</h2>
          <div className="flex items-center gap-3">
            <UserCard user={admin} />
            <AdminBadge role={admin.role} />
          </div>
        </section>

        {/* 함수 타입 */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">함수 타입</h2>
          <ul className="space-y-2 text-sm font-mono">
            <li>greet(user1) → <span className="text-green-600">"{greeting}"</span></li>
            <li>add(10, 32) → <span className="text-orange-600">{sum}</span></li>
          </ul>
        </section>

        <div className="flex gap-3">
          <a href="/phase1/typescript/01-basic-types" className="text-sm text-gray-500 underline">← 이전: 기본 타입</a>
          <a href="/phase1/typescript/03-generics" className="text-sm text-blue-600 underline ml-auto">다음: 제네릭 →</a>
        </div>
      </div>
    </div>
  );
}
