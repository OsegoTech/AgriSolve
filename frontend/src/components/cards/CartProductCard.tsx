import Image from 'next/image'
import { Button } from '../ui/button'

interface ICartProductCardProps {
  productName: string
  productPrice: string
  productImage: string
  isInStock: boolean
}

export default function CartProductCard({
  isInStock,
  productName,
  productPrice,
  productImage,
}: ICartProductCardProps) {
  return (
    <div className='p-2 grid grid-cols-4 place-content-center'>
      <div className='p-2 col-span-1 overflow-hidden rounded-md'>
        <Image
          draggable={false}
          src={productImage}
          alt='Leaf Logo'
          className='h-auto w-auto object-cover transition-all hover:scale-105 rounded-md'
          width={150}
          height={150}
          priority
        />
      </div>

      <div className='col-span-3 text-gray-800'>
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

          <Button variant='secondary' size='sm' className='p-3 ml-auto'>
            Remove
          </Button>
        </div>
      </div>
    </div>
  )
}
