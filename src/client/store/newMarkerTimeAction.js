export const newMarkerTimeAction = (time) => {

    return {
        type: 'SLIDER_ADJUSTED',
        start: time.start,
        end: time.end
    }
};