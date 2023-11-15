import { ShopNav } from '@/components/layouts/ShopNav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ShopNav />
      {children}
    </div>
  )
}
