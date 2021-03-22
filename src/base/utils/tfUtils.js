import moment from "moment";
import {
  metadatamap,
  tftools,
  deletedatamap,
  savedatamap,
  asyncselfldsmap,
  generateDataMap,
  viewPDFMap,
  deletealldatamap,
  viewPDFMapButtonBar,
  saveAsdatamap,
  generateMapButtonBar,
} from "../constants/TFTools";
import mockDataMapper from "../../app/metadata/_mockDataMap";
import mockAutoCompleteMap from "../../app/metadata/_mockAutoCompleteMap";
import * as metaData from "../../app/metadata/_metaData";
import {
  setParentData
} from '../../app/actions/parentDataActions';
import {
  generateUrl
} from "bsiuilib";
import * as CellsRenderer from "../../app/metadata/cellsrenderer";
import store from "../../tf_setup_n_maintenance";
import {dataSetsGridInput, buildDataSetsSaveInput, buildDataSetsDeleteInput} from '../utils/datasetsUtil'
import {buildLoginsSaveInput,buildLoginsDeleteInput, buildPermissionsSaveInput,permissionsGridInput, permissionPDfInput} from './laPermissionsUtil';
import {auditLogViewerGridInput,buildAuditLogViewerDeleteAll} from './aLogViewerUtil';
import { generateCustomBackupAPI, generateUploadCustomRestoreAPI, processCustomRestoreAPI } from './cBackupRestoreUtil';
import { generateOptionalBackupAPI, generateUploadOptionalRestoreAPI } from './ourOverrideBackupUtil';
import { generateDatabaseUploadAPI, generateProcessDatabaseUploadAPI } from './dbLoadUtil';
/**
 * buildModuleAreaLinks
 * @param {*} apps
 */
export function buildModuleAreaLinks(apps) {
  let premTFtools = [];
  apps.forEach(function (app) {
    if (app.id == "73b9a516-c0ca-43c0-b0ae-190e08d77bcc") {
      app.accessIds.forEach(function (access) {
        if (access.id == "162ebe14-8d87-44e1-a786-c9365c9d5cd8" && access.visible == true) {
          premTFtools = tftools.filter(tftool => {
            if (app.permissions.hasOwnProperty(tftool.value) && tftool.link == true) return tftool;
          });
        }
      });
    }
  });
  return premTFtools;
}
/**
 * setPerms
 * @param {*} perm
 */
export function setPerms(perm) {
  let appperm = {
    VIEW: perm[0] == 1 ? true : false,
    SAVE: perm[1] == 1 ? true : false,
    DELETE: perm[2] == 1 ? true : false,
    RUN: perm[3] == 1 ? true : false,
    AUDIT: perm[4] == 1 ? true : false
  };
  return appperm;
}
/**
 * openHelp
 * @param {*} pageid
 */
export function openHelp(pageid) {
  window.open("/help/" + pageid, "_blank");
}
export function getMetaData(pageid) {
  return metaData[pageid];
}

export const cellbeginedit = (row, datafield) => {
  let _id = document.querySelector("div[role='grid']").id;
  const rowdata = $(`#${_id}`).jqxGrid("getrowdata", row);
  if (datafield === "audit") {
    return rowdata.isAuditable;
  }
  return true;
};

/**
 * compMetaData
 * @param {*} pageid
 */
export function compMetaData(pageid, key) {
  if (key !== undefined && metaData[pageid] instanceof Array && metaData[pageid][key]) {
    const {
      formFilterData
    } = store.getState();
    const metaDataCopy = JSON.parse(JSON.stringify(metaData[pageid][key])); // Copy medata
    let gridMetaData = checkForStaticRender(metaDataCopy);
    // for first table to have back button to parent we check for key === 0
    if (typeof gridMetaData.pgdef.parentConfig === "string") {
      gridMetaData.pgdef.parentConfig = metaData[gridMetaData.pgdef.parentConfig];
    }
    if (gridMetaData.pgdef.caption) {
      gridMetaData.pgdef.caption = setTemplateData(gridMetaData.pgdef.caption, formFilterData);
    }
    return gridMetaData;
  } else {
    if (metaData[pageid]) {
      let metadata = checkForStaticRender(metaData[pageid]);
      if (pageid === "permissions") {
        metadata.griddef.columns.forEach(column => {
          column.cellbeginedit = cellbeginedit;
        });
      }
      return metadata;
    }
    let metadataMap = metadatamap.find(metadatam => {
      if (pageid == metadatam.id) return metadatam;
    });
    let metadata = checkForStaticRender(metadataMap.metadata);

    return metadata;
  }
}

