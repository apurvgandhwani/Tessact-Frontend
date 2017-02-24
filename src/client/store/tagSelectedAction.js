
export const tagSelectedAction = (i, startTime, endTime) => {
    return {
        type: 'LOCAL_TAG_SELECTED',
        payload: i,
        startTime: startTime,
        endTime:endTime
    }
};
