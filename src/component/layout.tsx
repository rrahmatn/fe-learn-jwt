import React, { ReactNode } from 'react'
import Navbar from './navbar'
interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-fit flex flex-col">
      <div className="pt-20">
        {children}
      </div>
      <Navbar />
    </div>
  )
}

export default Layout