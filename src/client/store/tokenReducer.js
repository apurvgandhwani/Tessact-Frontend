const initialState = {
    token: null,
};
export default function (state = initialState , action) {
    switch (action.type) {
        case 'TOKEN_GENERATED':
            state = {...state, token : action.payload};
            break;
    }
    return state;
}