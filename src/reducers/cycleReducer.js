import { LOAD_CYCLE_INFO } from "../actions/cycle/action-type";

const initialState = {
  infos: {},
  allCycle: [],
  duration: 0,
  cat: 1,
};

const CycleReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CYCLE_INFO:
      return {
        infos: action.payload.infos,
        allCycle: action.payload.cycles,
        duration: action.payload.duration,
        cat: action.payload.cat,
      };
      break;
  }
  return state;
};

export default CycleReducer;
