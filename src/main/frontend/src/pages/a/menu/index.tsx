import React from 'react';
import { useLocation } from 'react-router-dom';
import MenuListPage from './0_list/index';
import MenuCreatePage from './1_create/index';
import MenuEditPage from './2_edit/index';
import MenuShowPage from './3_show/index';
import { getViewByPageMode } from '@/shared/lib/utils/routingUtils';

const MenuIndex: React.FC = () => {
  const location = useLocation();
  
  return getViewByPageMode(location, {
    createComponent: <MenuCreatePage />,
    editComponent: <MenuEditPage />,
    showComponent: <MenuShowPage />,
    listComponent: <MenuListPage />
  });
};

export default MenuIndex; 
