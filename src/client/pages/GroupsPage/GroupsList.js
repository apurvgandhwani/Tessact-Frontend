import {Component, PropTypes} from 'react'
import classnames from 'classnames'

class GroupsList extends Component {
	onGroupSelected = (e)=> {
		const id = $(e.currentTarget).attr('data-id')
		this.props.onGroupSelected(id);
	}

	render(){
		const {
			className,
			list,
			selectedId
		} = this.props;
		const cx = classnames(className)
		return (
			<div className={cx}>
				{
					list.map((x, i)=> {
						const active = x.id.toString() === selectedId.toString()
						const cx = 'groups-list-item' +  (active ? ' is-active' : '')
						return (
							<div
								key={x.id}
								data-id={x.id}
								onClick={this.onGroupSelected}
								className={cx}>
								{x.name}
							</div>
						)
					})
				}
			</div>
		)	
	}
}

export default GroupsList