import Image from 'next/image'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className='footer-section-wrapper bg-white print:hidden lg:px-56 dark:bg-slate-900'>
      <div className='container-x block mx-auto pt-[56px]'>
        <div className='w-full flex flex-col items-center mb-[50px]'>
          <div className='mb-[40px]'>
            <Link href='/'>
              <Image
                draggable={false}
                src='/leaf_logo.svg'
                alt='Leaf Logo'
                className='dark:invert'
                width={50}
                height={50}
                priority
              />
            </Link>
          </div>

          <div className='w-full h-[1px] bg-[#E9E9E9]'></div>
        </div>

        <div className='flex flex-col items-center md:gap-8 md:px-8 md:items-start lg:flex md:flex-row justify-between mb-[50px]'>
          <div className='lg:w-[424px] flex flex-col  items-center md:items-start  ml-0 mb-10 lg:mb-0'>
            <h1 className='text-[18] font-500 text-[#2F2F2F] mb-5 dark:text-gray-300'>About Us</h1>
            <p className='text-[#9A9A9A] text-center md:text-start text-[15px] w-[247px] leading-[28px]'>
            We offer agricultural solutions to farmers and agribusinesses in Kenya.
            Our aim is to provide the best quality products and services to our customers.
                          </p>
          </div>

          <div className='flex-1 md:flex'>
            <div className='lg:w-1/3 w-full mb-10 lg:mb-0'>
              <div className='mb-5'>
                <h6 className='text-[18] font-500 text-[#2F2F2F] dark:text-gray-300'>Feature</h6>
              </div>
              <div>
                <ul className='flex flex-col space-y-4 '>
                  <li>
                    <a href='/about'>
                      <span className='text-[#9A9A9A] text-[15px] hover:text-primary border-b border-transparent cursor-pointer capitalize'>
                        About Us
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href='/terms-condition'>
                      <span className='text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize'>
                        Terms Condition
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href='/all-products'>
                      <span className='text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize'>
                        Best Products
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className='lg:w-1/3 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0 '>
              <div>
                <div className='mb-5'>
                  <h6 className='text-[18] font-500 text-[#2F2F2F] dark:text-gray-300'>
                    General Links
                  </h6>
                </div>
                <div>
                  <ul className='flex flex-col space-y-4 '>
                    <li>
                      <a href='#'>
                        <span className='text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize'>
                          Blog
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize'>
                          Tracking Order
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize'>
                          Become Seller
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className='lg:w-1/3 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0'>
              <div>
                <div className='mb-5'>
                  <h6 className='text-[18] font-500 text-[#2F2F2F] dark:text-gray-300'>Helpful</h6>
                </div>
                <div>
                  <ul className='flex flex-col space-y-4 '>
                    <li>
                      <a href='#'>
                        <span className='text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize'>
                          Flash Sale
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize'>
                          FAQ
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <span className='text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize'>
                          Support
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t h-[82px] mx-8 flex  justify-between items-center'>
          <div className='flex lg:space-x-5 justify-between items-center mb-3'>
            <span className='sm:text-base text-[10px] text-gray-400 font-300 dark:text-gray-300'>
              &copy; 2022
              <a
                href='#'
                target='_blank'
                rel='noreferrer'
                className='font-500 text-primary mx-1'
              >
                Leaf
              </a>
              All rights reserved
            </span>
          </div>
          <div className=''>
            <p className='text-sm'>Mpesa</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

