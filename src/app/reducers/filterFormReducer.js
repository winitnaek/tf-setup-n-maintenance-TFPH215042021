
import  {SET_FILTER_FORM_DATA} from '../../base/constants/ActionTypes'
import initialState from "../../base/config/initialState";

function formReducer(state = initialState.formFilterData, action) {
  console.log(action.type);
  console.log(action.data) 
  switch (action.type) {
    case SET_FILTER_FORM_DATA:
      return action.data
      break;
    default:
      return state;
      break;
  }
}

export default formReducer;