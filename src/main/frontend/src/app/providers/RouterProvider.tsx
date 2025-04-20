import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomeLayout, ALayout } from '@widgets/layouts';
import MainPage from '@pages/home/main';
import AMainPage from '@pages/a/main';
import ASub1Page from '@pages/a/sub1';
import ASub2Page from '@pages/a/sub2';

export const RouterProvider: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 홈 레이아웃 라우트 */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<MainPage />} />
        </Route>

        {/* A 레이아웃 라우트 */}
        <Route path="/a" element={<ALayout />}>
          <Route index element={<AMainPage />} />
          <Route path="sub1" element={<ASub1Page />} />
          <Route path="sub2" element={<ASub2Page />} />
        </Route>

        {/* 404 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}; 