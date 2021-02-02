import { appError, getAdminErrorMessage } from "bsiuilib";
import { autocompleteURL, reqInfo, buildAutoCompSelInput } from "../../base/utils/tfUtils";
import store from "../../tf_setup_n_maintenance";
class formDataAPI {
  static getFormData(fieldId, query, formValues = {}) {
    let autoCompInput = buildAutoCompSelInput(fieldId, store, query, formValues);
    let url = autocompleteURL(fieldId);
    let tt = JSON.stringify(autoCompInput);
    return fetch(url, reqInfo(tt))
      .then(async response => {
        if (response.ok) {
          if (isMock()) {
            const data = await response.json();
            return Promise.resolve(mockData[query] ? mockData[query](data) : data);
          }
          return response.json();
        } else {
          var errorCode = response.status;
          var errorMsg = "Unable to retrieve Auto Complete Data. " + getAdminErrorMessage();
          return new appError(errorMsg, errorCode);
        }
      })
      .then(responseJSON => {
        return responseJSON;
      })
      .catch(error => {
        return error;
      });
  }
}

export default formDataAPI;

export const mockData = {
  "1- Subtract Deduction Flat Amount": data => data.slice(0, 5),
  "3- Subtract Deduction Dependent Amount * Number of Dependents": data => data.slice(3, 8),
  "001- ALBANY": data => data.slice(0, 4),
  "00020000- (BSI00020000- ALASKA)": data => data.slice(0, 1),
  P: () => {
    return [
      {
        id: "0",
        label: "Taxable",
        disable: ["eemax"],
        valuesToUpdate: {
          eemax: "0.00"
        }
      },
      {
        id: "999",
        label: "Non-Taxable",
        disable: ["eemax"],
        valuesToUpdate: {
          eemax: 99999999999.99
        }
      },
      { id: "100", label: "Limit / YTD", enable: ["eemax"] },
      { id: "101", label: "Limit / QTD", enable: ["eemax"] },
      { id: "102", label: "Limit / MTD", enable: ["eemax"] },
      {
        id: "200",
        label: "Taxable/Exclude",
        disable: ["eemax"],
        valuesToUpdate: {
          eemax: 99999999998.99
        }
      },
      {
        id: "104",
        label: "Taxable with YTD Limit",
        enable: ["eemax"]
      },
      {
        id: "105",
        label: "Non-Taxable with YTD Limit",
        enable: ["eemax"]
      }
    ];
  }
};
