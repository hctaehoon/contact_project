// contact_project/app/api/auth/refresh/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, signToken } from '@/lib/auth'; // 토큰 검증 및 발급 함수 가져오기
import { refreshTokens } from '@/lib/store'; // 리프레시 토큰 저장소

export async function POST(req: NextRequest) {
  const { token: refreshToken } = await req.json();

  // 리프레시 토큰이 저장소에 있는지 확인
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return NextResponse.json({ error: '리프레시 토큰이 유효하지 않습니다.' }, { status: 403 });
  }

  try {
    // 리프레시 토큰 검증
    verifyToken(refreshToken, 'refresh');

    // 새로운 액세스 토큰 발급
    const newAccessToken = signToken({ user: 'authorized' });

    return NextResponse.json({ token: newAccessToken });
  } catch (error) {
    return NextResponse.json({ error: '토큰 갱신에 실패했습니다.' }, { status: 403 });
  }
}
