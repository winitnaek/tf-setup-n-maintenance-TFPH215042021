export function generateManualUpdateUploadAPI(pageid, store, data = "", extraInfo) {
    return {
        dataset: appDataset(),
        userID: appUserId(),
        data: data,
        fileName: extraInfo.fileName,
    }
}