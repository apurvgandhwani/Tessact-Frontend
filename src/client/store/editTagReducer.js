const initialState = {
    time_in:"",
    time_out:"",
    tag_type:"smoking",
    category: "alcohol"
};
export default function (state = initialState , action) {
    switch (action.type) {
        case 'LOCAL_TAG_SELECTED':
            state = {...state, time_in: action.startTime, time_out:action.endTime};
            break;

    }
    return state;
}