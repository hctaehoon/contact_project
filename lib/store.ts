// contact_project/lib/store.ts

let refreshTokens: string[] = [];

// 리프레시 토큰 저장소를 내보내기
export { refreshTokens };

// 기타 관련 함수들도 내보내기
export function addRefreshToken(token: string) {
  refreshTokens.push(token);
}

export function isRefreshTokenValid(token: string): boolean {
  return refreshTokens.includes(token);
}

export function removeRefreshToken(token: string) {
  refreshTokens = refreshTokens.filter((t) => t !== token);
}

export function getRefreshTokens() {
  return refreshTokens;
}
