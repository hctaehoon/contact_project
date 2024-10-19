// app/api/contacts/contactModel.ts
import { contacts } from '@/data/contacts';

export async function getContactsByDepartment() {
  return contacts.sort((a, b) => {
    const order = ['대표', '경영지원팀', '생산관리팀', '품질관리팀', '설비/기술팀', '조장', '공정', '통근버스', '기타'];
    return order.indexOf(a.department) - order.indexOf(b.department);
  });
}
