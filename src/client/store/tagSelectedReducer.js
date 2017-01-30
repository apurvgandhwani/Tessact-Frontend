const initialState = {
    ind : 4,
    flag: false
};
export default function (state = initialState , action) {
    switch (action.type) {
        case 'LOCAL_TAG_SELECTED':
            state = {...state, ind : action.payload, flag: true };
            break;
    }
    return state;
}