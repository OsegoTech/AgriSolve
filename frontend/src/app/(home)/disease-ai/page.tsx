'use client'

import { FaDisease } from 'react-icons/fa'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LuImage } from 'react-icons/lu'
import { Button } from '@/components/ui/button'
import { BsDatabaseCheck } from 'react-icons/bs'
import { useState } from 'react'
import { predictDisease, predictPest } from '@/apis/apis'
import { useToast } from '@/components/ui/use-toast'
import { AiOutlineReload } from 'react-icons/ai'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const diseases = [
  {
    name: 'Black Rot',
    description:
      'The disease is identified as: Black Rot. It is a fungal disease that affects the leaves, stems, and fruits of the plant. It is caused by the fungus Alternaria brassicicola. The disease is most common in the spring and fall, when temperatures are cool and humidity is high. The fungus can survive in the soil for several years, so it is important to rotate crops and plant resistant varieties. The disease is spread by wind, rain, and insects. The fungus can also be spread by infected seeds, so it is important to use certified seed. The disease can be controlled by planting resistant varieties, rotating crops, and using fungicides.',
  },
  {
    name: 'Leaf Rust',
    description:
      'The disease is identified as: Leaf Rust. It is a fungal disease that affects the leaves, stems, and fruits of the plant. It is caused by the fungus Alternaria brassicicola. The disease is most common in the spring and fall, when temperatures are cool and humidity is high. The fungus can survive in the soil for several years, so it is important to rotate crops and plant resistant varieties. The disease is spread by wind, rain, and insects. The fungus can also be spread by infected seeds, so it is important to use certified seed. The disease can be controlled by planting resistant varieties, rotating crops, and using fungicides.',
  },
  {
    name: 'Powdery Mildew',
    description:
      'The disease is identified as: Powdery Mildew. It is a fungal disease that affects the leaves, stems, and fruits of the plant. It is caused by the fungus Alternaria brassicicola. The disease is most common in the spring and fall, when temperatures are cool and humidity is high. The fungus can survive in the soil for several years, so it is important to rotate crops and plant resistant varieties. The disease is spread by wind, rain, and insects. The fungus can also be spread by infected seeds, so it is important to use certified seed. The disease can be controlled by planting resistant varieties, rotating crops, and using fungicides.',
  },
  {
    name: 'Downy Mildew',
    description:
      'The disease is identified as: Downy Mildew. It is a fungal disease that affects the leaves, stems, and fruits of the plant. It is caused by the fungus Alternaria brassicicola. The disease is most common in the spring and fall, when temperatures are cool and humidity is high. The fungus can survive in the soil for several years, so it is important to rotate crops and plant resistant varieties. The disease is spread by wind, rain, and insects. The fungus can also be spread by infected seeds, so it is important to use certified seed. The disease can be controlled by planting resistant varieties, rotating crops, and using fungicides.',
  },
  {
    name: 'Anthracnose',
    description:
      'The disease is identified as: Anthracnose. It is a fungal disease that affects the leaves, stems, and fruits of the plant. It is caused by the fungus Alternaria brassicicola. The disease is most common in the spring and fall, when temperatures are cool and humidity is high. The fungus can survive in the soil for several years, so it is important to rotate crops and plant resistant varieties. The disease is spread by wind, rain, and insects. The fungus can also be spread by infected seeds, so it is important to use certified seed. The disease can be controlled by planting resistant varieties, rotating crops, and using fungicides.',
  },
]

interface IDisease {
  name: string
  probability: number
  suggestions: string
  treatment: {
    biological: string
    chemical: string
    prevention: string
  }
}

interface IPest {
  common_name: string[]
  name: string
  description: string
  descriprion_url: string
}

