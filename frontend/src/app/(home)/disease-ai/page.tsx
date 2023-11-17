import { FaDisease } from 'react-icons/fa'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LuImage } from 'react-icons/lu'
import { Button } from '@/components/ui/button'
import { BsDatabaseCheck } from 'react-icons/bs'

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

export default function Page() {
  return (
    <div className='min-h-screen bg-neutral-50 pb-8 pt-6 md:pb-12 md:pt-10 py-32 lg:px-72  dark:bg-gray-800'>
      <div className='bg-white mx-4 shadow dark:bg-slate-950 rounded-md p-4 w-full'>
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
            <Input id='image' type='file' />
            <Button>Upload</Button>
          </div>
        </div>

        <p className='mt-8 text-xs text-gray-600 border p-2 rounded-md bg-slate-50 max-h-[150px] overflow-y-auto'>
          The uploaded image has been analyzed and the results are as follows:
          The disease is identified as: Black Rot. It is a fungal disease that
          affects the leaves, stems, and fruits of the plant. It is caused by
          the fungus Alternaria brassicicola. The disease is most common in the
          spring and fall, when temperatures are cool and humidity is high. The
          fungus can survive in the soil for several years, so it is important
          to rotate crops and plant resistant varieties. The disease is spread
          by wind, rain, and insects. The fungus can also be spread by infected
          seeds, so it is important to use certified seed. The disease can be
          controlled by planting resistant varieties, rotating crops, and using
          fungicides.
        </p>

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
    <div className='text-xs text-gray-600 border p-2 rounded-md bg-slate-50 max-h-[150px] overflow-y-auto'>
      <p className='font-semibold capitalize'>{name}</p>
      <p className='max-h-200 overflow-y-auto'>{description}</p>
    </div>
  )
}
