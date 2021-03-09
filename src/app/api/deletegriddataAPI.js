import {appError, getAdminErrorMessage}  from "bsiuilib";
import {deleteUrl, reqInfo, buildDeleteInput} from "../../base/utils/tfUtils";
import store from '../../tf_setup_n_maintenance';
class deletegriddataAPI {
  static deleteGridData(pageid, data, mode) {
    let url = deleteUrl(pageid);
    let formInput = buildDeleteInput(pageid, store, data, mode);
    let tt = JSON.stringify(formInput);
    return fetch(url, reqInfo(tt))
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          var errorCode = response.status;
          var errorMsg = "Unable to Delete Record." + getAdminErrorMessage();
          return new appError(errorMsg, errorCode);
        }
      })
      .catch((error) => {
        return error;
      });
  }
  
  static deleteAllGridData(pageid, data, mode) {
    let url = deleteAllUrl(pageid);
    let formInput = buildDeleteAllInput(pageid, store, data, mode);
    let tt = JSON.stringify(formInput);
    return fetch(url, reqInfo(tt))
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          var errorCode = response.status;
          var errorMsg = "Unable to Delete Record." + getAdminErrorMessage();
          return new appError(errorMsg, errorCode);
        }
      })
      .catch((error) => {
        return error;
      });
  }
}




export default deletegriddataAPI;