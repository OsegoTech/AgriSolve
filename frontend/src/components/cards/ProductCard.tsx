import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
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

      <CardFooter className='flex items-center space-x-4 pb-4 p-3'>
        <p className='text-sm'>View product</p>
        <FaArrowRightLong className='text-gray-700' />
      </CardFooter>
    </Card>
  )
}
