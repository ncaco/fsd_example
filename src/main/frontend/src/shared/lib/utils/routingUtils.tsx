import React from 'react';
import { Location } from 'react-router-dom';

// 페이지 모드 상수
export const PAGE_MODES = {
  CREATE: 'create',
  EDIT: 'edit',
  SHOW: 'show',
  LIST: 'list'
};

interface PageState {
  pgMode?: string;
  sn?: string | number;
}

interface RouteOptions {
  createComponent: React.ReactNode;
  editComponent: React.ReactNode;
  showComponent: React.ReactNode;
  listComponent: React.ReactNode;
}

export const getViewByPageMode = (location: Location, options: RouteOptions): React.ReactNode => {
  // state로부터 pgMode, sn 추출
  const state = location.state as PageState | null;
  const pgMode = state?.pgMode;
  const sn = state?.sn;

  // sn이 0, null, undefined, ''가 아닌 경우만 유효한 sn으로 간주
  const isValidSn = sn !== null && sn !== undefined && sn !== '' && sn !== 0 && sn !== '0';

  if (pgMode === PAGE_MODES.CREATE && (!isValidSn)) {
    // 등록뷰
    return options.createComponent;
  }
  else if (pgMode === PAGE_MODES.EDIT && isValidSn) {
    // 수정뷰
    return options.editComponent;
  }
  else if (pgMode === PAGE_MODES.SHOW && isValidSn) {
    // 상세뷰
    return options.showComponent;
  }
  else {
    // 기본: 리스트
    return options.listComponent;
  }
}; 