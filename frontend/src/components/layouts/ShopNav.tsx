import Image from 'next/image'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { ThemeToggle } from '../buttons/ThemeToogle'
import { Button } from '../ui/button'
import Link from 'next/link'
import { CartSheet } from '../modals/CartSheet'
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
      <nav className='sticky z-50 h-16 top-0 backdrop:blur-lg flex bg-white shadow-sm flex-row items-center justify-between p-2 px-4 lg:px-72 dark:bg-gray-800'>
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
          className='cursor-pointer hover:underline font-medium text-primary underline-offset-4'
          >
          Home
          </Link>

          <li className='cursor-pointer hover:underline font-medium text-primary underline-offset-4'>
            Offers
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
  )
}
