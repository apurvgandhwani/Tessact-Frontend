import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import tokenReducer from './tokenReducer'
import Data from './Data'
import Data_new from './Data_new'
import markerReducer from './markerReducer'
import tagSelectedReducer from './tagSelectedReducer'
import newMarkerReducer from  './newMarkerReducer'
import VideoFileSelectedReducer from './VideoFileSelectedReducer'
import MediaFileStore from './MediaFileStore'
import tagFetchReducer from './tagFetchReducer'
import markerReachedReducer from './markerReachedReducer'
import editTagReducer from './editTagReducer'

export default combineReducers({
  router,
   Data, markerReducer, tokenReducer, tagSelectedReducer, newMarkerReducer, VideoFileSelectedReducer, MediaFileStore, tagFetchReducer, markerReachedReducer, editTagReducer
});