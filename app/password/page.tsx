'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Typography, TextField, Button, Box } from '@mui/material';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // 1. 비밀번호 유효성 검사 함수
  const isPasswordValid = () => {
    const passwordSaved = localStorage.getItem('passwordSaved');
    const passwordExpiry = localStorage.getItem('passwordExpiry');
    
    // 비밀번호가 저장되었고 유효기간이 있는지 확인
    if (passwordSaved && passwordExpiry) {
      const expiryDate = new Date(parseInt(passwordExpiry, 10)); // 저장된 만료일
      const currentDate = new Date(); // 현재 시간

      // 만료일이 현재 시간보다 이후인지 확인
      return currentDate < expiryDate;
    }
    return false;
  };

  // 2. 페이지가 로드될 때 비밀번호 저장 여부 확인 및 리디렉션
  useEffect(() => {
    if (isPasswordValid()) {
      router.push('/contacts'); // 비밀번호가 유효하면 바로 이동
    }
  }, []); // 컴포넌트 로드시 한 번 실행

  // 3. 비밀번호 제출 함수
  const handlePasswordSubmit = () => {
    if (password === '6406') { // 비밀번호 확인 (하드코딩된 비밀번호)
      const passwordExpiryDate = new Date();
      passwordExpiryDate.setDate(passwordExpiryDate.getDate() + 30); // 30일 유효기간 설정
  
      // 비밀번호 저장 상태와 만료 시간을 로컬 스토리지에 저장
      localStorage.setItem('passwordSaved', 'true');
      localStorage.setItem('passwordExpiry', passwordExpiryDate.getTime().toString()); // 만료 시간 저장

      router.push('/contacts'); // 연락처 페이지로 이동
    } else {
      setError('비밀번호가 틀렸습니다.');
    }
  };

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
      }}
    >
      <Typography variant="h5" gutterBottom>
        비밀번호 입력
      </Typography>

      <TextField
        label="비밀번호"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: 2, width: '300px' }}
      />

      {error && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

      <Button variant="contained" onClick={handlePasswordSubmit}>
        접속
      </Button>
    </Box>
  );
}
