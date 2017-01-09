import {Component, PropTypes} from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import c from './Home.styl'

import Sidebar from 'components/Sidebar'
import Reviews from 'components/Reviews'

class HomePage extends Component {
	render(){
		return (
			<div className={c.container}> 
				<Sidebar/>
				<Reviews className={c.reviews}/>
			</div>
		)
	}
}

export default withStyles(c)(HomePage)