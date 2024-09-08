import { MainLayoutProps } from "@/app/common/types";
import React, { ReactNode } from "react";



export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
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

export default MainLayout;
