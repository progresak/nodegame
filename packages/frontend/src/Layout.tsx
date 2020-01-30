import React, {ReactNode} from 'react';
interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <div>
        <div>INTEFACE</div>
        {children}
    </div>
);
export default Layout;
