'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Typography, TextField, Button, Box } from '@mui/material';

// 토큰 만료 확인 후 자동 갱신을 위한 함수
const fetchWithToken = async (url: string, options = {}) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    // 토큰이 만료되었을 경우 갱신 시도
    if (res.status === 401) {
      const errorData = await res.json();
      if (errorData.message === 'jwt expired') {
        // 리프레시 토큰으로 새로운 액세스 토큰 요청
        const refreshToken = localStorage.getItem('refreshToken');
        const refreshRes = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: refreshToken }),
        });

        if (refreshRes.ok) {
          const { token: newToken } = await refreshRes.json();

          // 새로운 토큰을 로컬 스토리지에 저장
          localStorage.setItem('token', newToken);

          // 갱신된 토큰으로 다시 원래 요청을 재시도
          return fetchWithToken(url, options);
        } else {
          console.error('토큰 갱신 실패, 다시 로그인해야 합니다.');
          return refreshRes;
        }
      }
    }

    return res;
  } catch (error) {
    console.error('토큰 갱신 중 오류 발생:', error);
    throw error;
  }
};

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // 1. 토큰 유효성 검사 함수
  const isTokenValid = () => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');

    if (token && tokenExpiry) {
      const expiryDate = new Date(parseInt(tokenExpiry, 10)); // 저장된 만료일
      const currentDate = new Date(); // 현재 시간

      return currentDate < expiryDate; // 만료일이 현재 시간보다 이후인지 확인
    }
    return false;
  };

  // 2. 페이지가 로드될 때 토큰 확인 및 리디렉션
  useEffect(() => {
    if (isTokenValid()) {
      router.push('/contacts'); // 토큰이 유효하면 바로 이동
    }
  }, [router]);

  // 3. 비밀번호 제출 함수
  const handlePasswordSubmit = async () => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const data = await res.json();

        const tokenExpiryDate = new Date();
        tokenExpiryDate.setDate(tokenExpiryDate.getDate() + 30); // 30일 유효기간 설정

        // 토큰과 만료 시간을 로컬 스토리지에 저장
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken); // 리프레시 토큰도 저장
        localStorage.setItem('tokenExpiry', tokenExpiryDate.getTime().toString());

        router.push('/contacts'); // 연락처 페이지로 이동
      } else {
        setError('비밀번호가 틀렸습니다.');
      }
    } catch (error) {
      setError('네트워크 오류로 인증에 실패했습니다.');
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
