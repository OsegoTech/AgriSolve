import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRightLong } from 'react-icons/fa6'
import { buttonVariants } from '../ui/button'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
          <p className='uppercase text-[0.6em] font-semibold text-gray-800 truncate dark:text-gray-300'>
            Product Name
          </p>
          <p>$100</p>
          <p className='capitalize text-[0.8em] text-gray-800 line-clamp-2 dark:text-gray-300'>
            This is the product description that goes on and on.
          </p>
        </div>
      </CardContent>

      <CardFooter className='p-3 pt-0'>
        <Link
          href='#'
          className='flex items-center justify-start space-x-4 transition-all duration-300 hover:opacity-80 active:opacity-100'
        >
          <p className='text-sm'>View product</p>
          <FaArrowRightLong className='text-gray-700 dark:text-gray-200' />
        </Link>
      </CardFooter>
    </Card>
  )
}

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

      <DialogContent className='sm:max-w-[425px]'>
       <Image
            draggable={false}
            src='https://picsum.photos/400'
            alt='Product Image'
            className='object-cover transition-all mx-auto rounded-md w-auto h-auto '
            width={200}
            height={200}
            priority
          />

        <DialogHeader>
          <DialogTitle className='line-clamp-1 capitalize'>Coffe name that is very long that can wrap to the next line</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              id='name'
              defaultValue='Pedro Duarte'
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Username
            </Label>
            <Input
              id='username'
              defaultValue='@peduarte'
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
