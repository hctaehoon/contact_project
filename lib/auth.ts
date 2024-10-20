// lib/auth.ts
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';  // 환경 변수를 사용

// JWT 토큰 발급
export function signToken(payload: object) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // 유효기간 1시간
}

// JWT 토큰 검증 및 에러 처리
export function verifyToken(token: string) {
  try {
    // 토큰이 유효한 경우 디코딩된 정보를 반환
    return jwt.verify(token, SECRET_KEY);
  } catch (error: any) {
    // 에러가 토큰 만료로 인한 것인지 확인
    if (error.name === 'TokenExpiredError') {
      console.error("Token has expired:", error);
      return { error: 'TokenExpired', message: '토큰이 만료되었습니다.' };
    }
    // 기타 에러 (토큰이 유효하지 않음 등)
    console.error("Invalid token:", error);
    return { error: 'InvalidToken', message: '유효하지 않은 토큰입니다.' };
  }
}
