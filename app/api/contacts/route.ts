import { NextRequest, NextResponse } from 'next/server';
import { fetchContactsByDepartment } from './contactService';

export async function GET(req) {
  try {
    // 부서별 연락처 데이터를 가져오는 로직 (가정)
    const contacts = await fetchContactsByDepartment();
    return NextResponse.json(contacts);
  } catch (error) {
    // 오류 처리
    return NextResponse.json({ error: '연락처 데이터를 가져오는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
