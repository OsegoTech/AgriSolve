import axios from 'axios'

const MICROSERVICE_URL = 'https://agri-solve-microservice.vercel.app'

const usersApi = axios.create({
  baseURL: `${MICROSERVICE_URL}/api/v1`,
})

export const getCurrentWeather = async ({
  lat,
  lon,
}: {
  lat: number
  lon: number
}) => {
  try {
    const { data } = await usersApi.post('/current_weather', {
      latitude: lat,
      longitude: lon,
    })

    return data
  } catch (err) {
    console.log(err)
  }
}

export const getForecastWeather = async ({
  lat,
  lon,
}: {
  lat: number
  lon: number
}) => {
  try {
    const { data } = await usersApi.post('/forecast', {
      latitude: lat,
      longitude: lon,
    })

    return data
  } catch (err) {
    console.log(err)
  }
}

export const predictDisease = async ({ image }: { image: string }) => {
  try {
    const { data } = await usersApi.post('/crop-disease-detection/detailed', {
      image,
    })

    return data.diseases[0];
  } catch (err) {
    console.log(err)
  }
}
