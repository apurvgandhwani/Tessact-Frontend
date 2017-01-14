import {Route}         from 'react-router'
import Redirect      from 'react-router/lib/Redirect'
import IndexRedirect from 'react-router/lib/IndexRedirect'
import {IndexRoute}    from 'react-router'
import {browserHistory} from 'react-router'
import App from './containers/App'
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import VideoScreen from './pages/VideoScreen'
import {Router} from "react-router";

function getRoutes(store) {

    return (
        <Route path='/' component={App}>
            <IndexRoute component={Home}/>
            <Route path='/video-screen' component={VideoScreen}/>
            <Redirect from='*' to='/'/>
        </Route>
    )
}


export default getRoutes;