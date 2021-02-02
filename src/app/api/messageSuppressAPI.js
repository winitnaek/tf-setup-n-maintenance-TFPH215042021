import { appError, getAdminErrorMessage } from 'bsiuilib';
import { saveUrl, reqInfo, getUrl } from '../../base/utils/tfUtils';
import store from '../../tf_setup_n_maintenance';
class MessageSuppressApi {
  static suppressMessages(pageid, messages) {
    let url = saveUrl(pageid);
    let tt = JSON.stringify(messages);
    return fetch(url, reqInfo(tt))
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          var errorCode = response.status;
          var errorMsg = 'Unable to save suppressed messages' + getAdminErrorMessage();
          return new appError(errorMsg, errorCode);
        }
      })
      .catch(error => {
        return error;
      });
  }
}

export default MessageSuppressApi;
