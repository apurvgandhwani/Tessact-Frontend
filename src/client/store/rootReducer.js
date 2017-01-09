import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import Data from './Data'

export default combineReducers({
  router,
  Data
});