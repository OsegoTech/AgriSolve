import Link from 'next/link'
import Image from 'next/image'
import { CiShop } from 'react-icons/ci'
import { FaDisease } from 'react-icons/fa'
import { ThemeToggle } from '../buttons/ThemeToogle'
import { TiWeatherPartlySunny } from 'react-icons/ti'
import { Button } from '../ui/button'

export default function HomeNav() {
  return (
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

      <ul className='hidden md:flex space-x-4 text-sm'>
        <Link href='/shop' className='cursor-pointer flex items-center gap-1 hover:underline underline-offset-2'>
          <CiShop />
          <span>Shop</span>
        </Link>
        <li className='cursor-pointer flex items-center gap-1 hover:underline underline-offset-2'>
          <TiWeatherPartlySunny />
          <span>Forecasts</span>
        </li>

        <li className='cursor-pointer flex items-center gap-1 hover:underline underline-offset-2'>
          <FaDisease />
          <span>Diseases</span>
        </li>
      </ul>

      <ul className='flex space-x-2 text-sm'>
      <Link href='/login'>
       <Button variant="outline">Login</Button>
       </Link>
       <Link href='/register'>
       <Button >Sign Up</Button>
       </Link>
        <ThemeToggle />
      </ul>
    </nav>
  )
}
