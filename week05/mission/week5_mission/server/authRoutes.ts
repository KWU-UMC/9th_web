// server/authRoutes.ts
import { Router, Request, Response } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import querystring from "querystring";
import { SignOptions } from "jsonwebtoken";

const router = Router();

function ensureEnvPresent(): string | null {
  if (!process.env.GOOGLE_CLIENT_ID) return "GOOGLE_CLIENT_ID is missing";
  if (!process.env.GOOGLE_CALLBACK_URL) return "GOOGLE_CALLBACK_URL is missing";
  if (!process.env.GOOGLE_CLIENT_SECRET) return "GOOGLE_CLIENT_SECRET is missing";
  if (!process.env.JWT_SECRET) return "JWT_SECRET is missing";
  if (!process.env.REFRESH_JWT_SECRET) return "REFRESH_JWT_SECRET is missing";
  return null;
}

// 1) 구글 로그인 시작: GET /v1/auth/google
router.get("/google", (req: Request, res: Response) => {
  const envErr = ensureEnvPresent();
  if (envErr) return res.status(500).send(`Server misconfigured: ${envErr}`);

  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    redirect_uri: process.env.GOOGLE_CALLBACK_URL as string,
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
  };

  const qs = querystring.stringify(options);
   // 👇 추가한 디버그 로그
  console.log(">>> GOOGLE OAUTH REQUEST OPTIONS");
  console.log(options);
  console.log(">>> FINAL REDIRECT URL");
  console.log(`${rootUrl}?${qs}`);

  res.redirect(`${rootUrl}?${qs}`);
  const redirectUrl = `${rootUrl}?${qs}`;
  console.log("[authRoutes] Redirecting to Google OAuth URL:", redirectUrl);
  res.redirect(redirectUrl);
});

// 2) 구글 콜백: GET /v1/auth/google/callback
router.get("/google/callback", async (req: Request, res: Response) => {
  // 디버그용: 콜백이 호출될 때 들어오는 전체 URL과 일부 헤더를 로깅
  console.log("[authRoutes] Callback invoked, originalUrl:", req.originalUrl);
  console.log("[authRoutes] Callback headers (host, referer):", {
    host: req.headers.host,
    referer: req.headers.referer,
  });

  const code = req.query.code as string | undefined;
  if (!code) {
    console.error("[authRoutes] Callback called without code, query:", req.query);
    return res.status(400).json({ message: "No code from Google", query: req.query });
  }

  const envErr = ensureEnvPresent();
  if (envErr) return res.status(500).send(`Server misconfigured: ${envErr}`);

  try {
    // 구글 토큰 교환: application/x-www-form-urlencoded 형식으로 전송
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      querystring.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID as string,
        client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL as string,
        grant_type: "authorization_code",
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { access_token } = tokenRes.data;

    // 구글 사용자 정보 가져오기
    const profileRes = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const googleUser = profileRes.data as {
      id: string;
      email: string;
      name: string;
      picture?: string;
    };

    // 여기선 DB 없이 그냥 유저라고 가정
    const user = {
      id: googleUser.id,
      email: googleUser.email,
      name: googleUser.name,
      avatar: googleUser.picture,
    };

    // 🔁 serviceAccessToken 발급
    const serviceAccessToken = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: (process.env.JWT_EXPIRES_IN as string) || "3600s",
      } as jwt.SignOptions
    );

    // 🔁 serviceRefreshToken 발급
    const serviceRefreshToken = jwt.sign(
      { sub: user.id },
      process.env.REFRESH_JWT_SECRET as string,
      {
        expiresIn: (process.env.REFRESH_JWT_EXPIRES_IN as string) || "7d",
      } as jwt.SignOptions
    );

    // refreshToken을 httpOnly 쿠키로 내려주기
    res.cookie("refreshToken", serviceRefreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // prod에서 https면 true
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 프론트에 accessToken을 넘기기 위해 redirect
    // (프론트에서 localStorage에 저장해 ProtectedRoute 통과하게)
    const FRONT_REDIRECT = "http://localhost:5173/social-login-success";

    return res.redirect(`${FRONT_REDIRECT}?accessToken=${serviceAccessToken}`);
  } catch (err: any) {
    console.error("Google OAuth callback error:", err.response?.data || err.message);
    return res.status(500).json({ message: "Google OAuth failed" });
  }
});

// 3) accessToken 갱신: POST /v1/auth/refresh
router.post("/refresh", async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies || {};
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET as string) as { sub: string };

    const newAccessToken = jwt.sign(
      { sub: decoded.sub },
      process.env.JWT_SECRET as string,
      {
        expiresIn: (process.env.JWT_EXPIRES_IN as string) || "3600s",
      } as SignOptions
    );

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh failed:", err);
    return res.status(401).json({ message: "Invalid refresh token" });
  }
});

export default router;
