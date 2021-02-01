import {appError, getAdminErrorMessage}  from "bsiuilib";
import {getUrl, reqInfo} from "../../base/utils/tfUtils";

class GeneralApi {
  static getApiData(id) {
    let url = getUrl(id);
    return fetch(url, reqInfo(null))
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          var errorCode = response.status;
          var errorMsg = "Unable to get Data Records. " + getAdminErrorMessage();
          return new appError(errorMsg, errorCode);
        }
      })
      .catch(error => {
        return error;
      });
  }
}

export default GeneralApi;