import { compose, createStore, applyMiddleware} from 'redux'
import thunk    from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './rootReducer'


export default function configureStore(INITIAL_STATE={}, history){
  
  var middlewares = [
    applyMiddleware(thunk, routerMiddleware(history)) 
  ];

  if (__DEV__ && !__SERVER__)
    middlewares.push( window.devToolsExtension ? window.devToolsExtension() : (f)=> f )

  var store = createStore(
    rootReducer,
    INITIAL_STATE,
    compose(...middlewares)
  );


  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  
  return store;
};