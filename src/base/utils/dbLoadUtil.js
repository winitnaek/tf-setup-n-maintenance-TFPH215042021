export function generateDatabaseUploadAPI(pageid, store, data = "", extraInfo) {
    return {
        dataset: appDataset(),
        userID: appUserId(),
        data: data,
        fileName: extraInfo.fileName,
    }
}

export function generateProcessDatabaseUploadAPI(pageid, store, data = [], extraInfo) {
    const datasetSelected = [];
    data.forEach(b => { if(b.select) { datasetSelected.push(b.data)}})
    return {
        dataset: appDataset(),
        userID: appUserId(),
        databasepkgSelected: Array.from(new Set(datasetSelected)),
        "databasepkgSelected":["NJ021.DTA", "OR021.DTA"],
        "fileName":"TF11DB_1615906162093_TFM11046Sample.PKG"
    }
}

export function databaseLoadStatusGridInput(pageId, formData, stDate, enDate, state) {
    let input = {
            
        dataset:appDataset(),
        userID:appUserId()       
};
    return input;
  }