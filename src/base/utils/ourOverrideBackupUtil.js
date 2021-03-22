export function generateOptionalBackupAPI(pageid, store, data = [], extraInfo) {
    const datasetSelected = [];
    data.forEach(b => { if(b.select) { datasetSelected.push(b.data)}})
    return {
        dataset: appDataset(),
        userID: appUserId(),
        datasetSelected: Array.from(new Set(datasetSelected)),
        backupAll:  extraInfo.backupAll,
        "filterDate":false,
        "startDate":"03/09/2021"
        
    }
}

export function generateUploadOptionalRestoreAPI(pageid, store, data = "", extraInfo) {
    return {
        dataset: appDataset(),
        userID: appUserId(),
        data: data,
        fileName: extraInfo.fileName,
    }
}