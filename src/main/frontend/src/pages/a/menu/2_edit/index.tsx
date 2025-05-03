import { useLocation } from 'react-router-dom';
const MenuEditPage: React.FC = () => {

  const location = useLocation();
  const state = location.state;
  const sn = state?.sn;

  return (
    <div>
      <h1>메뉴 수정</h1>
      <p>sn: {sn}</p>
    </div>
  );
};

export default MenuEditPage;

