'use client'

import { Footer } from '@/components/layouts/Footer'
import HomeNav from '@/components/layouts/HomeNav'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <HomeNav />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
