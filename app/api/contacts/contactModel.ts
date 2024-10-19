// app/api/contacts/contactModel.ts
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
});

export async function getContactsByDepartment() {
  const query = `
    SELECT * FROM dash_app.contact_directory
    ORDER BY CASE 
      WHEN department = '대표' THEN 1
      WHEN department = '경영지원팀' THEN 2
      WHEN department = '생산관리팀' THEN 3
      WHEN department = '품질관리팀' THEN 4
      WHEN department = '설비/기술팀' THEN 5
      WHEN department = '조장' THEN 6
      WHEN department = '공정' THEN 7
      WHEN department = '통근버스' THEN 8
      WHEN department = '기타' THEN 9
      ELSE 10
    END;
  `;
  const { rows } = await pool.query(query);
  return rows;
}
