import {Component} from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import c from './Sidebar.styl'

import {Circle} from 'rc-progress'


const Progress = (props)=> (
	<div className='progress-container'>
		<Circle
			className='progress-circle'
			percent={props.percent}
			strokeWidth='6'
			trailWidth='6'
			strokeColor={props.strokeColor}
			trailColor='#d5d5d5'/>
		<div className='progress-perc'> {props.percent} </div>
		<div className='progress-label'> {props.label} </div>
	</div>
)


const DATA = [
	{label: 'Jobs Completed', percent: '38', strokeColor: '#FDC24D'},
	{label: 'Files Processed', percent: '82', strokeColor: '#FA9429'},
	{label: 'Files Assigned', percent: '20', strokeColor: '#F55A36'}
]

class Sidebar extends Component {
	state = {
		data: []
	}

	componentDidMount = ()=> {
		this.setState({data: DATA})
	}

	render(){
		return (
			<div className={c.container}>
				{
					this.state.data.map((x,i)=> (
						<Progress
							key={i}
							label={x.label}
							percent={x.percent}
							strokeColor={x.strokeColor}
							/>
					))
				}
					
			</div>
		)
	}
}

export default withStyles(c)(Sidebar)