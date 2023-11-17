'use client'

import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'
import 'swiper/css'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ProductCard, ShopProductCard } from '@/components/cards/ProductCard'
import { Button, buttonVariants } from '@/components/ui/button'

export default function Home() {
  return (
    <main className='min-h-screen bg-neutral-50 pb-8 pt-6 md:pb-12 md:pt-10 py-32 dark:bg-gray-800'>
      <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center md:px-24 py-12 lg:pt-24 select-none'>
        <h1 className='font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl'>
          Agricultural solutions reimagined.
        </h1>

        <h4 className='max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8'>
          We use Ai to provide all your agricultural solutions in one place.
          Weather Updates, Crop Disease Detection and Solutions, Marketplace and
          many more.
        </h4>

        <div className='space-y-4 md:space-x-4'>
          <Link href='/dashboard' className={cn(buttonVariants({ size: 'lg' }))}>
            Get Started
          </Link>
          <Link
            href={'/shop'}
            target='_blank'
            rel='noreferrer'
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            Discover products
          </Link>
        </div>
      </div>

      <div className='mt-8'>
        <div className='md:w-[65%] mx-auto space-y-8 p-3'>
          <div className='flex items-center justify-center space-x-2 cursor-pointer select-none hover:opacity-70 hover:text-primary'>
            <Link href='/shop' className='text-start font-semibold'>View more top products in marketplace</Link>
            <MdOutlineKeyboardDoubleArrowRight size={19} />
          </div>

          <div className='grid place-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            <ShopProductCard />

            <ShopProductCard />

            <ShopProductCard />

            <ShopProductCard />
          </div>
        </div>

        <p className='scroll-m-20 text-2xl max-w-md font-semibold tracking-tight text-center mx-auto mt-20'>
          The easiest way to elevate and launch your agricultural business
        </p>

        <div className='flex flex-col items-center justify-center gap-16 mt-16 mx-4 md:mx-8'>
          <div className='flex flex-col md:flex-row space-x-4 items-center justify-center rounded-md'>
            <div className='p-3'>
              <Image
                src='/weather_updates.svg'
                height={300}
                width={300}
                alt='Weather updates'
              />
            </div>

            <div className='space-y-2 bg-white p-6 shadow rounded-md dark:bg-neutral-950'>
              <p className='scroll-m-20 text-lg font-semibold tracking-tight'>
                Weather updates every second
              </p>
              <p className='text-sm text-muted-foreground lg:max-w-[350px]'>
                We provide you with updates on the weather every second. This
                helps you to plan your farming activities and also helps you to
                know when to plant and when not to plant.
              </p>
              <Button variant='secondary'>Get Started</Button>
            </div>
          </div>

          <div className='flex flex-col md:flex-row-reverse space-x-4 items-center justify-center rounded-md'>
            <div className='p-3'>
              <Image
                src='/weather_updates.svg'
                height={300}
                width={300}
                alt='Weather updates'
              />
            </div>

            <div className='space-y-2 bg-white p-6 shadow rounded-md dark:bg-neutral-950'>
              <p className='scroll-m-20 text-lg font-semibold tracking-tight'>
                Ai Crop Disease Detection
              </p>
              <p className='text-sm text-muted-foreground lg:max-w-[350px]'>
                Use our Ai to detect crop diseases and get solutions to them. We
                provide you with a database of crop diseases and their
                solutions. Improve your crop yield with our Ai.
              </p>
              <Button variant='secondary'>Get Started</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
