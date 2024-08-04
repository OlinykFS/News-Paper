import React from 'react';
import Aside from '../Aside/aside';

const MainLayout = ({ children }) => {
  return (
    <div className="bg-black-100 min-h-screen">
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {children}
          </div>
          <div className="lg:col-span-1">
            <Aside className="sticky top-20" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;