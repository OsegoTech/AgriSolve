import Image from 'next/image'
import { Button } from '../ui/button'

interface IDashProductCardProps {
  productName: string
  productImage: string
  productPrice: string
  isInStock: boolean
  description: string
}

export default function DashProductCard({
  productPrice,
  productName,
  productImage,
  isInStock,
  description,
}: IDashProductCardProps) {
  return (
    <div className='p-3 border rounded-md flex flex-col md:flex-row md:space-x-12'>
      <div className='p-2 col-span-1 rounded-md'>
        <Image
          draggable={false}
          src={productImage}
          alt='Product Image'
          className='h-auto mx-auto w-fit transition-all'
          width={100}
          height={100}
          priority
        />
      </div>

      <div className='flex-1 text-gray-800'>
        <p className='capitalize line-clamp-2 font-medium text-sm'>
          {productName}
        </p>

        <div className='flex'>
          <div>
            <p className='text-xs capitalize'>
              {isInStock ? 'In Stock' : 'Out of Stock'}
            </p>

            <p className='text-sm font-medium text-primary'>{productPrice}</p>
          </div>
        </div>

        <div className='mt-2 flex md:justify-between w-full md:space-x-4'>
          <p className='hidden md:block text-sm h-[80px] bg-slate-50 p-1 rounded-md border flex-1  overflow-y-auto'>
            {description}
          </p>

          <div className='flex md:flex-col gap-2'>
            <Button
              variant='default'
              size='sm'
              className='mt-auto p-3 md:ml-auto w-full'
            >
              Edit
            </Button>

            <Button
              variant='secondary'
              size='sm'
              className='mt-auto p-3 md:ml-auto'
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
