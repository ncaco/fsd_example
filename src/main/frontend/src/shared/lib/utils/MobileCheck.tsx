/**
 * 현재 디바이스가 모바일인지 판별하는 래퍼 함수
 * 
 * - 모바일 디바이스(userAgent 기반)일 때 true 반환
 * - 그 외에는 false 반환
 */
export function isMobile(): boolean {
  const MOBILE_REGEX = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  return MOBILE_REGEX.test(navigator.userAgent.toLowerCase());
}

/**
 * 현재 화면이 모바일 사이즈(768px 미만)인지 판별하는 함수
 * 
 * - window.innerWidth가 768 미만이면 true 반환
 * - 그 외에는 false 반환
 */
export function isMobileSize(): boolean {
  return window.innerWidth < 768;
}

/**
 * 모바일 환경에서 하단 메뉴를 보여줄지 여부를 반환하는 함수
 * 
 * - 모바일 디바이스이면서, 화면 너비가 768px 미만일 때 true를 반환
 * - 그 외에는 false를 반환
 */
export function isMobileCheck(): boolean {
  const mobileDevice = isMobile();
  const smallScreen = isMobileSize();
  return mobileDevice && smallScreen;
}
