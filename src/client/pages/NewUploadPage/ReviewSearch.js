import {Component} from 'react'

import FlatButton from 'material-ui/FlatButton'
import $ from 'jquery'
import SearchIcon from 'material-ui/svg-icons/action/search'
import Dialog from 'material-ui/Dialog'
import Select from 'react-select'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {videoFileSelectedAction} from '../../store/VideoFileSelectedAction'
import {MediaFilesChangeAction} from '../../store/MediaFilesChangeAction'
import {searchOptionChangedAction} from '../../store/searchOptionChangedAction'
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
        marginLeft: '4px',
        borderRadius: 0,
        height: '36px',
        fontFamily: 'inherit',
        color: '#4b4b4b',
        paddingLeft: '28px',
        paddingRight: '28px',
    }
}


class ReviewSearch extends Component {


        state = {
            selectedUser: 1,
            selectedProcess: [],
            selectedSearch: 1,
            processOptions: [
                {value: "Compliance", label: 'Compliance'},
                {value: 'Actions', label: 'Actions'},
                {value:'Emotions', label: 'Emotions'},
                {value: 'Actors', label: 'Actors'}
            ],
            assignOptions: [
                {value: 1, label: 'Aswin'},
                {value: 2, label: 'Apurv'},
                {value: 3, label: 'Rohit'},
                {value: 4, label: 'Aditya'},
            ],
            searchOptions: [{value: 1, label: 'Media Files'}, {value: 2, label: 'Jobs'}]
        }

    state = {
        selectedUser: 1,
        selectedProcess: [],
        selectedSearch: 1,
        processOptions: [
            {value: "Compliance", label: 'Compliance'},
            {value: 'Actions', label: 'Actions'},
            {value:'Emotions', label: 'Emotions'},
            {value: 'Actors', label: 'Actors'}
        ],
        assignOptions: [
            {value: 1, label: 'Aswin'},
            {value: 2, label: 'Apurv'},
            {value: 3, label: 'Rohit'},
            {value: 4, label: 'Aditya'},
        ],
        searchOptions: [{value: 1, label: 'Media Files'}, {value: 2, label: 'Jobs'}]
    }

    doAssign = () => {
        console.log('saving...')
        this.props.onSubmitProcess();
        this.props.toggleAssign();
    }

    updateProcess = (a,b) => {
        console.log(a.label)
        this.setState({selectedProcess: a})
    }

    updateSearch = (a, b) => {
        console.log(a.value)
        this.setState({selectedSearch: a.value})
        this.props.searchOptionChangedAction(a.value)
    }

    updateAssigned = (a, b) => {
        console.log(a.value)
        this.setState({selectedUser: a.value})
    }


    handleOnChange() {
        var that = this;
        var settings_second = {
            "async": true,
            "crossDomain": true,
            "url": that.props.media_file_store.workGroupURL + "?search=" + document.getElementById("search_text").value,
            "method": "GET",
            "headers": {
                Authorization: "Token " + that.props.token_Reducer.token
            },
            success: function (data, textStatus, jQxhr) {
                //that.setState({MediaFiles: data})
                that.props.MediaFilesChangeAction(data, that.props.media_file_store.workGroupURL)
                //console.log(that.state.MediaFiles)
            },
        }
        $.ajax(settings_second).done((response) => {
            //alert("yo");


        });
    }

    render() {

        // console.log('is assign open: ', this.props.assignIsOpen)

        return (
            <div className='review-search'>
                <div className='search-label'>
                    <Select
                        clearable={false}
                        value={this.state.selectedSearch}
                        onChange={this.updateSearch}
                        options={this.state.searchOptions}/>
                </div>

                <div className='search-box'>
                    <input
                        id="search_text"
                        type='text'
                        className='search-input'
                        placeholder='search'
                        onChange={this.handleOnChange.bind(this)}/>
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
                    <FlatButton style={style.actionButton} onClick={this.props.toGroups}>
                        <i className='fa fa-fw fa-group'/>
                        <span className='btn-text'> Groups </span>
                    </FlatButton>
                </div>


                {
                    this.props.assignIsOpen
                    && <div className='assign-dialog'>
                        <div className='assign-dialog-inner'>
                            <div className='dia-title'> Assign</div>
                            <div className='dia-body'>
                                <div className='control-container'>
                                    <div className='control-label'> Assign to</div>
                                    <div className='control'>
                                        <Select
                                            name='assign-user'
                                            clearable={false}
                                            value={this.state.selectedUser}
                                            onChange={this.updateAssigned}
                                            options={this.state.assignOptions}/>
                                    </div>
                                </div>
                                <div className='control-container'>
                                    <div className='control-label'> Process</div>
                                    <div className='control'>
                                        <Select multi simpleValue
                                                //name="assign-process"
                                                value={this.state.selectedProcess}
                                                placeholder="Select Process"
                                                options={this.state.processOptions}
                                                onChange={this.updateProcess} />
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


const mapStateToProps = (state) => {
    return {
        token_Reducer: state.tokenReducer,
        media_file_store: state.MediaFileStore
    };
};
//
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        videoFileSelectedAction: videoFileSelectedAction,
        MediaFilesChangeAction: MediaFilesChangeAction,
        searchOptionChangedAction: searchOptionChangedAction
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ReviewSearch);