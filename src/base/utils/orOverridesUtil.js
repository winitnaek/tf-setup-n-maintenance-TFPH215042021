import moment from "moment";
import store from "../../tf_index";
import {setParentData} from '../../app/actions/parentDataActions';
import {setFilterFormData} from '../../app/actions/filterFormActions';
/**
 * optionalRateOverrideGridInput
 * @param {*} pageId 
 * @param {*} filterData 
 * @param {*} stDate 
 * @param {*} enDate 
 * @param {*} state 
 */
export function optionalRateOverrideGridInput(pageId, filterData, stDate, enDate, state) {
  let company = state.parentInfo.company;
  if(company && !filterData.company){
    store.dispatch(setFilterFormData(state.parentInfo));
  }
  let input = {
    pageId: pageId,
    dataset: appDataset(),
    companyCode:filterData.company ? filterData.company: company
  };
  return input;
}
/**
 * buildOptionalRateOverrideDelete
 * @param {*} pageId 
 * @param {*} formData 
 * @param {*} mode 
 * @param {*} state 
 */
export function buildOptionalRateOverrideDelete(pageId, formData, mode, state){
  let company = state.parentInfo.company;
  let input = {
    dataset: appDataset(),
    company: company,
    taxcode: formData.orOverrideAuth,
    taxtype: formData.orOverrideTaxType,
    formula: formData.orOverrideFormula,
    startdate: moment(formData.startDateDspl).format("MM/DD/YYYY"),
    riskclass: formData.riskclass,
    userId: appUserId()
  };
  return input;
}
/**
 * getOrOverrideTaxTypeInput
 * @param {*} input 
 * @param {*} formValues 
 */
export function getOrOverrideTaxTypeInput(input,formValues){
  let additionalFields = {
    startdate : formValues.startDateDspl ? moment(formValues.startDateDspl).format("MM/DD/YYYY") : moment().format("MM/DD/YYYY"),
    authCode : formValues['orOverrideAuth'].authId
  }
  return Object.assign(input, additionalFields);
}
/**
 * getOrOverrideFormulaInput
 * @param {*} input 
 * @param {*} formValues 
 */
export function getOrOverrideFormulaInput(input,formValues){
  let additionalFields = {
    startdate : formValues.startDateDspl ? moment(formValues.startDateDspl).format("MM/DD/YYYY") : moment().format("MM/DD/YYYY"),
    authCode : formValues['orOverrideAuth'].authId,
    taxType : formValues['orOverrideTaxType'].id,   
  }
  return Object.assign(input, additionalFields);
}
/**
 * buildOptionalRateOverrideSaveInput
 * @param {*} pageId 
 * @param {*} formData 
 * @param {*} editMode 
 * @param {*} state 
 */
export function buildOptionalRateOverrideSaveInput(pageId, formData, editMode, state) {
  let company = state.parentInfo.company;
  let input = {
    btxrate: {
      id: {
        dataset: appDataset(),
        company: company,
        taxcode: formData.orOverrideAuth.indexOf("BSI")>=0 ? formData.orOverrideAuth: 'BSI'+formData.orOverrideAuth,
        taxtype: formData.orOverrideTaxType,
        formula: formData.orOverrideFormula,
        startdate: formData.startDateDspl ? moment(formData.startDateDspl).format("MM/DD/YYYY"): moment().format("MM/DD/YYYY"),
        riskclass: formData.riskclass,
        userId: appUserId(),
      },
      account: formData.account ? formData.account: 'N/A',
      exprate: formData.exprateDspl ? formData.exprateDspl : '0.000000000' ,
      maxwage: formData.maxwage ? formData.maxwage : '0.00',
      rescind: formData.rescindDateDspl,
    },
    badRecord: 0,
    editMode: editMode,
  };
  return input;
}