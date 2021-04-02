export function generateManualUpdateUploadAPI(pageid, store, data = "", extraInfo) {
    return {
        dataset: appDataset(),
        userID: appUserId(),
        data: data,
        fileName: extraInfo.fileName,
    }
}

export function manualUpdateStatusGridInput(pageId, formData, stDate, enDate, state) {
    let input = {
            
        dataset:appDataset(),
        userID:appUserId()       
};
    return input;
  }