import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'


export function ShopProductCard({ className }: { className?: string }) {
  return (
    <Dialog>
      <Card className={cn('rounded-md', className)}>
        <CardHeader className='p-2 h-[150px] place-items-center overflow-hidden rounded-md transition-all duration-300'>
          <Image
            draggable={false}
            src='https://picsum.photos/400'
            alt='Product Image'
            className='object-cover transition-all rounded-md hover:w-auto hover:h-auto '
            width={150}
            height={150}
            priority
          />
        </CardHeader>

        <CardContent className='p-3'>
          <div className='flex flex-col space-y-[2px]'>
            <DialogTrigger asChild>
              <p className='uppercase cursor-pointer select-none text-[0.6em] font-semibold text-gray-800 line-clamp-2 dark:text-gray-300 hover:underline underline-offset-4 hover:text-gray-600 active:text-gray-800'>
                Product Name that is meant to overlow to the second line and the
                third line
              </p>
            </DialogTrigger>

            <div className='flex items-center justify-between'>
              <p>$100</p>
              <p className='text-xs text-gray-400'>In stock:34</p>
            </div>

            <div>
              <p className='text-xs'>Rating:</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className='p-3 pt-0'>
          <Link
            href='#'
            className={cn(
              'flex items-center justify-start space-x-4 transition-all duration-300 hover:opacity-80 active:opacity-100 w-full',
              buttonVariants({ variant: 'outline' })
            )}
          >
            <p className='text-sm'>Add to Cart</p>
          </Link>
        </CardFooter>
      </Card>

      <DialogContent className='py-12 h-full md:h-fit overflow-y-auto sm:max-w-[700px]'>
        <DialogHeader className='flex md:flex-row gap-4'>
          <Image
            draggable={false}
            src='https://picsum.photos/400'
            alt='Product Image'
            className='object-cover transition-all col-span-2 rounded-md w-auto h-auto '
            width={200}
            height={200}
            priority
          />

          <div className='col-span-2 flex flex-col p-3 border rounded-md'>
            <p className='scroll-m-20 text-start font-medium capitalize tracking-tight text-lg leading-tight'>
              Coffe name that is very long that can wrap to the next line
            </p>

            <div className='flex-1 mt-4'>
              <p className='text-lg font-medium '>Price: $100</p>
              <p>Rating: 4.5</p>
              <p>Stock: 34</p>
            </div>

            <Button type='button' className='mt-3 md:mt-0 md:ml-auto'>
              Add to cart
            </Button>
          </div>
        </DialogHeader>

        <div>
          <p className='scroll-m-20 font-medium tracking-tight text-gray-700'>
            Description:
          </p>
          <p className='text-gray-500 text-sm h-[150px] bg-slate-50 border p-2 mt-2 overflow-y-auto rounded-md'>
            This is a product description that can be some long text.This is a
            product descriptin that can be some long text. This is a product
            description that can be some long text.This is a product descriptin
            that can be some long text. This is a product description that can
            be some long text.This is a product descriptin that can be some long
            text. This is a product description that can be some long text.This
            is a product descriptin that can be some long text.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
