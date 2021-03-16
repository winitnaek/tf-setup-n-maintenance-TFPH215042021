import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./base/config/configureStore";
import * as rname from "./base/constants/RenderNames";
import { Progress } from "bsiuilib";
import * as manifest from "../build/_manifest";
import * as c from "./base/constants/IndexConstants";
import { makeNavs, makeSearch } from "./base/template/navGenerator";
import TFHome from "./app/home/home.js";
import { closeForm, setFormData } from "./app/actions/formActions";
import { setFilterFormData } from "./app/actions/filterFormActions";
import TestHarness from "./app/test/TestHarness";
import CustomComp from "./app/components/CustomComp";
import MessageViewerContainer from "./app/components/MessageViewerContainer";
import * as fieldData from "./app/metadata/fieldData";

let store = configureStore();
export default store;
let MOCK = process.env.NODE_ENV === "development" ? false : false;
setIsMock(MOCK);
import {
  buildModuleAreaLinks,
  openHelp,
  setPerms,
  compMetaData,
  getMetaData,
  compPermissions,
  buildGridDataInput,
  decorateData,
  formatFieldData
} from "./base/utils/tfUtils";
import { setModuleAreas } from "./app/home/actions/moduleLinksActions";
import { getFavoriteLinks } from "./app/home/actions/favoriteLinksActions";
import CustomGrid from "./app/components/CustomGrid";
import ReusablePage from "./app/components/ReusablePage";
import { UI_COMP, UI_PAGE, UI_TEST, tftools } from "./base/constants/TFTools";
import griddataAPI from "./app/api/griddataAPI";
//Temporary set user in session:======Comment this when deployed with MAC======
if (!sessionStorage.getItem("up")) {
  var userProfile = '{"userId":"vinit","dataset":"VINIT","securitytokn":"6d976b4e3ef843119dc1b66017160837","branding":"base64ImageData","userTheme":"Default","roles":["ER"],"applications":[{"id":"73b9a516-c0ca-43c0-b0ae-190e08d77bcc","name":"TaxFactory","accessIds":[{"id":"162ebe14-8d87-44e1-a786-c9365c9d5cd8","visible":true}],"permissions":{"CB":[1,1,1,1,0],"CYB":[1,1,1,1,0],"DB":[1,1,1,1,0],"LB":[1,1,1,1,0],"RB":[1,1,1,1,0],"MF":[1,1,1,1,0],"MV":[1,1,1,1,0],"PN":[1,1,1,1,0],"SM":[1,1,1,1,0]}}],"themeList":[{"id":"Default","name":"Default"},{"id":"HighContrast","name":"HighContrast"},{"id":"WhiteOnBlack","name":"WhiteOnBlack"},{"id":"BlackOnWhite","name":"BlackOnWhite"}]}';
  var userdata = JSON.parse(userProfile);
  if (isMock()) {
    let thPerm = [1, 1, 1, 1, 0];
    let noOfPerm = Object.keys(userdata.applications[0].permissions).length;
    userdata.applications[0].permissions["TH"] = thPerm;
    userdata.applications[0].permissions["SP"] = thPerm;
    userdata.applications[0].permissions["DF"] = thPerm;
    let up = JSON.stringify(userdata);
    sessionStorage.setItem("up", up);
  } else {
    sessionStorage.setItem("up", userProfile);
  }
}
//==============================================================================
let usrobj = JSON.parse(sessionStorage.getItem("up"));

var dataset = usrobj.dataset;
var userId = usrobj.userId;
setModulePermissions(usrobj.applications);
let moduleAreas = buildModuleAreaLinks(usrobj.applications);

/**
 * renderTFSetupNMaintenance TEST
 * master branch
 * @param {*} elem
 * @param {*} renderName
 */
function renderTFSetupNMaintenance(elem, renderName, renderCtx) {
  setAppAnchor(elem);
  setAppUserIDAndDataset(dataset, userId);
  if (renderName === rname.RN_TF_HOME) {
    showPrgress(elem);
    store.dispatch(setModuleAreas(moduleAreas));
    store.dispatch(getFavoriteLinks(userId,3));
    setTimeout(
      function () {
        renderTFHome(elem);
      }.bind(this),
      600
    );
    if (renderCtx) {
      setTimeout(
        function () {
          renderTFSetupNMaintenance("pageContainer", renderCtx);
        }.bind(this),
        600
      );
    }
  } else if (renderName && renderName.type == UI_COMP) {
    if (renderName.id === "messageViewer" || renderName.id === "messagesViewer") {
      renderMessageViewer(elem, renderName.id, renderName.value);
    } else {
      renderComponent(elem, renderName.id, renderName.value);
    }
  } else if (renderName && renderName.type == UI_PAGE) {
    renderNewPage(elem, renderName.id, renderName.value, null);
  } else if (renderName && renderName.type == UI_TEST) {
    renderTestHarness(elem, renderName.id, renderName.value);
  } else if (renderName && renderName === rname.RN_TF_CSTMCOMP) {
    renderCustomComponent(elem, renderName);
  }
}

