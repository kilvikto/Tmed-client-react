import { combineReducers } from 'redux';
import { authReducer } from 'model/user';
import { profileReducer } from 'model/profile';


const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

export default rootReducer;