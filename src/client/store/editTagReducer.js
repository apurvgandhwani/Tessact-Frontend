const initialState = {
    time_in:"",
    time_out:"",
    tag_type:"smoking",
    category: "alcohol"
};
export default function (state = initialState , action) {
    switch (action.type) {
        case 'EDIT_BUTTON_CLICKED':
            state = {...state, time_in: action.time_in, time_out:action.time_out, tag_type:action.tag_type, category:action.category};
            break;

    }
    return state;
}