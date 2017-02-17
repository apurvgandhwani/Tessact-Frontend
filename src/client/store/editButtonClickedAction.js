export const editButtonClickedAction = (value, time_in, time_out, tag_type, category) => {

    return {
        type: 'EDIT_BUTTON_CLICKED',
        payload: value,
        time_in: time_in,
        time_out:time_out,
        tag_type: tag_type,
        category:category
    }
};