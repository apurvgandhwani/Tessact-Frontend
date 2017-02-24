export const addButtonClickedAction = (value, clicked) => {

    return {
        type: 'ADD_BUTTON_CLICKED',
        payload: value,
        clicked: clicked
    }
};