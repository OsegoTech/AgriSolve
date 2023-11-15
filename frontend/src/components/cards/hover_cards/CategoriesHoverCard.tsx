import { HoverCardTemplate } from './HoverCard'

export default function CategoriesHoverCard() {
  return (
    <HoverCardTemplate
      width='w-48'
      body={
        <div className='divide-y'>
          <p className='text-primary text-base font-medium'>Categories</p>
          <ul className='space-y-1 mt-2 py-2'>
            <li className='cursor-pointer hover:underline underline-offset-2'>
              Category 1
            </li>
            <li className='cursor-pointer hover:underline underline-offset-2'>
              Category 2
            </li>
            <li className='cursor-pointer hover:underline underline-offset-2'>
              Category 3
            </li>
            <li className='cursor-pointer hover:underline underline-offset-2'>
              Category 4
            </li>
          </ul>
        </div>
      }
    >
      Categories
    </HoverCardTemplate>
  )
}
