import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { LuCloudSun } from 'react-icons/lu'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function Page() {
  return (
    <div className='min-h-screen bg-neutral-50 pb-8 pt-6 md:pb-12 md:pt-10 py-32 lg:px-72  dark:bg-gray-800'>
      <div className='bg-white mx-4 dark:bg-slate-950 rounded-md p-4 w-full'>
        <div className='flex items-center gap-2'>
          <LuCloudSun size={35} className='text-gray-500 dark:text-primary' />
          <h1 className='scroll-m-20 text-xl font-semibold tracking-tight'>
            Your Custom Weather Forecast
          </h1>
        </div>
      </div>

      <div className='mt-12 bg-white mx-4 dark:bg-slate-950 rounded-md p-4 '>
        <div className='flex gap-4 flex-col md:flex-row mt-3'>
          <Image
            src='/weather_updates.svg'
            height={300}
            width={300}
            alt='Weather updates'
          />

          <div className='flex-1 flex flex-col gap-4'>
            <p className='font-semibold capitalize'>
              Weather Forecast for today:
            </p>
            <div className='flex items-center justify-between'>
              <p className='font-medium'>Current Condition:</p>
              <p>Overcast</p>
            </div>
            <Separator />

            <div className='flex items-center justify-between'>
              <p className='font-medium'>Temperature High:</p>
              <p>27.3 C</p>
            </div>
            <Separator />

            <div className='flex items-center justify-between'>
              <p className='font-medium'>Temperature Low:</p>
              <p>21.3 C</p>
            </div>
            <Separator />

            <div className='flex items-center justify-between'>
              <p className='font-medium'>Rain Chance:</p>
              <p>0%</p>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-12 bg-white mx-4 dark:bg-slate-950 rounded-md p-4 '>
        <p className='font-semibold capitalize'>
          Weather Forecast for the next 7 days:
        </p>
      </div>

      <div className='grid place-items-center mx-4 grid-cols-3 gap-4 md:gap-8 md:grid-cols-5 lg:grid-cols-7 mt-8'>
        {days.map((day) => (
          <ForecastCard key={day} day={day} />
        ))}
      </div>
    </div>
  )
}

const ForecastCard = ({ day }: { day: string }) => {
  return (
    <div className='col-span-1 bg-white p-2 shadow w-fit rounded-md'>
      <p className='text-sm text-center font-medium'>{day}</p>
      <Image
        src='/weather_updates.svg'
        height={100}
        width={100}
        alt='Weather updates'
      />
      <div className='flex justify-between items-center font-semibold text-xs mt-2 px-2'>
        <p>27.3&deg;</p>
        <p className='opacity-80'>21.3&deg;</p>
      </div>
    </div>
  )
}
