import {
  GET_CUSTOM_TAX_CODES,
  GET_SAMPLE_DATE_FIELD_DATA,
  GET_RECENT_USAGE,
  GET_COMPANIES,
  GET_CUSTOM_TAX_FORMULAS,
  // Async field APIs
  GET_ALL_TAXCODES_AUTOCOMPLETE,
  GET_ALL_TAXTYPES_AUTOCOMPLETE,
  GET_PAYMENT_AUTOCOMPLETE_MOCKDATA,
  GET_ALL_AUTHORITY_CODE_AUTOCOMPLETE,
  GET_EXEMPT_MILITARY_LOCATION_AUTOCOMPLETE_MOCKDATA,
  GET_PRINCIPAL_STATE_EMPLOYMENT_AUTOCOMPLETE_MOCKDATA,
  GET_PLACE_CODE_AUTOCOMPLETE,
  GET_SCHOOL_DISTRICT_AUTOCOMPLETE,
  GET_GARNISMENT_FORMULA_AUTOCOMPLETE,
  GET_CUSTOM_GARNISMENT_FORMULA_AUTOCOMPLETE,
  GET_COUNTY_AUTOCOMPLETE,
  GET_GROUP_AUTOCOMPLETE,
  GET_USER_TAX_CODE_AUTOCOMPLETE_MOCKDATA,
  GET_TAX_CODE_UDQ_AUTOCOMPLETE_MOCKDATA,
  GET_CUSTOM_TYPEOF_DATA,
  GET_PAYMENT_CODE_AUTOCOMPLETE_MOCKDATA,
  GET_TAX_CODE_RECIPROCATE_AUTOCOMPLETE_MOCKDATA,
  GET_TAX_CODE_OVERRIDDEN_AUTOCOMPLETE_MOCKDATA,
  GET_NON_RESIDENCE_TAX_TYPE_AUTOCOMPLETE_MOCKDATA,
  GET_RESIDENCE_TAX_TYPE_AUTOCOMPLETE_MOCKDATA,
  GET_CALCULATION_METHOD_AUTOCOMPLETE_MOCKDATA,
  GET_WAGE_REPORTING_METHOD_AUTOCOMPLETE_MOCKDATA,
  GET_RESIDENT_STATE_AUTOCOMPLETE_MOCKDATA,
  GET_CUSTOM_GARNISMENT_CODE_AUTOCOMPLETE,
  DELTE_CUSTOM_PAYMENT,
  GET_CUSTOM_TAXCODES_AUTOCOMPLETE,
  GET_TYPEOF_DATA,
  GET_UDQ_AUTOCOMPLETE,
  GET_EMPLOYEE_GROUPS,
  SAVE_SUPPRESS_MESSAGES,
  GET_SUPPRESSED_MESSAGES,
  GET_DATASETS,
  SAVE_DATASET,
  DELETE_DATASET,
  GET_PERMISSIONS,
  SAVE_PERMISSIONS,
  PERMISSION_FOR,
  CUSTOM_GARNISHMENT_FORMULA,
  AUTHORITY_NAME,
  GET_MESSAGE_VIEWER,
  GET_MESSAGES_VIEWER,
  GET_MESSAGES_VIEWER_TYPE,
  GET_MESSAGES_RUN_LIST_BY_DATE,
  DELETE_ALL_MESSAGES,
  DELETE_ALL_MESSAGES_BY_RUN_ID,
  GET_TAXTYPES_AUTOCOMPLETE,
  GET_TAXCODES_AUTOCOMPLETE,
  GET_TAXTYPES,
  GET_BENEFITS_PLANS,
  WAGE_CODE_DESC,
  GROUP_OVERRIDE_AUTHORITY,
  GROUP_OVERRIDE_FORMULA,
  VIEW_PDF_GROUP_OVERRIDE,
  GET_REDUNDANT_ADDRESS_OVERRIDES,
  GET_UM_EMPLOYMENT_OVERRIDE_SAVE,
  GET_RECIPROCAL_OVERRIDES,
  GET_RECIPROCAL_OVERRIDE,
  GET_TAX_CODE_TOBE_OVERRIDEN_STATE,
  GET_RESIDENT_TAX_TYPE_STATE,
  GET_TAX_CODE_TO_RECIPROCATE_STATE,
  GET_NON_RESIDENT_TAX_TYPE_STATE,
  GET_TAX_CODE_TOBE_OVERRIDEN_LOCAL,
  GET_RESIDENT_TAX_TYPE_LOCAL,
  GET_TAX_CODE_TO_RECIPROCATE_LOCAL,
  GET_NON_RESIDENT_TAX_TYPE_LOCAL,
  GET_CONNECT_TO_DATA_SETS,
  GET_GARN_FORMULA_OVERD_TAXTYPE_AUTOCOMP,
  GET_OPTIONAL_RATE_OVRD_AUTO_COMP_AUTH,
  GET_OPTIONAL_RATE_OVRD_AUTO_COMP_TAXT,
  GET_OPTIONAL_RATE_OVRD_AUTO_COMP_FORM,
  GET_OPTIONAL_RATE_OVRD_BSI_WAGE,
  GET_CUSTOM_BACKUP_RESTORE,
  GET_CUSTOM_DATA_BACKUP,
  GET_CUSTOM_DATA_RESTORE,
  GET_OPTIONAL_UNEMPLOYMENT_BACKUP,
  GET_OPTIONAL_UNEMPLOYMENT_RESTORE,
  GENERATE_DATABASE_LOAD,
  SAVE_CUSTOM_DATA_BACKUP,
  GET_LOGINS,
  SAVE_LOGINS,
  DELETE_LOGINS,
  VIEW_PERMISSION_PDF,
  GET_AUDIT_LOG_VIEWER,
  GET_AUDIT_LOG_VIEWER_LOGIN,
  GET_AUDIT_LOG_VIEWER_DATASET,
  DELETE_ALL_LOG_VIEWER,
  DEFAULT_PERMISSION
} from './ServiceUrls';

