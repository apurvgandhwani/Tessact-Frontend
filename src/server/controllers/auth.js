import _ from 'lodash'
import request from 'superagent'
import qs from 'querystring'
import url from 'url'

import config from '../config'

const debug = require('debug')('tessact:controller:auth')

export function LogIn(req, res, next){
	if ( !!_.get(req, 'session.user.authToken') ){
		debug('Already logged in.')
	}
	const username = req.body.username || false
	const password = req.body.password || false

	if (!username){
		let err = new Error('Username is invalid')
		debug(err)
		return res.status(403).json({
			status: 'error',
			message: err.message
		})
	}

	if (!password){
		let err = new Error('Password is invalid')
		debug(err)
		return res.status(403).json({
			status: 'error',
			message: err.message
		})
	}

	debug(`Logging In... ${username}, ${password}`)

	request.post(config.LOGIN_URL)
		.send({username, password})
		.then(resp=> {
			debug('Response: ', resp.body)
			if (resp.body.auth_token){
				req.session.username = username
				req.session.authToken = resp.body.authToken
				return res.json({
					status: 'ok',
					user: {
						username
					}
				})
			}

			return Promise.reject(
				new Error( resp.body.non_field_errors[0] )
			)

		}).catch(err=> {
			return res.status(403).json({
				status: 'error',
				message: err.message
			})
		})

}


export function LogOut(req, res, next){
	req.session.destroy()
	req.session = null
	res.redirect('/')
}