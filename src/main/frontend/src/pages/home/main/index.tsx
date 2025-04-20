import React from 'react';

const MainPage: React.FC = () => {
  return (
    <div className="text-center">
      <div className="w-3/4 h-12 bg-wireframe-border rounded mx-auto mb-6"></div>
      <div className="w-2/3 h-6 bg-wireframe-border rounded mx-auto mb-4"></div>
      <div className="w-1/2 h-6 bg-wireframe-border rounded mx-auto"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white p-6 rounded border border-wireframe-border h-48 flex flex-col">
          <div className="w-2/3 h-5 bg-wireframe-border rounded mb-4"></div>
          <div className="w-full h-4 bg-wireframe-border/70 rounded mb-2"></div>
          <div className="w-5/6 h-4 bg-wireframe-border/70 rounded mb-2"></div>
          <div className="w-4/6 h-4 bg-wireframe-border/70 rounded mb-4"></div>
          <div className="mt-auto w-1/3 h-8 bg-wireframe-border rounded"></div>
        </div>
        
        <div className="bg-white p-6 rounded border border-wireframe-border h-48 flex flex-col">
          <div className="w-2/3 h-5 bg-wireframe-border rounded mb-4"></div>
          <div className="w-full h-4 bg-wireframe-border/70 rounded mb-2"></div>
          <div className="w-5/6 h-4 bg-wireframe-border/70 rounded mb-2"></div>
          <div className="w-4/6 h-4 bg-wireframe-border/70 rounded mb-4"></div>
          <div className="mt-auto w-1/3 h-8 bg-wireframe-border rounded"></div>
        </div>
        
        <div className="bg-white p-6 rounded border border-wireframe-border h-48 flex flex-col">
          <div className="w-2/3 h-5 bg-wireframe-border rounded mb-4"></div>
          <div className="w-full h-4 bg-wireframe-border/70 rounded mb-2"></div>
          <div className="w-5/6 h-4 bg-wireframe-border/70 rounded mb-2"></div>
          <div className="w-4/6 h-4 bg-wireframe-border/70 rounded mb-4"></div>
          <div className="mt-auto w-1/3 h-8 bg-wireframe-border rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default MainPage; 