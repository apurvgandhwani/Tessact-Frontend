export const MediaFilesChangeAction = (MediaFiles, workGroupURL) => {

    return {
        type: 'CHANGE_MEDIA_FILES',
        MediaFiles: MediaFiles,
        workGroupURL: workGroupURL

    }
};