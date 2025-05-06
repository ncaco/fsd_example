import React, { useState, useRef } from 'react';

// 드래그 중인 아이템 정보
interface DragItem {
  id: string | number;
  level: number;
  parentId?: string | number;
}

// 트리 아이템 인터페이스
export interface TreeItem<T = unknown> {
  id: number | string;
  name: string;
  description?: string;
  children?: TreeItem<T>[];
  data?: T;
  parentId?: number | string;
}

// 트리 컬럼 정의
export interface TreeColumn<T> {
  id: string;
  header?: string; 
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  renderCell: (item: TreeItem<T>) => React.ReactNode;
}

// 트리 노드 컴포넌트 Props
interface TreeNodeProps<T> {
  item: TreeItem<T>;
  level: number;
  openNodes: Record<string | number, boolean>;
  toggleNode: (nodeId: string | number) => void;
  columns: TreeColumn<T>[];
  draggable?: boolean;
  onDragStart?: (item: DragItem) => void;
  onDragOver?: (e: React.DragEvent, item: TreeItem<T>) => void;
  onDrop?: (draggedItem: DragItem, targetItem: TreeItem<T>, position: 'before' | 'inside' | 'after') => void;
  currentDraggedItem: DragItem | null;
  parentId?: string | number;
}

// 트리 뷰 컴포넌트 Props
interface TreeViewProps<T> {
  items: TreeItem<T>[];
  openNodes: Record<string | number, boolean>;
  toggleNode: (nodeId: string | number) => void;
  columns: TreeColumn<T>[];
  emptyMessage?: string;
  showHeader?: boolean;
  draggable?: boolean;
  onItemMove?: (draggedItemId: string | number, targetItemId: string | number, position: 'before' | 'after' | 'inside') => void;
}

