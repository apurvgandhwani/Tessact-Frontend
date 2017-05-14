import {Component, PropTypes} from 'react'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import c from './Reviews.styl'

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

class ImageGrid extends Component {


    render() {


        return (
            <div className={c.container}>
                <AddFileButton
                    openFileUpload={this.openFileUpload.bind(this)}
                    fileUploadIsOpen={this.state.fileUploadIsOpen}
                    openLoading={this.openLoading.bind(this)}
                    loadingIsOpen={this.state.loadingIsOpen}
                    updateImageURLS={this.updateImageURLS}
                    imageURLS={this.state.imageURLS}
                />
                <div style={styles.root}>
                    <GridList style={styles.gridList} cols={2.2}>
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


export default ImageGrid;