import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'My Notes App',
  description: 'note aplication',
};

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-gray-800 text-white p-4">
            <h1 className="text-2xl">My Notes App</h1>
          </header>
          <main>{children}</main>
          <footer className="bg-gray-800 text-white p-4 text-center">
            <p>{new Date().getFullYear()} My Notes App</p>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
