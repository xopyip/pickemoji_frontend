import { combineReducers } from 'redux'
import authReducer from './auth'

const rootReducer = combineReducers({
  auth: authReducer
});

export type RootType = ReturnType<typeof rootReducer>;

export default rootReducer;