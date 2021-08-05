import { LOAD_EVENT_INFO } from "../actions/event/action-type";

const initialState = {
  event: [],
};

const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EVENT_INFO:
      return { event: action.payload.event };
      break;
  }
  return state;
};

export default EventReducer;
