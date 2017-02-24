import fetch from 'isomorphic-fetch'

const INITIAL_STATE = {
    start: 0,
    end: 0,
    flag: false,
    flag_2: true

}


const ADD_BUTTON_CLICKED= 'ADD_BUTTON_CLICKED'
const addButtonClickedAction = (value)=> {
    console.error(error)
    return {
        type: ADD_BUTTON_CLICKED,
        payload: value
    }
}


const BACK_ARROW_CLICKED = 'BACK_ARROW_CLICKED'
const backArrowClickedAction = (value)=> {
    return {
        type: BACK_ARROW_CLICKED,
        payload:value
    }
}


const DONE_BUTTON_CLICKED = 'DONE_BUTTON_CLICKED'
const doneButtonClickedAction = (value)=> {
    return {
        type: DONE_BUTTON_CLICKED,
        payload:value
    }
}


const EDIT_BUTTON_CLICKED = 'EDIT_BUTTON_CLICKED'
const editButtonClickedAction = (value)=> {
    return {
        type: EDIT_BUTTON_CLICKED,
        payload:value
    }
}


const TESSACT_LOGO_CLICKED = 'TESSACT_LOGO_CLICKED'
const tessactLogoClickedAction = (value)=> {
    return {
        type: TESSACT_LOGO_CLICKED,
    }
}



const SLIDER_ADJUSTED = 'SLIDER_ADJUSTED'
const newMarkerTimeAction = (time) => {
    return {
        type: 'SLIDER_ADJUSTED',
        start: time.start,
        end: time.end
    }
};

export const actions = {
    addButtonClickedAction,
    backArrowClickedAction,
    doneButtonClickedAction,
    editButtonClickedAction,
    tessactLogoClickedAction,
    newMarkerTimeAction
}


export default function DataReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case SLIDER_ADJUSTED:
            state = {...state, start : action.start, end: action.end};

        case ADD_BUTTON_CLICKED:
            state = {...state, flag:action.payload, flag_2:true};
            break;
        case EDIT_BUTTON_CLICKED:
            state = {...state, flag:action.payload, flag_2:true};
            break;

        case DONE_BUTTON_CLICKED:
            state = {...state, flag_2:action.payload, flag:false};
            break;

        case TESSACT_LOGO_CLICKED:
            state = {...state, flag_2:true, flag:false};
            break;

        case BACK_ARROW_CLICKED:
            state = {...state, lastNotifiedIndex: -1};
            break;
        default:
            return state
    }
}