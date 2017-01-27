import {Component} from 'react'

import FlatButton from 'material-ui/FlatButton'

import SearchIcon from 'material-ui/svg-icons/action/search'
import Dialog from 'material-ui/Dialog'
import Select from 'react-select'

import 'react-select/dist/react-select.css'

const style = {
	searchButton: {
		width: '50px',
		minWidth: '50px',
		height: '36px',
		borderRadius: 0,
		backgroundColor: '#FB802A'
	},
	actionButton: {
		backgroundColor: '#D7D7D7',
		marginLeft: '24px',
		borderRadius: 0,
		height: '36px',
		fontFamily: 'inherit',
		paddingLeft: '28px',
		paddingRight: '28px',
	}
}



class ReviewSearch extends Component {
	state = {
		processOptions: [
			{value: 1, label: 'Compliance'},
			{value: 2, label: 'Actions'},
			{value: 3, label: 'Emotions'},
			{value: 4, label: 'Actors'}
		],
		assignOptions: [
			{value: 1, label: 'Aswin'},
			{value: 2, label: 'Apurv'},
			{value: 3, label: 'Rohit'},
			{value: 4, label: 'Aditya'},
		]
	}

	doAssign = ()=> {
		console.log('saving...')
		this.props.onSubmitProcess();
		this.props.toggleAssign();
	}

	updateProcess = (a,b)=> {
		console.log('Updating Process: ', a, b)
	}

	updateAssigned = (a,b)=> {
		console.log('Updating Assigned: ', a, b)
	}
	
	render(){
		const selectedUser = 1;
		const selectedProcess = 1;

		// console.log('is assign open: ', this.props.assignIsOpen)

		return (
			<div className='review-search'>
				<div className='search-label'> Media Files </div>
				<div className='search-box'>
					<input 
						type='text'
						className='search-input'
						placeholder='Search'/>
					<div className='search-icon'>
						<FlatButton 
							style={style.searchButton}
							icon={<SearchIcon color='#fff'/>}
							/>
					</div>

				</div>
				<div className='search-actions'>
					<FlatButton style={style.actionButton}>
						<i className='fa fa-fw fa-filter'/>
						<span className='btn-text'> Filter </span>
					</FlatButton>
					<FlatButton style={style.actionButton} onClick={this.props.toggleAssign}>
						<i className='fa fa-fw fa-tasks'/>
						<span className='btn-text'> Assign </span>
					</FlatButton>
				</div>


				{
					this.props.assignIsOpen 
						&& <div className='assign-dialog'>
							<div className='assign-dialog-inner'>
								<div className='dia-title'> Assign </div>
								<div className='dia-body'>
									<div className='control-container'>
										<div className='control-label'> Assign to </div>
										<div className='control'>
											<Select
												name='assign-user'
												clearable={false}
												value={selectedUser}
												onChange={this.updateAssigned}
												options={this.state.assignOptions}/>
										</div>
									</div>
									<div className='control-container'>
										<div className='control-label'> Process </div>
										<div className='control'>
											<Select
												name='assign-process'
												multi={true}
												clearable={false}
												value={selectedProcess}
												onChange={this.updateProcess}
												options={this.state.processOptions}/>
										</div>
									</div>
								</div>
								<div className='dia-footer'>
									<FlatButton label='Cancel'
										style={{color: '#F55A36'}}
										onClick={this.props.toggleAssign}/>
									<FlatButton label='Done'
										style={{color: '#F55A36'}}
										onClick={this.doAssign}/>
								</div>
							</div>
						</div>
				}
			</div>
		)
	}
}

export default ReviewSearch