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
  getItemExtra?: (item: TreeItem<T>) => React.ReactNode;
}

// 트리 뷰 컴포넌트 Props
interface TreeViewProps<T> {
  items: TreeItem<T>[];
  openNodes: Record<string | number, boolean>;
  toggleNode: (nodeId: string | number) => void;
  renderActions?: (item: TreeItem<T>) => React.ReactNode;
  getItemStatus?: (item: TreeItem<T>) => React.ReactNode;
  getItemExtra?: (item: TreeItem<T>) => React.ReactNode;
  emptyMessage?: string;
  showHeader?: boolean;
  headerNameText?: string;
  headerStatusText?: string;
  headerExtraText?: string;
  headerActionText?: string;
}

// 트리 노드 컴포넌트
export function TreeNode<T>({ 
  item, 
  level, 
  openNodes, 
  toggleNode,
  renderActions,
  getItemStatus,
  getItemExtra
}: TreeNodeProps<T>) {
  const [isHovered, setIsHovered] = useState(false);
  const isOpen = openNodes[item.id];
  const hasChildren = item.children && item.children.length > 0;
  
  return (
    <div className="w-full">
      <div 
        className={`flex items-center border-b border-l border-r border-gray-200 transition-colors relative
          ${level === 0 ? 'bg-white' : 'bg-white'} 
          ${isHovered ? 'bg-gray-50' : ''}
          ${hasChildren ? 'cursor-pointer' : 'cursor-default'}`}
        style={{ padding: `8px 8px 8px ${level * 20 + 8}px` }}
        onClick={() => hasChildren && toggleNode(item.id)}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
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
          {getItemStatus && getItemStatus(item)}
          {getItemExtra && getItemExtra(item)}
          {renderActions && renderActions(item)}
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
              renderActions={renderActions}
              getItemStatus={getItemStatus}
              getItemExtra={getItemExtra}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// 트리 뷰 헤더 컴포넌트 Props
interface TreeViewHeaderProps {
  nameText?: string;
  statusText?: string;
  extraText?: string;
  actionText?: string;
}

// 트리 뷰 헤더 컴포넌트
function TreeViewHeader({
  nameText = '이름',
  statusText = '상태',
  extraText,
  actionText = '관리'
}: TreeViewHeaderProps) {
  return (
    <div className="flex items-center bg-gray-50 text-gray-600 px-4 py-2 border-b border-gray-200 text-xs font-medium">
      <div className="w-4 h-4 mr-2.5"></div>
      <div className="flex-grow">{nameText}</div>
      <div className="flex gap-2 items-center">
        {statusText && <div className="w-16 text-center">{statusText}</div>}
        {extraText && <div className="w-16 text-center">{extraText}</div>}
        <div className="w-20 text-center">{actionText}</div>
      </div>
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
  getItemExtra,
  emptyMessage = "표시할 항목이 없습니다.",
  showHeader = true,
  headerNameText = '이름',
  headerStatusText = '사용여부',
  headerExtraText = '노출여부',
  headerActionText = '관리'
}: TreeViewProps<T>) {
  if (items.length === 0) {
    return (
      <div className="text-center py-6 px-4 bg-gray-50 rounded-md text-gray-500 text-sm border border-dashed border-gray-200">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-md bg-white shadow-sm overflow-hidden">
      {showHeader && (
        <TreeViewHeader 
          nameText={headerNameText}
          statusText={headerStatusText}
          extraText={headerExtraText}
          actionText={headerActionText}
        />
      )}
      {items.map(item => (
        <TreeNode
          key={item.id}
          item={item}
          level={0}
          openNodes={openNodes}
          toggleNode={toggleNode}
          renderActions={renderActions}
          getItemStatus={getItemStatus}
          getItemExtra={getItemExtra}
        />
      ))}
    </div>
  );
}

export default TreeView; 