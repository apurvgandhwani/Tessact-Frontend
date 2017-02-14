const initialState = {
   url: "",
    id: "",
    videoName:"",
    videoDuration:0
};
export default function (state = initialState , action) {
    switch (action.type) {
        case 'VIDEO_FILE_SELECTED':
            state = {...state, url:action.payload, id:action.video_id , videoName:action.video_name, videoDuration:action.video_duration};
            break;
    }
    return state;
}