import {appError, getAdminErrorMessage}  from "bsiuilib";
import {generateUrlButtonBar, generateReportUrl, reqInfo,buildMaritalStatusInput, buildBatchTestInput, buildFileUploadInput} from "../../base/utils/tfUtils";
import store from '../../tf_setup_n_maintenance';
class generateReportApi {
  static generate(pageid, data, extraInfo, fromBar) {
    let url;
    if(fromBar) {
        url = generateUrlButtonBar(pageid);
    } else {
      url = generateReportUrl(pageid);
    }
    let formInput;
    if(pageid === "batchTest")
    {
        formInput = buildBatchTestInput(pageid, store, data, extraInfo);
    } else if(pageid === "maritalStatusReport") {
        formInput = buildMaritalStatusInput(pageid, store, data, extraInfo);
    } else  {
        formInput = buildFileUploadInput(pageid, store, data, extraInfo, fromBar);
    }

    let tt = JSON.stringify(formInput);
    return fetch(url, reqInfo(tt))
    .then(response => {
        if (response.ok) {
            var isFirefox = typeof InstallTrigger !== 'undefined';
            console.log('isFirefox : ' +isFirefox);
            if(isFirefox){
                console.log('Here 1========>');
                console.log('response')
                console.log(response)
            //   return OUTPUT_MESSAGES === fileType ? response.json() : new Response(response.body);
            return response.json();
            }else{
                console.log('Here 0========>No FF, Chrome or Edge===>');
              //  return OUTPUT_MESSAGES === fileType ? response.json() : response;
            return response.json();
            }
          
        } else {
            var errorCode = response.status;
            var errorMsg = 'Failed to get Company Audit Document. ' + ADMIN_ERROR_MSG;
            throw new AppError(errorMsg, errorCode);
        }
    })
    .then(response => { 
        console.log('Here 2========>');
    //   return OUTPUT_MESSAGES === fileType ? response : response.blob();
    return response; 
    })
    .catch(error => {
        throw error;
    });
  }
}

export default generateReportApi;