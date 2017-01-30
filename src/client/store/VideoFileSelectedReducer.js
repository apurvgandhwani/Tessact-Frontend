const initialState = {
   url: ""
};
export default function (state = initialState , action) {
    switch (action.type) {
        case 'VIDEO_FILE_SELECTED':
            state = {...state, url:action.payload };
            break;
    }
    return state;
}