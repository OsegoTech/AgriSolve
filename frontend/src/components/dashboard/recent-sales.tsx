import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function RecentSales() {
  return (
    <div className='space-y-8'>

      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/01.png' alt='Avatar' />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>

        <div className='ml-4 space-y-1'>
          <div className='flex flex-row justify-between gap-4 items-center w-full'>
            <p className='text-sm font-medium leading-none'>Olivia Martin</p>
            <div className='ml-auto text-sm md:text-base text-primary font-medium'>
              +$1,999.00
            </div>
          </div>
          <p className='text-sm text-muted-foreground'>
            olivia.martin@email.com
          </p>
        </div>
      </div>

    </div>
  )
}
