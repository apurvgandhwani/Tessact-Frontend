import Route         from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import Redirect      from 'react-router/lib/Redirect'
import IndexRedirect from 'react-router/lib/IndexRedirect'
import IndexRoute    from 'react-router/lib/IndexRoute'
import {browserHistory} from 'react-router'
import App from './containers/App'
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import VideoScreen from './pages/VideoScreen'
import TagList from './pages/VideoScreen/tagList'
import AddTags from './pages/VideoScreen/addTags'

function getRoutes(store) {

    return (
        <Router>
            <Route path="/" component={LoginPage}/>
            <Route path='app' component={App}>
                <IndexRoute component={Home}/>
                <Route path='/video-screen' component={VideoScreen}>
                    <IndexRoute component={TagList}/>
                    <Route path='/add' component={AddTags}/>
                    <Route path='/TagList' component={TagList}/>
                    <Redirect from='*' to='/'/>
                </Route>
            </Route>
        </Router>
    )
}
export default getRoutes;