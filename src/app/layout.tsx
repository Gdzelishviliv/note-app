import './globals.css';
import { ReactNode } from 'react';
import { MainLayout } from './layouts/MainLayout';

export const metadata = {
  title: 'Notes',
  description: 'Note application',
};

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
};

export default RootLayout;
