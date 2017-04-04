import {Component, PropTypes} from 'react'
import classnames from 'classnames'

import {
	Table, TableBody, TableHeader, 
	TableHeaderColumn, TableRow, 
	TableRowColumn
} from 'material-ui/Table';

import moment from 'moment'


class MembersList extends Component {

	renderListView = ()=> {
		const {list} = this.props;
		return (
			<Table
				selectable={true}
				multiSelectable={true}>
				<TableHeader
					enableSelectAll={true}
					adjustForCheckbox={true}
					displaySelectAll={true}>
					<TableRow>
						<TableHeaderColumn> Name </TableHeaderColumn>
						<TableHeaderColumn> Joining Date </TableHeaderColumn>
						<TableHeaderColumn> Last Activity </TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody
					displayRowCheckbox={true}
					showRowHover={true}>
					{
						list.map((x, i)=> (
							<TableRow
								key={i}
								className='members-list-item'>
								<TableRowColumn className='item-image item-1'>

								</TableRowColumn>
								<TableRowColumn className='item-text item-2'>
									{x.name} 
								</TableRowColumn>
								<TableRowColumn className='item-joining-date item-3'>
									{moment(x.joining_date).format('DD MMM YYYY')}
								</TableRowColumn>
								<TableRowColumn clas	sName='item-last-activity item-4'>
									{moment(x.last_activity).fromNow()}
								</TableRowColumn>
							</TableRow>
						))
					}
				</TableBody>
			</Table>
		)
	}

	renderGridView = ()=> {
		const {list} = this.props;
		return list.map((x, i)=> (
			<div
				key={i} 
				className='members-list-item'>
				<div className='item-image'>

				</div>
				<div className='item-text'>
					{x.name} 
				</div>
			</div>
		))
	}

	render(){
		const {
			className,
			list,
			mode
		} = this.props;

		const cx = classnames(className, 'members-list', {
			'in-list-mode': mode === 'list'
		})

		return (
			<div className={cx}>
				{ 
					mode === 'list'
						? this.renderListView() 
						: this.renderGridView()
				}
			</div>
		)
	}
}

export default MembersList