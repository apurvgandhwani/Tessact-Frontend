import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import tokenReducer from './tokenReducer'
import Data from './Data'
import markerReducer from './markerReducer'

export default combineReducers({
  router,
  Data, markerReducer, tokenReducer
});