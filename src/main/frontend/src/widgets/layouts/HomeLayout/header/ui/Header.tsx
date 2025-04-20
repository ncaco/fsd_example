import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-wireframe-border py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-wireframe-text">
            <div className="w-32 h-8 bg-wireframe-border rounded"></div>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="text-wireframe-text hover:text-wireframe-accent transition-colors">
                  <div className="w-16 h-6 bg-wireframe-border rounded"></div>
                </Link>
              </li>
              <li>
                <Link to="/a" className="text-wireframe-text hover:text-wireframe-accent transition-colors">
                  <div className="w-20 h-6 bg-wireframe-border rounded"></div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
