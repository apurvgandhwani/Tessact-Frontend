const initialState = {
    ind : 4,
    flag: false
};
export default function (state = initialState , action) {
    switch (action.type) {
        case 'LOCAL_TAG_SELECTED':
            state = {...state, ind : action.payload, flag: true };
            break;
        case 'TESSACT_LOGO_CLICKED':
            state = {...state, flag:false};
            break;
    }
    return state;
}