import Image from 'next/image'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { ThemeToggle } from '../buttons/ThemeToogle'
import { Button } from '../ui/button'
import Link from 'next/link'
import { CartSheet } from '../modals/CartSheet'
import { IoHomeOutline } from 'react-icons/io5'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { FaRegHandshake } from 'react-icons/fa'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const ShopNav = () => {
  return (
    <nav className='sticky z-50 h-16 top-0 backdrop:blur-lg flex bg-white shadow-sm flex-row items-center justify-between p-2 px-4 lg:px-72 dark:border-b dark:border-slate-700 dark:bg-gray-800'>
      <Link href='/'>
        <Image
          draggable={false}
          src='/leaf_logo.svg'
          alt='Leaf Logo'
          className='dark:invert'
          width={33}
          height={33}
          priority
        />
      </Link>

      <ul className='flex items-center space-x-4 text-sm'>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select Category' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value='apple'>Fruits</SelectItem>
              <SelectItem value='banana'>Flower</SelectItem>
              <SelectItem value='blueberry'>Cereals</SelectItem>
              <SelectItem value='grapes'>Meats</SelectItem>
              <SelectItem value='pineapple'>Vegetables</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Link
          href='/'
          className='hidden  md:flex items-center gap-1 cursor-pointer hover:underline font-medium text-primary underline-offset-4'
        >
          <IoHomeOutline />
          <span>Home</span>
        </Link>

        <Link
          href='/shop'
          className='hidden md:flex items-center gap-1 cursor-pointer hover:underline font-medium text-primary underline-offset-4'
        >
          <MdOutlineLocalOffer />
          <span>Offers</span>
        </Link>

        <Link
          href='/'
          className='hidden md:flex items-center gap-1 cursor-pointer hover:underline font-medium text-primary underline-offset-4'
        >
          <FaRegHandshake size={18} />
          <span>Terms</span>
        </Link>
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
  )
}
