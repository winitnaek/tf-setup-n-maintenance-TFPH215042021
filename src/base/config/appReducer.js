import { combineReducers } from "redux";
import formData from '../../app/reducers/formReducer';
import favoriteLinks from '../../app/home/actions/favoriteLinksReducer';
import moduleAreaReducer from "../../app/home/actions/moduleLinksReducer";
import formFilterData from '../../app/reducers/filterFormReducer';
import parentData from '../../app/reducers/parentDataReducer';
import parentInfo from '../../app/reducers/parentInfoReducer';
import usage from "../../app/reducers/usageReducer";

const rootReducer = combineReducers({
  moduleAreas:moduleAreaReducer,
  formData,
  formFilterData,
  favoriteLinks,
  usage,
  parentData,
  parentInfo,
});
export default rootReducer;
