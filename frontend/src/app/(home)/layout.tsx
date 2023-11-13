'use client'

import HomeNav from '@/components/layouts/HomeNav'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <HomeNav />
      {children}
    </div>
  )
}

export default Layout
