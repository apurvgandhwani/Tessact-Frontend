import React    from 'react'
import ReactDOM from 'react-dom'

import Promise from 'bluebird'

import createHistory  from 'history/lib/createBrowserHistory'

import RouterContext from 'react-router/lib/RouterContext'
import match  from 'react-router/lib/match'
import useRouterHistory from 'react-router/lib/useRouterHistory'
import injectTapEventPlugin from 'react-tap-event-plugin';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from 'utils/theme'

import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store'
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

var initialState = window.INITIAL_STATE || {};

var store   = configureStore(initialState, browserHistory);
var routes  = getRoutes(store);
var history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
});

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
match({ history, routes }, (error, redirectLocation, renderProps) => {
	ReactDOM.render(
		<MuiThemeProvider muiTheme={muiTheme}>
			<Root store={store}>
				<WithStylesContext onInsertCss={styles=> styles._insertCss()}>
					<RouterContext {...renderProps} />
				</WithStylesContext>
			</Root>
		</MuiThemeProvider>,
		ROOT_CONTAINER,
		onRenderComplete
	)
});