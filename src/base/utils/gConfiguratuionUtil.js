/**
 * buildgeneralconfigOptionSaveInput
 * @param {*} pageId 
 * @param {*} formData 
 * @param {*} editMode 
 * @param {*} state 
 */
 export function buildGeneralConfigOptionSaveInput(pageId, formData, editMode, state) {
    let input = {
        enhSecOn : false,
        canViewEnhancedSec : false,
        manageDatasets : true,
        manageLogins : true,
        dataset: appDataset(),
        optnList : formData,
    };
    return input;
  }