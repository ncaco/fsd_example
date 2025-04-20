import React from 'react';

const ASub1Page: React.FC = () => {
  return (
    <div className="bg-white rounded border border-wireframe-border p-6">
      <div className="w-1/3 h-8 bg-wireframe-border rounded mb-6"></div>
      <div className="w-1/2 h-4 bg-wireframe-border/70 rounded mb-8"></div>
      
      <div className="w-full h-64 bg-wireframe-border/30 rounded mb-4 flex items-center justify-center">
        <div className="w-16 h-16 bg-wireframe-border rounded-full"></div>
      </div>
      
      <div className="flex justify-end mt-4">
        <div className="w-24 h-8 bg-wireframe-border rounded"></div>
      </div>
    </div>
  );
};

export default ASub1Page; 