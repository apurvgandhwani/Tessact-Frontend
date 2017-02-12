
export const videoFileSelectedAction = (video_url, video_id, video_name) => {
    return {
        type: 'VIDEO_FILE_SELECTED',
        payload: video_url,
        video_id: video_id,
        video_name: video_name
    }
};
