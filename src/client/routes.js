import Route         from 'react-router/lib/Route'
import Redirect      from 'react-router/lib/Redirect'
import IndexRedirect from 'react-router/lib/IndexRedirect'
import IndexRoute    from 'react-router/lib/IndexRoute'

import App from './containers/App'

import Home from './pages/Home'
import VideoScreen from './pages/VideoScreen'


function getRoutes(store){

	return (
		<Route path='/' component={App}>
			<IndexRoute component={Home}/>
			<Route path='/video-screen' component={VideoScreen}/>
			<Redirect from='*' to='/'/>
		</Route>
	)
}


export default getRoutes;