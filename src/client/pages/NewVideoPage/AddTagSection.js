import {Component, PropTypes} from 'react'
import classnames from 'classnames'

import GreyButton from 'components/ui/GreyButton'



class AddTagSection extends Component {
    render(){
        return (
            <div className='add-tag-section'>
                <div className='add-tag-section-footer'>
                    <GreyButton
                        label='SUBMIT'/>
                </div>
            </div>

        )
    }
}

export default AddTagSection