import Promise from 'bluebird'
import {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import c from './Reviews.styl'
import AddIcon from 'material-ui/svg-icons/content/add'
import ReviewSearch from './ReviewSearch'
import ReviewTable from './ReviewTable'
import JobsTable from './JobsTable'
import {actions} from 'store/Data'
import AddFileButton from './AddFileButton'

import FlatButton from 'material-ui/FlatButton'
import $ from 'jquery'
import {ORANGE} from 'utils/colors'

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';


const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
    },
    titleStyle: {
        color: 'rgb(0, 188, 212)',
    },
};

class Reviews extends Component {

    state = {
        items: [],
        assignIsOpen: false,
        fileUploadIsOpen: false,
        loadingIsOpen: false,
        imageURLS: ["https://www.backend.trigger.tessact.com/api/v1/frames/c6180ce1-2260-4bed-800f-c2325e6242e0/"]
    };

    static contextTypes = {
        router: PropTypes.object.isRequired
    }


    componentWillUpdate(){

    }
    onRowSelection = (selected) => {
        console.log('Selected rows: ', selected)
        this.props.selectRows(selected)
    }

    onSubmitProcess = () => {
        this.props.selectedRows.forEach(rowIndex => {
            var $row = $('.table-item-' + rowIndex);
            var $process = $row.find('.process-column')

            // If already processed return
            if (!$process.empty()) {
                return
            }

            this.createProcessAnimation($process);

        })
        console.log('Process submitted')
    }






    createProcessAnimation = ($el) => {
        var $progress = $('<div/>', {class: 'ui-progress-bar'});
        var $bar = $('<div/>', {class: 'ui-bar'});
        $bar.css('width', '0%');
        $progress.append($bar)

        $el.append($progress);
        $bar.stop().animate({width: '100%'}, 4000, function () {
            $el.empty().html('<img class="img-green-tick" src="/public/img/green-check.png"/>')
        });
    }

    toggleAssign = () => {
        this.setState({
            assignIsOpen: !this.state.assignIsOpen
        })
    }

    openFileUpload() {
        this.setState({
            fileUploadIsOpen: !this.state.fileUploadIsOpen
        })
    }

    openLoading() {
        this.setState({
            loadingIsOpen: !this.state.loadingIsOpen
        })
    }

    updateImageURLS(url_array) {
        //localStorage.setItem( 'imageURLS', JSON.stringify(url_array) );
        this.setState({
            imageURLS: url_array
        })
        //this.componentWillUpdate();

    }

    setCurrentItem = (item) => {
        this.props.setCurrentItem(item);
        //this.context.router.push('/test-video-page')
        this.context.router.push('/tagging-video-page')
        //this.context.router.push('/video-screen')
    }

    toGroups = () => {
        this.context.router.push('/groups')
    }


    render() {

        var MediaFilesView;
        if (this.props.search_option_changed_reducer.index == 1) {
            MediaFilesView = <ReviewTable
                //items={this.props.list}
                selectedRows={this.props.selectedRows}
                authToken={this.props.auth_token}
                onRowSelection={this.onRowSelection}
                setCurrentItem={this.setCurrentItem}/>
        }

        if (this.props.search_option_changed_reducer.index == 2) {
            MediaFilesView = <JobsTable
                //items={this.props.list}
                selectedRows={this.props.selectedRows}
                authToken={this.props.auth_token}
                onRowSelection={this.onRowSelection}
                setCurrentItem={this.setCurrentItem}/>
        }

        return (
            <div className={c.container}>
                <AddFileButton
                    openFileUpload={this.openFileUpload.bind(this)}
                    fileUploadIsOpen={this.state.fileUploadIsOpen}
                    openLoading={this.openLoading.bind(this)}
                    loadingIsOpen={this.state.loadingIsOpen}
                    updateImageURLS={this.updateImageURLS.bind(this)}
                    imageURLS={this.state.imageURLS}
                />
                <div className="image-grid" style={styles.root}>
                    <GridList style={styles.gridList} cols={3}>
                        {this.state.imageURLS.map((x,i) => (
                            <GridTile
                                key={x}
                                //title={tile.title}
                                //actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
                                //titleStyle={styles.titleStyle}
                                //titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                            >
                                <img src={x} />
                            </GridTile>
                        ))}
                    </GridList>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    //list: state.Data.list,
    selectedRows: state.Data.selectedRows,
    auth_token: state.Data.auth_token,
    search_option_changed_reducer: state.searchOptionChangedReducer
})

const mapDispatchToProps = (dispatch) => ({
    selectRows(ids){
        return dispatch(actions.selectRows(ids))
    },
    setCurrentItem(item){
        return dispatch(actions.setCurrentItem(item))
    },
    setAuthToken(item){
        return dispatch(actions.setCurrentItem(item))
    }
})


export default withStyles(c)(
    connect(mapStateToProps, mapDispatchToProps)(Reviews)
)