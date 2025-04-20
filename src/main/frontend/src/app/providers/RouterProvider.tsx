import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomeLayout, ALayout } from '../../widgets/layouts';

export const RouterProvider: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 홈 레이아웃 라우트 */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<div>홈 페이지</div>} />
        </Route>

        {/* A 레이아웃 라우트 */}
        <Route path="/a" element={<ALayout />}>
          <Route index element={<div>A 홈 페이지</div>} />
          <Route path="sub1" element={<div>서브1 페이지</div>} />
          <Route path="sub2" element={<div>서브2 페이지</div>} />
        </Route>

        {/* 404 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}; 