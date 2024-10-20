import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY || 'default_refresh_secret_key';

// 액세스 토큰 발급
export function signToken(payload: object) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

// 리프레시 토큰 발급
export function signRefreshToken(payload: object) {
  return jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '60d' });
}

// JWT 토큰 검증
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error("Error auth.ts", error);
    return null;
  }
}
