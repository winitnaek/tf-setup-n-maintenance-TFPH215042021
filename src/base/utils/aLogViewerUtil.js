/**
 * auditLogViewerGridInput
 * @param {*} pageId 
 * @param {*} filterData 
 * @param {*} stDate 
 * @param {*} enDate 
 * @param {*} state 
 */
export function auditLogViewerGridInput(pageId, formData, stDate, enDate, state) {
    let input = {
      pageId: pageId,
      login:formData.selectLogin || 'ALL',
      dataset:formData.selectDataSet || 'ALL'
    };
    return input;
  }

  /**
 * auditLogViewerDeleteAll
 * @param {*} pageid 
 * @param {*} formdata 
 * @param {*} editMode 
 * @param {*} state 
 */
export function buildAuditLogViewerDeleteAll(pageid, formdata, editMode, state) {
  let input = {
    "login":"TF11",
    "dataset":"DS1"
  };
  return input;
}