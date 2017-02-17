const initialState = {
    start: 0,
    end:0,
    flag:false,
    flag_2: true
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
            state = {...state, flag_2:action.payload, flag:false};
            break;

        case 'TESSACT_LOGO_CLICKED':
            state = {...state, flag_2:true, flag:false};
            break;


    }
    return state;
}