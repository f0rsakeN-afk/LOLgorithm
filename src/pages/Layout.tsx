import React, { ReactNode } from 'react';
import Header from '@/components/Header'

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-14">
                <div className="container mx-auto max-w-4xl px-4">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;