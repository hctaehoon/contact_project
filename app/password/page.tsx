'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Typography, TextField, Button, Box } from '@mui/material';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  // 1. 비밀번호 인증 상태 확인 함수
  const isAuthenticated = () => {
    const authStatus = localStorage.getItem('isAuthenticated');
    return authStatus === 'true';
  };

  // 2. 페이지 로드 시 인증 상태 확인 후 리디렉션
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/contacts'); // 인증되어 있으면 바로 이동
    }
  }, [router]);

  // 3. 비밀번호 제출 함수
  const handlePasswordSubmit = () => {
    if (password === '6406') {
      // 인증 성공 시 로컬 스토리지에 저장 (오랜 시간 유지)
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/contacts'); // 인증되면 연락처 페이지로 이동
    } else {
      setErrorMsg('비밀번호가 틀렸습니다.');
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

      {errorMsg && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {errorMsg}
        </Typography>
      )}

      <Button variant="contained" onClick={handlePasswordSubmit}>
        접속
      </Button>
    </Box>
  );
}