/**
 * renderMessageViewer
 * @param {*} elem
 */

function renderMessageViewer(elem, pageid, pid) {
  ReactDOM.unmountComponentAtNode(document.querySelector("#" + elem));
  const gridInput = buildGridDataInput(pageid, store);
  const state = store.getState();
  const dispatch = store.dispatch;
  const fieldDataX = formatFieldData(fieldData[pageid], pageid, appUserId());
  const gridProps = {
    state,
    dispatch,
    closeForm,
    setFormData,
    setFilterFormData,
    renderGrid: renderTFSetupNMaintenance
  };
  const metadata = compMetaData(pageid);
  ReactDOM.render(
    <Provider store={store}>
      <MessageViewerContainer
        pageid={pageid}
        metadata={metadata}
        pid={pid}
        permissions={compPermissions}
        help={openHelp}
        gridProps={gridProps}
        fieldData={fieldDataX}
        formMetaData={metadata}
        getGridData={griddataAPI.getGridData}
        gridInput={gridInput}
      />
    </Provider>,
    document.querySelector("#" + elem)
  );
}

const getGridData = ({ pgid, showSummary, dataSetName }) => {
  let gridInput = buildGridDataInput(pgid, store, dataSetName);
  gridInput.showSummary = showSummary;
  return griddataAPI.getGridData(pgid, gridInput).then(response => response);
};

/**
 * renderComponent
 * @param {*} elem
 */
function renderComponent(elem, pageid, pid) {
  ReactDOM.unmountComponentAtNode(document.querySelector("#" + elem));
  showPrgress(elem);
  let gridInput = buildGridDataInput(pageid, store);

  const state = store.getState();
  const dispatch = store.dispatch;

  const renderGrid = renderTFSetupNMaintenance;
  const gridProps = {
    state,
    dispatch,
    closeForm,
    setFormData,
    setFilterFormData,
    renderGrid
  };

  griddataAPI
    .getGridData(pageid, gridInput)
    .then(response => response)
    .then(griddata => {
      const metaData = getMetaData(pageid);
      let griddatanew = decorateData(griddata, pageid);
      const fieldDataX = formatFieldData(fieldData[pageid], pageid, appUserId());
      const isSingleTable = !(metaData instanceof Array);
      if (isSingleTable && griddatanew[0] instanceof Array) {
        griddatanew = griddatanew[0];
      }
      
      ReactDOM.render(
        <Provider store={store}>
          <Fragment>
            {!isSingleTable ? (
              griddatanew.map((data, key) => (
                <CustomGrid
                  pageid={pageid}
                  metadata={compMetaData(pageid, key)}
                  pid={pid}
                  permissions={compPermissions}
                  griddata={data}
                  help={openHelp}
                  gridProps={gridProps}
                  fieldData={fieldDataX}
                  className={key !== 0 ? "mt-3" : ""}
                  getDataForChildGrid={getGridData}
                />
              ))
            ) : (
              <CustomGrid
                pageid={pageid}
                metadata={compMetaData(pageid)}
                pid={pid}
                permissions={compPermissions}
                griddata={griddatanew}
                help={openHelp}
                gridProps={gridProps}
                fieldData={fieldDataX}
                getDataForChildGrid={getGridData}
              />
            )}
          </Fragment>
        </Provider>,
        document.querySelector("#" + elem)
      );
      // }
    });
}

/**
 * renderTestHarnesscccccc
 * @param {*} elem
 * @param {*} pgid
 * @param {*} pid
 */
function renderTestHarness(elem, pgid, pid) {
  ReactDOM.render(
    <Provider store={store}>
      <TestHarness pgid={pgid} />
    </Provider>,
    document.querySelector("#" + elem)
  );
}
/**
 * renderPage
 * @param {*} elem
 */
function renderTestComponent(elem, tool, metadata, mockdata, fieldData) {
  setMockMetadata(metadata);
  const state = store.getState();
  const dispatch = store.dispatch;
  const renderGrid = renderTFSetupNMaintenance;
  const gridProps = {
    state,
    dispatch,
    closeForm,
    setFormData,
    setFilterFormData,
    renderGrid
  };
  ReactDOM.render(
    <Provider store={store}>
      <CustomGrid
        pageid={tool.id}
        metadata={getMockMedata()}
        pid={tool.value}
        permissions={compPermissions}
        griddata={mockdata}
        help={openHelp}
        gridProps={gridProps}
        fieldData={fieldData}
        formMetaData={getMockMedata()}
      />
    </Provider>,
    document.querySelector("#" + elem)
  );
}
export function testMetaData(pgid) {
  return getMockMedata();
}
/**
 * renderPage
 * @param {*} elem
 */
