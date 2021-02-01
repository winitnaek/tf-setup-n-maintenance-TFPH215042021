import { SET_PARENT_DATA } from "../../base/constants/ActionTypes";
import initialState from "../../base/config/initialState";
function parentDataReducer(state = initialState.parentData, action) {
  switch (action.type) {
    case SET_PARENT_DATA:
      return action.data;
      break;
    default:
      return state;
      break;
  }
}
export default parentDataReducer;