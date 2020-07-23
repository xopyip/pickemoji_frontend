import {createSlice} from '@reduxjs/toolkit'


export interface StateType {
  token: false | string
}

let initialState : StateType = {
  token: false
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      const { token } = action.payload;
      state.token = token;
    },
  }
})


export const { setToken } = authSlice.actions

export default authSlice.reducer