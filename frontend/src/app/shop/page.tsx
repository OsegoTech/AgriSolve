import Image from 'next/image'
import {IoReload} from 'react-icons/io5'
import { TfiShoppingCart } from 'react-icons/tfi'
import { RiSecurePaymentLine } from "react-icons/ri";
import { GoTrophy } from "react-icons/go";

export default function Page() {
  return (
    <div className='px-72 min-h-screen py-8 bg-neutral-50 font-primary'>
      <div className='flex items-center p-3 border rounded-md bg-white shadow justify-between'>
        <Image
          draggable={false}
          src='/shop_weekly.avif'
          alt='Leaf Logo'
          className='h-auto w-auto dark:invert'
          width={150}
          height={150}
          priority
        />

        <Image
          draggable={false}
          src='/thanks_giving.png'
          alt='Leaf Logo'
          className='h-auto w-auto dark:invert'
          width={150}
          height={150}
          priority
        />

        <Image
          draggable={false}
          src='/pre_order.avif'
          alt='Leaf Logo'
          className='h-auto w-auto dark:invert'
          width={150}
          height={150}
          priority
        />
      </div>
      <div className='w-full bg-white flex justify-between items-center p-4 rounded mt-8 '>
        <div className='flex items-center space-x-3 p-3'>
          <TfiShoppingCart size={36} className='text-orange-600' />
          <div className='space-y-1'>
            <p className='text-xs font-medium'>Free Shipping</p>
            <p className='text-xs font-medium text-gray-400'>
              On Orders Over $100
            </p>
          </div>
        </div>

        <div className='flex items-center space-x-3 p-3'>
          <IoReload size={36} className='text-orange-600' />
          <div className='space-y-1'>
            <p className='text-xs font-medium'>Free Return</p>
            <p className='text-xs font-medium text-gray-400'>
              Get returns on viable orders
            </p>
          </div>
        </div>

        <div className='flex items-center space-x-3 p-3'>
          <RiSecurePaymentLine size={36} className='text-orange-600' />
          <div className='space-y-1'>
            <p className='text-xs font-medium'>Secure Payments</p>
            <p className='text-xs font-medium text-gray-400'>
              100% Secure Online Payments
            </p>
          </div>
        </div>

        <div className='flex items-center space-x-3 p-3'>
          <GoTrophy size={36} className='text-orange-600' />
          <div className='space-y-1'>
            <p className='text-xs font-medium'>Best Quality</p>
            <p className='text-xs font-medium text-gray-400'>
              Original Products Guaranteed
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
