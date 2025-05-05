import React, { useState } from 'react';

// 트리 아이템 인터페이스
export interface TreeItem<T = unknown> {
  id: number | string;
  name: string;
  description?: string;
  children?: TreeItem<T>[];
  data?: T;
}

// 트리 노드 컴포넌트 Props
interface TreeNodeProps<T> {
  item: TreeItem<T>;
  level: number;
  openNodes: Record<string | number, boolean>;
  toggleNode: (nodeId: string | number) => void;
  renderActions?: (item: TreeItem<T>) => React.ReactNode;
  getItemStatus?: (item: TreeItem<T>) => React.ReactNode;
}

// 트리 뷰 컴포넌트 Props
interface TreeViewProps<T> {
  items: TreeItem<T>[];
  openNodes: Record<string | number, boolean>;
  toggleNode: (nodeId: string | number) => void;
  renderActions?: (item: TreeItem<T>) => React.ReactNode;
  getItemStatus?: (item: TreeItem<T>) => React.ReactNode;
  emptyMessage?: string;
}

// 트리 노드 컴포넌트
export function TreeNode<T>({ 
  item, 
  level, 
  openNodes, 
  toggleNode,
  renderActions,
  getItemStatus
}: TreeNodeProps<T>) {
  const [isHovered, setIsHovered] = useState(false);
  const isOpen = openNodes[item.id];
  const hasChildren = item.children && item.children.length > 0;
  
  return (
    <div className="w-full">
      <div 
        className={`flex items-center border-b border-gray-200 transition-colors relative
          ${level === 0 ? 'bg-gray-50' : 'bg-white'} 
          ${isHovered ? 'bg-gray-100' : ''}
          ${hasChildren ? 'cursor-pointer' : 'cursor-default'}`}
        style={{ padding: `10px 8px 10px ${level * 24 + 8}px` }}
        onClick={() => hasChildren && toggleNode(item.id)}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <div className="mr-2.5 w-4 h-4 flex items-center justify-center">
          {hasChildren && (
            <span className={`text-xs w-4 h-4 flex items-center justify-center rounded transition-all
              ${isOpen ? 'bg-blue-50 text-blue-500' : 'bg-gray-100 text-gray-600'}`}>
              {isOpen ? '▼' : '▶'}
            </span>
          )}
        </div>
        
        <div className="flex-grow">
          <div className={`text-sm mb-${item.description ? '1' : '0'}
            ${level === 0 ? 'font-bold text-gray-800' : 'font-normal text-gray-600'}`}>
            {item.name}
          </div>
          {item.description && (
            <div className="text-gray-500 text-xs">
              {item.description}
            </div>
          )}
        </div>
        
        <div className="flex gap-2 items-center">
          {getItemStatus && getItemStatus(item)}
          {renderActions && renderActions(item)}
        </div>
      </div>
      
      {hasChildren && isOpen && (
        <div className={`${level === 0 ? 'border-l border-dashed border-gray-300 ml-4 pl-px' : ''}`}>
          {item.children?.map(child => (
            <TreeNode
              key={child.id}
              item={child}
              level={level + 1}
              openNodes={openNodes}
              toggleNode={toggleNode}
              renderActions={renderActions}
              getItemStatus={getItemStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// 트리 뷰 컴포넌트
function TreeView<T>({
  items, 
  openNodes, 
  toggleNode,
  renderActions,
  getItemStatus,
  emptyMessage = "표시할 항목이 없습니다."
}: TreeViewProps<T>) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 px-6 bg-gray-50 rounded-lg text-gray-500 text-sm border border-dashed border-gray-300">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-md overflow-hidden">
      {items.map(item => (
        <TreeNode
          key={item.id}
          item={item}
          level={0}
          openNodes={openNodes}
          toggleNode={toggleNode}
          renderActions={renderActions}
          getItemStatus={getItemStatus}
        />
      ))}
    </div>
  );
}

export default TreeView; 