'use client';

import { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, InputBase } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

const departments = [
  '대표',
  '경영지원팀',
  '생산관리팀',
  '품질관리팀',
  '설비/기술팀',
  '조장',
  '공정',
  '통근버스',
  '기타',
];

// vCard 파일을 생성하고 다운로드하는 함수
const generateVCard = (contact: Contact) => {
  const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL:${contact.phone_number}
TEL;TYPE=WORK,VOICE:${contact.internal_number}
END:VCARD
  `;

  const blob = new Blob([vCardData], { type: 'text/vcard' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${contact.name}.vcf`;  // 파일 이름 설정
  a.click();
  window.URL.revokeObjectURL(url);
};

interface Contact {
  name: string;
  phone_number: string;
  internal_number: string;
  department: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch('/api/contacts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const handleDepartmentClick = (department: string) => {
    setSelectedDepartment(department);
    setSearchTerm('');  // 부서를 클릭하면 검색어를 초기화
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedContact(null);
  };

  const filteredContacts = contacts.filter((contact) => {
    if (searchTerm) {
      // 검색어와 이름을 모두 소문자로 변환하여 비교
      return contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (selectedDepartment) {
      return contact.department === selectedDepartment;
    }
    return false;  // 초기에는 아무것도 표시하지 않음
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f6f8',
        padding: 3,
        position: 'relative',
      }}
    >
      {/* 왼쪽 상단에 고정된 로고 이미지 */}
      <img
        src="/dmtlogo.png"
        alt="DMT 로고"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '80px',
          height: 'auto',
        }}
      />

      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        AS DMT CONTACT
      </Typography>

      {/* 검색창과 부서 목록 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          marginBottom: 4,
        }}
      >
        {/* 부서 목록 */}
        {departments.map((department) => (
          <Button
            key={department}
            variant="contained"
            onClick={() => handleDepartmentClick(department)}
            sx={{ minWidth: '100px', marginBottom: '10px' }}
          >
            {department}
          </Button>
        ))}

        {/* 검색 입력 필드 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '10px 20px',
            width: '300px',
          }}
        >
          <SearchIcon sx={{ marginRight: '10px', color: '#888' }} />
          <InputBase
            placeholder="이름으로 검색"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);  // 검색어 설정
              setSelectedDepartment('');  // 검색어 입력 시 부서 초기화
            }}
            sx={{
              width: '100%',
              fontSize: '16px',
              color: '#333',
            }}
          />
        </Box>
      </Box>

      {/* 선택된 부서의 연락처 또는 검색 결과만 표시 */}
      {filteredContacts.length > 0 && (
        <Grid container spacing={2} justifyContent="center">
          {filteredContacts.map((contact, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                sx={{
                  padding: 2,
                  textAlign: 'center',
                  backgroundColor: '#ffffff',
                  borderRadius: '15px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                  },
                }}
                onClick={() => handleContactClick(contact)}
              >
                <Typography variant="h6">{contact.name}</Typography>
                <Typography>{contact.phone_number}</Typography>
                <Typography>{contact.internal_number}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* 연락처 클릭 시 나오는 다이얼로그 */}
      {selectedContact && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            {selectedContact.name}
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              전화번호: {selectedContact.phone_number}
            </Typography>
            <Typography gutterBottom>
              내선번호: {selectedContact.internal_number}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              취소
            </Button>
            <Button
              onClick={() => {
                window.open(`tel:${selectedContact.phone_number}`);
              }}
              color="primary"
            >
              전화걸기
            </Button>
            <Button
              onClick={() => generateVCard(selectedContact)}
              color="primary"
            >
              전화번호부에 저장
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
