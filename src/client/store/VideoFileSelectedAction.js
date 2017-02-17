
export const videoFileSelectedAction = (video_url, video_id, video_name, video_duration, video_height, video_width, frame_rate) => {
    return {
        type: 'VIDEO_FILE_SELECTED',
        payload: video_url,
        video_id: video_id,
        video_name: video_name,
        video_duration: video_duration,
        video_height: video_height,
        video_width: video_width,
        frame_rate: frame_rate
    }
};
