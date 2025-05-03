# 라우팅 유틸리티 사용 방법

## getViewByPageMode 함수

`getViewByPageMode` 함수는 React Router의 `useLocation`에서 state의 `pgMode`와 `sn` 값을 추출하여 적절한 컴포넌트를 렌더링합니다.

### 사용 예시

```tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import ListPage from './list';
import CreatePage from './create';
import EditPage from './edit';
import ShowPage from './show';
import { getViewByPageMode } from 'path/to/routingUtils';

const YourPageIndex: React.FC = () => {
  const location = useLocation();
  
  return getViewByPageMode(location, {
    createComponent: <CreatePage />,
    editComponent: <EditPage />,
    showComponent: <ShowPage />,
    listComponent: <ListPage />
  });
};

export default YourPageIndex;
```

### 페이지 이동 시 state 전달 방법

다른 페이지에서 이 컴포넌트로 이동할 때 다음과 같이 state를 전달합니다:

```tsx
import { useNavigate } from 'react-router-dom';
import { PAGE_MODES } from 'path/to/routingUtils';

const SomeComponent: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCreate = () => {
    navigate('/your-path', { state: { pgMode: PAGE_MODES.CREATE } });
  };
  
  const handleEdit = (id: number) => {
    navigate('/your-path', { state: { pgMode: PAGE_MODES.EDIT, sn: id } });
  };
  
  const handleShow = (id: number) => {
    navigate('/your-path', { state: { pgMode: PAGE_MODES.SHOW, sn: id } });
  };
  
  return (
    <div>
      <button onClick={handleCreate}>생성</button>
      <button onClick={() => handleEdit(1)}>수정</button>
      <button onClick={() => handleShow(1)}>상세보기</button>
    </div>
  );
};
``` 