export const metaDataApiMap = {
  recentUsage: GET_RECENT_USAGE,
  auditLogViewer: GET_AUDIT_LOG_VIEWER,
  logins: GET_CUSTOM_TAX_CODES,
  messageViewer: GET_MESSAGE_VIEWER,
  messagesViewer: GET_MESSAGES_VIEWER,
  messageViewListByMessageType: GET_MESSAGES_VIEWER_TYPE,
  getMessageRunListByFilterDate: GET_MESSAGES_RUN_LIST_BY_DATE,
  // Mapping Tools
  taxCodeUsage: GET_CUSTOM_TAX_FORMULAS,
  taxTypeUsage: GET_CUSTOM_TAX_FORMULAS,
  paymentCodeUsage: GET_CUSTOM_TAX_FORMULAS,
  messageToSuppress: GET_SUPPRESSED_MESSAGES,
  // Garnishnishment Formula Override
  dataSets: GET_DATASETS,
  permissions: GET_PERMISSIONS,
  selectSamplePage: GET_SAMPLE_DATE_FIELD_DATA,
  findRedundantOverrides:GET_REDUNDANT_ADDRESS_OVERRIDES,
  reciprocalOverrides: GET_RECIPROCAL_OVERRIDES,
  reciprocalOverride: GET_RECIPROCAL_OVERRIDE,
  connectToDataSets: GET_CONNECT_TO_DATA_SETS,
  custombackupRestore: GET_CUSTOM_BACKUP_RESTORE,
  customdataBackup: GET_CUSTOM_DATA_BACKUP,
  optionalBackup: GET_OPTIONAL_UNEMPLOYMENT_BACKUP,
  customrestoreStatus: './_customrestoreStatus_MockData.json',
  databaseloadStatus: './_databaseloadStatus_MockData.json',
  manualupdateStatus: './_manualupdateStatus_MockData.json',
  logins: GET_LOGINS,
  resetDefaultLogin: GET_PERMISSIONS
};

export const viewPDFButtonBar = {
  permissions: VIEW_PERMISSION_PDF
}

export const viewPDFApiMap = {
  manualUpdate: VIEW_PDF_GROUP_OVERRIDE,
}

