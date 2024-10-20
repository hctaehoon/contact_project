import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, signToken, verifyRefreshToken } from '@/lib/auth';
import { refreshTokens } from '@/lib/store';
import { fetchContactsByDepartment } from './contactService';

interface JWTError extends Error {
  name: string;
  message: string;
  expiredAt?: Date;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: '토큰이 없습니다.' }, { status: 401 });
  }

  try {
    verifyAccessToken(token);
    const contacts = await fetchContactsByDepartment();
    return NextResponse.json(contacts);
  } catch (error: JWTError) {
    if (error.name === 'TokenExpiredError') {
      const refreshToken = req.cookies.get('refreshToken')?.value;

      if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return NextResponse.json({ error: '리프레시 토큰이 유효하지 않습니다.' }, { status: 403 });
      }

      try {
        verifyRefreshToken(refreshToken);
        const newAccessToken = signToken({ user: 'authorized' });
        return NextResponse.json({ token: newAccessToken });
      } catch (refreshError) {
        return NextResponse.json({ error: '리프레시 토큰 검증 실패' }, { status: 403 });
      }
    }
    return NextResponse.json({ error: '토큰이 유효하지 않습니다.' }, { status: 403 });
  }
}