export const formatFieldData = (fieldData, pageId, userId) => {
  if (fieldData) {
    fieldData.forEach(field => {
      const state = store.getState();
      if (field.id === "permissionFor" && pageId === "permissions") {
        if (state.formData && state.formData.data && state.formData.data.permissionFor) {
          field.value = state.formData.data.permissionFor;
        } else {
          field.value = userId;
        }
      }

      if (field.value === "new Date()") {
        field.value = moment().format("MM/DD/yyyy");
      }

      // retain form values of date filter in the field values of messageViwer
      // if ((field.id === "startdate" || field.id === "enddate") && pageId === "messageViewer"){
      //   if (state.formData && state.formData.data && state.formData.data[field.id]) {
      //     field.value = state.formData.data[field.id];
      //   }
      // }
    });
  }

  return fieldData;
};

export function decorateData(griddata, pageid) {
  if (pageid == "taxabilityForAuthority") {
    let state = store.getState();
    let filterData = state.formFilterData;
    console.log(state);
    griddata.forEach(function (value) {
      value.authorityCode = filterData.authorityCodeNoall;
    });
    return griddata;
  } else {
    return griddata;
  }
}
export function checkForStaticRender(metadata) {
  metadata.griddef.columns.forEach(function (value) {
    if (value.rendererStaticInput && CellsRenderer[value.rendererStaticInput]) {
      value.cellsrenderer = CellsRenderer[value.rendererStaticInput];
    }
  });
  return metadata;
}
/**
 * compPermissions
 * @param {*} pid
 */
export function compPermissions(pid) {
  let perms = getAllRights();
  if (perms.hasOwnProperty(pid)) {
    return setPerms(perms[pid]);
  }
}
/**
 * compURL
 * @param {*} pageid
 */
export function compURL(pageid) {
  let metadataMap = metadatamap.find(metadatam => {
    if (pageid == metadatam.id) return metadatam;
  });
  let url = generateUrl.buildURL(metadataMap.url);
  //return url;
  return dataURL(pageid);
}
/*export function compURL(pageid,...params) {
  let metadataMap = metadatamap.find(metadatam => {
    if (pageid == metadatam.id) return metadatam;
  });
  let url = generateUrl.buildURL(metadataMap.url);
  console.log('buildGetRecsUrl >>>');
  var arr = [];
  arr.push('VINIT'); 
  let dataset ='Vinit123'
  console.log(format(url,dataset));
  return url;
};*/

/**
 * dataURL
 */
function dataURL(pageid) {
  let gridDataUrl;
  switch (pageid) {
    case "allBSIPlans":
      gridDataUrl = "./ALL_BSI_PLANS_MOCKDATA.json";
      break;
    default:
      break;
  }
  return gridDataUrl;
}

/**
 * format
 * @param {*} fmt
 * @param  {...any} args
 */
