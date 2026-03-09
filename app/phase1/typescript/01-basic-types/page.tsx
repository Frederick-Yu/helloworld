/**
 * 📘 TypeScript 학습 1: 기본 타입
 *
 * 학습 목표:
 * - string, number, boolean, array, object 타입 선언
 * - 타입을 명시하는 것과 추론의 차이 이해
 */

// ─────────────────────────────────────────
// 1. 원시 타입 (Primitive Types)
// ─────────────────────────────────────────

const name: string = "홍길동";
const age: number = 25;
const isStudent: boolean = true;

// 타입 추론 - 타입을 명시하지 않아도 TypeScript가 자동으로 추론합니다
const city = "서울"; // TypeScript가 string으로 추론
const score = 98.5; // TypeScript가 number로 추론


// ─────────────────────────────────────────
// 2. 배열 타입 (Array Types)
// ─────────────────────────────────────────

const fruits: string[] = ["사과", "바나나", "오렌지"];
const scores: number[] = [100, 95, 88, 72];

// 제네릭 방식 (두 방식 모두 동일)
const colors: Array<string> = ["red", "green", "blue"];


// ─────────────────────────────────────────
// 3. 객체 타입 (Object Types)
// ─────────────────────────────────────────

// 인라인 타입 선언
const user: { name: string; age: number; isActive: boolean } = {
  name: "김철수",
  age: 30,
  isActive: true,
};

// ─────────────────────────────────────────
// 4. 유니온 타입 (Union Types) - 여러 타입 중 하나
// ─────────────────────────────────────────

let id: string | number = "abc-123"; // string도 OK
id = 42; // number도 OK

// ─────────────────────────────────────────
// 5. 옵셔널 (Optional) - 있을 수도 없을 수도 있는 값
// ─────────────────────────────────────────

const nickname: string | undefined = undefined; // 아직 설정 안 됨
const phone: string | null = null; // 의도적으로 없음

// ─────────────────────────────────────────
// 화면에 보여줄 컴포넌트
// ─────────────────────────────────────────

export default function BasicTypesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">📘 TypeScript 기본 타입</h1>
        <p className="text-gray-500 text-sm mb-6">
          콘솔(F12) 또는 코드 에디터에서 타입 힌트를 확인해보세요.
        </p>

        <section className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">1. 원시 타입</h2>
          <ul className="space-y-2 text-sm font-mono">
            <li><span className="text-blue-600">string</span> name = <span className="text-green-600">"{name}"</span></li>
            <li><span className="text-blue-600">number</span> age = <span className="text-orange-600">{age}</span></li>
            <li><span className="text-blue-600">boolean</span> isStudent = <span className="text-purple-600">{String(isStudent)}</span></li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">2. 배열 타입</h2>
          <ul className="space-y-2 text-sm font-mono">
            <li><span className="text-blue-600">string[]</span> fruits = [{fruits.join(", ")}]</li>
            <li><span className="text-blue-600">number[]</span> scores = [{scores.join(", ")}]</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">3. 객체 타입</h2>
          <pre className="text-sm font-mono bg-gray-50 rounded p-3">
{`const user: { name: string; age: number; isActive: boolean } = ${JSON.stringify(user, null, 2)}`}
          </pre>
        </section>

        <section className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">4. 유니온 & 옵셔널</h2>
          <ul className="space-y-2 text-sm font-mono">
            <li><span className="text-blue-600">string | number</span> id = <span className="text-orange-600">{id}</span></li>
            <li><span className="text-blue-600">string | undefined</span> nickname = <span className="text-gray-400">{String(nickname)}</span></li>
            <li><span className="text-blue-600">string | null</span> phone = <span className="text-gray-400">{String(phone)}</span></li>
          </ul>
        </section>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
          💡 <strong>다음 단계:</strong> <a href="/phase1/typescript/02-interface" className="underline">/phase1/typescript/02-interface</a> 에서 인터페이스를 배워보세요!
        </div>
      </div>
    </div>
  );
}
