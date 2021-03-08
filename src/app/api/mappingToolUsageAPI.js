import {appError, getAdminErrorMessage}  from "bsiuilib";
import {getUrl, reqInfo, buildMapLinkDataInput} from "../../base/utils/tfUtils";

class mappingToolUsageAPI {
  static getToolUsage(pageid, mappedTool) {
    let url = getUrl(pageid);
    let tt = JSON.stringify(mappedTool);
    return fetch(url, reqInfo(tt))
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          var errorCode = response.status;
          var errorMsg = "Unable to get mapping tool usage. " + getAdminErrorMessage();
          return new appError(errorMsg, errorCode);
        }
      })
      .catch(error => {
        return error;
      });
  }

  static createDefaultMapping(pageid, action){
    // TODO: create a get URL for mapping tools like delete and save after payload format is ready
    let url = getUrl(pageid);
    let tt = JSON.stringify(buildMapLinkDataInput(pageid, action.formFilterData));
    return fetch(url, reqInfo(tt))
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          var errorCode = response.status;
          var errorMsg = "Unable to map. " + getAdminErrorMessage();
          return new appError(errorMsg, errorCode);
        }
      })
      .catch(error => {
        return error;
      });
  }
}

export default mappingToolUsageAPI;