export const deleteDataApiMap = {
  messageViewer: DELETE_ALL_MESSAGES,
  messagesViewer: DELETE_ALL_MESSAGES_BY_RUN_ID,
  dataSets: DELETE_DATASET,
  logins: DELETE_LOGINS,
};

export const deleteAllDataApiMap = {
  auditLogViewer: DELETE_ALL_LOG_VIEWER,
};

export const saveDataApiMap = {
  logins: SAVE_LOGINS,
  messageToSuppress: SAVE_SUPPRESS_MESSAGES,
  permissions: SAVE_PERMISSIONS,
  unemploymentCompanyOverrides:GET_UM_EMPLOYMENT_OVERRIDE_SAVE,
  generalconfigOption: './_customrestoreStatus_MockData.json',
  dataSets: SAVE_DATASET
};

export const saveAsAPIMap = {
  
}

export const generateApiMap = {
  customdataRestore: GET_CUSTOM_DATA_RESTORE,
  optionalRestore: GET_OPTIONAL_UNEMPLOYMENT_RESTORE,
  databaseLoad: GENERATE_DATABASE_LOAD,
  customdataBackup: SAVE_CUSTOM_DATA_BACKUP,
  installmachineKey:'./_installmachineKey_MockData.json',
  manualUpdate:'./_manualUpdate_MockData.json',
  customrestoreStatus: './_customrestoreStatus_MockData.json',
  optionalBackup: './_customrestoreStatus_MockData.json',
  manualupdateStatus: './_manualupdateStatus_MockData.json',
  databaseloadStatus: './_databaseloadStatus_MockData.json',
};

