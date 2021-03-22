
import  {SET_ENVIRONMENT } from '../../base/constants/ActionTypes'
import initialState from "../../base/config/initialState";

function environmentReducer(state = initialState.environment, action) {
  switch (action.type) {
    case SET_ENVIRONMENT:
      return state;
    default:
      return state;
  }
}

export default environmentReducer;
