import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UserType = {
  access_token: string
  name: string
  email: string
  photo: string
  message: string
  verified: boolean
  has_api_key: boolean
  created_at: string
}

interface IUserState {
  isLoggedIn: boolean
  user: UserType
}

const initialUserState: IUserState = {
  isLoggedIn: false,
  user: {
    access_token: '',
    name: '',
    email: '',
    photo: '',
    message: '',
    verified: false,
    has_api_key: false,
    created_at: ''
  }
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialUserState,
  reducers: {
    setUserData(state, action: PayloadAction<UserType>) {
      ; (state.isLoggedIn = true),
        (state.user.name = action.payload.name),
        (state.user.email = action.payload.email),
        (state.user.verified = action.payload.verified),
        (state.user.created_at = action.payload.created_at),
        (state.user.access_token = action.payload.access_token),
        (state.user.photo = action.payload.photo),
        (state.user.message = action.payload.message),
        (state.user.has_api_key = action.payload.has_api_key)
    },
    logOutUser(state) {
      ; (state.isLoggedIn = false),
        (state.user.access_token = ''),
        (state.user.email = '')
    },
    updateHasApiKey(state, action: PayloadAction<boolean>) {
      state.user.has_api_key = action.payload
    },
    updateUsername(state, action: PayloadAction<string>) {
      state.user.name = action.payload
    }
  }
})

export const { setUserData, logOutUser, updateHasApiKey, updateUsername } =
  userSlice.actions
export default userSlice
