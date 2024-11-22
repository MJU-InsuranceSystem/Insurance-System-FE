export function getAccessToken(key: string = 'accessToken'): string | null {
    const token = localStorage.getItem(key);
    console.log('Retrieved Token:', token); // 디버깅용 출력
    return token || null;
}
