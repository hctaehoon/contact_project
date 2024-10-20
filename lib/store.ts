// contact_project/lib/store.ts

// 간단한 리프레시 토큰 저장소 (배열에 저장, 실제 구현에서는 DB를 사용)
let refreshTokens: string[] = [];

// 리프레시 토큰 저장
export function addRefreshToken(token: string) {
  refreshTokens.push(token);
}

// 리프레시 토큰 검증 (저장된 토큰인지 확인)
export function isRefreshTokenValid(token: string): boolean {
  return refreshTokens.includes(token);
}

// 리프레시 토큰 삭제 (로그아웃 시 또는 만료된 토큰 삭제 시)
export function removeRefreshToken(token: string) {
  refreshTokens = refreshTokens.filter((t) => t !== token);
}

// 현재 저장된 리프레시 토큰 보기 (디버깅용)
export function getRefreshTokens() {
  return refreshTokens;
}
