const initialState = {
    tags:[]
};
export default function (state = initialState , action) {
    switch (action.type) {
        case 'TAGS_FETCHED':
            state = {...state, tags: action.payload};
            break;
    }
    return state;
}