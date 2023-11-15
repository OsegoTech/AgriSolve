import Image from 'next/image'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { ThemeToggle } from '../buttons/ThemeToogle'
import { Button } from '../ui/button'
import Link from 'next/link'
import CategoriesHoverCard from '../cards/hover_cards/CategoriesHoverCard'
import { CartSheet } from '../modals/CartSheet'

export const ShopNav = () => {
  return (
    <nav>
      <nav className='sticky z-50 h-16 top-0 backdrop:blur-lg flex bg-white shadow-sm flex-row items-center justify-between p-2 px-4 lg:px-8 dark:bg-gray-800'>
        <Image
          draggable={false}
          src='/leaf_logo.svg'
          alt='Leaf Logo'
          className='dark:invert'
          width={33}
          height={33}
          priority
        />

        <ul className='flex flex-col md:flex-row items-center space-x-4 text-sm'>
          <Link
            href='/'
            className='cursor-pointer hover:underline font-medium text-primary underline-offset-4'
          >
            Home
          </Link>

          <CategoriesHoverCard />

          <li className='cursor-pointer hover:underline font-medium text-primary underline-offset-4'>
            About
          </li>

          <li className='cursor-pointer hover:underline font-medium text-primary underline-offset-4'>
            Terms
          </li>
        </ul>

        <ul className='flex space-x-2 text-sm'>
          <CartSheet
            button={
              <Button className='p-3'>
                <MdOutlineShoppingCart size={20} />
              </Button>
            }
          />
          <ThemeToggle />
        </ul>
      </nav>
    </nav>
  )
}
