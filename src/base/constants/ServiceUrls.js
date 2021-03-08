export const GET_EXISTING_FAVORITE_LINKS = '/getExistingFavoriteLinks';
export const DELETE_EXISTING_FAVORITE_LINKS = '/deleteExistingFavoriteLinks';
export const INSERT_FAVORITE_LINK_RECORD = '/insertFavoriteLinkRecord';
export const GET_RECENT_USAGE = '/UsageDataService/getUsageData';
export const GET_ALL_TAXCODES_AUTOCOMPLETE = '/TaxCodeService/getAllTaxCodesAutocomplete';
export const GET_ALL_TAXTYPES_AUTOCOMPLETE = '/TaxCodeService/getAllTaxTypeAutocomplete';
export const GET_TAXCODES_AUTOCOMPLETE = '/TaxCodeService/getTaxCodesAutocomplete';
export const GET_TAXTYPES_AUTOCOMPLETE = '/TaxCodeService/getTaxTypeAutocomplete';
export const GET_TAXTYPES = '/TaxCodeService/getTaxTypes';
export const GET_PAYMENT_AUTOCOMPLETE_MOCKDATA = '/TaxCodeService/getPaymentAutoCompl';
export const GET_ALL_AUTHORITY_CODE_AUTOCOMPLETE = '/TaxCodeService/getAuthoritiesAutocomplete';
export const GET_PLACE_CODE_AUTOCOMPLETE = '/TaxCodeService/getPlaceCodeAutoCompl';
export const GET_SCHOOL_DISTRICT_AUTOCOMPLETE = '/TaxCodeService/getSchoolDistrictAutoCompl';
export const GET_GARNISMENT_FORMULA_AUTOCOMPLETE = '/TaxCodeService/getGarnishmenFormulaAutoCompl';
export const GET_GARNISMENT_GROUP_CODE_AUTOCOMPLETE = '/TaxCodeService/getGarnishmenGroupCodeAutoCompl';
export const GET_CUSTOM_GARNISMENT_CODE_AUTOCOMPLETE = '/TaxCodeService/getCustomGarnishmentCodeAutoCompl';
export const GET_COUNTY_AUTOCOMPLETE = '/TaxCodeService/getCounty';
export const GET_GROUP_AUTOCOMPLETE = '/TaxCodeService/getGroup';
export const GET_TAX_CODE_OVERRIDDEN_AUTOCOMPLETE_MOCKDATA = '/TaxCodeService/getTaxCodeOverriden';
export const GET_NON_RESIDENCE_TAX_TYPE_AUTOCOMPLETE_MOCKDATA = '/TaxCodeService/getNonResidenceTaxType';
export const GET_RESIDENCE_TAX_TYPE_AUTOCOMPLETE_MOCKDATA = '/TaxCodeService/getResidenceTaxType';
export const GET_TAX_CODE_RECIPROCATE_AUTOCOMPLETE_MOCKDATA = '/TaxCodeService/getTaxCodeReciprocate';
export const GET_PAYMENT_CODE_AUTOCOMPLETE_MOCKDATA = '/TaxCodeService/getPaymentCode';
export const GET_USER_TAX_CODE_AUTOCOMPLETE_MOCKDATA = '/TaxCodeService/getUserTaxCode';
export const GET_CUSTOM_TYPEOF_DATA = '/TaxCodeService/getPmtCodesAutocomplete';
export const GET_TAX_CODE_UDQ_AUTOCOMPLETE_MOCKDATA = '/TaxCodeService/getTaxCode';
export const GET_CALCULATION_METHOD_AUTOCOMPLETE_MOCKDATA = '/TaxCodeService/getCalculationMethod';
export const GET_WAGE_REPORTING_METHOD_AUTOCOMPLETE_MOCKDATA = '/TaxCodeService/getWageReportingmethod';
export const GET_CUSTOM_TAXCODES_AUTOCOMPLETE = '/TaxCodeService/getCustomTaxCodesAutocomplete';
export const GET_CUSTOM_GARNISHMENT_CODES = '/GarnishmentService/getCustomGarnishmentList';
export const SAVE_CUSTOM_GARNISHMENT_CODE = '/GarnishmentService/saveCustomGarnishment';
export const SAVE_SUPPRESS_MESSAGES = '/MessageSuppress/saveMessagesToSuppress';
export const GET_SUPPRESSED_MESSAGES = '/MessageSuppress/getSuppressedMessages';
export const GARNISHMENT_FORMULAS_OVERRIDE = '/GarnishmentOverrite/getFormulasOverride';
export const GARNISHMENT_FORMULA_OVERRIDES = '/GarnishmentService/getGarnishmentFormulaOverrides';
export const GET_PERMISSIONS = '/UserProfileService/refreshPermission';
export const SAVE_PERMISSIONS = '/UserProfileService/savePermission';
export const PERMISSION_FOR = '/DatasetService/getDatasets';
export const CUSTOM_GARNISHMENT_FORMULA = './CUSTOM_GARNISHMENT_FORMULA';
export const GARNISHMENT = './GARNISHMENT';
export const AUTHORITY_NAME = './AUTHORITY_NAME';
export const GET_MESSAGE_VIEWER = '/MessageService/getMessageRunList'
export const GET_MESSAGES_VIEWER = '/MessageService/getMessageViewListByRunId'
export const GET_MESSAGES_VIEWER_TYPE = '/MessageService/getMessageViewListByMessageType'
export const GET_MESSAGES_RUN_LIST_BY_DATE = '/MessageService/getMessageRunListByFilterDate'
export const DELETE_ALL_MESSAGES = '/MessageService/deleteAllMessages'
export const DELETE_ALL_MESSAGES_BY_RUN_ID = '/MessageService/deleteAllMessagesByRunId'
export const GET_GROUP_OVERRIDE = '/EmployeeService/getGroupOverrides'
export const GET_GROUP_OVERRIDES = '/EmployeeService/getEmployeeGroupList'
export const GROUP_OVERRIDE_AUTHORITY = '/EmployeeService/getGroupOverrideAutocompleteAuth'
export const GROUP_OVERRIDE_FORMULA = '/EmployeeService/getGroupOverrideAutocompleteFormulas'
export const VIEW_PDF_GROUP_OVERRIDE = '/EmployeeService/generateGroupOverridesPDF'
export const SAVE_GROUP_OVERRIDE = '/EmployeeService/saveGroupOverride'
export const DELETE_GROUP_OVERRIDE = '/EmployeeService/deleteGroupOverride'
export const GET_PAYMENT_OVERRIDE = '/PaymentsService/getPaymentOverrideList'
export const DELETE_PAYMENT_OVERRIDE ='/PaymentsService/deletePaymentOverride'
export const SAVE_PAYMENT_OVERRIDE ='/PaymentsService/savePaymentOverride'
export const GET_ADDRESS_OVERRIDES = '/TaxCodeService/getAddressOverrides'
export const DELETE_ADDRESS_OVERRIDES='/TaxCodeService/deleteAddressOverride'
export const SAVE_ADDRESS_OVERRIDES='/TaxCodeService/saveAddressOverride'
export const GET_REDUNDANT_ADDRESS_OVERRIDES='/TaxCodeService/getRedundantAddressOverrides'
export const GET_UM_EMPLOYMENT_OVERRIDE_LIST ='/TaxCodeService/getUnempOverrideList'
export const GET_UM_EMPLOYMENT_OVERRIDE_DELETE='/TaxCodeService/deleteUnemploymentOverride'
export const GET_UM_EMPLOYMENT_OVERRIDE_SAVE='/TaxCodeService/saveUnemploymentOverride'
export const GET_CUSTOM_GARNISHMENT_FORMULAS='/GarnishmentService/getCustomGarnishmentFormulasList'
export const GET_RECIPROCAL_OVERRIDES= '/EmployeeService/getEmployeeGroupList'
export const GET_RECIPROCAL_OVERRIDE= '/TaxCodeService/getReciprocalOverrideList'
export const GET_TAX_CODE_TOBE_OVERRIDEN_STATE = '/TaxCodeService/getRecipOvrdAutocompleteResAuthorities'
export const GET_RESIDENT_TAX_TYPE_STATE = '/TaxCodeService/getRecipOvrdAutocompleteResTaxTypes'
export const GET_TAX_CODE_TO_RECIPROCATE_STATE = '/TaxCodeService/getRecipOvrdAutocompleteNonResAuthorities'
export const GET_NON_RESIDENT_TAX_TYPE_STATE = '/TaxCodeService/getRecipOvrdAutocompleteNonResTaxTypes'
export const GET_TAX_CODE_TOBE_OVERRIDEN_LOCAL = '/TaxCodeService/getRecipOvrdAutocompleteResAuthoritiesLocal'
export const GET_RESIDENT_TAX_TYPE_LOCAL = '/TaxCodeService/getRecipOvrdAutocompleteResTaxTypesLocal'
export const GET_TAX_CODE_TO_RECIPROCATE_LOCAL = '/TaxCodeService/getRecipOvrdAutocompleteNonResAuthoritiesLocal'
export const GET_NON_RESIDENT_TAX_TYPE_LOCAL = '/TaxCodeService/getRecipOvrdAutocompleteNonResTaxTypesLocal'
export const DELETE_RECIPROCAL_OVERRIDE = '/TaxCodeService/deleteReciprocalOverride'
export const SAVE_RECIPROCAL_OVERRIDE = '/TaxCodeService/saveReciprocalOverride'
export const GET_CONNECT_TO_DATA_SETS = '/TaxCodeService/saveReciprocalOverride'
export const DELETE_GARNISHMENT_FORMULA_OVERRIDE = '/GarnishmentService/deleteGarnishmentFormulaOverride'
export const GET_GARN_FORMULA_OVERD_TAXTYPE_AUTOCOMP=  '/GarnishmentService/getGarnFormulaOverdTaxTypeAutocomplete'
export const SAVE_GARNISHMENT_FORMULA_OVD = '/GarnishmentService/saveGarnishmentFormulaOverride'
export const GARNISHMENT_FORMULA_OVERRIDE_PDF ='/GarnishmentService/generateGarnishmentFormulaOverridePDF'
export const GET_CUSTOM_BACKUP_RESTORE= './_custombackupRestore_MockData.json'
export const GET_CUSTOM_DATA_BACKUP= './_customdataBackup_MockData.json'
export const GET_CUSTOM_DATA_RESTORE= './_customdataRestore_MockData.json'
export const GET_OPTIONAL_UNEMPLOYMENT_BACKUP= './_optionalBackup_MockData.json'
export const GET_OPTIONAL_UNEMPLOYMENT_RESTORE = './_optionalRestore_MockData.json'
export const GENERATE_DATABASE_LOAD = './_databaseLoad_MockData.json'
export const SAVE_CUSTOM_DATA_BACKUP = './_customdataBackup_MockData.json'
//Datasets API Start
export const GET_DATASETS = '/DatasetService/getDatasetList';
export const SAVE_DATASET = '/DatasetService/saveDataset';
export const DELETE_DATASET = '/DatasetService/deleteDataset';
//Datasets API Start
export const GET_LOGINS = '/UserProfileService/getLoginList'
export const SAVE_LOGINS = '/UserProfileService/saveLogin'
export const DELETE_LOGINS = '/UserProfileService/deleteLogin'
export const VIEW_PERMISSION_PDF = '/UserProfileService/generatePermissionListPDF'
export const GET_AUDIT_LOG_VIEWER = '/DatasetService/getAuditViewList'
export const GET_AUDIT_LOG_VIEWER_LOGIN = '/DatasetService/getLoginList'
export const GET_AUDIT_LOG_VIEWER_DATASET = '/DatasetService/getDatasets'
export const DELETE_ALL_LOG_VIEWER = '/DatasetService/deleteAllAudit'
export const DEFAULT_PERMISSION = '/UserProfileService/defaultPermission'