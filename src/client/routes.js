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
import TestVideoPage from './pages/TestVideoPage'
import TaggingVideoPage from './pages/TaggingVideoPage'
import TagList from './pages/VideoScreen/tagList'
import AddTags from './pages/VideoScreen/addTags'
import EditTag from './pages/VideoScreen/editTag'
import ImageUploadPage from './pages/ImageUploadPage'
import NewUploadPage from './pages/NewUploadPage'
import NewVideoPage from './pages/NewVideoPage'

import GroupsPage from './pages/GroupsPage'

const debug = require('debug')('tessact:client-router');

function authorize(){
    console.log('inside')
    if(window.localStorage.token == undefined) {

        browserHistory.push('/')
    }
}
function getRoutes(store) {

    function hasAuth(nextState, replace, callback){
        const state = store.getState();
        const valid = !!state.tokenReducer.token;

        debug('AUTH: ', valid)

        if (valid){
            debug('AUTH: Bailing. Already Valid.')
            return callback()
        }
        replace('/login')
        debug('AUTH: To Login')
        callback();
    }


    return (

            <Route path='/' component={App}>
                <Route path='/login' component={LoginPage}/>
                <Route path='/app' onEnter={hasAuth}>
                    <IndexRoute component={Home}/>
                    <Route path='/new-video-page' component={NewVideoPage}/>
                    <Route path='/tagging-video-page' component={TaggingVideoPage}/>
                    <Route path='/groups' component={GroupsPage}/>
                    <Route path='/image-upload-page' component={ImageUploadPage}/>
                    <Route path='/new-upload-page' component={NewUploadPage}/>
                    <Redirect from='*' to='/'/>
                </Route>
                <IndexRedirect to='/app'/>
                <Redirect from='*' to='/app'/>
            </Route>


    )
}
export default getRoutes;