export const autoCompleteApiMap = {
  wageReportingMethod: GET_WAGE_REPORTING_METHOD_AUTOCOMPLETE_MOCKDATA,
  calculationMethod: GET_CALCULATION_METHOD_AUTOCOMPLETE_MOCKDATA,
  nonResidenceTaxType: GET_NON_RESIDENCE_TAX_TYPE_AUTOCOMPLETE_MOCKDATA,
  residenceTaxType: GET_RESIDENCE_TAX_TYPE_AUTOCOMPLETE_MOCKDATA,
  taxCodeReciprocate: GET_TAX_CODE_RECIPROCATE_AUTOCOMPLETE_MOCKDATA,
  userTaxCode: GET_USER_TAX_CODE_AUTOCOMPLETE_MOCKDATA,
  taxability: GET_TAXCODES_AUTOCOMPLETE,
  taxType: GET_ALL_TAXTYPES_AUTOCOMPLETE,
  taxTypeALL:GET_TAXTYPES_AUTOCOMPLETE,
  taxTypes:GET_TAXTYPES,
  garnishParamTaxType: GET_UDQ_AUTOCOMPLETE,
  companyCode: GET_UDQ_AUTOCOMPLETE,
  riskClass: GET_UDQ_AUTOCOMPLETE,
  taxCode: GET_ALL_TAXCODES_AUTOCOMPLETE,
  taxCodeUnEmp:GET_UDQ_AUTOCOMPLETE,
  authorityCode: GET_ALL_AUTHORITY_CODE_AUTOCOMPLETE,
  authorityCodeList: GET_ALL_AUTHORITY_CODE_AUTOCOMPLETE,
  authorityCodegdw: GET_UDQ_AUTOCOMPLETE,
  authorityCodegp:GET_UDQ_AUTOCOMPLETE,
  authorityCodeNoall:GET_UDQ_AUTOCOMPLETE,
  placeCode: GET_PLACE_CODE_AUTOCOMPLETE,
  schoolDistrict: GET_SCHOOL_DISTRICT_AUTOCOMPLETE,
  garnishmentFormula: GET_GARNISMENT_FORMULA_AUTOCOMPLETE,
  garnishmentGroupCode: GET_UDQ_AUTOCOMPLETE,
  customTaxName: GET_CUSTOM_GARNISMENT_FORMULA_AUTOCOMPLETE,
  customGarnishmentCode: GET_CUSTOM_GARNISMENT_CODE_AUTOCOMPLETE,
  county: GET_COUNTY_AUTOCOMPLETE,
  groupAsync: GET_GROUP_AUTOCOMPLETE,
  groupCode: GET_UDQ_AUTOCOMPLETE,
  garnishmentGroup: GET_UDQ_AUTOCOMPLETE,
  taxCodeUdq: GET_TAX_CODE_UDQ_AUTOCOMPLETE_MOCKDATA,
  typeOfData: GET_TYPEOF_DATA,
  userTax: GET_UDQ_AUTOCOMPLETE,
  paymentCode: GET_PAYMENT_CODE_AUTOCOMPLETE_MOCKDATA,
  taxCodeOverridden: GET_TAX_CODE_OVERRIDDEN_AUTOCOMPLETE_MOCKDATA,
  formula: GET_UDQ_AUTOCOMPLETE,
  residentState: GET_RESIDENT_STATE_AUTOCOMPLETE_MOCKDATA,
  exemptMilitaryLocation: GET_EXEMPT_MILITARY_LOCATION_AUTOCOMPLETE_MOCKDATA,
  principalStateEmployment: GET_PRINCIPAL_STATE_EMPLOYMENT_AUTOCOMPLETE_MOCKDATA,
  payment: GET_PAYMENT_AUTOCOMPLETE_MOCKDATA,
  customTaxCode: GET_CUSTOM_TAXCODES_AUTOCOMPLETE,
  customTypeOfData: GET_CUSTOM_TYPEOF_DATA,
  employeeGroupCode: GET_UDQ_AUTOCOMPLETE,
  bsiAuth: GET_UDQ_AUTOCOMPLETE,
  permissionFor: PERMISSION_FOR,
  customGarnishmentFormula: CUSTOM_GARNISHMENT_FORMULA,
  garnishmentType: GET_GARN_FORMULA_OVERD_TAXTYPE_AUTOCOMP,
  authorityName: AUTHORITY_NAME,
  employeeGroup: GET_EMPLOYEE_GROUPS,
  empGroup:GET_EMPLOYEE_GROUPS,
  company: GET_COMPANIES,
  remncd:GET_BENEFITS_PLANS,
  wageCodedesc: WAGE_CODE_DESC,
  authority: GROUP_OVERRIDE_AUTHORITY,
  formulaTitle: GROUP_OVERRIDE_FORMULA,
  authTaxCode:GET_UDQ_AUTOCOMPLETE,
  planId:GET_UDQ_AUTOCOMPLETE,
  taxTypeUnemp:GET_UDQ_AUTOCOMPLETE,
  formulaUnemp:GET_UDQ_AUTOCOMPLETE,
  usrTax: GET_UDQ_AUTOCOMPLETE,
  taxCodeToBeOverridden: GET_TAX_CODE_TOBE_OVERRIDEN_STATE,
  residentTaxType: GET_RESIDENT_TAX_TYPE_STATE,
  taxCodeToReciprocate: GET_TAX_CODE_TO_RECIPROCATE_STATE,
  nonresidentTaxType: GET_NON_RESIDENT_TAX_TYPE_STATE,
  taxCodeToBeOverriddenlocal: GET_TAX_CODE_TOBE_OVERRIDEN_LOCAL,
  residentTaxTypelocal: GET_RESIDENT_TAX_TYPE_LOCAL,
  taxCodeToReciprocatelocal: GET_TAX_CODE_TO_RECIPROCATE_LOCAL,
  nonresidentTaxTypelocal: GET_NON_RESIDENT_TAX_TYPE_LOCAL,
  orOverrideAuth:GET_OPTIONAL_RATE_OVRD_AUTO_COMP_AUTH,
  orOverrideTaxType:GET_OPTIONAL_RATE_OVRD_AUTO_COMP_TAXT,
  orOverrideFormula:GET_OPTIONAL_RATE_OVRD_AUTO_COMP_FORM,
  orOverrideBsiWage:GET_OPTIONAL_RATE_OVRD_BSI_WAGE,
  selectLogin: GET_AUDIT_LOG_VIEWER_LOGIN,
  selectDataSet: GET_AUDIT_LOG_VIEWER_DATASET
};
