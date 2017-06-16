import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

import GreyButton from 'components/ui/GreyButton'

import $ from 'jquery'
import ionRange from 'ion-rangeslider/js/ion.rangeSlider'

import 'bootstrap-tagsinput'

class AddTagSection extends Component {


    componentDidMount() {
        $(this.slider_el).ionRangeSlider();
        this.slider = $(this.slider_el).data("ionRangeSlider")
    }

    componentWillUnmount = ()=> {
        if (this.slider)
            this.slider.destroy();
    }


    render(){
        return (
            <div className='add-tag-section'>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="panel-title"><span className="text-success">New Tag</span>
                        </div>
                    </div>
                    <div className="panel-body">
                        {/*<!-- REMOVE THIS WRAPPER IF .scrollable IS NOT USED -->*/}
                        <div className="irs-wrapper">
                            <input
                                ref={node => this.slider_el = node}
                                type="text"
                                id="ionSlider-newTag"
                                name="ionSlider"
                                value="0;2057"/>
                        </div>
                        <br/>
                            <div className="form-group form-group-default">
                                <label>Tags</label>
                                <input
                                    id="tagsinput"
                                    type="text" value="Smoking,Drinking"
                                    data-role="tagsinput"/>
                            </div>

                            <div className="form-group form-group-default">
                                <label>Scene Description</label>
                                <input type="textarea" className="form-control"/>
                            </div>
                            <br/>
                                <button className="btn btn-info btn-cons pull-right">Add Tag</button>
                    </div>
                </div>
            </div>

        )
    }
}

export default AddTagSection