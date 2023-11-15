import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className='mt-auto bg-white text-center font-Nunito text-neutral-500 lg:text-left '>
      <div className='lgs:p-4 lgs:text-[0.75em] mx-[3rem] flex flex-col justify-between p-2 text-center text-sm md:flex-row md:space-x-6 md:p-6 lg:p-6 lg:text-sm'>
        <div className=''>
          <span>2023 &copy; </span>
          Leaf{' '}
        </div>

        <div className='mt-2 flex flex-col md:mt-0 md:flex-row md:space-x-4'>
          <Link
            href={'#'}
            className='flex cursor-pointer items-center justify-center hover:underline md:justify-start'
          >
            Terms of Service
          </Link>
          <Link
            href={'#'}
            className='flex cursor-pointer items-center justify-center hover:underline md:justify-start'
          >
            Privacy Policy
          </Link>
          <a
            href={'#'}
            className='flex cursor-pointer items-center justify-center hover:underline md:justify-start'
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  )
}
