import { TreeItem } from './TreeView';

/**
 * 검색어로 트리 아이템 목록을 필터링하는 범용 함수
 * @param items 필터링할 트리 아이템 목록
 * @param searchTerm 검색어
 * @param searchFields 검색할 필드 배열 (data 내의 속성명)
 * @returns 필터링된 트리 아이템 목록
 */
export const filterTreeItems = <T>(
  items: TreeItem<T>[],
  searchTerm: string,
  searchFields: (keyof T & string)[] = []
): TreeItem<T>[] => {
  if (!searchTerm) return [...items];
  
  const searchTermLower = searchTerm.toLowerCase();
  
  // 깊은 복사로 새로운 아이템 목록 생성
  const filteredItems = items.map(item => {
    const newItem = { ...item };
    
    // 현재 아이템이 검색어에 맞는지 확인
    let itemMatches = item.name.toLowerCase().includes(searchTermLower) || 
      (item.description && item.description.toLowerCase().includes(searchTermLower));
    
    // 데이터 객체 내의 지정된 필드들도 검색
    if (!itemMatches && item.data && searchFields.length > 0) {
      const data = item.data as T;
      itemMatches = searchFields.some(field => {
        const value = data[field];
        return value !== undefined && String(value).toLowerCase().includes(searchTermLower);
      });
    }
    
    // 자식 아이템에서 검색
    if (item.children && item.children.length > 0) {
      newItem.children = filterTreeItems(item.children, searchTerm, searchFields);
      
      // 자식 아이템이 없고 현재 아이템도 검색어에 맞지 않으면 null 반환
      if (newItem.children.length === 0 && !itemMatches) {
        return null;
      }
    } else if (!itemMatches) {
      // 자식 아이템이 없고 현재 아이템도 검색어에 맞지 않으면 null 반환
      return null;
    }
    
    return newItem;
  }).filter(Boolean) as TreeItem<T>[];
  
  return filteredItems;
};

/**
 * 타입을 TreeItem으로 변환하는 범용 함수
 * @param items 원본 데이터 배열
 * @param getNodeProps 각 아이템에서 TreeItem 속성을 추출하는 함수
 * @returns TreeItem 배열
 */
export const convertToTreeItems = <T, K>(
  items: T[],
  getNodeProps: (item: T) => {
    id: string | number;
    name: string;
    description?: string;
    children?: T[];
    data?: K;
  }
): TreeItem<K>[] => {
  return items.map(item => {
    const { id, name, description, children, data } = getNodeProps(item);
    
    return {
      id,
      name,
      description,
      children: children ? convertToTreeItems(children, getNodeProps) : undefined,
      data
    };
  });
}; 