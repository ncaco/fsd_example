import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomeLayout, ALayout } from '@widgets/layouts';
import { A_CustomToaster } from '@shared/ui/toaster';
import { ProtectedRoute } from '@/shared/lib/components/ProtectedRoute';
import { SessionProvider } from './session-provider';

import MainPage from '@pages/home/main';
import PricingPage from '@pages/home/pricing';
import TestimonialPage from '@pages/home/testimonial';
import FeaturePage from '@pages/home/feature';
import HeroPage from '@pages/home/hero';

import ALoginPage from '@pages/a/login';
import AMainPage from '@pages/a/main';
import ASub1Page from '@pages/a/sub1';
import ASub2Page from '@pages/a/sub2';


export const RouterProvider: React.FC = () => {
  return (
    <BrowserRouter>
      {/* 전역 토스터 배치 */}
      <A_CustomToaster />
      
      <Routes>
        {/* 홈 레이아웃 라우트 */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<MainPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="testimonial" element={<TestimonialPage />} />
          <Route path="feature" element={<FeaturePage />} />
          <Route path="hero" element={<HeroPage />} />
        </Route>

        {/* 로그인 페이지 */}
        <Route path="/a/login" element={<ALoginPage />} />
        
        {/* A 레이아웃 라우트 - 보호된 라우트 */}
        <Route path="/a" element={
          <ProtectedRoute>
            <SessionProvider>
              <ALayout />
            </SessionProvider>
          </ProtectedRoute>
        }>
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