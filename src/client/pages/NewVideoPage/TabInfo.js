/**
 * Created by root on 3/17/17.
 */
import {Component, PropTypes} from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux';

const InfoItem = ({label, value})=> (
    <div className='info-item'>
        <h4 className='info-label'> {label} </h4>
        <h4 className='info-value'> {value} </h4>
    </div>
)


class TabInfo extends Component {
    static propTypes = {
        className: PropTypes.string.isRequired
    }

    render(){
        const {
            className,
            current
        } = this.props

        const cx = classnames(className, 'info-view')
        const video = current ? current.video : {}

        return (
            <div className={cx}>
                <InfoItem
                    label='Title'
                    value={this.props.video_file_selected.videoName}/>
                <InfoItem
                    label='Uploaded On'
                    value="17-02-2017"/>
                <InfoItem
                    label='Duration'
                    value={this.props.video_file_selected.videoDuration}/>
                <InfoItem
                    label='Dimensions'
                    value={this.props.video_file_selected.video_width + "x" + this.props.video_file_selected.video_height}/>
                <InfoItem
                    label='FPS'
                    value={this.props.video_file_selected.frame_rate}/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        video_file_selected: state.VideoFileSelectedReducer
    };
};
export default connect(mapStateToProps)(TabInfo)