import Image from 'next/image'
import { useToast } from '../ui/use-toast'
import { LoginDialog } from '../logins/Login'
import { SignUpDialog } from '../logins/Signup'

export default function HomeNav() {
  const { toast } = useToast()
  return (
    <nav className='sticky z-50 top-0 backdrop:blur-lg flex bg-white shadow-sm flex-row items-center justify-between p-2 px-4 lg:px-8'>
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
        <li
          onClick={() => {
            toast({
              title: 'Marketplace',
              description: 'Coming soon!',
            })
          }}
          className='cursor-pointer'
        >
          Marketplace
        </li>
        <li className='cursor-pointer'>Explore</li>
        <li className='cursor-pointer'>Forecasts</li>
      </ul>

      <ul className='flex space-x-2 text-sm'>
        <LoginDialog />
        <SignUpDialog />
      </ul>
    </nav>
  )
}
