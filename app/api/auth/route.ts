// contact_project/app/api/auth/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { signToken, signRefreshToken } from '@/lib/auth'; // 토큰 발급 함수 가져오기
import { refreshTokens } from '@/lib/store'; // 리프레시 토큰 저장소

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  // 비밀번호를 6406으로 설정하고 검증
  if (password === '6406') {
    const token = signToken({ user: 'authorized' }); // 액세스 토큰 발급
    const refreshToken = signRefreshToken({ user: 'authorized' }); // 리프레시 토큰 발급

    // 리프레시 토큰을 저장소에 저장 (실제 구현에서는 DB에 저장)
    refreshTokens.push(refreshToken);

    return NextResponse.json({ token, refreshToken });
  } else {
    return NextResponse.json({ error: '비밀번호가 틀렸습니다.' }, { status: 401 });
  }
}
