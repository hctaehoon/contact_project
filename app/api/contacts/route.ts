// 변경 전에는 JWT 토큰을 검증하는 로직이 있었음
import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth';

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
  } catch (error) {
    return NextResponse.json({ error: '토큰이 유효하지 않습니다.' }, { status: 403 });
  }
}
