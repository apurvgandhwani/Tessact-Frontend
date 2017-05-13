import _ from 'lodash'
import {Component, PropTypes} from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import c from './GroupsPage.styl'
import $ from 'jquery'
import GroupsSidebar from './GroupsSidebar'
import GroupsHeader  from './GroupsHeader'
import MembersList from './MembersList'
import MembersListHeader from './MembersListHeader'

import {actions as groupActions} from 'store/Groups'

const debug = require('debug')('tessact:pages:groups')

var groupList = [];

class GroupsPage extends Component {

	componentWillMount(){

		var that = this;

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://www.backend.trigger.tessact.com/api/v1/workgroups/",     //put url to get group list from here
            "method": "GET",
            "headers": {
                Authorization: "Token " + that.props.token_Reducer.token
            },
            success: function( response, textStatus, jQxhr ){

                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://www.backend.trigger.tessact.com/api/v1/workgroups/"+ response.results[0].id + "/members/",     //put url to get group list from here
                    "method": "GET",
                    "headers": {
                        Authorization: "Token " + that.props.token_Reducer.token
                    },
                    success: function( response, textStatus, jQxhr ){

                    },
                }

                $.ajax(settings).done((response) => {

                    //alert("yo");

                    console.log(response[0].username);
                });
            },
        }

        $.ajax(settings).done((response) => {

        	groupList = response.results;
            //alert("yo");
            //console.log(response.results[0].name);
        });

    }
	state = {
		mode: 'grid'
	}

	onGroupSelected = (groupId)=> {
		debug('Selecting Group: ', groupId)
		this.props.selectGroup(groupId)
	}

	onModeToggle = (mode)=> {
		debug('Toggling Mode: ', mode)
		this.setState({mode})
	}

	render(){
		const {
			list, isLoading, hasError,
			selectedId
		} = this.props;

		const {
			mode 
		} = this.state;


		const members = list.map(x => x.members)

		const selectedItems = list.filter(
			x => x.id.toString() === selectedId.toString()
		)
		const currentGroup = selectedItems[0] || {}
		const cx = classnames(c.container)

		return (
			<div className={cx}>
				<GroupsSidebar
					list={list}
					currentGroup={currentGroup}
					onGroupSelected={this.onGroupSelected}
					className={c.sidebar}/>
				{
					!!selectedItems.length && <div className='group-content'>
						<GroupsHeader
							currentGroup={currentGroup}
							className={c.header}/>
						<div className='content-box'>
							<MembersListHeader
								mode={mode}
								onModeToggle={this.onModeToggle}
								currentGroup={currentGroup}
								list={members}
								className={c.listHeader}/>
							<MembersList
								mode={mode}
								currentGroup={currentGroup}
								list={currentGroup.members || []}
								className={c.list}/>
						</div>
					</div>
				}
			</div>
		)
	}
}

const mapStateToProps = (state)=> ({
    token_Reducer: state.tokenReducer,
	list: state.Groups.list,
	isLoading: state.Groups.isLoading,
	hasError: state.Groups.hasError,
	selectedId: state.Groups.selectedId
})

const mapDispatchToProps = (dispatch)=> ({
	selectGroup(id){
		return dispatch(groupActions.selectGroup(id))
	}
})

export default withStyles(c)(
	connect(mapStateToProps, mapDispatchToProps)(GroupsPage)
)