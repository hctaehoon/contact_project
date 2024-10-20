// app/api/contacts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth'; // verifyAccessToken을 가져옵니다.
import { fetchContactsByDepartment } from './contactService';  // 부서별 데이터 가져오기

export async function GET(req: NextRequest) {
  // 요청에서 Authorization 헤더를 가져옴
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];  // 'Bearer token'에서 토큰만 추출

  if (!token) {
    return NextResponse.json({ error: '토큰이 없습니다.' }, { status: 401 });
  }

  try {
    // 액세스 토큰 검증
    verifyAccessToken(token);  // verifyAccessToken으로 검증

    // 부서별 연락처 데이터 가져오기
    const contacts = await fetchContactsByDepartment();
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: '토큰이 유효하지 않습니다.' }, { status: 403 });
  }
}
