// 변경 전에는 JWT 토큰을 검증하는 로직이 있었음


import { NextRequest, NextResponse } from 'next/server';
import { fetchContactsByDepartment } from './contactService';

export async function GET(req: NextRequest) {
  try {
    const contacts = await fetchContactsByDepartment();
    return NextResponse.json(contacts);
  } catch {
    return NextResponse.json({ error: '연락처 데이터를 가져오는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}  


  try {
    verifyAccessToken(token);
    const contacts = await fetchContactsByDepartment();
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: '토큰이 유효하지 않습니다.' }, { status: 403 });
  }
}
