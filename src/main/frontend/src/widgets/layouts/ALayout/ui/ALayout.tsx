import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const ALayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-wireframe-bg">
      <aside className="w-64 bg-white border-r border-wireframe-border p-4">
        <div>
          <h2 className="text-xl font-bold mb-4 text-wireframe-text">
            <div className="w-24 h-7 bg-wireframe-border rounded"></div>
          </h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/a" 
                  className="block p-2 rounded hover:bg-wireframe-border/30 text-wireframe-text transition-colors"
                >
                  <div className="w-20 h-6 bg-wireframe-border rounded"></div>
                </Link>
              </li>
              <li>
                <Link 
                  to="/a/sub1" 
                  className="block p-2 rounded hover:bg-wireframe-border/30 text-wireframe-text transition-colors"
                >
                  <div className="w-16 h-6 bg-wireframe-border rounded"></div>
                </Link>
              </li>
              <li>
                <Link 
                  to="/a/sub2" 
                  className="block p-2 rounded hover:bg-wireframe-border/30 text-wireframe-text transition-colors"
                >
                  <div className="w-24 h-6 bg-wireframe-border rounded"></div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}; 