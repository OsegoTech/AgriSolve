import Image from 'next/image'
import PrimaryButton from '../buttons/PrimaryButton'
import { useToast } from '../ui/use-toast'

export default function HomeNav() {
  const { toast } = useToast()
  return (
    <nav className='flex flex-row items-center justify-between p-2 px-4 lg:px-8'>
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

      <ul className='flex space-x-4 text-sm'>
        <PrimaryButton
          variant='outline'
          onClick={() => {}}
          className='text-xs rounded-[4px] py-3 px-4'
        >
          Log in
        </PrimaryButton>
        <PrimaryButton
          onClick={() => {}}
          className='text-xs rounded-[4px] py-3 px-4'
        >
          Sign up
        </PrimaryButton>
      </ul>
    </nav>
  )
}
