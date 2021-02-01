import {appError, getAdminErrorMessage}  from "bsiuilib";
import {deleteUrl, reqInfo, buildDeleteInput} from "../../base/utils/tfUtils";
import store from '../../tf_index';
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
}

export default deletegriddataAPI;