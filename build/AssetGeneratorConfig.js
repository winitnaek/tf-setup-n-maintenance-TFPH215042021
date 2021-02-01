const getAssetGeneratorConfig = (environment, sourcePath) => {
  const commonConfig = {
    encoding: "utf8",
    debug: true,
    sourceFolders: [
      `${sourcePath}/type3grid/AuditLogViewer/`,
      `${sourcePath}/readonlyfilter/`,
      `${sourcePath}/readonlygrid/`,
      `${sourcePath}/autoCompleteMockData/`,
      `${sourcePath}/type1grid/`,
      `${sourcePath}/type2grid/Screens/`,
      `${sourcePath}/type3grid/Tools/`,
      `${sourcePath}/type3grid/Map Tax Codes/`,
      `${sourcePath}/type3grid/Map Tax Types/`,
      `${sourcePath}/type3grid/Map Payment Codes/`,
      `${sourcePath}/type3grid/MessageViewer/`,
      `${sourcePath}/type3grid/PA Services Tax Report/`,
      `${sourcePath}/type4grid/`,
      `${sourcePath}/cruds/`,
      `${sourcePath}/sampleDemo/`,
      `${sourcePath}/type2grid/What if employee`,
      `${sourcePath}/type2grid/TaxLocator`
     ],
    groupBy: [
      {
        pattern: "_field data.json",
        fileName: "./src/app/metadata/_fieldData.js"
      },
      {
        pattern: "_Page.json",
        fileName: "./src/app/metadata/_metaData.js"
      },
      {
        pattern: "_Screen_Info.json",
        fileName: "./src/app/metadata/_screen_info.js",
        exportSingleObject: true
      }
    ]
  };
  if (environment === "development") {
    commonConfig.groupBy.push({
      pattern: "_MockData.json",
      fileName: "./dist/",
      mapperFileName: "./src/app/metadata/_mockDataMap.js",
      copyFile: true
    });
    commonConfig.groupBy.push({
      pattern: "_AUTOCOMPLETE_MOCKDATA.json",
      fileName: "./dist/",
      mapperFileName: "./src/app/metadata/_mockAutoCompleteMap.js",
      copyFile: true
    });
  }
  return commonConfig;
};
module.exports = getAssetGeneratorConfig;
