'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Typography, TextField, Button, Box } from '@mui/material';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handlePasswordSubmit = async () => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);  // JWT를 저장
      router.push('/contacts');  // 연락처 페이지로 이동
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
        JWT 토큰 발급 비밀번호 입력
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
