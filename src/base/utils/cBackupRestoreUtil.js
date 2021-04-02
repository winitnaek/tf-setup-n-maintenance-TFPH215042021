export function generateCustomBackupAPI(pageid, store, data = [], extraInfo) {
    const datasetSelected = [];
    data.forEach(b => { if(b.select) { datasetSelected.push(b.data)}})
    return {
        dataset: appDataset(),
        userID: appUserId(),
        datasetSelected: Array.from(new Set(datasetSelected)),
        backupAll:  extraInfo.backupAll,
        cfFormat: extraInfo.cfFormat,
    }
}

export function generateUploadCustomRestoreAPI(pageid, store, data = "", extraInfo) {
    return {
        dataset: appDataset(),
        userID: appUserId(),
        data: data,
        fileName: extraInfo.fileName,
    }
}


export function processCustomRestoreAPI(pageid, store, data, extraInfo) {
    return {
        dataset: appDataset(),     
        userID: appUserId(),  
        "fileName": "d:\\temp\\tfws\\TF11BR_1615307234498_TF11_EMPTY.xml",  
        newDataset: extraInfo.newDatasetId ? true : false,
        newDatasetId: extraInfo.newDatasetId,
        deleteExistingData: extraInfo.deleteExistingData,
        restorePermission: extraInfo.restorePermission,
        datasetSelected: data.length ? data : [extraInfo.existingDataset],
        existingDataset: extraInfo.existingDataset,
    }
}

export function customrestoreStatusGridInput(pageId, formData, stDate, enDate, state) {
    let input = {
            
        dataset:appDataset(),
        userID:appUserId()       
};
    return input;
  }