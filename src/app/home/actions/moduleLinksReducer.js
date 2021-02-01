import * as types from "../../../base/constants/ActionTypes";
import initialState from "../../../base/config/initialState";

export default function moduleLinksReducer(state = initialState.moduleAreas,action) {
  switch (action.type) {
    case types.SET_MODULE_AREAS: {
      return Object.assign({}, ...state, {
        areas: action.moduleAreas
      });
    }
    default:
      return state;
  }
}
