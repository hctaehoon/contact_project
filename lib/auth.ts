// lib/auth.ts
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';  // 액세스 토큰 비밀 키
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY || 'default_refresh_secret_key';  // 리프레시 토큰 비밀 키

// 액세스 토큰 발급
export function signToken(payload: object) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

// 리프레시 토큰 발급
export function signRefreshToken(payload: object) {
  return jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '60d' });
}

// 액세스 토큰 검증
export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error("Error during access token verification:", error);
    throw error;
  }
}

// 리프레시 토큰 검증
export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, REFRESH_SECRET_KEY);
  } catch (error) {
    console.error("Error during refresh token verification:", error);
    throw error;
  }
}
