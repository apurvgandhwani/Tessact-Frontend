const initialState = {
    MediaFiles: [],
    workGroup: ''
};
export default function (state = initialState , action) {
    switch (action.type) {
        case 'CHANGE_MEDIA_FILES':
            state = {...state, MediaFiles:action.MediaFiles, workGroupURL: action.workGroupURL};
    }
    return state;
}