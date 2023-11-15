import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRightLong } from 'react-icons/fa6'

export function ProductCard() {
  return (
    <Card className='w-[250px] rounded-md'>
      <CardHeader className='p-2 h-[200px] overflow-hidden rounded-md'>
        <Image
          draggable={false}
          src='https://picsum.photos/200'
          alt='Leaf Logo'
          className='h-auto w-auto object-cover transition-all hover:scale-105 rounded-md'
          width={150}
          height={150}
          priority
        />
      </CardHeader>

      <CardContent className='p-3'>
        <div>
          <p className='uppercase text-[0.6em] font-semibold text-gray-800 truncate'>
            Product Name
          </p>
          <p>$100</p>
          <p className='capitalize text-[0.8em] text-gray-800 line-clamp-2'>
            This is the product description that goes on and on.
          </p>
        </div>
      </CardContent>

      <CardFooter className='p-3 pt-0' >
      <Link href='#' className='flex items-center justify-start space-x-4 transition-all duration-300 hover:opacity-80 active:opacity-100'>
        <p className='text-sm'>View product</p>
        <FaArrowRightLong className='text-gray-700' />
        </Link>
      </CardFooter>
    </Card>
  )
}
