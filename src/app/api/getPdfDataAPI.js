import {appError, getAdminErrorMessage}  from "bsiuilib";
import {viewPDFUrl, reqInfo, buildPdfInput} from "../../base/utils/tfUtils";
import store from '../../tf_setup_n_maintenance';
class getPdfDataAPI {
  static getPdfData(pageid, data, mode) {
    let url = viewPDFUrl(pageid);
    let formInput = buildPdfInput(pageid, store, data, mode);
    let tt = JSON.stringify(formInput);
    return fetch(url, reqInfo(tt))
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          var errorCode = response.status;
          var errorMsg = "Unable toGET PDF." + getAdminErrorMessage();
          return new appError(errorMsg, errorCode);
        }
      })
      .catch((error) => {
        return error;
      });
  }
}

export default getPdfDataAPI;