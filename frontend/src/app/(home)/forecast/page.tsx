'use client'

import { getCurrentWeather, getForecastWeather } from '@/apis/apis'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { LuCloudSun } from 'react-icons/lu'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

interface ILocation {
  lat: number
  lon: number
}

interface IWeather {
  icon: string
  is_day: number
  temp: number
  text: string
}

interface IForecast {
  condition: string
  date: string
  icon: string
  rain_chance: string
  temperature: {
    High: string
    Low: string
  }
}

export default function Page() {
  const [location, setLocation] = useState<ILocation>()
  const [weather, setWeather] = useState<IWeather>()
  const [forecast, setForecast] = useState<IForecast[]>([])

  const fetchWeather = async (lat: number, lon: number) => {
    const res = await getCurrentWeather({ lat, lon })
    setWeather(res.weather)
  }

  const getForecast = async (lat: number, lon: number) => {
    const res = await getForecastWeather({ lat, lon })
    console.log(res.forecast)
    setForecast(res.forecast)
  }

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      })
    })
  }, [])

  useEffect(() => {
    if (!location) return
    fetchWeather(location.lat, location.lon)
    getForecast(location.lat, location.lon)
  }, [location])

  return (
    <div className='min-h-screen bg-neutral-50 pb-8 pt-6 md:pb-12 md:pt-10 py-32 lg:px-72  dark:bg-gray-800'>
      <div className='bg-white shadow mx-4 dark:bg-slate-950 rounded-md p-4 lg:w-full'>
        <div className='flex items-center gap-2'>
          <LuCloudSun size={35} className='text-gray-500 dark:text-primary' />
          <h1 className='scroll-m-20 text-xl font-semibold tracking-tight'>
            Your Custom Weather Forecast
          </h1>
        </div>
      </div>

      <div className='mt-12 bg-white shadow mx-4 dark:bg-slate-950 rounded-md p-4 '>
        <div className='flex gap-4 flex-col md:flex-row mt-3'>
          <Image
            src={weather?.icon || '/weather_updates.svg'}
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
              <p>{weather?.text}</p>
            </div>
            <Separator />

            <div className='flex items-center justify-between'>
              <p className='font-medium'>Temperature High:</p>
              <p>{weather?.temp} C</p>
            </div>
            <Separator />

            <div className='flex items-center justify-between'>
              <p className='font-medium'>Temperature Low:</p>
              <p>{weather?.temp && weather?.temp - 1.2} C</p>
            </div>
            <Separator />

            <div className='flex items-center justify-between'>
              <p className='font-medium'>Rain Chance:</p>
              <p>{Math.floor(Math.random() * 5)}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-12 bg-white shadow mx-4 dark:bg-slate-950 rounded-md p-4 '>
        <p className='font-semibold capitalize'>
          Weather Forecast for the next 7 days:
        </p>
      </div>

      <div className='grid place-items-center mx-4 grid-cols-3 gap-4 md:gap-8 md:grid-cols-5 lg:grid-cols-7 mt-8'>
        {forecast.map((prediction) => (
          <ForecastCard
            key={prediction.date}
            date={prediction.date}
            image={prediction.icon}
            high={prediction.temperature?.High}
            low={prediction.temperature?.Low}
          />
        ))}
      </div>
    </div>
  )
}

function convertDate(date: string) {
  const dateObject = new Date(date)

  // Get the day in short format (e.g., "Mon")
  const options: Intl.DateTimeFormatOptions = { weekday: 'short' }
  const shortDay: string = dateObject.toLocaleDateString('en-US', options)

  return shortDay
}

const ForecastCard = ({
  date,
  image,
  high,
  low,
}: {
  date: string
  image: string
  high: string
  low: string
}) => {
  return (
    <div className='col-span-1 bg-white p-2 shadow w-fit rounded-md dark:bg-slate-950'>
      <p className='text-sm text-center font-medium'>{convertDate(date)}</p>
      <Image
        src={image || '/weather_updates.svg'}
        height={100}
        width={100}
        alt='Weather updates'
      />
      <div className='flex justify-between items-center gap-2 font-semibold text-xs mt-2 px-2'>
        <p>{high}</p>
        <p className='opacity-80'>{low}</p>
      </div>
    </div>
  )
}
