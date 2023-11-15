import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import Image from 'next/image'
import CartProductCard from '../cards/CartProductCard'

const tags = Array.from({ length: 20 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export function CartSheet({ button }: { button: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>{button}</SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className='flex items-center space-x-2'>
            <MdOutlineShoppingCart />
            <p>Cart(4)</p>
          </SheetTitle>

          <SheetDescription></SheetDescription>
        </SheetHeader>

        <ScrollArea className='max-h-[73%] overflow-y-auto w-full p-2 rounded-md border'>
          {tags.map((tag) => (
            <div key={tag} className='py-2'>
              <CartProductCard
                productPrice={'$24.99'}
                productImage='https://picsum.photos/200'
                productName='Product name that is meant to wrap to two lines'
                isInStock={true}
              />
              <Separator />
            </div>
          ))}
        </ScrollArea>

        <SheetFooter className='mt-8 space-y-2'>
          <div className='flex flex-col space-y-2 items-start justify-center w-full'>
            <p className='uppercase text-xs font-medium'>Cart Summary</p>

            <Separator />

            <div className='flex justify-between w-full text-sm text-primary '>
              <p>Subtotal</p>
              <p>$ 29.99</p>
            </div>

            <Separator />

            <Button className='space-x-2 w-full'>
              <MdOutlineShoppingCart size={20} /> <span>Checkout</span>
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
