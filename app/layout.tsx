// app/layout.tsx

export const metadata = {
  title: 'AS DMT CONTACT',
  description: '부서별 연락처를 확인할 수 있는 웹 애플리케이션',
  icons: {
    icon: '/dmtlogo.ico',  // 파비콘 경로
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/dmtlogo.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
