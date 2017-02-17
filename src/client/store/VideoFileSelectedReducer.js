const initialState = {
   url: "",
    id: "",
    videoName:"",
    videoDuration:0,
    video_height:0,
    video_width:0,
    frame_rate:0
};
export default function (state = initialState , action) {
    switch (action.type) {
        case 'VIDEO_FILE_SELECTED':
            state = {...state, url:action.payload, id:action.video_id , videoName:action.video_name, videoDuration:action.video_duration,  video_height: action.video_height, video_width: action.video_width, frame_rate:action.frame_rate};
            break;
    }
    return state;
}