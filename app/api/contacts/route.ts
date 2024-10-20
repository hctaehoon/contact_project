// app/api/contacts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, signToken, verifyRefreshToken } from '@/lib/auth';
import { refreshTokens } from '@/lib/store';
import { fetchContactsByDepartment } from './contactService';

export async function GET(req: NextRequest) {
  // 요청에서 Authorization 헤더를 가져옴
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];  // 'Bearer token'에서 토큰만 추출

  if (!token) {
    return NextResponse.json({ error: '토큰이 없습니다.' }, { status: 401 });
  }

  try {
    // 액세스 토큰 검증
    verifyAccessToken(token);

    // 부서별 연락처 데이터 가져오기
    const contacts = await fetchContactsByDepartment();
    return NextResponse.json(contacts);
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      // 리프레시 토큰을 사용해 새로운 토큰 발급
      const refreshToken = req.cookies.get('refreshToken')?.value;  // 쿠키에서 문자열 값 추출

      if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return NextResponse.json({ error: '리프레시 토큰이 유효하지 않습니다.' }, { status: 403 });
      }

      try {
        verifyRefreshToken(refreshToken); // 리프레시 토큰 검증
        const newAccessToken = signToken({ user: 'authorized' });

        // 새로운 액세스 토큰으로 응답
        return NextResponse.json({ token: newAccessToken });
      } catch {
        return NextResponse.json({ error: '리프레시 토큰 검증 실패' }, { status: 403 });
      }
    }

    return NextResponse.json({ error: '토큰이 유효하지 않습니다.' }, { status: 403 });
  }
}