function renderNewPage(elem, pgid, pid, initialProps) {
  const help = openHelp;
  ReactDOM.render(
    <Provider store={store}>
      <ReusablePage pgid={pgid} help={help} initialProps={initialProps} pid={pid} />
    </Provider>,
    document.querySelector("#" + elem)
  );
}

/**
 * showPrgress
 * @param {*} elem
 */
function showPrgress(elem) {
  ReactDOM.render(
    <Provider store={store}>
      <Progress />
    </Provider>,
    document.querySelector("#" + elem)
  );
}

/**
 * renderTFHome
 * @param {*} elem
 */
function renderTFHome(elem) {
  ReactDOM.render(
    <Provider store={store}>
      <TFHome />
    </Provider>,
    document.querySelector("#" + elem)
  );
}
/**
 * renderTFHome
 * @param {*} elem
 */
function renderCustomComponent(elem) {
  ReactDOM.unmountComponentAtNode(document.querySelector("#" + elem));
  showPrgress(elem);
  ReactDOM.render(
    <Provider store={store}>
      <CustomComp />
    </Provider>,
    document.querySelector("#" + elem)
  );
}
var APP_ANCHOR;
function setAppAnchor(elem) {
  APP_ANCHOR = elem;
  ReactDOM.unmountComponentAtNode(document.querySelector("#" + elem));
}
function appAnchor() {
  return APP_ANCHOR;
}
var APP_DATASET, APP_USERID, IS_MOCK, METADATA_MOCK;
function appDataset() {
  return APP_DATASET;
}
function appUserId() {
  return APP_USERID;
}
export function isMock() {
  return IS_MOCK;
}
function setIsMock(mock) {
  IS_MOCK = mock;
}
function getMockMedata() {
  return METADATA_MOCK;
}
function setMockMetadata(metadata) {
  METADATA_MOCK = metadata;
}
function setAppUserIDAndDataset(dataset, userid) {
  APP_DATASET = dataset;
  APP_USERID = userid;
}
//************Right & Permissions******************/
var CB_RIGHTS, ALL_RIGHTS, CYB_RIGHTS, DB_RIGHTS, LB_RIGHTS, RB_RIGHTS,MF_RIGHTS,MV_RIGHTS,
PN_RIGHTS,SM_RIGHTS;
function setCBRights(perm) {
  CB_RIGHTS = setPerms(perm);
}
function hasCBRights() {
  return CB_RIGHTS;
}
function setAlRights(perm) {
  ALL_RIGHTS = perm;
}
function getAllRights() {
  return ALL_RIGHTS;
}
function setCYBRights(perm) {
  CYB_RIGHTS = setPerms(perm);
}
function hasCYBRights() {
  return CYB_RIGHTS;
}
function setDBRights(perm) {
  DB_RIGHTS = setPerms(perm);
}
function hasDBRights() {
  return DB_RIGHTS;
}
function setLBRights(perm) {
  LB_RIGHTS = setPerms(perm);
}
function hasLBRights() {
  return LB_RIGHTS;
}
function setRBRights(perm) {
  RB_RIGHTS = setPerms(perm);
}
function hasRBRights() {
  return RB_RIGHTS;
}
function setMFRights(perm) {
  MF_RIGHTS = setPerms(perm);
}
function hasMFRights() {
  return MF_RIGHTS;
}
function setMVRights(perm) {
  MV_RIGHTS = setPerms(perm);
}
function hasMVRights() {
  return MV_RIGHTS;
}
function setPNRights(perm) {
  PN_RIGHTS = setPerms(perm);
}
function hasPNRights() {
  return PN_RIGHTS;
}
function setSMRights(perm) {
  SM_RIGHTS = setPerms(perm);
}
function hasSMRights() {
  return SM_RIGHTS;
}
//************Right & Permissions******************/
function setModulePermissions(apps) {
  apps.forEach(function (app) {
    if (app.id == "73b9a516-c0ca-43c0-b0ae-190e08d77bcc") {
      app.accessIds.forEach(function (access) {
        if (access.id == "162ebe14-8d87-44e1-a786-c9365c9d5cd8" && access.visible == true) {
          setCBRights(app.permissions.CB);
          setDBRights(app.permissions.DB);
          setLBRights(app.permissions.LB);
          setRBRights(app.permissions.RB);
          setMFRights(app.permissions.MF);
          setMVRights(app.permissions.MV);
          setPNRights(app.permissions.PN);
          setSMRights(app.permissions.SM);
          setCYBRights(app.permissions.CYB);
          setAlRights(app.permissions);
        }
      });
    }
  });
}
function onloadPdfData(id) {
  var w2data = {
    loadeew2: true,
    eew2id: id
  };
  store.dispatch(loadPdfData(w2data));
}
function onloadCompData(id) {
  var compdata = {
    loadcomp: true,
    compid: id
  };
  store.dispatch(loadCompData(compdata));
}

