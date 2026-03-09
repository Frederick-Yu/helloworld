/**
 * 📘 TypeScript 학습 3: 제네릭 (Generics)
 *
 * 학습 목표:
 * - 제네릭의 개념: "타입을 매개변수로 받는다"
 * - Array<T>, Promise<T> 같은 내장 제네릭 이해
 * - 직접 제네릭 함수/인터페이스 만들기
 */

// ─────────────────────────────────────────
// 왜 제네릭이 필요한가?
// ─────────────────────────────────────────

// ❌ 타입별로 함수를 따로 만들어야 한다면?
function getFirstString(arr: string[]): string { return arr[0]; }
function getFirstNumber(arr: number[]): number { return arr[0]; }

// ✅ 제네릭으로 하나로 통합!
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const firstFruit = getFirst(["사과", "바나나", "오렌지"]); // T = string 자동 추론
const firstScore = getFirst([100, 95, 88]);                // T = number 자동 추론


// ─────────────────────────────────────────
// 2. API 응답 래퍼 — 실무에서 가장 자주 쓰이는 패턴
// ─────────────────────────────────────────

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

// 제네릭 덕분에 어떤 data 타입이든 래핑 가능
const userResponse: ApiResponse<{ id: number; name: string }> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  message: "success",
};

const productListResponse: ApiResponse<Product[]> = {
  data: [
    { id: 1, name: "노트북", price: 1500000 },
    { id: 2, name: "마우스", price: 35000 },
  ],
  status: 200,
  message: "success",
};


// ─────────────────────────────────────────
// 3. 제네릭 제약 (extends) — 특정 타입 이상만 허용
// ─────────────────────────────────────────

// T가 반드시 id를 가진 객체여야 함
function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

const foundProduct = findById(productListResponse.data, 2);
// 결과: { id: 2, name: "마우스", price: 35000 }


// ─────────────────────────────────────────
// 4. 내장 유틸리티 타입 (제네릭 기반)
// ─────────────────────────────────────────

interface FullUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Partial<T> — 모든 필드를 optional로
type PartialUser = Partial<FullUser>;
// → { id?: number; name?: string; email?: string; password?: string }

// Pick<T, K> — 특정 필드만 선택
type PublicUser = Pick<FullUser, "id" | "name" | "email">;
// → { id: number; name: string; email: string }

// Omit<T, K> — 특정 필드를 제외
type SafeUser = Omit<FullUser, "password">;
// → { id: number; name: string; email: string }

// 업데이트 요청 시 자주 쓰이는 패턴
type UpdateUserInput = Partial<Omit<FullUser, "id">>;


// ─────────────────────────────────────────
// 컴포넌트
// ─────────────────────────────────────────

interface GenericListProps<T extends { id: number }> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  title: string;
}

function GenericList<T extends { id: number }>({ items, renderItem, title }: GenericListProps<T>) {
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>
  );
}


export default function GenericsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">📘 제네릭 (Generics)</h1>
        <p className="text-gray-500 text-sm mb-6">
          제네릭 = "타입을 변수처럼" 다루는 것. 하나의 함수/컴포넌트를 여러 타입에 재사용!
        </p>

        <section className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">getFirst&lt;T&gt; 제네릭 함수</h2>
          <ul className="text-sm font-mono space-y-1">
            <li>getFirst(["사과","바나나","오렌지"]) → <span className="text-green-600">"{firstFruit}"</span></li>
            <li>getFirst([100, 95, 88]) → <span className="text-orange-600">{firstScore}</span></li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">ApiResponse&lt;T&gt; 패턴</h2>
          <div className="text-sm font-mono bg-gray-50 rounded p-3">
            <p className="text-gray-400 mb-1">// ApiResponse&lt;Product[]&gt;</p>
            <p>status: <span className="text-orange-600">{productListResponse.status}</span></p>
            <p>data: {productListResponse.data.map(p => p.name).join(", ")}</p>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">findById&lt;T extends &#123; id &#125;&gt;</h2>
          {foundProduct ? (
            <p className="text-sm font-mono">
              찾은 상품: <span className="text-green-600">{foundProduct.name}</span> ({foundProduct.price.toLocaleString()}원)
            </p>
          ) : (
            <p className="text-sm text-red-500">상품을 찾을 수 없습니다.</p>
          )}
        </section>

        <section className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">제네릭 컴포넌트 GenericList</h2>
          <GenericList
            title="🛍 상품 목록"
            items={productListResponse.data}
            renderItem={(p) => (
              <span className="text-sm flex justify-between bg-gray-50 px-3 py-2 rounded">
                <span>{p.name}</span>
                <span className="text-blue-600 font-semibold">{p.price.toLocaleString()}원</span>
              </span>
            )}
          />
        </section>

        <section className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <h2 className="font-semibold text-lg mb-3">유틸리티 타입</h2>
          <ul className="text-sm space-y-1">
            <li><code className="bg-gray-100 px-1 rounded">Partial&lt;T&gt;</code> — 모든 필드 optional</li>
            <li><code className="bg-gray-100 px-1 rounded">Pick&lt;T, K&gt;</code> — 특정 필드만 선택</li>
            <li><code className="bg-gray-100 px-1 rounded">Omit&lt;T, K&gt;</code> — 특정 필드 제거</li>
          </ul>
        </section>

        <div className="flex gap-3">
          <a href="/phase1/typescript/02-interface" className="text-sm text-gray-500 underline">← 이전: 인터페이스</a>
          <a href="/phase1/react/01-useState" className="text-sm text-blue-600 underline ml-auto">다음: React useState →</a>
        </div>
      </div>
    </div>
  );
}
