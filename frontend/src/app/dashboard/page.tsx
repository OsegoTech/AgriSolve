import { Metadata } from 'next'
import Image from 'next/image'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MainNav } from '@/components/dashboard/main-nav'
import { Overview } from '@/components/dashboard/overview'
import { RecentSales } from '@/components/dashboard/recent-sales'
import { UserNav } from '@/components/dashboard/user-nav'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import DashProductCard from '@/components/dashboard/product-card'
import { OrdersTable } from '@/components/dashboard/orders-table'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Example dashboard app built using the components.',
}

export default function DashboardPage() {
  return (
    <>
      <div className='flex-col md:flex'>
        <div className='sticky top-0 z-50 bg-white border-b dark:bg-gray-800'>
          <div className='flex h-16 justify-between items-center px-4'>
            <Link href='/'>
              <Image
                draggable={false}
                src='/leaf_logo.svg'
                alt='Leaf Logo'
                className='mx-4 dark:invert'
                width={33}
                height={33}
                priority
              />
            </Link>
            <MainNav className='mx-auto' />

            <div className='ml-auto flex items-center space-x-4'>
              <UserNav />
            </div>
          </div>
        </div>

        <div className='flex-1 space-y-4 p-8 pt-6 bg-neutral-50 dark:bg-gray-900'>
          <div className='flex items-center justify-between space-y-2'>
            <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
          </div>

          <Tabs defaultValue='overview' className='space-y-4'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='market'>Market</TabsTrigger>
            </TabsList>

            <OverviewTab />
            <MarketTab />
          </Tabs>
        </div>
      </div>
    </>
  )
}

const OverviewTab = () => {
  return (
    <TabsContent value='overview' className='space-y-4'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$45,231.89</div>
            <p className='text-xs text-muted-foreground'>
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Subscriptions</CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
              <circle cx='9' cy='7' r='4' />
              <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
            </svg>
          </CardHeader>

          <CardContent>
            <div className='text-2xl font-bold'>+2350</div>
            <p className='text-xs text-muted-foreground'>
              +180.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Sales</CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <rect width='20' height='14' x='2' y='5' rx='2' />
              <path d='M2 10h20' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>+12,234</div>
            <p className='text-xs text-muted-foreground'>
              +19% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Now</CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
            </svg>
          </CardHeader>

          <CardContent>
            <div className='text-2xl font-bold'>+573</div>
            <p className='text-xs text-muted-foreground'>
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className='md:pl-2'>
            <Overview />
          </CardContent>
        </Card>

        <Card className='col-span-4 md:col-span-3'>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>

          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  )
}

const products = [
  {
    productName: 'Wheat',
    productPrice: '$24.99',
    productImage: 'https://picsum.photos/200',
    description:
      'Whole wheat grains that can be milled to produce quality flour.',
    isInStock: true,
  },
  {
    productName: 'Milk',
    productPrice: '$24.99',
    productImage: 'https://picsum.photos/200',
    description:
      'Whole wheat grains that can be milled to produce quality flour.',
    isInStock: true,
  },
  {
    productName: 'Flour',
    productPrice: '$24.99',
    productImage: 'https://picsum.photos/200',
    description:
      'Whole wheat grains that can be milled to produce quality flour.',
    isInStock: true,
  },
  {
    productName: 'Wheat',
    productPrice: '$24.99',
    productImage: 'https://picsum.photos/200',
    description:
      'Whole wheat grains that can be milled to produce quality flour.',
    isInStock: true,
  },
  {
    productName: 'Milk',
    productPrice: '$24.99',
    productImage: 'https://picsum.photos/200',
    description:
      'Whole wheat grains that can be milled to produce quality flour.',
    isInStock: true,
  },
  {
    productName: 'Flour',
    productPrice: '$24.99',
    productImage: 'https://picsum.photos/200',
    description:
      'Whole wheat grains that can be milled to produce quality flour.',
    isInStock: true,
  },
]

const MarketTab = () => {
  return (
    <TabsContent value='market' className='space-y-4'>
      <div className='flex flex-col md:flex-row gap-4'>

        <div className='flex-1 p-2 shadow rounded-md bg-white h-[60%]'>
          <div className='flex justify-between items-center bg-white'>
            <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
              My products
            </h3>
            <Button variant='outline'> Add Product </Button>
          </div>

          <div className='flex flex-col p-4 py-4 gap-4 mt-4 overflow-y-auto'>
            {products.map((product) => {
              return (
                <DashProductCard
                  isInStock={product.isInStock}
                  productPrice={product.productPrice}
                  productName={product.productName}
                  productImage={product.productImage}
                  description={product.description}
                />
              )
            })}
          </div>
        </div>

        <div className='flex-1 shadow rounded-md p-4 bg-white h-[60%]'>
          <h3 className='mb-4 scroll-m-20 text-2xl font-semibold tracking-tight'>
            My pending Orders
          </h3>

          <OrdersTable/>
        </div>
      </div>
    </TabsContent>
  )
}
