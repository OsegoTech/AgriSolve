import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import Image from 'next/image'

export function ProductCard() {
  return (
    <Card className='w-[250px]'>
      <CardHeader className='p-0 h-[150px] overflow-hidden rounded-t-md'>
        <Image
          draggable={false}
          src='https://picsum.photos/200'
          alt='Leaf Logo'
          className='w-full rounded-t-md'
          width={150}
          height={150}
          priority
        />
      </CardHeader>

      <CardContent className='p-2'>
        <div>
          <p className='uppercase text-[0.6em] font-semibold text-gray-800 truncate'>Product Name</p>
          <p>$100</p>
          <p className='capitalize text-[0.8em] text-gray-800'>Location</p>
        </div>
      </CardContent>

      <CardFooter className='flex justify-center pb-4 pt-2 px-2 items-center'>
        <Button className='w-full rounded-2xl'>Add to cart</Button>
      </CardFooter>
    </Card>
  )
}
