const initialState = {
   url: "",
    id: "",
    videoName:""
};
export default function (state = initialState , action) {
    switch (action.type) {
        case 'VIDEO_FILE_SELECTED':
            state = {...state, url:action.payload, id:action.video_id , videoName:action.video_name};
            break;
    }
    return state;
}