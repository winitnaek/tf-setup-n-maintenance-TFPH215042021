/**
 * buildLoginsSaveInput
 * @param {*} pageId 
 * @param {*} formData 
 * @param {*} editMode 
 * @param {*} state 
 */
export function buildLoginsSaveInput(pageId, formData, editMode, state) {
    let input = {
      dataset: appDataset(),
      userId: appUserId(),
      pageId: pageId,
      login:formData.loginName,
      password:formData.password,
      confPassword:formData.confirmPassword,
      manageLogins:formData.manageLogins,
      manageDatasets:formData.manageDatasets,
      "manageUIPermissions":"Y",
      "profileExpOn":"08/19/2025",
      "pwdResetDays":"99",
      "maxAttempts":"99",
      editMode: editMode
    };
    return input;
  }

  /**
 * buildLoginsDeleteInput
 * @param {*} pageId 
 * @param {*} formData 
 * @param {*} mode 
 * @param {*} state 
 */
export function buildLoginsDeleteInput(pageId, formData, mode, state){
    let input = {
      pageId: pageId,
      dataset: appDataset(),
      userId: appUserId(),
      login:formData.loginName
    };
    return input;
  }

  /**
 * buildLoginsSaveInput
 * @param {*} pageId 
 * @param {*} formData 
 * @param {*} editMode 
 * @param {*} state 
 */
export function buildPermissionsSaveInput(pageId, formData, editMode, state) {
  const selecedDataSet = sessionStorage.getItem('newDataName');
  let input = {
    "pageId":pageId,        
    "userId":appUserId(),
    "login": state.parentInfo.loginName,
    "dataset": appDataset(),
    "selectedDataset": selecedDataSet,
    "rightList": formData
  };
  return input;
}

/**
 * permissionsGridInput
 * @param {*} pageId 
 * @param {*} filterData 
 * @param {*} stDate 
 * @param {*} enDate 
 * @param {*} state 
 */
export function permissionsGridInput(pageId, formData, stDate, enDate, state) {
  let parentInfo = state.parentInfo;
  let input = {
    pageId: pageId,
    userId:appUserId(),
    dataset: appDataset(),
    login: parentInfo.loginName,
    "selectedDataset": sessionStorage.getItem('newDataName') || appDataset()
  };
  return input;
}
  

export function permissionPDfInput(pageId, store, data = []) {
  let parentInfo = store.getState().parentInfo;
  return {
    pageId: pageId,
    userId:appUserId(),
    dataset: appDataset(),
    login: parentInfo.loginName,
    selectedDataset: sessionStorage.getItem('newDataName') || appDataset(),
    rightList: data,
  }
}