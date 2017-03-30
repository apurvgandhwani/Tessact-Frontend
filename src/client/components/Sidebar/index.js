import {Component} from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import c from './Sidebar.styl'

import {Circle} from 'rc-progress'
import $ from 'jquery'


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


const WEEKLY_DATA = [
	{label: 'Jobs Completed', percent: '38', strokeColor: '#FDC24D'},
	{label: 'Files Processed', percent: '82', strokeColor: '#FA9429'},
	{label: 'Files Assigned', percent: '20', strokeColor: '#F55A36'}

]

const MONTHLY_DATA = [
    {label: 'Jobs Completed', percent: '52', strokeColor: '#FDC24D'},
    {label: 'Files Processed', percent: '45', strokeColor: '#FA9429'},
    {label: 'Files Assigned', percent: '90', strokeColor: '#F55A36'}

]
class Sidebar extends Component {
	state = {
		data: []
	}

	componentDidMount = ()=> {
		this.setState({data: WEEKLY_DATA})
	}

	updateStats(){
		this.setState({data: WEEKLY_DATA})
	}

    updateStats2(){
        this.setState({data: MONTHLY_DATA})
    }

	render(){

        let $li = $('.list-unstyled').find('li').click(function() {
            $li.removeClass('selected');
            $(this).addClass('selected');
        });

		return (
			<div className={c.container}>
				<div className="view-links-container" id="view-links-container">
					<ul className="list-unstyled" >
						<li onClick={this.updateStats.bind(this)}>Weekly</li>
						<li onClick={this.updateStats2.bind(this)}>Monthly</li>
						<li>Custom Range</li>
					</ul>
				</div>
                {
                    this.state.data.map((x, i) => (
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