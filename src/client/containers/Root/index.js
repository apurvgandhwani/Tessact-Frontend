import { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'

const styles = {
	container: {
		height: '100vh',
		width : '100vw',
		position: 'relative'
	}
}

class Root extends Component {
	static propTypes = {
		store: PropTypes.object.isRequired,
		muiTheme: PropTypes.object
	};

	render () {
		return (
				<Provider store={this.props.store}>
					<div style={styles.container} className='root-inner'>
						{this.props.children}
					</div>
				</Provider>
		)
	}
}

export default Root