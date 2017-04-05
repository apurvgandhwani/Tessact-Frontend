const initialState = {
    start: 0,
    end:0,
    flag:false,
    flag_2: true,
    lastNotifiedIndex: -1,
    disable_add_tag: true
};
export default function (state = initialState , action) {
    switch (action.type) {
        case 'SLIDER_ADJUSTED':
            state = {...state, start : action.start, end: action.end};
        case 'ADD_BUTTON_CLICKED':
            state = {...state, flag:action.payload, flag_2:true};
            break;

        case 'EDIT_BUTTON_CLICKED':
            state = {...state, flag:action.payload, flag_2:true};
            break;

        case 'DONE_BUTTON_CLICKED':
            state = {...state, flag_2:action.payload, flag:false, start:0, end:1};
            break;

        case 'TESSACT_LOGO_CLICKED':
            state = {...state, flag_2:true, flag:false, start:0, end:1, disable_add_tag: true};
            break;

        case 'LOCAL_TAG_SELECTED':
            state = {...state, start : action.startTime, end: action.endTime};

        case 'BACK_ARROW_CLICKED':
            state = {...state, lastNotifiedIndex: -1, disable_add_tag: true};
            break;

        case 'PLAY_BUTTON_CLICKED':
            state = {...state, disable_add_tag: false};
            break;

    }
    return state;
}