export default function Page() {
  const [detectedDisease, setDetectedDisease] = useState<IDisease>()
  const [detectedPest, setDetectedPest] = useState<IPest>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState<'disease' | 'pest'>(
    'disease'
  )

  const [image, setImage] = useState<null | string>()
  const { toast } = useToast()

  const handleRadioChange = (value: 'disease' | 'pest') => {
    setSelectedValue(value)
  }

  const getDisease = async () => {
    setIsLoading(true)
    if (!image) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Please upload an image first.',
      })
      return setIsLoading(false)
    }

    const prediction = await predictDisease({ image })

    setDetectedDisease(prediction)
    setIsLoading(false)
  }

  const getPestData = async () => {
    setIsLoading(true)
    if (!image) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Please upload an image first.',
      })
      return setIsLoading(false)
    }

    const prediction = await predictPest({ image })
    console.log(prediction)

    setDetectedPest(prediction)
    setIsLoading(false)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]

    if (selectedFile) {
      // You can perform additional checks here if needed

      // Use FileReader to convert the selected file to a data URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  return (
    <div className='min-h-screen bg-neutral-50 pb-8 pt-6 md:pb-12 md:pt-10 py-32 lg:px-72  dark:bg-gray-800'>
      <div className='bg-white mx-4 shadow dark:bg-slate-950 rounded-md p-4 lg:w-full'>
        <div className='flex items-center gap-2'>
          <FaDisease size={35} className='text-gray-500 dark:text-primary' />
          <h1 className='scroll-m-20 text-xl font-semibold tracking-tight'>
            Ai Disease and Pest Detection
          </h1>
        </div>
      </div>

      <div className='mt-12 bg-white shadow mx-4 dark:bg-slate-950 rounded-md p-4 lg:w-full'>
        <div className='flex items-center gap-1'>
          <LuImage size={20} className='text-gray-500 dark:text-primary' />
          <h2 className='text-lg font-semibold'>Image Upload</h2>
        </div>
        <h4 className='mt-2 text-sm text-gray-500 font-medium'>
          Upload an image of your plant or pest and we will detect the disease
          or pest:
        </h4>

        <div className='mt-4 grid max-w-sm items-center gap-1.5'>
          <Label htmlFor='image'>Image</Label>

          <div className='flex items-center gap-4'>
            <Input
              id='image'
              type='file'
              accept='.png,.jpeg,.jpg,.webp'
              onChange={handleImageChange}
            />
            <Button
              onClick={selectedValue == 'disease' ? getDisease : getPestData}
            >
              Upload
            </Button>
          </div>
        </div>

        <div className='mt-4'>
          <RadioGroup value={selectedValue} onValueChange={handleRadioChange}>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='disease' id='r1' />
              <Label htmlFor='r1'>Disease</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='pest' id='r2' />
              <Label htmlFor='r2'>Pest</Label>
            </div>
          </RadioGroup>
        </div>

        {isLoading && (
          <div className='flex p-3 justify-center items-center gap-4'>
            <p>Processing image...</p>
            <AiOutlineReload size={24} className='animate-spin' />
          </div>
        )}

        {selectedValue == 'disease' ? (
          <div className='mt-8 flex flex-col gap-2 text-xs text-gray-600 border p-2 rounded-md bg-slate-50 max-h-[150px] overflow-y-auto dark:bg-slate-800 dark:text-gray-300'>
            <p>Name: {detectedDisease?.name}</p>
            <p>Suggestions: {detectedDisease?.suggestions}</p>
            <p>
              Treatment (Biological): {detectedDisease?.treatment.biological}
            </p>
            <p>Treatment (Chemical): {detectedDisease?.treatment.chemical}</p>
            <p>Prevention: {detectedDisease?.treatment.prevention}</p>
          </div>
        ) : (
          <div className='mt-8 flex flex-col gap-2 text-xs text-gray-600 border p-2 rounded-md bg-slate-50 max-h-[150px] overflow-y-auto dark:bg-slate-800 dark:text-gray-300'>
            <p>Name: {detectedPest?.name}</p>
            <p>
            Common Names:{' '}
            {detectedPest?.common_name.map((name) => (
                        <span key={name} className='capitalize'>{name}</span>
                        ))}
            </p>
            <p>Description: {detectedPest?.description}</p>
          </div>
        )}

        <p className='mt-8 text-xs text-gray-500'>
          Note: The image will be uploaded to our server and will be deleted
          after the detection is complete.
        </p>
      </div>

      <div className='mt-12 bg-white shadow mx-4 dark:bg-slate-950 rounded-md p-4 lg:w-full'>
        <div className='flex items-center gap-1'>
          <BsDatabaseCheck
            size={20}
            className='text-gray-500 dark:text-primary'
          />
          <h2 className='text-lg font-semibold capitalize'>
            Common disease database
          </h2>
        </div>

        <div className='mt-4 flex flex-col gap-6'>
          {diseases.map((disease) => (
            <DiseaseCard key={disease.name} {...disease} />
          ))}
        </div>
      </div>
    </div>
  )
}

const DiseaseCard = ({
  name,
  description,
}: {
  name: string
  description: string
}) => {
  return (
    <div className='text-xs text-gray-600 border p-2 rounded-md bg-slate-50 max-h-[150px] overflow-y-auto dark:bg-slate-800 dark:text-gray-300'>
      <p className='font-semibold capitalize'>{name}</p>
      <p className='max-h-200 overflow-y-auto'>{description}</p>
    </div>
  )
}
