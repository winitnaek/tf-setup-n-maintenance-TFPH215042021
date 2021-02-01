
import  {SET_FORM_DATA, SAVE_FORM_DATA, CLOSE_FORM} from '../../base/constants/ActionTypes'
import initialState from "../../base/config/initialState";

function formReducer(state = initialState.formData, action) {
  console.log(action.type);
  console.log(action) 
  switch (action.type) {
    case SET_FORM_DATA:
      return {data: action.data.formData, mode: action.data.mode,  index: action.data.index}
      break;
    case SAVE_FORM_DATA:
      return {data: action.data.formData, mode: action.data.mode,  index: action.data.index}
      break;
    case CLOSE_FORM:
      return initialState
      break;
    default:
      return state;
      break;
  }
}

export default formReducer;
