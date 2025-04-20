import React from 'react';

const ASub2Page: React.FC = () => {
  return (
    <div className="bg-white rounded border border-wireframe-border p-6">
      <div className="w-1/2 h-8 bg-wireframe-border rounded mb-6"></div>
      <div className="w-2/3 h-4 bg-wireframe-border/70 rounded mb-4"></div>
      
      <div className="border-t border-b border-wireframe-border py-4 my-6">
        <div className="w-full h-4 bg-wireframe-border/70 rounded mb-2"></div>
        <div className="w-4/5 h-4 bg-wireframe-border/70 rounded mb-2"></div>
        <div className="w-3/5 h-4 bg-wireframe-border/70 rounded"></div>
      </div>
      
      <div className="border-b border-wireframe-border py-4 mb-6">
        <div className="w-full h-4 bg-wireframe-border/70 rounded mb-2"></div>
        <div className="w-4/5 h-4 bg-wireframe-border/70 rounded mb-2"></div>
        <div className="w-3/5 h-4 bg-wireframe-border/70 rounded"></div>
      </div>
      
      <div className="flex justify-between mt-4">
        <div className="w-24 h-8 bg-wireframe-border rounded"></div>
        <div className="w-24 h-8 bg-wireframe-border rounded"></div>
      </div>
    </div>
  );
};

export default ASub2Page; 