// 트리 노드 컴포넌트
export function TreeNode<T>({ 
  item, 
  level, 
  openNodes, 
  toggleNode,
  columns,
  draggable = false,
  onDragStart,
  onDragOver,
  onDrop,
  currentDraggedItem,
  parentId
}: TreeNodeProps<T>) {
  const [isHovered, setIsHovered] = useState(false);
  const [dropPosition, setDropPosition] = useState<'before' | 'inside' | 'after' | null>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const isOpen = openNodes[item.id];
  const hasChildren = item.children && item.children.length > 0;
  
  // 드래그 이벤트 핸들러
  const handleDragStart = (e: React.DragEvent) => {
    if (!draggable) return;
    
    // 드래그 이미지 설정 (투명하게)
    const dragImg = document.createElement('div');
    dragImg.style.width = '0px';
    dragImg.style.height = '0px';
    document.body.appendChild(dragImg);
    e.dataTransfer.setDragImage(dragImg, 0, 0);
    
    // 필요한 데이터 설정
    e.dataTransfer.setData('text/plain', String(item.id));
    e.dataTransfer.effectAllowed = 'move';
    
    if (onDragStart) {
      onDragStart({
        id: item.id,
        level,
        parentId
      });
    }
    
    // 다음 tick에서 임시 요소 제거
    setTimeout(() => {
      document.body.removeChild(dragImg);
    }, 0);
  };
  
  // 드래그 오버 이벤트 핸들러
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggable || !nodeRef.current || !currentDraggedItem || currentDraggedItem.id === item.id) {
      setDropPosition(null);
      return;
    }
    
    const rect = nodeRef.current.getBoundingClientRect();
    const mouseY = e.clientY;
    const relativeY = mouseY - rect.top;
    const height = rect.height;
    
    // 위치에 따라 드롭 영역 결정
    if (relativeY < height * 0.3) {
      setDropPosition('before');
    } else if (relativeY > height * 0.7) {
      setDropPosition('after');
    } else {
      if (hasChildren) {
        setDropPosition('inside');
      } else {
        setDropPosition('after');
      }
    }
    
    if (onDragOver) {
      onDragOver(e, item);
    }
  };
  
  // 드래그 리브 이벤트 핸들러
  const handleDragLeave = () => {
    setDropPosition(null);
  };
  
  // 드롭 이벤트 핸들러
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggable || !currentDraggedItem || currentDraggedItem.id === item.id || !dropPosition) {
      setDropPosition(null);
      return;
    }
    
    if (onDrop) {
      onDrop(currentDraggedItem, item, dropPosition);
    }
    
    setDropPosition(null);
  };
  
  // 드롭 영역 클래스 계산
  const getDropIndicatorClass = () => {
    if (!dropPosition) return '';
    
    switch (dropPosition) {
      case 'before':
        return 'relative before:absolute before:left-0 before:right-0 before:top-0 before:h-1 before:bg-primary-500 before:z-10';
      case 'after':
        return 'relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:bg-primary-500 after:z-10';
      case 'inside':
        return 'bg-primary-50 bg-opacity-40 outline outline-2 outline-primary-500 outline-offset-[-2px]';
      default:
        return '';
    }
  };
  
  // 드롭 위치 라벨 표시
  const getDropPositionLabel = () => {
    if (!dropPosition || !currentDraggedItem) return null;
    
    const labelStyle = {
      position: 'absolute' as const,
      left: `${level * 20 + 30}px`,
      padding: '0px 6px',
      fontSize: '10px',
      borderRadius: '4px',
      color: 'white',
      fontWeight: 'bold' as const,
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      zIndex: 20
    };
    
    switch (dropPosition) {
      case 'before':
        return (
          <div style={{...labelStyle, top: '-12px', background: '#3b82f6'}}
               className="font-bold">
            이전에 추가
          </div>
        );
      case 'after':
        return (
          <div style={{...labelStyle, bottom: '-12px', background: '#3b82f6'}}
               className="font-bold">
            다음에 추가
          </div>
        );
      case 'inside':
        return (
          <div style={{...labelStyle, top: '50%', transform: 'translateY(-50%)', background: '#10b981'}}
               className="font-bold">
            하위로 추가
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="w-full">
      <div 
        ref={nodeRef}
        id={`tree-node-${item.id}`}
        className={`flex items-center border-b border-l border-r border-gray-200 transition-colors relative
          ${level === 0 ? 'bg-white' : 'bg-white'} 
          ${isHovered ? 'bg-gray-50' : ''}
          ${hasChildren ? 'cursor-pointer' : 'cursor-default'}
          ${getDropIndicatorClass()}`}
        style={{ padding: `8px 8px 8px ${level * 20 + 8}px` }}
        onClick={() => hasChildren && toggleNode(item.id)}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        draggable={draggable}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {getDropPositionLabel()}
        <div className="mr-2.5 w-4 h-4 flex items-center justify-center">
          {hasChildren && (
            <span className={`text-xs w-4 h-4 flex items-center justify-center rounded-sm transition-all
              ${isOpen ? 'bg-primary-50 text-primary-500' : 'bg-gray-50 text-gray-500'}`}>
              {isOpen ? '▼' : '▶'}
            </span>
          )}
        </div>
        
        <div className="flex-grow overflow-hidden">
          <div className={`text-sm truncate mb-${item.description ? '0.5' : '0'}
            ${level === 0 ? 'font-medium text-gray-800' : 'font-normal text-gray-600'}`}>
            {item.name}
          </div>
          {item.description && (
            <div className="text-gray-500 text-xs truncate max-w-md">
              {item.description}
            </div>
          )}
        </div>
        
        <div className="flex gap-2 items-center ml-2">
          {columns.slice(1).map((column) => (
            <div 
              key={column.id}
              style={{ 
                width: column.width ? (typeof column.width === 'number' ? `${column.width}px` : column.width) : 'auto',
                textAlign: column.align || 'center'
              }}
            >
              {column.renderCell(item)}
            </div>
          ))}
        </div>
      </div>
      
      {hasChildren && isOpen && (
        <div className={`${level === 0 ? 'border-l border-dashed border-gray-200 ml-4 pl-px' : ''}`}>
          {item.children?.map(child => (
            <TreeNode
              key={child.id}
              item={child}
              level={level + 1}
              openNodes={openNodes}
              toggleNode={toggleNode}
              columns={columns}
              draggable={draggable}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              currentDraggedItem={currentDraggedItem}
              parentId={item.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// 트리 뷰 헤더 컴포넌트
function TreeViewHeader<T>({ columns }: { columns: TreeColumn<T>[] }) {
  return (
    <div className="flex items-center bg-gray-50 text-gray-600 px-4 py-2 border-b border-gray-200 text-xs font-medium">
      <div className="w-4 h-4 mr-2.5"></div>
      <div className="flex-grow">{columns[0].header || '이름'}</div>
      <div className="flex gap-2 items-center">
        {columns.slice(1).map((column) => (
          <div 
            key={column.id}
            style={{ 
              width: column.width ? (typeof column.width === 'number' ? `${column.width}px` : column.width) : 'auto',
              textAlign: column.align || 'center'
            }}
          >
            {column.header || column.id}
          </div>
        ))}
      </div>
    </div>
  );
}

// 트리 뷰 컴포넌트
function TreeView<T>({
  items, 
  openNodes, 
  toggleNode,
  columns,
  emptyMessage = "표시할 항목이 없습니다.",
  showHeader = true,
  draggable = false,
  onItemMove
}: TreeViewProps<T>) {
  const [currentDraggedItem, setCurrentDraggedItem] = useState<DragItem | null>(null);
  
  // 드래그 시작 핸들러
  const handleDragStart = (item: DragItem) => {
    setCurrentDraggedItem(item);
  };
  
  // 드롭 핸들러
  const handleDrop = (draggedItem: DragItem, targetItem: TreeItem<T>, position: 'before' | 'inside' | 'after') => {
    if (!onItemMove || !draggedItem) return;
    
    onItemMove(draggedItem.id, targetItem.id, position);
    setCurrentDraggedItem(null);
  };
  
  // 드래그 종료 핸들러
  const handleDragEnd = () => {
    setCurrentDraggedItem(null);
  };
  
  if (items.length === 0) {
    return (
      <div className="text-center py-6 px-4 bg-gray-50 rounded-md text-gray-500 text-sm border border-dashed border-gray-200">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div 
      className="border border-gray-200 rounded-md bg-white shadow-sm overflow-hidden"
      onDragEnd={handleDragEnd}
    >
      {showHeader && <TreeViewHeader columns={columns} />}
      {items.map(item => (
        <TreeNode
          key={item.id}
          item={item}
          level={0}
          openNodes={openNodes}
          toggleNode={toggleNode}
          columns={columns}
          draggable={draggable}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          currentDraggedItem={currentDraggedItem}
        />
      ))}
    </div>
  );
}

export default TreeView; 