import _ from 'lodash'
import React    from 'react'
import ReactDOM from 'react-dom'

import Promise from 'bluebird'

import createHistory  from 'history/lib/createBrowserHistory'
import Router from 'react-router/lib/Router'
import RouterContext from 'react-router/lib/RouterContext'
import match  from 'react-router/lib/match'
import useRouterHistory from 'react-router/lib/useRouterHistory'
import injectTapEventPlugin from 'react-tap-event-plugin';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from 'utils/theme'

import { syncHistoryWithStore } from 'react-router-redux'

import configureStore, { loadState, saveState, storageSupported } from './store'

import getRoutes from './routes'

import Root from 'containers/Root'
import WithStylesContext from 'utils/withStylesContext'
import $ from 'jquery'
var debug = require('debug')('tessact:client')

window.Promise = Promise;
window.$ = window.jQuery = $;
injectTapEventPlugin();

var browserHistory = useRouterHistory(createHistory)({
    queryKey: false,
    basename: '/'
});

var savedState = loadState()
var initialState = _.merge(window.INITIAL_STATE || {}, savedState)

var store   = configureStore(initialState, browserHistory);
var routes  = getRoutes(store);
var history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: (state) => state.router
});


const SKIP_PERSIST_KEYS = ['router']	// Do not get saved to localStorage
if (storageSupported()){
    window.localStorage.debug = 'chqbook:*';
    store.subscribe(_.throttle(()=> {
        debug('Persisting data to store.')
        var data = store.getState();
        saveState( _.omit(data, ...SKIP_PERSIST_KEYS) )
    }, 2000))
}


const ROOT_CONTAINER = document.getElementById('root');
const onRenderComplete = ()=> {
    console.timeEnd('render');
}

if ( __DEV__ ){
    window._STORE = store;
    window.React = React;
    window.ReactDOM = ReactDOM;
}
window.localStorage.debug = 'tessact:*'
window._History = history

let muiTheme = getMuiTheme(theme);
console.time('render');




ReactDOM.render(
	<MuiThemeProvider muiTheme={muiTheme}>
		<Root store={store}>
			<WithStylesContext onInsertCss={styles=> styles._insertCss()}>
				<Router history={history}>
                    {routes}
				</Router>
			</WithStylesContext>
		</Root>
	</MuiThemeProvider>,
    ROOT_CONTAINER,
    onRenderComplete
)
