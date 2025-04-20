import React from 'react';

const AMainPage: React.FC = () => {
  return (
    <div className="bg-white rounded border border-wireframe-border p-6">
      <div className="w-1/2 h-8 bg-wireframe-border rounded mb-6"></div>
      <div className="w-2/3 h-4 bg-wireframe-border/70 rounded mb-4"></div>
      
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="border border-wireframe-border rounded p-4">
          <div className="w-1/3 h-5 bg-wireframe-border rounded mb-3"></div>
          <div className="w-3/4 h-4 bg-wireframe-border/70 rounded mb-2"></div>
          <div className="w-1/2 h-4 bg-wireframe-border/70 rounded"></div>
        </div>
        <div className="border border-wireframe-border rounded p-4">
          <div className="w-1/3 h-5 bg-wireframe-border rounded mb-3"></div>
          <div className="w-3/4 h-4 bg-wireframe-border/70 rounded mb-2"></div>
          <div className="w-1/2 h-4 bg-wireframe-border/70 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default AMainPage; 