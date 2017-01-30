const initialState = {
    start: 0,
    end:0,
    flag:false
};
export default function (state = initialState , action) {
    switch (action.type) {
        case 'SLIDER_ADJUSTED':
            state = {...state, start : action.start, end: action.end};

        case 'ADD_BUTTON_CLICKED':
            state = {...state, flag:action.payload};
            break;

    }
    return state;
}