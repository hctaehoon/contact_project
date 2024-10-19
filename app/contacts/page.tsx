'use client';

import { useState, useEffect, useRef } from 'react';
import { Typography, Grid, Paper, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, InputBase } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import jsQR from 'jsqr';

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
// const generateVCard = (contact: Contact) => {
//   const vCardData = `
// BEGIN:VCARD
// VERSION:3.0
// FN:${contact.name}
// TEL:${contact.phone_number}
// TEL;TYPE=WORK,VOICE:${contact.internal_number}
// END:VCARD
//   `;

//   const blob = new Blob([vCardData], { type: 'text/vcard' });
//   const url = window.URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = `${contact.name}.vcf`;  // 파일 이름 설정
//   a.click();
//   window.URL.revokeObjectURL(url);
// };

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
  const [qrCodeOpen, setQrCodeOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const handleQrCodeOpen = () => {
    setQrCodeOpen(true);
  };

  const handleQrCodeClose = () => {
    setQrCodeOpen(false);
  };

  const generateVCardData = (contact: Contact) => {
    return `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL:${contact.phone_number}
TEL;TYPE=WORK,VOICE:${contact.internal_number}
END:VCARD`;
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

  const startScanner = async () => {
    setIsScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        requestAnimationFrame(tick);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setIsScanning(false);
    }
  };

  const tick = () => {
    if (videoRef.current && canvasRef.current) {
      if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        canvasRef.current.height = videoRef.current.videoHeight;
        canvasRef.current.width = videoRef.current.videoWidth;
        const context = canvasRef.current.getContext('2d');
        if (context) {
          context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
          const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          
          if (code) {
            console.log("Found QR code", code.data);
            // 여기서 스캔된 QR 코드 데이터를 처리합니다.
            // 예: 연락처 정보를 파싱하고 저장하는 로직
            setIsScanning(false);
            if (videoRef.current.srcObject instanceof MediaStream) {
              videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
          }
        }
      }
      if (isScanning) {
        requestAnimationFrame(tick);
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f4f6f8',
        padding: 3,
        paddingTop: '120px', // 로고를 위한 상단 여백 추가
      }}
    >
      {/* 로고 이미지 */}
      <Image
        src="/dmtlogo.png"
        alt="DMT 로고"
        width={80}
        height={80}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
        }}
      />

      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
        AS DMT CONTACT
      </Typography>

      {/* 검색창과 부서 목록 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          marginBottom: 4,
          width: '100%',
        }}
      >
        {/* 검색 입력 필드 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '10px 20px',
            width: '300px',
            maxWidth: '100%',
          }}
        >
          <SearchIcon sx={{ marginRight: '10px', color: '#888' }} />
          <InputBase
            placeholder="이름으로 검색"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedDepartment('');
            }}
            sx={{
              width: '100%',
              fontSize: '16px',
              color: '#333',
            }}
          />
        </Box>

        {/* 부서 목록 */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 1,
            maxWidth: '600px', // 부서 버튼들의 최대 너비 설정
          }}
        >
          {departments.map((department) => (
            <Button
              key={department}
              variant="contained"
              onClick={() => handleDepartmentClick(department)}
              sx={{ 
                minWidth: '100px', 
                margin: '5px',
                flexGrow: 1,
                flexBasis: 'calc(33.333% - 10px)', // 3열로 표시
              }}
            >
              {department}
            </Button>
          ))}
        </Box>
      </Box>

      {/* 연락처 목록 */}
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

      {/* 연락처 상세 정보 다이얼로그 */}
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
              onClick={handleQrCodeOpen}
              color="primary"
            >
              QR 코드 보기
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* QR 코드 다이얼로그 */}
      {selectedContact && (
        <Dialog open={qrCodeOpen} onClose={handleQrCodeClose} fullWidth maxWidth="sm">
          <DialogTitle>
            QR 코드 스캔하여 연락처 저장
            <IconButton
              aria-label="close"
              onClick={handleQrCodeClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <QRCodeSVG value={generateVCardData(selectedContact)} size={256} />
              <Typography variant="body2" align="center">
                이 QR 코드를 다른 기기로 스캔하여 연락처를 저장하세요.
              </Typography>
              <Button variant="contained" color="primary" onClick={startScanner}>
                QR 코드 스캔 시작
              </Button>
              {isScanning && (
                <Box sx={{ position: 'relative', width: '100%', maxWidth: '300px', aspectRatio: '4/3' }}>
                  <video ref={videoRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <canvas ref={canvasRef} style={{ display: 'none' }} />
                </Box>
              )}
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}
