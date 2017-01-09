import Promise from 'bluebird'
import {Component, PropTypes} from 'react'

import {connect} from 'react-redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import c from './Reviews.styl'

import ReviewSearch from './ReviewSearch'
import ReviewTable from './ReviewTable'

import {actions} from 'store/Data'

class Reviews extends Component {
	state = {
		items: [],
		assignIsOpen: false
	};

	static contextTypes = {
		router: PropTypes.object.isRequired
	}

	onRowSelection = (selected)=> {
		console.log('Selected rows: ', selected)
		this.props.selectRows(selected)
	}

	onSubmitProcess = ()=> {
		this.props.selectedRows.forEach(rowIndex => {
			var $row = $('.table-item-' + rowIndex);
			var $process = $row.find('.process-column')

			// If already processed return
			if (!$process.empty()){
				return
			}

			this.createProcessAnimation($process);

		})
		console.log('Process submitted')
	}

	createProcessAnimation = ($el)=> {
		var $progress = $('<div/>', {class: 'ui-progress-bar'});
		var $bar = $('<div/>', {class: 'ui-bar'});
		$bar.css('width', '0%');
		$progress.append($bar)

		$el.append($progress);
		$bar.stop().animate({width: '100%'}, 2000, function(){
			$el.empty().html('<img class="img-green-tick" src="/public/img/green-check.png"/>')
		});
	}

	toggleAssign = ()=> {
		this.setState({
			assignIsOpen: !this.state.assignIsOpen
		})
	}

	setCurrentItem = (item)=> {
		this.props.setCurrentItem(item);
		this.context.router.push('/video-screen')
	}

	render(){
		return (
			<div className={c.container}>
				<ReviewSearch
					assignIsOpen={this.state.assignIsOpen}
					toggleAssign={this.toggleAssign}
					selectedRows={this.props.selectedRows}
					onSubmitProcess={this.onSubmitProcess}/>
				<ReviewTable 
					items={this.props.list}
					selectedRows={this.props.selectedRows}
					onRowSelection={this.onRowSelection}
					setCurrentItem={this.setCurrentItem}/>
			</div>
		)
	}
}

const mapStateToProps = (state)=> ({
	list: state.Data.list,
	selectedRows: state.Data.selectedRows
})

const mapDispatchToProps = (dispatch)=> ({
	selectRows(ids){
		return dispatch(actions.selectRows(ids))
	},
	setCurrentItem(item){
		return dispatch(actions.setCurrentItem(item))
	}
})


export default withStyles(c)(
	connect(mapStateToProps,mapDispatchToProps)(Reviews)
)