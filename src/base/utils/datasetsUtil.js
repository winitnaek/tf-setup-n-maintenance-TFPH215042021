/**
 * dataSetsGridInput
 * @param {*} pageId 
 * @param {*} filterData 
 * @param {*} stDate 
 * @param {*} enDate 
 * @param {*} state 
 */
export function dataSetsGridInput(pageId, filterData, stDate, enDate, state) {
  let input = {
    pageId: pageId,
    dataset: appDataset(),
    userId:appUserId()
  };
  return input;
}
/**
 * buildDataSetsSaveInput
 * @param {*} pageId 
 * @param {*} formData 
 * @param {*} editMode 
 * @param {*} state 
 */
export function buildDataSetsSaveInput(pageId, formData, editMode, state) {
  let input = {
    dataset: appDataset(),
    userId: appUserId(),
    dataset:formData.dataset,
    desc:formData.descript,
    editMode: editMode
  };
  return input;
}
/**
 * buildDataSetsDeleteInput
 * @param {*} pageId 
 * @param {*} formData 
 * @param {*} mode 
 * @param {*} state 
 */
export function buildDataSetsDeleteInput(pageId, formData, mode, state){
  let input = {
    dataset: appDataset(),
    userId: appUserId(),
    dataset:formData.dataset
  };
  return input;
}