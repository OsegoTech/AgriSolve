'use client'

import Image from 'next/image'
import { IoReload } from 'react-icons/io5'
import { TfiShoppingCart } from 'react-icons/tfi'
import { RiSecurePaymentLine } from 'react-icons/ri'
import { GoTrophy } from 'react-icons/go'
import { ShopProductCard } from '@/components/cards/ProductCard'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const products = [
  'apple',
  'banana',
  'blueberry',
  'grapes',
  'pineapple',
  'strawberry',
  'watermelon',
  'orange',
  'lemon',
  'mango',
  'kiwi',
  'avocado',
  'peach',
  'cherry',
  'coconut',
  'pear',
  'papaya',
  'figs',
  'plum',
  'pomegranate',
  'lychee',
  'date',
  'dragonfruit',
  'guava',
  'jackfruit',
  'passionfruit',
  'persimmon',
]

export default function Page({params}:{params:{category:string}}) {

  return (
    <div className='px-4 lg:px-72 space-y-8 min-h-screen py-8 pb-20 bg-neutral-50 font-primary dark:bg-slate-800'>
      <MarketingStrip />

      <ProductCategory categoryName={params.category} products={products} />
    </div>
  )
}

const MarketingStrip = () => {
  return (
    <>
      <div className='flex flex-col gap-4 md:flex-row items-center p-3 border rounded-md bg-white shadow justify-evenly lg:justify-between'>
        <Image
          draggable={false}
          src='/shop_weekly.avif'
          alt='Leaf Logo'
          className='w-full md:h-auto md:w-auto'
          width={150}
          height={150}
          priority
        />

        <Image
          draggable={false}
          src='/thanks_giving.png'
          alt='Leaf Logo'
          className='hidden animate-bounce lg:inline-block w-full md:h-auto md:w-auto'
          width={130}
          height={130}
          priority
        />

        <Image
          draggable={false}
          src='/pre_order.avif'
          alt='Leaf Logo'
          className='w-full md:h-auto md:w-auto'
          width={150}
          height={150}
          priority
        />
      </div>

      <div className='w-full bg-white shadow flex flex-col md:flex-row justify-between md:items-center pl-12 md:pl-4 p-4 rounded mt-8 dark:bg-gray-900'>
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
    </>
  )
}

const ProductCategory = ({
  categoryName,
  products,
}: {
  categoryName: string
  products: string[]
}) => {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between bg-white border p-2 rounded-md dark:bg-state-900'>
        <p className='scroll-m-20 capitalize text-2xl font-semibold tracking-tight'>
          {categoryName}
        </p>
        <Link
          href='/shop'
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          Back
        </Link>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-4 place-items-center gap-4  md:flex-row'>
        {products.map((product) => (
          <ShopProductCard key={product} className='col-span-1' />
        ))}
      </div>
    </div>
  )
}
