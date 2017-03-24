import {Router} from 'express'
import _ from 'lodash'
import APIController from '../controllers/api'
import * as AuthController from '../controllers/auth'
var debug = require('debug')('tessact:router');
var router = Router();

function Renderer(req, res, next){
	res.render('index', {
		title: 'Tessact',
		IS_PROD: !__DEV__
	})
}

export default function configureRoutes(connection){
    // Ping (Health Check)
    router.get('/ping', (req, res)=> res.send('pong'));
    router.use('/api', APIController);

    router.post('/login', AuthController.LogIn);
    router.get('/logout', AuthController.LogOut);

    //No Server Rendering
    router.get('*',
        Renderer
    );

    return router

}

