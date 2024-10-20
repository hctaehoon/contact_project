import { NextResponse } from 'next/server'; // 'NextRequest'는 사용하지 않으므로 제거
import { fetchContactsByDepartment } from './contactService';

export async function GET() {  // 'req'는 사용하지 않으므로 제거
  try {
    const contacts = await fetchContactsByDepartment();
    return NextResponse.json(contacts);
  } catch {
    // 'error' 변수를 사용하지 않으므로 생략
    return NextResponse.json({ error: '연락처 데이터를 가져오는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
