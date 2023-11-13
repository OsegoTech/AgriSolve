import Image from 'next/image'
import PrimaryButton from '../buttons/PrimaryButton'

export default function HomeNav() {
  return (
    <nav className='flex flex-row items-center justify-between p-2 lg:px-8'>
      <Image
        draggable={false}
        src='/leaf_logo.svg'
        alt='Leaf Logo'
        className='invert dark:invert-0'
        width={33}
        height={33}
        priority
      />

      <ul className='flex space-x-4 text-xs'>
        <li>Marketplace</li>
        <li>Explore</li>
        <li>Forecasts</li>
      </ul>

      <ul className='flex space-x-4 text-sm'>
        <PrimaryButton onClick={() => {}} className='text-xs rounded-[4px] py-3 px-4'>Log in</PrimaryButton>
        <PrimaryButton onClick={() => {}} className='text-xs rounded-[4px] py-3 px-4'>Sign up</PrimaryButton>
      </ul>
    </nav>
  )
}
