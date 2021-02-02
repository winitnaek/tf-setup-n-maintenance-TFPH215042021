import {appError, getAdminErrorMessage}  from "bsiuilib";
import {saveUrl, reqInfo,buildSaveInput, saveAsUrl, buildSaveAsInput} from "../../base/utils/tfUtils";
import store from '../../tf_setup_n_maintenance';
class savegriddataAPI {
  static saveGridData(pageid, data, mode) {
    console.log("Made it to the savegriddata api");
    console.log(pageid);
    let url = saveUrl(pageid);
    console.log(url);
    let formInput = buildSaveInput(pageid, store, data, mode);
    let tt = JSON.stringify(formInput);
    return fetch(url, reqInfo(tt))
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          var errorCode = response.status;
          var errorMsg = "Unable to Save Grid Data Record." + getAdminErrorMessage();
          return new appError(errorMsg, errorCode);
        }
      })
      .catch((error) => {
        return error;
      });
  }

  static saveAsGridData(pageid, data, mode) {
    console.log("Made it to the saveAsgriddata api");
    console.log(pageid);
    let url = saveAsUrl(pageid);
    console.log(url);
    let formInput = buildSaveAsInput(pageid, store, data, mode);
    let tt = JSON.stringify(formInput);
    return fetch(url, reqInfo(tt))
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          var errorCode = response.status;
          var errorMsg = "Unable to Save Grid Data Record." + getAdminErrorMessage();
          return new appError(errorMsg, errorCode);
        }
      })
      .catch((error) => {
        return error;
      });
  }
}

export default savegriddataAPI;