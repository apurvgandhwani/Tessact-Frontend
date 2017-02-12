import {Component, PropTypes} from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import c from './Header.styl'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Link from 'react-router/lib/Link'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert'
import {red500, greenA200, white} from 'material-ui/styles/colors';
import {connect} from 'react-redux';
import $ from 'jquery'
import {bindActionCreators} from 'redux';
import {newMarkerTimeAction} from '../../store/newMarkerTimeAction'
import {tagFetchedAction} from '../../store/tagFetchedAction'
import {tessactLogoClickedAction} from '../../store/tessactLogoClickedAction'

class Header extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }
	onSignOutClick(){
        this.context.router.push('/')
	}
	logoClicked(){
		this.props.tessactLogoClickedAction();
	}
	render(){
		return (
			<header className={c.container}>
				<div className='logo'>
					<Link to='/app'>
						<img className='img-logo' src='/public/img/logo.png' onClick={this.logoClicked.bind(this)}/>
					</Link>
				</div>
				<div className='flex-fill'/>
				<div className='user'>
					Apurv Gandhwani
				</div>
				<IconMenu
					iconButtonElement={
						<IconButton><MoreVertIcon color={white} hoverColor={white}/></IconButton>
                    }
					targetOrigin={{horizontal: 'right', vertical: 'top'}}
					anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				>
					<MenuItem primaryText="Settings"/>
					<MenuItem primaryText="Help"/>
					<MenuItem onTouchTap={this.onSignOutClick.bind(this)} primaryText="Sign out"/>
				</IconMenu>

			</header>
		)
	}
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({tessactLogoClickedAction:tessactLogoClickedAction}, dispatch);
}
export default connect(null, matchDispatchToProps)(withStyles(c)(Header));


