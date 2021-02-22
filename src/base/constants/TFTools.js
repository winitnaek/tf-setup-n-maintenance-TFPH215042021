import * as metaData from '../../app/metadata/metaData';
import tfScreens from '../../app/metadata/_screen_info';
import { metaDataApiMap, autoCompleteApiMap, deleteDataApiMap, saveDataApiMap, generateApiMap, viewPDFApiMap, saveAsAPIMap } from './ApiMap';

export const UI_PAGE = 'page';
export const UI_COMP = 'comp';
export const UI_TEST = 'uitest';
export const UI_EXTN = 'externallink';

export const tftools = [
  ...tfScreens,
  {
    value: 'SM',
    label: 'Regulatory bulletin ',
    desc: 'Regulatory bulletin ',
    id: 'RegulatoryBulletin ',
    type: UI_EXTN,
    link: false,
    href:"https://mybsiconnect.force.com/Product_Reg_Bulletin_Landing_Page?id=01tU0000000HRQiIAO",
    section:'Maintenance Tools'
  },
  {
    value: 'SM',
    label: 'Locator V3 package',
    desc: 'Locator V3 package',
    id: 'LocatorV3package',
    type: UI_EXTN,
    link: false,
    href:"https://mybsiconnect.force.com/Product_Reg_Bulletin_Landing_Page?id=01tU0000000HRQiIAO&amp;locator=1",
    section:'Maintenance Tools'
  },
  {
    value: 'SM',
    label: 'Cyclic',
    desc: 'Cyclic',
    id: 'Cyclic',
    type: UI_EXTN,
    link: false,
    href:"https://mybsiconnect.force.com/cp_Product_Cyclic_Landing_PageV2?id=01tU0000000HRQiIAO",
    section:'Maintenance Tools'
  },
  {
    value: 'SM',
    label: 'Messages to Suppress',
    desc: 'Messages to Suppress',
    id: 'messageToSuppress',
    type: 'page',
    link: true,
    section:'Configuration'
  }
];

export const metadatamap = Object.keys(metaDataApiMap).map(pageId => {
  const _metaData = metaData[pageId];
  if (
    _metaData &&
    _metaData.pgdef &&
    _metaData.pgdef.parentConfig &&
    typeof _metaData.pgdef.parentConfig === 'string' &&
    _metaData.griddef
  ) {
    _metaData.pgdef.parentConfig = metaData[_metaData.pgdef.parentConfig];
  }
  return {
    id: pageId,
    metadata: _metaData,
    url: metaDataApiMap[pageId]
  };
});

export const deletedatamap = Object.keys(deleteDataApiMap).map(pageId => ({
  id: pageId,
  url: deleteDataApiMap[[pageId]]
}));

export const savedatamap = Object.keys(saveDataApiMap).map(pageId => ({
  id: pageId,
  url: saveDataApiMap[pageId],
  metadata: metaData[pageId]
}));


export const saveAsdatamap = Object.keys(saveAsAPIMap).map(pageId => ({
  id: pageId,
  url: saveAsAPIMap[pageId],
  metadata: metaData[pageId]
}));

export const generateDataMap = Object.keys(generateApiMap).map(pageId => ({
  id: pageId,
  url: generateApiMap[pageId],
  metadata: metaData[pageId]
}));

export const asyncselfldsmap = Object.keys(autoCompleteApiMap).map(fieldId => ({
  id: fieldId,
  url: autoCompleteApiMap[fieldId],
  param: [{ dataset: '', pattern: '' }]
}));

export const viewPDFMap = Object.keys(viewPDFApiMap).map(pageId => ({
  id: pageId,
  url: viewPDFApiMap[pageId]
}));