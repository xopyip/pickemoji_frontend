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
      state.token = action.payload;
    },
  }
})


export const { setToken } = authSlice.actions

export default authSlice.reducer