// server/index.ts
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import jwt from "jsonwebtoken";
import authRoutes from "./authRoutes"; // 구글 OAuth 라우트

// ts-node-dev는 보통 프로젝트 루트에서 실행되므로
// server 폴더에 있는 .env를 명시적으로 로드하도록 경로를 지정합니다.
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
const PORT = 8000;

// ---------------------------
// 🔧 미들웨어 설정
// ---------------------------
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // 프론트엔드 주소 (Vite)
    credentials: true, // 쿠키 전달 허용
  })
);

// ---------------------------
// 🔐 인증 미들웨어
// ---------------------------
function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void | Response {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { sub: string; email?: string };

    (req as any).user = decoded; // 요청 객체에 user 정보 추가
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// ---------------------------
// 🔗 라우트 연결
// ---------------------------

// 구글 OAuth, 토큰 갱신 등 인증 관련 라우트
app.use("/v1/auth", authRoutes);

// 예시 보호 라우트 (로그인된 사용자만 접근 가능)
app.get("/v1/me", authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json({
    message: "✅ 인증 성공! 보호된 정보에 접근했습니다.",
    user,
  });
});

// 헬스체크용
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Server is running on http://localhost:8000");
});

// ---------------------------
// 🚀 서버 실행
// ---------------------------
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
