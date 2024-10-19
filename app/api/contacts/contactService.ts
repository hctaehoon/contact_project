// app/api/contacts/contactService.ts
import { getContactsByDepartment } from './contactModel';

export async function fetchContactsByDepartment() {
  try {
    const contacts = await getContactsByDepartment();
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts by department:', error);
    throw new Error('Failed to fetch contacts by department.');
  }
}
