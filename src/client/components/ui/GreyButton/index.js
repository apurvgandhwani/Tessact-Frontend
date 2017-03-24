import {Component, PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton'

const styles = {
	button: {
		backgroundColor: '#d6d6d6'
	}
}

export default class GreyButton extends Component {
	render(){
		return (
			<FlatButton
				style={styles.button}
				{...this.props}/>
		)
	}
}