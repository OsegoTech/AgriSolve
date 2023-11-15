'use client'

import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'
import { ProductCard } from '@/components/cards/ProductCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export default function Home() {
  return (
    <main className='min-h-screen bg-gray-50'>
      <div className='md:px-24 py-14 select-none'>
        <h1 className='scroll-m-20 text-4xl py-6 text-center font-extrabold tracking-tight lg:text-5xl'>
          Agricultural solutions reimagined.
        </h1>

        <h4 className='scroll-m-20 text-xl text-center text-gray-400 tracking-tight'>
          Use Leaf to get all your agricultural solutions you love in one place.
        </h4>
      </div>

      <div className='mt-4'>
        <div className='w-[65%] mx-auto space-y-4 p-3'>
          <div className='flex items-center justify-center space-x-2 cursor-pointer select-none hover:opacity-70'>
            <p className='text-start font-semibold'>Continue to marketplace</p>
            <MdOutlineKeyboardDoubleArrowRight size={19} />
          </div>

          <Swiper slidesPerView={4} spaceBetween={10}>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>

            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>

            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>

            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </main>
  )
}
