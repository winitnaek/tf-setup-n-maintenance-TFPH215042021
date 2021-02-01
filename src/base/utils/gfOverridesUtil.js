import moment from "moment";
import store from "../../tf_index";
import {setParentData} from '../../app/actions/parentDataActions';
/**
 * garnishmentFormulaOverrides
 * @param {*} pageid 
 * @param {*} formdata 
 * @param {*} stDate 
 * @param {*} enDate 
 * @param {*} state 
 */
export function garnishmentFormulaOverrides(pageId, formData,stDate,enDate,state) {
  let parentData = state.parentData;
  let group = parentData.code ?parentData.code: parentData.garnishmentGroup
  let groupCode = formData.garnishmentGroup ? formData.garnishmentGroup :group
  console.log(state);
  let input = {
    pageId: pageId,
    dataset: appDataset(),
    userId: appUserId(),
    garnishmentGroupCode: formData.code ? formData.code: groupCode,
  };
  return input;
}
/**
 * buildGarnishmentFormulaOverridesDelete
 * @param {*} pageid 
 * @param {*} formdata 
 * @param {*} editMode 
 * @param {*} state 
 */
export function buildGarnishmentFormulaOverridesDelete(pageid, formdata, editMode, state) {
  let input = {
    dataset: appDataset(),
    ggroup: formdata.garnishmentGroup,
    taxcode: formdata.authority,
    usrtax: formdata.garnishmentType,
    startdate: moment(formdata.startDate).format("MM/DD/YYYY")
  };
  return input;
}
/**
 * getGarnFormulaOverdTaxTypeInput
 * @param {*} input 
 * @param {*} formValues 
 */
export function getGarnFormulaOverdTaxTypeInput(input,formValues){
  let additionalFields = {
    authCode : formValues['authority'].authId
  }
  return Object.assign(input, additionalFields);
}
/**
 * buildGarnishmentFormulaOverridesSaveInput
 * @param {*} pageid 
 * @param {*} formdata 
 * @param {*} editMode 
 * @param {*} state 
 */
export function buildGarnishmentFormulaOverridesSaveInput(pageid, formdata, editMode, state) {
  let editRec = "false";
  if (editMode == 1) {
    editRec = "false";
    store.dispatch(setParentData(state.formFilterData));
  } else if (editMode == 2) {
    editRec = "true";
  }
  let parentData = state.formFilterData;
  let gg = parentData.code ?parentData.code: parentData.garnishmentGroup
  let input = {
    dataset: appDataset(),
    userId: appUserId(),
    garnishmentGroup: formdata.garnishmentGroup ? formdata.garnishmentGroup: gg,
    taxCode: formdata.authority.indexOf("BSI")>=0 ? formdata.authority: 'BSI'+formdata.authority,
    userTaxType: null,
    auth: formdata.authority.indexOf("BSI")>=0 ? formdata.authority.substring(3, 11):formdata.authority,
    authName: formdata.authName,
    garnishmentType: formdata.garnishmentType,
    garnishmentName:formdata.garnishmentName,
    startDate: moment(formdata.startDate).format("MM/DD/YYYY"),
    endDate: moment(formdata.endDate).format("MM/DD/YYYY"),
    inputAmtInd: null,
    inputMethod: formdata.inputMethod,
    inputFlatAmt: formdata.inputFlatAmt,
    percent:formdata.percent,
    priority: formdata.priority,
    exemptionMethod: formdata.exemptionMethod,
    exemptionFlatAmt: formdata.exemptionFlatAmt,
    exemptionAmt: formdata.exemptionAmt,
    exemptionDependentAmt: formdata.exemptionDependentAmt,
    calculationMethod: formdata.calculationMethod,
    calcPercent: formdata.calcPercent,
    calcAmt: formdata.calcAmt,
    calcLimit: formdata.calcLimit,
    deductionMethod:formdata.deductionMethod,
    deductionFlatAmt: formdata.deductionFlatAmt,
    deductionAmt: formdata.deductionAmt,
    deductionDependentAmt: formdata.deductionDependentAmt,
    glop: "",
    stmtOfExemptions: formdata.stmtOfExemptions,
    dayAfter: formdata.stmtOfExemptions,
    deceasedGarnishment: formdata.deceasedGarnishment,
    decgarChkbox: formdata.decgarChkbox ? formdata.decgarChkbox : false,
    deceasedGarnishmentLimitAmount: formdata.deceasedGarnishmentLimitAmount,
    decgarLimAmtChkbox: formdata.decgarLimAmtChkbox ?formdata.decgarLimAmtChkbox : false ,
  };
  let formValues = {};
  if (editMode == 1) {
    formValues = {
      editMode: editMode,
    };
  } else {
    formValues = {
      editMode: editMode,
    };
  }
  return Object.assign(input, formValues);
}
/**
 * generateGarnishmentFormulaOverridePDF
 * @param {*} pageId 
 * @param {*} store 
 * @param {*} formdata 
 * @param {*} mode 
 */
export function generateGarnishmentFormulaOverridePDF(pageId, store, formdata, mode){
let input= {
    dataset: appDataset(),
    userId: appUserId(),
    garnishmentGroup: formdata.garnishmentGroup,
    taxCode: formdata.authority,
    userTaxType: null,
    auth: formdata.authority.indexOf("BSI")>=0 ? formdata.authority: 'BSI'+formdata.authority,
    authName: formdata.authName,
    garnishmentType: formdata.garnishmentType,
    garnishmentName: formdata.garnishmentName,
    startDate: formdata.startDate,
    endDate: formdata.endDate,
    inputAmtInd: null,
    inputMethod: formdata.inputMethod,
    inputFlatAmt: formdata.inputFlatAmt,
    percent: formdata.percent,
    priority: formdata.priority,
    exemptionMethod: formdata.exemptionMethod,
    exemptionFlatAmt: formdata.exemptionFlatAmt,
    exemptionAmt: formdata.exemptionAmt,
    exemptionDependentAmt: formdata.exemptionDependentAmt,
    calculationMethod: formdata.calculationMethod,
    calcPercent: formdata.calcPercent,
    calcAmt: formdata.calcAmt,
    calcLimit: formdata.calcLimit,
    deductionMethod: formdata.deductionMethod,
    deductionFlatAmt: formdata.deductionFlatAmt,
    deductionAmt: formdata.deductionAmt,
    deductionDependentAmt: formdata.deductionDependentAmt,
    glop: "",
    stmtOfExemptions: formdata.stmtOfExemptions,
    dayAfter: formdata.dayAfter,
    deceasedGarnishment: formdata.deceasedGarnishment,
    decgarChkbox: formdata.decgarChkbox,
    deceasedGarnishmentLimitAmount: formdata.deceasedGarnishmentLimitAmount,
    decgarLimAmtChkbox: formdata.decgarLimAmtChkbox,
    editMode: 2,
  };
  return input;
}