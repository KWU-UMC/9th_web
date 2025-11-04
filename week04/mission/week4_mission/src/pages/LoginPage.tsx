import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { isEmail, minLength } from "../utils/validators";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation() as any;
  const from = loc.state?.from?.pathname || "/";

  const { fields, values, isValid, setValue, setTouched } = useForm({
    initial: { email: "", password: "" },
    validate: {
      email: [isEmail],
      password: [minLength(6)],
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    // TODO: 실제 인증 API 연동
    login("dummy-token");
    nav(from, { replace: true });
  };

  return (
    <div className="min-h-dvh bg-black text-white">
      <header className="sticky top-0 z-10 bg-zinc-900/80 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => nav("/")}
            className="text-pink-500 font-extrabold text-lg"
          >
            듀의 영화 찾기
          </button>
          <div className="flex gap-2">
            <button onClick={() => nav("/login")} className="rounded-md border border-zinc-600 px-3 py-1.5 text-sm">
              로그인
            </button>
            <button onClick={() => nav("/signup")} className="rounded-md bg-pink-500 px-3 py-1.5 text-sm text-white hover:bg-pink-600">
              회원가입
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md px-6">
        {/* 뒤로가기 */}
        <button
          onClick={() => nav(-1)}
          className="mt-14 mb-6 inline-flex items-center gap-2 text-zinc-300 hover:text-white"
          aria-label="이전 페이지로 이동"
        >
          ‹ 뒤로
        </button>

        <h1 className="text-center text-2xl font-semibold mb-6">로그인</h1>

        <button
          type="button"
          onClick={() => {
            // TODO: 구글 OAuth 연동 (성공 시 login(token) 호출)
            alert("구글 로그인은 나중에 연결!");
          }}
          className="w-full border border-zinc-600 rounded-md py-2 mb-6 hover:bg-zinc-800"
        >
          <span className="align-middle">🟢</span> 구글 로그인
        </button>

        <div className="flex items-center gap-3 mb-6 text-zinc-400">
          <div className="h-px flex-1 bg-zinc-700" />
          OR
          <div className="h-px flex-1 bg-zinc-700" />
        </div>

        <form onSubmit={onSubmit} className="grid gap-4">
          {/* 이메일 */}
          <div>
            <input
              type="email"
              placeholder="이메일을 입력해주세요!"
              value={fields.email.value}
              onChange={(e) => setValue("email", e.target.value)}
              onBlur={() => setTouched("email")}
              className="w-full rounded-md border border-zinc-600 bg-transparent px-3 py-2 outline-none focus:border-pink-500"
              aria-invalid={!!fields.email.error}
              aria-describedby="email-error"
            />
            {fields.email.touched && fields.email.error && (
              <p id="email-error" className="mt-1 text-sm text-red-400" aria-live="polite">
                {fields.email.error}
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요!"
              value={fields.password.value}
              onChange={(e) => setValue("password", e.target.value)}
              onBlur={() => setTouched("password")}
              className="w-full rounded-md border border-zinc-600 bg-transparent px-3 py-2 outline-none focus:border-pink-500"
              aria-invalid={!!fields.password.error}
              aria-describedby="pw-error"
            />
            {fields.password.touched && fields.password.error && (
              <p id="pw-error" className="mt-1 text-sm text-red-400" aria-live="polite">
                {fields.password.error}
              </p>
            )}
          </div>

          {/* 로그인 버튼 — 둘 다 통과해야 활성화 */}
          <button
            type="submit"
            disabled={!isValid}
            className={`mt-2 rounded-md px-3 py-2 text-sm font-medium
              ${isValid ? "bg-pink-500 text-white hover:bg-pink-600" : "bg-zinc-700 text-zinc-400 cursor-not-allowed"}`}
          >
            로그인
          </button>
        </form>
      </main>
    </div>
  );
}