export function format(fmt, ...args) {
  if (!fmt.match(/^(?:(?:(?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{[0-9]+\}))+$/)) {
    throw new Error("invalid format string.");
  }
  return fmt.replace(/((?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{([0-9]+)\})/g, (m, str, index) => {
    if (str) {
      return str.replace(/(?:{{)|(?:}})/g, m => m[0]);
    } else {
      if (index >= args.length) {
        throw new Error("argument index is out of range in format");
      }
      return args[index];
    }
  });
}

/**
 * buildMapLinkDataInput
 * @param {*} pageid
 */
export function buildMapLinkDataInput(pageid, formFilterData) {
  const parentInfo = store.getState().parentInfo;
  let input = {
    "pageId":pageid,        
    "userId": appUserId(),      
    "dataset":appDataset(),
    "login": parentInfo.loginName,
    "selectedDataset": sessionStorage.getItem('newDataName') || appDataset(),
   
}
  return input;
}

/**
 * buildGridInputForPage
 * @param {*} pageid 
 * @param {*} filterData 
 * @param {*} stDate 
 * @param {*} enDate 
 */
export function buildGridInputForPage(pageid, filterData, stDate, enDate) {
  const parentInfo = store.getState().parentInfo;
  let input = {
    pageId: pageid,
    dataset: appDataset(),
    userId: appUserId(),
    //companyCode: filterData.companyCode,
    companyCode: getCompanyCode(filterData),
    companyName: filterData.companyName,
    taxCode: getTaxCode(filterData),
    taxName: filterData.name,
    startdate: stDate,
    endDate: enDate,
    riskClass: filterData.riskClass,
    taxType: getTaxType(filterData),
    formNumber: getFormNum(filterData),
    courtesy: filterData.courtesy,
    authCode: getAuthCode(filterData),
    garnishmentGroupCode: filterData.garnishmentGroupCode,
    groupCode: getGroupcode(filterData),
    exemptStat: filterData.exemptionStatus,
    customTaxCode: filterData.customTaxCode === "ALL" ? "" : filterData.customTaxCode,
    pmtUsrCode: getPmtUsrCode(filterData),
    formula: filterData.formula,
    usrtax: filterData.userTax,
    runId: filterData.runid,
    messageType: filterData.messageType,
    empCode: filterData.empCode,
    checkDate: filterData.checkDate,
    checkdate: filterData.checkDate,
    empName: filterData.empName,
    regPen: filterData.regPen,
    taxN: filterData.taxN,
    employee: filterData.employeeCode,
    companyCode: filterData.cpycode,
    empGroup: filterData.id,
    login: filterData.loginName || parentInfo.loginName,
  };
  return input;
}
/**
 * buildGridDataInput
 * @param {*} pageid
 * @param {*} store
 */
export function buildGridDataInput(pageid, store) {
  let state = store.getState();
  let filterData = state.formFilterData;
  console.log(state);
  let stDate = getStartDate(filterData);
  let enDate = getEndDate(filterData);
  let input;
  //Plesae add utils method for any specific page in <page-name>util.js file.
  //For e.g.: datasetsUtil.js
  //Remove any unwanted method/code from util.js file.  
  if (pageid === 'dataSets') {
    input = dataSetsGridInput(pageid, filterData, stDate, enDate, state);
  } else  if (pageid === 'auditLogViewer') {
    input = auditLogViewerGridInput(pageid, filterData, stDate, enDate, state);
  } else  if (pageid === 'permissions') {
    input = permissionsGridInput(pageid, filterData, stDate, enDate, state);
  } else {
    if (state.parentData) { //Reset Parent Data
      let parentData = {};
      store.dispatch(setParentData(parentData))
    }
    input = buildGridInputForPage(pageid, filterData, stDate, enDate);
  }
  return input;
}
export function buildFileUploadInput(pageid, store, data, extraInfo, fromBar) {
  if(pageid === "customdataBackup") {
    return generateCustomBackupAPI(pageid, store, data, extraInfo);
  } else if(pageid === "customdataRestore" && !fromBar) {
    return generateUploadCustomRestoreAPI(pageid, store, data, extraInfo);
  } else if(pageid === "customdataRestore" && fromBar) {
    return processCustomRestoreAPI(pageid, store, data, extraInfo);
  } else if(pageid === "optionalBackup" && fromBar) {
    return generateOptionalBackupAPI(pageid, store, data, extraInfo);
  }else if(pageid === "optionalRestore") {
    return generateUploadOptionalRestoreAPI(pageid, store, data, extraInfo);
  } else if(pageid === "databaseLoad" && !fromBar) {
    return generateDatabaseUploadAPI(pageid, store, data, extraInfo);
  } else if(pageid === "databaseLoad" && fromBar) {
    return generateProcessDatabaseUploadAPI(pageid, store, data, extraInfo);
  } else if(pageid === "customrestoreStatus" && fromBar) {
    return {
      userID: appUserId(),
      dataset: appDataset(),
    }
  }
  let input = {      
    dataset: appDataset(),
    userID: appUserId(),
}
return input;
}
export function getTaxCode(filterData) {
  if (filterData && filterData.taxCode) {
    return filterData.taxCode;
  } else if (filterData && filterData.customTaxName) {
    return filterData.customTaxName;
  } else if (filterData && filterData.taxTypeALL) {
    return filterData.taxTypeALL;
  } else if (filterData && filterData.taxability) {
    return filterData.taxability;
  }
}
export function getAuthCode(filterData) {
  if (filterData && filterData.authorityCode) {
    return filterData.authorityCode;
  } else if (filterData && (filterData.bsiAuth || filterData.bsiauth)) {
    return filterData.bsiAuth || filterData.bsiauth;
  } else if (filterData && filterData.authorityCodegdw) {
    return filterData.authorityCodegdw;
  } else if (filterData && filterData.authorityCodegp) {
    return filterData.authorityCodegp;
  } else if (filterData && filterData.authorityCodeNoall) {
    return filterData.authorityCodeNoall;
  }
}
export function getFrmEndDate(filterData) {
  if (filterData && (filterData.startDate || filterData.startdate)) {
    let dt = filterData.endDate ? filterData.endDate : filterData.rescind;
    let newdt = "";
    if (dt.indexOf("/") > 0) {
      return dt;
    } else if (dt.indexOf("-") > 0) {
      let spldt = dt.split("-");
      let newdt = spldt[1] + "/" + spldt[2] + "/" + spldt[0];
      return newdt;
    }
  } else {
    return "";
  }
}
export function getEndDate(filterData) {
  if (filterData && filterData.includeAllDates) {
    return "ALL";
  } else if (filterData && (filterData.endDate || filterData.enddate)) {
    const date = filterData.endDate || filterData.enddate;
    let enDate = date;

    if (date.indexOf("-") !== -1) {
      const dt = date.split("-");
      enDate = dt[1] + "/" + dt[2] + "/" + dt[0];
    }

    return enDate;
  } else {
    return "";
  }
}
export function getFrmEffDate(filterData) {
  if (filterData && filterData.effecDate) {
    let dt = filterData.effecDate;
    if (dt.indexOf("/") > 0) {
      return dt;
    } else if (dt.indexOf("-") > 0) {
      let spldt = dt.split("-");
      let newdt = spldt[1] + "/" + spldt[2] + "/" + spldt[0];
      return newdt;
    }
  } else {
    return "";
  }
}
export function getFrmStartDate(filterData) {
  if (filterData && (filterData.startDate || filterData.startdate)) {
    let dt = filterData.startDate ? filterData.startDate : filterData.startdate;
    let newdt = "";
    if (dt.indexOf("/") > 0) {
      return dt;
    } else if (dt.indexOf("-") > 0) {
      let spldt = dt.split("-");
      let newdt = spldt[1] + "/" + spldt[2] + "/" + spldt[0];
      return newdt;
    }
  } else {
    return "";
  }
}
export function getStartDate(filterData) {
  if (filterData && filterData.includeAllDates) {
    return "ALL";
  } else if (filterData && (filterData.startDate || filterData.startdate)) {
    const date = filterData.startDate || filterData.startdate;
    let stDate = date;

    if (date.indexOf("-") !== -1) {
      const dt = date.split("-");
      stDate = dt[1] + "/" + dt[2] + "/" + dt[0];
    }

    return stDate;
  } else {
    return "";
  }
}
export function getFormNum(filterData) {
  if (filterData && filterData.formNumber) {
    return filterData.formNumber;
  } else if (filterData && filterData.formula) {
    return filterData.formula;
  }
}
export function getTaxType(filterData) {
  if (filterData && filterData.taxType) {
    return filterData.taxType;
  } else if (filterData && filterData.garnishParamTaxType) {
    return filterData.garnishParamTaxType;
  } else if (filterData && filterData.taxTypeALL) {
    return filterData.taxTypeALL;
  } else if (filterData && filterData.taxTypes) {
    return filterData.taxTypes;
  }
}
export function getCompanyCode(filterData) {
  if (filterData && filterData.company) {
    return filterData.company;
  } else if (filterData && filterData.companyCode) {
    return filterData.companyCode;
  } else if (filterData && filterData.location) {
    return filterData.location;
  }
}
export function getGroupcode(filterData) {
  if (filterData && filterData.groupCode) {
    return filterData.groupCode;
  } else if (filterData && filterData.employeeGroupCode) {
    return filterData.employeeGroupCode;
  } else if (filterData && filterData.garnishmentGroup) {
    return filterData.garnishmentGroup;
  }
}
export function getPmtUsrCode(filterData) {
  if (filterData && filterData.typeOfData) {
    return filterData.typeOfData;
  } else if (filterData && filterData.customTypeOfData) {
    return filterData.customTypeOfData;
  }
}

export function buildAutoCompSelInput(pageid, store, patten, formValues = {}) {
  let state = store.getState();
  let input;
  if(pageid === "residentTaxTypelocal" || pageid === "residentTaxType" || pageid === "nonresidentTaxType" || pageid === "nonresidentTaxTypelocal") {
    input = {
        "authCode": patten[0].authId
    }
    return input;
  }

  if(pageid === "permissionFor" || pageid === "exitDataset") {
    return {
      "login": state.parentInfo.loginName || "AR"
    }
  }

  if(pageid === "selectDataSet") {
    return {
      login: patten || '',
    }
  }
  
  if (pageid === "formulaTitle") {
    input = {
      pageId: pageid,
      dataset: appDataset(),
      userId: appUserId(),
      pattern: patten,
      authCode: formValues.authority.id,
      taxType: formValues.taxType.id,
    }
    return input;
  }
  console.log(state);
  input = {
    pageId: pageid,
    dataset: appDataset(),
    userId: appUserId(),
    pattern: patten,

  };
  let additionalFields = {}
  if (pageid === 'taxTypeUnemp' && formValues) {
    additionalFields = {
      startdate: formValues.startdate ? moment(formValues.startdate).format("MM/DD/YYYY") : moment().format("MM/DD/YYYY"),
      authCode: formValues['taxCodeUnEmp'].id
    }
    return Object.assign(input, additionalFields);
  } else if (pageid === 'formulaUnemp' && formValues) {
    additionalFields = {
      startdate: formValues.startdate ? moment(formValues.startdate).format("MM/DD/YYYY") : moment().format("MM/DD/YYYY"),
      authCode: formValues['taxCodeUnEmp'].id,
      taxType: formValues['taxTypeUnemp'].id
    }
    return Object.assign(input, additionalFields);
  }
  if (pageid === 'bsitaxtyp' && formValues) {
    additionalFields = {
      checkDate: formValues.startdate ? moment(formValues.startdate).format("MM/DD/YYYY") : moment().format("MM/DD/YYYY"),
      taxAuth: formValues['usrauthcd'].id
    }
    return Object.assign(input, additionalFields);
  } if (pageid === 'formulawhatif' && formValues) {
    additionalFields = {
      checkDate: formValues.startdate ? moment(formValues.startdate).format("MM/DD/YYYY") : moment().format("MM/DD/YYYY"),
      authCode: formValues['usrauthcd'].id,
      taxType: formValues['bsitaxtyp'].id
    }
    return Object.assign(input, additionalFields);
  }
  if(pageid === 'garnishmentType' && formValues){
    return getGarnFormulaOverdTaxTypeInput(input,formValues);
  }
  if(pageid === 'orOverrideTaxType' && formValues){
    return getOrOverrideTaxTypeInput(input,formValues);
  }
  if(pageid === 'orOverrideFormula' && formValues){
    return getOrOverrideFormulaInput(input,formValues);
  }
  if(pageid === 'formula' && formValues){
    input = {
      pageId: pageid,
      dataset: appDataset(),
      userId: appUserId(),
      pattern: patten,
      taxCode:  formValues['taxCode'].id,
      taxType:  formValues['taxType'].id,
      startdate:formValues.startdate ? moment(formValues.startdate).format("MM/DD/YYYY") : moment().format("MM/DD/YYYY"),
    }
    return input;
  }
  // return Object.assign(input, formValues);
  return input;
}
export function buildUsageDataInput(pageid, store, formdata, mode) {
  let state = store.getState();
  console.log("formdata");
  console.log(formdata);
  let input = {
    pageId: pageid,
    dataset: appDataset(),
    userId: appUserId(),
    pmtUsrCode: getUsageUserCode(formdata),
    taxCode: getUsageTaxCode(formdata),
    companyCode: getUsageCompany(formdata),
    companyName: getUsageCompnanyName(formdata),
    usrtax: getUsageDataCode(formdata),
    groupCode: getUsageCode(formdata),
    groupName: formdata.groupName
  };
  return input;
}
export function getUsageCode(formdata) {
  if (formdata && formdata.id) {
    return formdata.company;
  } else if (formdata && formdata.code) {
    return formdata.code;
  }
}

export function getUsageCompany(formdata) {
  if (formdata && formdata.company) {
    return formdata.company;
  }
}
export function getUsageCompnanyName(formdata) {
  if (formdata && formdata.companyName) {
    return formdata.companyName;
  }
}
export function getUsageTaxCode(formdata) {
  if (formdata && formdata.taxCode) {
    return formdata.taxCode;
  }
}
export function getUsageUserCode(formdata) {
  if (formdata && formdata.userCode) {
    return formdata.userCode;
  }
}
export function getUsageDataCode(formdata) {
  if (formdata && formdata.code) {
    return formdata.code;
  }
}
/**
 * buildDeleteInput
 * @param {*} pageid 
 * @param {*} store 
 * @param {*} formdata 
 * @param {*} mode 
 */
export function buildDeleteInput(pageid, store, formdata, mode) {
  let state = store.getState();
  if (pageid === 'dataSets') {
    return buildDataSetsDeleteInput(pageid, formdata, mode, state);
  }else if (pageid === 'logins') {
      return buildLoginsDeleteInput(pageid, formdata, mode, state);
  } else {
    console.log("formdata");
    console.log(formdata);
    const {
      formFilterData
    } = state;
    let input = {
      pageId: pageid,
      dataset: appDataset(),
      userId: appUserId(),
      compCode: getCode(formdata, pageid),
      taxCode: formdata.taxCode,
      taxName: formdata.name,
      type: formdata.taxType,
      code: getCode(formdata, pageid),
      name: getName(formdata, pageid),
      startDate: getFrmStartDate(formdata),
      location: formdata.location,
      street1: formdata.street1,
      street2: formdata.street2,
      city: formdata.city,
      county: formdata.county,
      state: formdata.state,
      zip: formdata.zip,
      employee: formdata.employeeCode,
      checkdate: formdata.checkDate,
      runId: formFilterData.runid
    };
    return input;
  }
}

export function buildDeleteAllInput(pageid, store, formdata, mode) {
  let state = store.getState();
  if (pageid === 'auditLogViewer') {
    return buildAuditLogViewerDeleteAll(pageid, formdata, mode, state);
  }else{
    return {
      dataset: appDataset(),
    }
  }
}

export function buildPdfInput(pageid, store, formdata, mode) {
  const state = store.getState();
  const filterData = state.formFilterData;
  if(pageid==='permissions'){
      return permissionPDfInput(pageid, store, formdata);
  }else{
    return {
      dataset: appDataset(),
      employee: filterData.employeeCode,
      checkdate: filterData.checkDate,
      empGroup: filterData.id,
      userId: appUserId(),
      showSummary: true
    }
  }
}
export function buildSaveInputForPage(pageid, formdata, editMode, state) {
  if (pageid === 'dataSets') {
    return buildDataSetsSaveInput(pageid, formdata, editMode, state);
  }else if (pageid === 'logins') {
      return buildLoginsSaveInput(pageid, formdata, editMode, state);;
  }
  else if (pageid === 'permissions') {
    return buildPermissionsSaveInput(pageid, formdata, editMode, state);;
}  else {
    return buildOtherSaveInput(pageid, formdata, editMode);
  }
}

function buildOtherSaveInput(pageid, formdata, editMode) {
  let input = {
    pageId: pageid,
    dataset: appDataset(),
    userId: appUserId(),
    editMode: editMode,
    code: getCode(formdata, pageid),
    name: getName(formdata, pageid),
    fein: formdata.fein,
    courtesy: formdata.courtesy,
    payCode: formdata.userCode,
    payType: formdata.payType,
    payName: formdata.name,
    e_taxability: formdata.taxability,
    e_maxLimit: formdata.eemax,
    taxCode: formdata.taxCode,
    taxName: formdata.name,
    calcMethod: formdata.cmName,
    flatAmount: formdata.flatAmount,
    maxTax: formdata.maxTax,
    maxWage: formdata.maxWage,
    minWage: formdata.minWage,
    endDate: getFrmEndDate(formdata),
    rounding: formdata.roundingDisplay,
    roundingDisplay: formdata.roundingDisplay,
    startDate: getFrmStartDate(formdata),
    effDate: getFrmEffDate(formdata),
    taxRate: formdata.taxRate,
    type: formdata.taxType,
    location: formdata.location,
    street1: formdata.street1,
    street2: formdata.street2,
    city: formdata.city,
    county: formdata.county,
    state: formdata.state,
    zip: formdata.zip
  }
  return input;
}
export function buildSaveInput(pageid, store, formdata, mode) {
  let state = store.getState();
  console.log(formdata);
  let editMode = 0;
  if (mode === "New") {
    editMode = 1;
  } else if (mode === "Edit") {
    editMode = 2;
  }
  let input = buildSaveInputForPage(pageid, formdata, editMode, state);
  return input;
}
export function getTerminationDate(filterData) {
  if (filterData && (filterData.terminationDate)) {
    let dt = filterData.terminationDate;
    let newdt = "";
    if (dt.indexOf("/") > 0) {
      return dt;
    } else if (dt.indexOf("-") > 0) {
      let spldt = dt.split("-");
      let newdt = spldt[1] + "/" + spldt[2] + "/" + spldt[0];
      return newdt;
    }
  } else {
    return "";
  }
}
export function getCode(formdata, pageid) {
  if (formdata && formdata.company) {
    return formdata.company;
  } else if (formdata && formdata.code) {
    return formdata.code;
  } else if (formdata && formdata.id) {
    return formdata.id;
  } else if (formdata && formdata.bsiAuth) {
    return formdata.bsiAuth;
  } else if (pageid && pageid == "worksiteCompanies") {
    return store.getState().formFilterData.company;
  }
}
export function getName(formdata, pageid) {
  if (formdata && formdata.companyName) {
    return formdata.companyName;
  } else if (formdata && formdata.name) {
    return formdata.name;
  } else if (formdata && formdata.groupName) {
    return formdata.groupName;
  } else if (pageid && pageid == "worksiteCompanies") {
    return store.getState().formFilterData.companyName;
  }
}
export const reqInfo = data => {
  let info = {};
  if (isMock()) {
    info = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    };
  } else {
    info = {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    };
  }
  return info;
};

export function getUrl(id) {
  let metadataMap = metadatamap.find(metadatam => id == metadatam.id);
  let url = generateUrl.buildURL(metadataMap.url);
  if (isMock()) {
    // for webpack generated mock data
    if (mockDataMapper[id]) {
      url = mockDataMapper[id];
    } else {
      // For custom generated mock data
      metadataMap = mockdatamap.find(metadatam => {
        if (id == metadatam.id) return metadatam;
      });
      url = metadataMap.url;
    }
  }
  console.log("View URL %s for page %s", url, id);
  return url;
}

export function deleteUrl(id) {
  let deldataMap = deletedatamap.find(metadatam => {
    if (id == metadatam.id) return metadatam;
  });
  let url = generateUrl.buildURL(deldataMap.url);
  if (isMock()) {
    if (mockDataMapper[id]) {
      url = mockDataMapper[id];
    } else {
      let deldataMap = mockdelmap.find(metadatam => {
        if (id == metadatam.id) return metadatam;
      });
      url = deldataMap.url;
    }
  }
  console.log("Delete URL %s for page %s", url, id);
  return url;
}

export function deleteAllUrl(id) {
  let deldataallMap = deletealldatamap.find(metadatam => {
    if (id == metadatam.id) return metadatam;
  });
  let url = generateUrl.buildURL(deldataallMap.url);
  console.log("Delete All URL %s for page %s", url, id);
  return url;
}

export function viewPDFUrl(id) {
  let viewPdf = viewPDFMap.find(metadatam => {
    if (id == metadatam.id) return metadatam;
  });
  let url = generateUrl.buildURL(viewPdf.url);
  if (isMock()) {
    if (mockDataMapper[id]) {
      url = mockDataMapper[id];
    } else {
      let viewPdf = mockdelmap.find(metadatam => {
        if (id == metadatam.id) return metadatam;
      });
      url = viewPdf.url;
    }
  }
  console.log("VIEW PDF URL %s for page %s", url, id);
  return url;
}

export function viewPDFUrlButtonBar(id) {
  let viewPdf = viewPDFMapButtonBar.find(metadatam => {
    if (id == metadatam.id) return metadatam;
  });
  let url = generateUrl.buildURL(viewPdf.url);
  if (isMock()) {
    if (mockDataMapper[id]) {
      url = mockDataMapper[id];
    } else {
      let viewPdf = mockdelmap.find(metadatam => {
        if (id == metadatam.id) return metadatam;
      });
      url = viewPdf.url;
    }
  }
  console.log("VIEW PDF URL %s for page %s", url, id);
  return url;
}

export function generateUrlButtonBar(id) {
  let viewPdf = generateMapButtonBar.find(metadatam => {
    if (id == metadatam.id) return metadatam;
  });
  let url = generateUrl.buildURL(viewPdf.url);
  if (isMock()) {
    if (mockDataMapper[id]) {
      url = mockDataMapper[id];
    } else {
      let viewPdf = mockdelmap.find(metadatam => {
        if (id == metadatam.id) return metadatam;
      });
      url = viewPdf.url;
    }
  }
  console.log("VIEW PDF URL %s for page %s", url, id);
  return url;
}

export function saveUrl(id) {
  let saveDataMap = savedatamap.find(metadatam => {
    console.log(id, metadatam.id);
    if (id == metadatam.id) return metadatam;
  });
  let url = generateUrl.buildURL(saveDataMap.url);
  if (isMock()) {
    if (mockDataMapper[id]) {
      url = mockDataMapper[id];
    } else {
      let saveDataMap = mocksavmap.find(metadatam => {
        if (id == metadatam.id) return metadatam;
      });
      url = saveDataMap.url;
    }
  }
  console.log("Save URL %s for page %s", url, id);
  return url;
}

//saveAsAPIMap
export function saveAsUrl(id) {
  let saveAsDataMap = saveAsdatamap.find(metadatam => {
    console.log(id, metadatam.id);
    if (id == metadatam.id) return metadatam;
  });
  let url = generateUrl.buildURL(saveAsDataMap.url);
  if (isMock()) {
    if (mockDataMapper[id]) {
      url = mockDataMapper[id];
    } else {
      let saveAsDataMap = mocksavmap.find(metadatam => {
        if (id == metadatam.id) return metadatam;
      });
      url = saveAsDataMap.url;
    }
  }
  console.log("SaveAs URL %s for page %s", url, id);
  return url;
}

export function generateReportUrl(id) {
  let generateRportMap = generateDataMap.find(metadatam => {
    if (id == metadatam.id) return metadatam;
  });
  let url = generateUrl.buildURL(generateRportMap.url);
  if (isMock() && mockDataMapper[id]) {
    url = mockDataMapper[id];
  }
  return url;
}

export function autocompleteURL(id) {
  let autoCompleteDataMap = asyncselfldsmap.find(metadatam => {
    console.log(id, metadatam.id);
    if (id == metadatam.id) return metadatam;
  });
  let url = generateUrl.buildURL(autoCompleteDataMap.url);
  if (isMock()) {
    if (mockAutoCompleteMap[id]) {
      url = mockAutoCompleteMap[id];
    } else {
      autoCompleteDataMap = mockselectmap.find(metadatam => {
        if (id == metadatam.id) return metadatam;
      });
      url = autoCompleteDataMap.url;
    }
  }
  console.log("Save URL %s for page %s", url, id);
  return url;
}

export const setTemplateData = (str, data) => {
  const regex = /\${(.*?)}/gi;
  const matches = str.match(regex);
  if (matches) {
    matches.forEach(match => {
      const regexObj = new RegExp(/\${(.*?)}/, "gi");
      const fieldMatches = regexObj.exec(match);
      if (fieldMatches && fieldMatches[1]) {
        str = str.replace(match, data[fieldMatches[1]]);
      }
    });
  }
  return str;
};

const mockdelmap = [];
const mocksavmap = [];
const mockdatamap = [];
export function populateParentData(fieldInfo,initialValues, pageId) {
  if (pageId === 'pageId') {
  }else if (pageId === 'pageId') {
  }
  return initialValues;
}
//all for test autoComplete
const mockselectmap = [];