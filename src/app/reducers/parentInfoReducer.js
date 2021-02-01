import { SET_PARENT_INFO } from "../../base/constants/ActionTypes";
import initialState from "../../base/config/initialState";
function parentInfoReducer(state = initialState.parentInfo, action) {
  switch (action.type) {
    case SET_PARENT_INFO:
      return action.data;
      break;
    default:
      return state;
      break;
  }
}
export default parentInfoReducer;