// app/api/auth/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  // 비밀번호를 6406으로 설정하고 검증
  if (password === '6406') {
    const token = signToken({ user: 'authorized' });  // JWT 발급
    return NextResponse.json({ token });
  } else {
    return NextResponse.json({ error: '비밀번호가 틀렸습니다.' }, { status: 401 });
  }
}
