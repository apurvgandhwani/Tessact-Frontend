import {Component} from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import c from './Header.styl'

import Link from 'react-router/lib/Link'

import IconButton from 'material-ui/IconButton'
import MoreVert from 'material-ui/svg-icons/navigation/more-vert'

class Header extends Component {
	render(){
		return (
			<header className={c.container}>
				<div className='logo'>
					<Link to='/app'>
						<img className='img-logo' src='/public/img/logo.png'/>
					</Link>
				</div>
				<div className='flex-fill'/>
				<div className='user'>
					Apurv Gandhwani
				</div>
				<IconButton>
					<MoreVert color='#fff'/>
				</IconButton>

			</header>
		)
	}
}

export default withStyles(c)(Header)