import {Component, PropTypes} from 'react'
import {findDOMNode} from 'react-dom'
import {browserHistory} from 'react-router'
import throttle from 'lodash/throttle'
import $ from 'jquery'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
	Table, TableBody, TableHeader, 
	TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table';


class ReviewTable extends Component {
	static propTypes = {
		items: PropTypes.array.isRequired,
		selectedRows: PropTypes.array.isRequired,
		authToken: PropTypes.string.isRequired
	};

	static contextTypes = {
		router: PropTypes.object.isRequired
	}

	componentDidMount = ()=> {
		this._fixTableHeight = throttle(()=> {
			this.fixTableHeight()
		}, 1000);
		$(window).on('resize', this._fixTableHeight);
		this.fixTableHeight()
	}

    componentWillMount = ()=> {
        var that = this;

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://trigger.eastus.cloudapp.azure.com//api/v1/workgroups/",
            "method": "GET",
            "headers": {
                Authorization: "Token " + that.props.token_Reducer.token
            },
            success: function( response, textStatus, jQxhr ){
                var settings_second = {
                    "async": true,
                    "crossDomain": true,
                    "url":  response.results[0].url + "tagging_jobs/",
                    "method": "GET",
                    "headers": {
                        Authorization: "Token " + that.props.token_Reducer.token
                    },
                    success: function( data, textStatus, jQxhr ){
                    	console.log(response.results.url)
                    },
                }
                $.ajax(settings_second).done((response) => {
                    //alert("yo");
                    console.log('check');
                });
            },
        }

        var listSettings = {

            "async": true,
            "crossDomain": true,
            "url": "https://trigger-backend.appspot.com/api/v1/workgroups/279ba660-90e9-4507-aa74-3407f7f9405a/tagging_jobs",
            "method": "GET",
            "headers": {
                Authorization: that.props.token_Reducer.token
            },
            success: function( data, textStatus, jQxhr ){
               // alert("success");
            },
        }

        $.ajax(settings).done((response) => {
            //alert("yo");
            console.log('check');
        });

        // $.ajax(listSettings).done((response) => {
        //     alert("yo");
        //     console.log('check');
        //     // this.context.router.push('/app')
        // });
        //
    }

	componentWillUnmount = ()=> {
		$(window).off('resize', this._fixTableHeight)


	}

	fixTableHeight = ()=> {
		var tableDiv = findDOMNode(this.table_el.refs.tableDiv);
		var bounds = tableDiv.getBoundingClientRect();
		var finalHeight = $(window).height() - bounds.top;

		$(tableDiv).css('height', finalHeight + 'px')
		console.log('tableheight: ', finalHeight)
	}

	getStatusClassName = (status)=> {
		var c = 'td-status';
		var s = status.toLowerCase();

		if (s === 'completed')
			c += ' td-green'
		if (s === 'not done')
			c += ' td-yellow'
		if (s === 'ongoing')
			c += ' td-orange'
		return c
	}

	// showVideo = (index)=> {
	// 	return (e)=> {
	// 		console.log('showing...', index)
	// 		this.props.setCurrentItem(
	// 			this.props.items[index]
	// 		)
	// 	}
	// }

    showVideo = (index)=> {
        return (e)=> {
            console.log('showing...', index)
            this.props.setCurrentItem(
                this.props.items[index]
            )
        }
    }
	render(){
		return (
			<Table
				height='600px'
				ref={(el)=> this.table_el = el }
				fixedHeader={true}
				multiSelectable={true}
				onRowSelection={this.props.onRowSelection}>
				<TableHeader
					className='table-header'
					style={{fontFamily: 'montserratregular'}}
					adjustForCheckbox={true}>
					<TableRow>
						<TableHeaderColumn className='th-filename'> Filename </TableHeaderColumn>
						<TableHeaderColumn> Channel </TableHeaderColumn>
						<TableHeaderColumn> Duration </TableHeaderColumn>
						<TableHeaderColumn> Uploaded </TableHeaderColumn>
						<TableHeaderColumn> TX Date </TableHeaderColumn>
						<TableHeaderColumn> Process </TableHeaderColumn>
						<TableHeaderColumn> Assigned </TableHeaderColumn>
						<TableHeaderColumn> Status </TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody
					showRowHover={true}
					deselectOnClickaway={false}>
					{
						this.props.items.map((item,i)=> (
							<TableRow 
								key={i}
								className={`table-item-${i}`}
								selected={this.props.selectedRows.includes(i)}>
								<TableRowColumn className='td-filename' onMouseUp={this.showVideo(i)}>
									<div className='item-file-details'>
										<div className='file-image' style={{backgroundImage: `url('${item.file_image}')`}}/>
										<div className='details'>
											<p className='detail-name'> {item.file_name} </p>
											<p className='detail-type'> {item.file_type} </p>
										</div>
									</div>
								</TableRowColumn>
								<TableRowColumn> {item.channel} </TableRowColumn>
								<TableRowColumn> {item.duration} </TableRowColumn>
								<TableRowColumn> {item.upload_date} </TableRowColumn>
								<TableRowColumn> {item.tx_date} </TableRowColumn>
								<TableRowColumn className='process-column'>  </TableRowColumn>
								<TableRowColumn> {item.assigned} </TableRowColumn>
								<TableRowColumn
									className={this.getStatusClassName(item.status)}>
									{item.status} 
								</TableRowColumn>
							</TableRow>
						))
					}
				</TableBody>
			</Table>
		)
	}
}


const mapStateToProps = (state) => {
    return {
        token_Reducer: state.tokenReducer,

    };
};
//
// function matchDispatchToProps(dispatch) {
//     return bindActionCreators({tagSelected: tagSelected}, dispatch);
// }

export default connect(mapStateToProps)(ReviewTable);