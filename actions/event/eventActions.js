import { LOAD_EVENT_INFO } from "./action-type";

export const loadEvent = (event) => {
  return function (dispatch) {
    dispatch({
      type: LOAD_EVENT_INFO,
      payload: {
        event: event,
      },
    });
  };
};
