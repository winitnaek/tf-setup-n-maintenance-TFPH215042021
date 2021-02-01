import moment from "moment";
import store from "../../tf_index";
import {setParentData} from '../../app/actions/parentDataActions';
/**
 * buildCustomTaxFormulasSaveInput
 * @param {*} pageid 
 * @param {*} formdata 
 * @param {*} stDate 
 * @param {*} enDate 
 * @param {*} state 
 */
export function buildCustomTaxFormulasSaveInput(pageId, formData, editMode, state) {
  let input = {
    pageId: pageId,
    dataset: appDataset(),
    userId: appUserId(),
    editMode: editMode,
    taxCode: formData.taxCode,
    taxName: formData.taxName? formData.taxName:"",
    calcMethod: formData.calcMethod ?formData.calcMethod:0 ,
    flatAmount: formData.flatAmount,
    maxTax: formData.maxTax,
    maxWage: formData.maxWage,
    minWage: formData.maxWage,
    endDate: moment(formData.rescind).format("MM/DD/YYYY"),
    rounding: formData.rounding ? formData.rounding : 0,
    startDate: moment(formData.startDate).format("MM/DD/YYYY"),
    taxRate: formData.taxRate,
  };
  return input;
}