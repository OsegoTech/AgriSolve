import Link from 'next/link'

import { cn } from '@/lib/utils'
import { IoHomeOutline } from 'react-icons/io5'
import { MdOutlineShoppingCart } from 'react-icons/md'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href='/'
        className='hidden  md:flex items-center gap-1 cursor-pointer hover:underline font-medium hover:text-primary underline-offset-4'
      >
        <IoHomeOutline />
        <span>Home</span>
      </Link>

      <Link
        href='/shop'
        className='hidden md:flex items-center gap-1 cursor-pointer hover:underline font-medium hover:text-primary underline-offset-4'
      >
        <MdOutlineShoppingCart />
        <span>Shop</span>
      </Link>
    </nav>
  )
}
