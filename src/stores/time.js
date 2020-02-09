const INITIAL_STATE = new Date().getTime();
export const TIME_SET = 'TIME_SET';

export const timeActions = {
  setTime: timeString => {
    try {
      const time = new Date(timeString).getTime();
      return {
        type: TIME_SET,
        data: time
      };
    } catch (e) {}
  }
};
window.setTime = timeActions.setTime;

export const timeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TIME_SET:
      return action.data;
    default:
      return state;
  }
};
