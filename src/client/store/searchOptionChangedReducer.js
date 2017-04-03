const initialState = {
    index:1,
};
export default function (state = initialState , action) {
    switch (action.type) {
        case 'SEARCH_OPTION_CHANGED':
            state = {...state, index: action.payload};
            break;

    }
    return state;
}