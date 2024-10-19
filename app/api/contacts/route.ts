// app/api/contacts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { fetchContactsByDepartment } from './contactService';  // 부서별 데이터 가져오기

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];

  // JWT 토큰 검증
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: '인증되지 않은 사용자입니다.' }, { status: 401 });
  }

  try {
    const contacts = await fetchContactsByDepartment();  // 부서별로 정렬된 연락처 데이터 가져오기
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}
