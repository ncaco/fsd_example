import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // 상태 초기화
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // 로컬 스토리지에서 값 가져오기
      const item = window.localStorage.getItem(key);
      // 값이 있으면 JSON 파싱, 없으면 초기값 반환
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // 에러 발생 시 초기값 반환
      console.error('로컬 스토리지에서 값을 가져오는데 실패했습니다:', error);
      return initialValue;
    }
  });

  // 로컬 스토리지 값 갱신
  const setValue = (value: T) => {
    try {
      // 함수형 업데이트 지원
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // 상태 설정
      setStoredValue(valueToStore);
      // 로컬 스토리지에 저장
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('로컬 스토리지에 값을 저장하는데 실패했습니다:', error);
    }
  };

  // 다른 탭/창에서 로컬 스토리지 변경 감지
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('storage', handleStorageChange);
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage; 