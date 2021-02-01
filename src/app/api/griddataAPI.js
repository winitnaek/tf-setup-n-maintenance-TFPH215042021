import {appError, getAdminErrorMessage}  from "bsiuilib";
import {getUrl, reqInfo} from "../../base/utils/tfUtils";

class griddataAPI {
  static getGridData(pageid, getGridDataInput) {
    let url = getUrl(pageid);
    let tt = JSON.stringify(getGridDataInput);
    return fetch(url, reqInfo(tt))
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          var errorCode = response.status;
          var errorMsg = "Unable to get Grid Data Records. " + getAdminErrorMessage();
          return new appError(errorMsg, errorCode);
        }
      })
      .catch(error => {
        return error;
      });
  }
}

export default griddataAPI;