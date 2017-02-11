const initialState = {
   url: "",
    id: ""
};
export default function (state = initialState , action) {
    switch (action.type) {
        case 'VIDEO_FILE_SELECTED':
            state = {...state, url:action.payload, id:action.video_id };
            break;
    }
    return state;
}