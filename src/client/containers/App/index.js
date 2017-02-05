import {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import Header from 'components/Header'


import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './App.styl'

import {actions} from 'store/Data'

class App extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
    }
	componentDidMount = ()=> {
		//this.props.fetchList();
	}
	render(){
		return (
			<div className={styles.container}>
				<Helmet
					titleTemplate='%s | tessact.com'
					defaultTitle='tessact.com'/>
				<Header/>
				<div className={styles.content}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state)=> {
    return {
        // tags: state.tagReducer,
        token_reducer: state.tokenReducer

    };
}
const mapDispatchToProps = (dispatch)=> ({
	fetchList(){
		return dispatch(actions.fetchList())
	}
})

export default withStyles(styles)(
	connect(mapStateToProps,mapDispatchToProps)(App)
)