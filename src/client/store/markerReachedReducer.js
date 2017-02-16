const initialState = {
    index:0,
};
export default function (state = initialState , action) {
    switch (action.type) {
        case 'MARKER_REACHED':
            state = {...state, index: action.payload};
            break;

    }
    return state;
}