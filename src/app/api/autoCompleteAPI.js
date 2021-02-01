import {appError, getAdminErrorMessage}  from "bsiuilib";
import {autoCompleteUrl, reqInfo} from "../../base/utils/tfUtils";

class autocompleteselectAPI {
  static getAutoCompleteData(pgid, query) {    
    let url = autoCompleteUrl(pgid)      
    return fetch(url, reqInfo(null))
      .then(response => {
        if (response.ok) {
          return response.json(); 
        } else {
          var errorCode = response.status;
          var errorMsg = "Unable to retrieve Auto Complete Data. " + getAdminErrorMessage();
          return new appError(errorMsg, errorCode);
        } 
      })
      .catch(error => {
        return error;
      });
  }
}

export default autocompleteselectAPI;