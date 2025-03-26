import React from 'react';
import './globals.css';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<LayoutProps>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}