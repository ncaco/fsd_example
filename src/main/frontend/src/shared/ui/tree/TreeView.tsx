import React from 'react';
import { Menu } from '@/entities/menu';
import StatusLabel from '../status/StatusLabel';

// 트리 노드 컴포넌트 Props
interface TreeNodeProps {
  menu: Menu;
  level: number;
  goToEdit: (sn: number) => void;
  goToShow: (sn: number) => void;
  openNodes: Record<number, boolean>;
  toggleNode: (nodeId: number) => void;
}

// 트리 뷰 컴포넌트 Props
interface TreeViewProps {
  items: Menu[];
  goToEdit: (sn: number) => void;
  goToShow: (sn: number) => void;
  openNodes: Record<number, boolean>;
  toggleNode: (nodeId: number) => void;
  emptyMessage?: string;
}

// 트리 노드 컴포넌트
export const TreeNode: React.FC<TreeNodeProps> = ({ 
  menu, 
  level, 
  goToEdit, 
  goToShow, 
  openNodes, 
  toggleNode 
}) => {
  const isOpen = openNodes[menu.menuSn];
  const hasChildren = menu.childMenus && menu.childMenus.length > 0;
  
  return (
    <div style={{ width: '100%' }}>
      <div 
        style={{ 
          display: 'flex',
          padding: '10px 8px 10px ' + (level * 24 + 8) + 'px',
          borderBottom: '1px solid #eee',
          alignItems: 'center',
          cursor: hasChildren ? 'pointer' : 'default',
          transition: 'background-color 0.2s',
          backgroundColor: level === 0 ? '#f9f9f9' : 'white',
          position: 'relative',
        }}
        onClick={() => hasChildren && toggleNode(menu.menuSn)}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#f5f5f5';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = level === 0 ? '#f9f9f9' : 'white';
        }}
      >
        <div style={{ 
          marginRight: '10px',
          width: '16px',
          height: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {hasChildren && (
            <span style={{ 
              fontSize: '10px',
              width: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isOpen ? '#e6f7ff' : '#f0f0f0',
              color: isOpen ? '#1890ff' : '#666',
              borderRadius: '3px',
              transition: 'all 0.2s'
            }}>
              {isOpen ? '▼' : '▶'}
            </span>
          )}
        </div>
        
        <div style={{ flexGrow: 1 }}>
          <div style={{ 
            fontWeight: level === 0 ? 'bold' : 'normal',
            fontSize: '14px',
            color: level === 0 ? '#333' : '#555',
            marginBottom: menu.menuHelpCn ? '4px' : '0'
          }}>
            {menu.menuNm}
          </div>
          {menu.menuHelpCn && (
            <div style={{ 
              color: '#888',
              fontSize: '12px'
            }}>
              {menu.menuHelpCn}
            </div>
          )}
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          alignItems: 'center'
        }}>
          <StatusLabel menu={menu} />
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToShow(menu.menuSn);
            }}
            style={{
              border: '1px solid #e8e8e8',
              background: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              padding: '4px 10px',
              fontSize: '12px',
              color: '#555',
              transition: 'all 0.2s',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#d9d9d9';
              e.currentTarget.style.color = '#333';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#e8e8e8';
              e.currentTarget.style.color = '#555';
            }}
          >
            상세
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToEdit(menu.menuSn);
            }}
            style={{
              border: '1px solid #1890ff',
              background: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              padding: '4px 10px',
              fontSize: '12px',
              color: '#1890ff',
              transition: 'all 0.2s',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#e6f7ff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            수정
          </button>
        </div>
      </div>
      
      {hasChildren && isOpen && (
        <div style={{
          borderLeft: level === 0 ? '1px dashed #d9d9d9' : 'none',
          marginLeft: level === 0 ? '17px' : '0',
          paddingLeft: level === 0 ? '1px' : '0'
        }}>
          {menu.childMenus.map(child => (
            <TreeNode
              key={child.menuSn}
              menu={child}
              level={level + 1}
              goToEdit={goToEdit}
              goToShow={goToShow}
              openNodes={openNodes}
              toggleNode={toggleNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// 트리 뷰 컴포넌트
const TreeView: React.FC<TreeViewProps> = ({ 
  items, 
  goToEdit, 
  goToShow, 
  openNodes, 
  toggleNode,
  emptyMessage = "표시할 항목이 없습니다."
}) => {
  if (items.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center',
        padding: '30px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        color: '#888',
        fontSize: '14px',
        border: '1px dashed #d9d9d9'
      }}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div style={{ 
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      backgroundColor: 'white',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      overflow: 'hidden'
    }}>
      {items.map(menu => (
        <TreeNode
          key={menu.menuSn}
          menu={menu}
          level={0}
          goToEdit={goToEdit}
          goToShow={goToShow}
          openNodes={openNodes}
          toggleNode={toggleNode}
        />
      ))}
    </div>
  );
};

export default TreeView; 