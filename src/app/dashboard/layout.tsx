// src/components/Layout.tsx
import Sidebar from '@/components/dashboard /layout/SideBar';
import React from 'react';
// import Sidebar from './Sidebar';
Sidebar

const Layout: React.FC = ({ children }: any) => {
  return (
    <div>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