const resolveTemplates = async () => {
  let response = await fetch("templates.html");
  let templates = await response.text();
  console.debug("templates => ");
  console.debug(templates);
  return templates;
};

const initIndexPage = templData => {
  let mnfst = manifest._manifest;
  console.debug("manifest =>", mnfst);

  if (!mnfst) {
    console.error("ERROR: Manifest not found!");
    throw new Error("Manifest not found!");
  }

  if (!mnfst.name || !mnfst.desc) {
    console.error("ERROR: Manifest missing application name and/or application description!");
    throw new Error("Application name and/or application description not found!");
  }
  $("#" + c.appTitleId).html($("#" + c.appTitleId).html() + " " + mnfst.desc);
  $("#" + c.appNameId).html($("#" + c.appNameId).html() + " " + mnfst.desc);
  checkIfAreasDefined(mnfst.areas);
  let visAreas = getVisibleAreas(mnfst);

  if (visAreas && visAreas.length) {
    let navInput = {
      areas: visAreas,
      rf: mnfst.renderFunction,
      anchorId: c.appContentId
    };
    document.body.insertAdjacentHTML("afterend", templData);
    makeNavs(navInput);
  }
  let search = getSearchData(mnfst);
  if (search) {
    let searchInput = {
      id: search[0].id,
      renderName: search[0].rendername,
      entities: search[0].entities,
      rf: mnfst.renderFunction,
      anchorId: c.appContentId
    };
    makeSearch(searchInput);
  } else {
    //Hide Search Input
  }
};

const getVisibleAreas = mnfst => {
  let visibleAreas = mnfst.areas.filter(a => {
    return a.visible === true;
  });
  console.debug("visible areas =>", visibleAreas);

  if (!visibleAreas || !visibleAreas.length) {
    console.warn("No visible areas specified!");
    $("#noVsblAreasAlrt").removeClass("d-none").show();
  } else {
    $("#noVsblAreasAlrt").removeClass("d-none").hide();
  }

  return visibleAreas;
};

const getSearchData = mnfst => {
  console.debug("search data =>", mnfst.search);
  let searchdata = mnfst.search;
  return searchdata;
};

const checkIfAreasDefined = areas => {
  if (!areas) {
    console.error("ERROR: At least one area must be defined in manifest!");
    throw new Error("No areas defined in manifest!");
  }
};

const renderWelcomePage = elem => {
  document.getElementById(elem).innerHTML =
    "<h3>Welcome to the Application Module Test Page. Please click on the links to load your single page application.</h3>";
};

const unMountNMountContainerNode = () => {
  $("div").remove("#" + c.appContentId);
  $('<div id="' + c.appContentId + '" class="main-content"></div>').insertAfter($("#" + c.navId));
};

module.exports = renderTFSetupNMaintenance;
window.renderTFSetupNMaintenance = renderTFSetupNMaintenance;

module.exports = appDataset;
window.appDataset = appDataset;

module.exports = appUserId;
window.appUserId = appUserId;

module.exports = appAnchor;
window.appAnchor = appAnchor;
//************Right & Permissions******************/
module.exports = hasCBRights;
window.hasCBRights = hasCBRights;

module.exports = getAllRights;
window.getAllRights = getAllRights;

module.exports = hasCYBRights;
window.hasCYBRights = hasCYBRights;

module.exports = hasDBRights;
window.hasDBRights = hasDBRights;

module.exports = hasLBRights;
window.hasLBRights = hasLBRights;

module.exports = hasRBRights;
window.hasRBRights = hasRBRights;

module.exports = hasMFRights;
window.hasMFRights = hasMFRights;

module.exports = hasMVRights;
window.hasMVRights = hasMVRights;

module.exports = hasPNRights;
window.hasPNRights = hasPNRights;

module.exports = hasSMRights;
window.hasSMRights= hasSMRights;
//************Right & Permissions******************/
module.exports = onloadPdfData;
window.onloadPdfData = onloadPdfData;

module.exports = onloadCompData;
window.onloadCompData = onloadCompData;

module.exports = isMock;
window.isMock = isMock;

module.exports = renderTestComponent;
window.renderTestComponent = renderTestComponent;

let w2aIndex = {
  resolveTemplates: resolveTemplates,
  init: initIndexPage,
  reloadContent: unMountNMountContainerNode,
  renderWelcomePage: renderWelcomePage,
  nameId: c.appNameId,
  contentId: c.appContentId
};

window.w2aIndex = w2aIndex;
