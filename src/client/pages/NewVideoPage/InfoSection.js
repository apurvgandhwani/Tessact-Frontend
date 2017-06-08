import {Component, PropTypes} from 'react'
import classnames from 'classnames'

import GreyButton from 'components/ui/GreyButton'


class InfoSection extends Component {
    render() {
        return (
            <div className='info-section'>
                <div id="myPortlet" className="panel panel-default">
                    <div className="panel-heading ">
                        <div className="panel-title"><span className="text-success">Video Tagging</span>
                            <h5><span className="semi-bold">Don 2</span> Trailer</h5>
                        </div>
                    </div>

                    <div className="panel-body">
                        <table className="table">
                            <tbody>
                            <tr>
                                <td><span className="bold fs-12">UPLOADED ON</span>
                                </td>
                                <td>17/02/2017</td>
                            </tr>
                            <tr>
                                <td><span className="bold fs-12">DURATION</span>
                                </td>
                                <td>86.44</td>
                            </tr>
                            <tr>
                                <td><span className="bold fs-12">DIMENSION</span>
                                </td>
                                <td>1280 x 720</td>
                            </tr>
                            <tr>
                                <td><span className="bold fs-12">FRAMES PER SECOND</span>
                                </td>
                                <td>29.98</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }
}

export default InfoSection