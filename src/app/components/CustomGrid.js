import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { tftools } from "../../base/constants/TFTools";
import { ReusableGrid, ConfirmModal, ViewPDF, ReusableAlert } from "bsiuilib";
import { setFilterFormData } from "../actions/filterFormActions";
import { setFormData } from "../actions/formActions";
//import { getRecentUsage } from "../actions/usageActions";
import { getUsageData } from "../api/getUsageDataAPI";
import savegriddataAPI from "../api/savegriddataAPI";
import mappingToolUsageAPI from "../api/mappingToolUsageAPI";
import deletegriddataAPI from "../api/deletegriddataAPI";
import getPdfDataAPI from "../api/getPdfDataAPI";
import formDataAPI from "../api/formDataAPI";
import * as gridStyles from "../../base/constants/AppConstants";
import ButtonBar from "./ButtonBar";
import { compMetaData, populateParentData, formatFieldData } from "../../base/utils/tfUtils";
import { setParentInfo } from "../../app/actions/parentInfoActions";
import { Modal, ModalHeader, ModalBody, Row, Col, Alert, UncontrolledTooltip } from "reactstrap";
import generateReportApi from "../api/generateReportAPI";
import CustomFormSaas from "./CustomFormSaas";
import * as fieldDataAll from "../metadata/fieldData";
class CustomGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      isOpen: false,
      clickedPageId: "",
      modalGridData: [],
      showSummary: false,
      showPDF: false,
      pdfData: {},
      viewPdfMode: false,
      showAdditonalInfo: null,
      status: "success",
      showActionAlert: false,
      aheader: "",
      abody: "",
      abtnlbl: "",
      isSelectAll: undefined,
      saveSelected: false,
      value: "",
      showCustomForm: false,
      loading: false,
      errorMessage: null,
    };

    this.renderGrid = pgData => {
      renderTFSetupNMaintenance("pageContainer", pgData);
    };

    this.reRun = pgid => {
      const data = tftools.find(tool => tool.id === pgid);
      this.renderGrid(data);
    };

    this.formAction = data => {
      console.log(data);
      console.log("you made it back to customGrid");
      this.props.setFormData(data);
    };

    this.filterFormAction = formData => {
      console.log("Setting filterForm Data");
      const mode = "Edit";
      const index = null;
      const data = { data: this.props.formFilterData, mode, index };
      console.log(this.props.formFilterData);
      //  this.props.setFormData(data)    //  This is needed for subsequent edits to get form data
      this.props.setFilterFormData(formData); // This is used to make the api call to render the grid
    };

    this.handlePDF = async (event, fromBar) => {
      event.preventDefault();
      const { pageid, formData } = this.props;
      let data = undefined;
      if (pageid === "permissions") {
        data = [];
        let _id = document.querySelector("div[role='grid']").id;
        const griddata = $("#" + _id).jqxGrid("getdatainformation");
        for (let i = 0; i < griddata.rowscount; i++) {
          const rowData = $("#" + _id).jqxGrid("getrenderedrowdata", i);
          data.push(rowData);
        }
      }
      const pdfData = await getPdfDataAPI.getPdfData(pageid, data, undefined, fromBar);
      this.setState({
        viewPdfMode: !this.state.viewPdfMode,
        pdfData
      });
    };

    this.getMarginTop = () => {
      const childMetaData = this.state.clickedPageId && compMetaData(this.state.clickedPageId);

      if (this.state.isOpen) {
        if (childMetaData.pgdef.pgsubtitle === "") {
          return "30px";
        } else if (this.props.pageid === "custombackupRestore" && this.props.isSaas) {
          return "40px";
        } else if (this.props.pageid === "custombackupRestore") {
          return "63px";
        } else {
          return "86px";
        }
      } else {
        if (this.props.metadata.pgdef.pgsubtitle === "") {
          return "30px";
        } else {
          return "86px";
        }
      }
    };

    this.getMarginLeft = () => {
      const childMetaData = this.state.clickedPageId && compMetaData(this.state.clickedPageId);

      if (this.state.isOpen && this.props.pageid !== "custombackupRestore") {
        return "190px";
      } else if (this.state.isOpen && this.props.pageid === "custombackupRestore") {
        return "5%";
      } else {
        return "260px";
      }
    };

    this.handleOk = () => {
      this.setState({
        showAlert: false
      });
    };
    this.handleRunLocator = this.handleRunLocator.bind(this);
    this.clickCheckBox = this.clickCheckBox.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getGridPopupData = this.getGridPopupData.bind(this);
    this.parentInfoAction = this.parentInfoAction.bind(this);
    this.renderAdditionalInfo = this.renderAdditionalInfo.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.showActionMessage = this.showActionMessage.bind(this);
    this.handleDeleteAll = this.handleDeleteAll.bind(this);
    this.handleConfirmDeleteOk = this.handleConfirmDeleteOk.bind(this);
    this.handleConfirmDeleteCancel = this.handleConfirmDeleteCancel.bind(this);
    this.hideUIAlert = this.hideUIAlert.bind(this);
    this.handleHidePDF = this.handleHidePDF.bind(this);
    this.handleShowPDF = this.handleShowPDF.bind(this);
    this.clickFromOutside = this.clickFromOutside.bind(this);
    this.saveFromOutside = this.saveFromOutside.bind(this);
    this.setFormValue = this.setFormValue.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
  }

  componentDidMount() {
    const { metadata, pageid } = this.props;
    const { pgdef } = metadata;
    const { metaInfo } = pgdef;
    this.setState({
      showAlert: !!metaInfo
    });
  }



  handleHidePDF() {
    this.setState({ showPDF: false });
  }

  handleShowPDF(rowdata, title) {
    this.renderPDFData(rowdata, title);
  }

  renderPDFData(pdfData, title) {
    this.setState({
      showPDF: true,
      title: title,
      pdfData: pdfData
    });
  }

  renderErrorPDF(yrEndTaxDoc) {
    var printFrame = document.getElementById("pdfi-frametf");
    let errorContent = `<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></head><body><div class="alert alert-danger" style="margin:3px;" role="alert"><strong>Error: </strong>Unable to Get Year End Tax Document. Please contact your system administrator.</div></body></html>`;
    if (printFrame) {
      printFrame.height = "100";
      printFrame.src = "data:text/html;charset=utf-8," + errorContent;
    }
  }

  handleDeleteAll(clickPageId) {
    if (clickPageId === "auditLogViewer") {
      this.showConfirm(true, "Warning!", "Are you sure you want to delete all?");
    }
  }
  showConfirm(cshow, cheader, cbody) {
    this.setState({
      showConfirm: cshow,
      cheader: cheader,
      cbody: cbody
    });
  }
  handleConfirmDeleteOk() {
    this.setState({
      showConfirm: false
    });
    if (this.props.pageid === "auditLogViewer") {
      deletegriddataAPI
        .deleteAllGridData(this.props.pageid)
        .then()
        .then(response => response)
        .then(repos => {
          alert(repos.message);
          const data = tftools.find(tool => tool.id === this.props.pageid);
          if (data) {
            renderTFConfigNTaxes("pageContainer", data);
          }
        });
    }
  }
  handleConfirmDeleteCancel() {
    this.setState({
      showConfirm: !this.state.showConfirm
    });
  }

  downloadFile(file) {
    const byteCharacters = atob(file.fileData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const output = new Blob([byteArray]);
    var anchor = document.createElement("a");
    var url = window.URL || window.webkitURL;
    anchor.href = url.createObjectURL(output);
    var downloadFileName = file.fileName;
    anchor.download = downloadFileName;
    document.body.append(anchor);
    anchor.click();

    setTimeout(function () {
      document.body.removeChild(anchor);
      url.revokeObjectURL(anchor.href);
    }, 100);
  }

  getIsSaas(isSaas, pgid) {
    if(!isSaas) {
      if(pgid === "customrestoreStatus" || pgid === "optionalrestoreStatus") {
        return false;
      } else {
        return true;
      }
    } else {
      return this.props.pageid === "optionalBackup" ?  true : false;
    }
  }

  renderAlert(isAlert) {
    const gridStyle =
      this.getIsSaas(this.props.isSaas, this.props.pageid) || this.props.pageid === "custombackupRestore"
        ? {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "80%",
          margin: "0px auto 10px auto",
          marginTop: this.props.pageid === "optionalBackup" ?  "75px" : "40px",
          position: "absolute",
          left: "0",
          right: "0",
          zIndex: 2
          }
        : {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            margin: "0px auto 10px auto"
          };
    const gridStyleAlert = {
      width: "90%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: ".225rem .875rem",
      margin: "0 auto",
      marginTop: "90px",
      position: "absolute",
      left: "0",
      right: "0",
      zIndex: 2
    };
    return this.state.showAdditonalInfo && isAlert ? (
      <Alert color={(this.state.showAdditonalInfo.status || "success").toLowerCase()} style={this.props.pageid === "custombackupRestore" && !this.props.isSaas ? gridStyleAlert :gridStyle}>
        {this.state.errorMessage ? this.state.errorMessage : "Test Result for:"}
        <div style={{ display: "flex" }}>
          {(this.state.showAdditonalInfo.fileOutputs || []).map(info => {
            return (
              <div
                style={{
                  width: "40px",
                  color: " rgb(76, 115, 146)"
                }}
              >
                {!info.fileName.includes("out") && info.fileData && (
                  <span id="downloadResult" onClick={() => this.downloadFile(info)}>
                    <i class="fa fa-download" aria-hidden="true" />
                    <UncontrolledTooltip placement="top" target="downloadResult">
                      <span> Download Result for {info.fileName} </span>
                    </UncontrolledTooltip>
                  </span>
                )}
                {info.fileName.includes("out") && info.fileData && (
                  <span
                    id="viewPdf"
                    onClick={() => this.setState({ pdfData: { docData: info.fileData }, viewPdfMode: true })}
                  >
                    <i className="fa fa-file-pdf fa-lg" />
                    <UncontrolledTooltip placement="bottom" target="viewPdf">
                      <span> View Result as PDF for {info.fileName}</span>
                    </UncontrolledTooltip>
                  </span>
                )}
              </div>
            );
          })}
          <span id="close" onClick={() => this.setState({ showAdditonalInfo: null })}>
            <i className="fas fa-times" />
          </span>
        </div>
      </Alert>
    ) : null;
  }

  handleRunLocator(clickPageId, gridDef, value, fromBar) {
    if (value) sessionStorage.setItem("newDataName", value);
    this.setState(
      {
        clickedPageId: clickPageId,
        value
      },
      () => {
        const isAlert = gridDef.hasAlert;
        if (isAlert) {
          this.renderAdditionalInfo(clickPageId, undefined, undefined, fromBar);
        } else {
          if (clickPageId === "customdataBackup" && this.props.isSaas) {
            this.setState({ showCustomForm: true, isOpen: true });
          } else {
            this.getGridPopupData();
          }
        }
      }
    );
  }

  hideUIAlert() {
    this.setState({
      showActionAlert: false
    });
    if (this.props.pageid === "dataSets") {
      const data = tftools.find(tool => tool.id === "dataSets");
      if (data) {
        renderTFSetupNMaintenance("pageContainer", data);
      }
    }
  }
  showActionMessage(type, action, message) {
    this.setState({
      showActionAlert: true,
      aheader: action,
      abody: message
    });
  }

  clickCheckBox(event) {
    this.setState({
      showSummary: event.target.value === "on"
    });
  }

  clickFromOutside(isSelectAll) {
    this.setState({ isSelectAll });
  }

  saveFromOutside() {
    this.setState({ saveSelected: true });
  }

  parentInfoAction(formData) {
    this.props.setParentInfo(formData);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      showAdditonalInfo: null,
      exitDataset: null,
      loading: false,
    });
  }

  async getGridPopupData() {
    const resData = await this.props
      .getDataForChildGrid({
        pgid: this.state.clickedPageId,
        showSummary: this.state.showSummary,
        dataSetName: this.state.value
      })
      .then(response => {
        if (!this.state.value) {
          const { griddef } = this.props.metadata;
          this.setState({
            modalGridData: response.length === 1 && griddef.responseKey ? response[0][responseKey] : response,
            isOpen: true
          });
        } else {
          const data = tftools.find(tool => tool.id === this.state.clickedPageId);
          this.renderGrid(data);
        }
      });
  }

  async renderAdditionalInfo(pgid, values, info = {}, fromBar) {
    let extraInfo = {};
    if (pgid === "customdataBackup" && !this.state.showCustomForm) {
      extraInfo.cfFormat = this.state.showSummary;
      extraInfo.backupAll = info.allSelected;
    }

    if (pgid === "customdataBackup" && this.state.showCustomForm) {
      if (this.state.exitDataset) {
        extraInfo.cfFormat = false;
        extraInfo.backupAll = false;
        values = [
          {
            select: true,
            data: this.state.exitDataset
          }
        ];
      } else {
        this.setState({
          showAdditonalInfo: {
            status: "warning"
          },
          errorMessage: "Please select a data set"
        });
        return;
      }
    }
    let payload = [];
    if (document.querySelector("div[role='grid']") && !this.state.showCustomForm) {
      let _id = document.querySelector("div[role='grid']").id;
      if(document.querySelectorAll("div[role='grid']")[1]) {
        _id = document.querySelectorAll("div[role='grid']")[1].id;
      }
      const griddata = $("#" + _id).jqxGrid("getdatainformation");
      for (let i = 0; i < griddata.rowscount; i++) {
        const rowData = $("#" + _id).jqxGrid("getrenderedrowdata", i);
        const checkBoxKey = Object.keys(rowData).filter(k => rowData[k] === true);
        if (rowData[checkBoxKey.filter(key => key !== 'disabled')]) {
          payload.push(rowData);
        }
      }
      values = payload;
    }
    if (pgid === "optionalBackup") {
      values = payload;
    }
    this.setState({ loading: true, errorMessage: null, showAdditonalInfo: null });
    const data = await generateReportApi.generate(pgid, values, extraInfo, fromBar).then(response => {
      this.setState({
        showAdditonalInfo: response,
        loading: false
      });
    }).catch((error) => {
      this.setState({ loading: false });
    });
  }

  setFormValue(id, value) {
    this.setState({ [id]: value });
  }

  render() {
    const {
      pageid,
      metadata,
      pid,
      permissions,
      griddata,
      help,
      gridProps,
      formData,
      formFilterData,
      fieldData,
      formMetaData,
      className = "",
      getDataForChildGrid
    } = this.props;

    const { pgdef, griddef } = metadata;
    const { metaInfo } = pgdef;
    let fieldDataX = fieldData;
    if (!fieldDataX) {
      fieldDataX = formatFieldData(fieldDataAll[pageid], pageid, "vinit");
    }
    const { formAction, filterFormAction, parentInfoAction } = this;
    const childMetaData = this.state.clickedPageId && compMetaData(this.state.clickedPageId);
    return (
      <Fragment>
        {this.state.loading && !this.state.isOpen && <i class="fas fa-spinner fa-spin fa-2x" style={{  color: 'green', width: 'max-content', margin: '0 auto', display: 'flex', }}></i> }
        {this.renderAlert(griddef.hasAlert)}
        <ViewPDF
          view={this.state.viewPdfMode}
          handleHidePDF={() => this.setState({ viewPdfMode: false })}
          pdfData={this.state.pdfData}
        />
        <ReusableGrid
          pageid={pageid}
          metadata={metadata}
          pid={pid}
          permissions={permissions}
          griddata={griddata}
          help={help}
          gridProps={gridProps}
          tftools={tftools}
          saveGridData={savegriddataAPI}
          setFilterFormData={filterFormAction}
          setFormData={formAction}
          deleteGridData={deletegriddataAPI}
          recentUsage={getUsageData}
          renderGrid={this.renderGrid}
          formMetaData={formMetaData}
          formData={formData}
          formFilterData={formFilterData}
          fieldData={fieldData}
          getFormData={formDataAPI}
          styles={gridStyles}
          mapToolUsage={mappingToolUsageAPI}
          className={className}
          getDataForChildGrid={getDataForChildGrid}
          getPdfDataAPI={getPdfDataAPI}
          clickCheckBox={this.clickCheckBox}
          setParentInfo={parentInfoAction}
          fillParentInfo={populateParentData}
          renderAdditionalInfo={this.renderAdditionalInfo}
          showActionMessage={this.showActionMessage}
          isSelectAll={this.state.isSelectAll}
          saveSelected={this.state.saveSelected}
          handleChange={this.handleRunLocator}
          dataSetName={this.state.value}
        />
        {griddef.hasButtonBar && griddef.hasButtonBar == true ? (
          <ButtonBar
            pageid={pageid}
            metadata={metadata}
            pid={pid}
            permissions={permissions}
            tftools={tftools}
            handleRunLocator={clickedPageId => this.handleRunLocator(clickedPageId, griddef, undefined, true)}
            handleDeleteAll={this.handleDeleteAll}
            handleCheckAll={this.clickFromOutside}
            handlePdf={event => this.handlePDF(event, true)}
            handleSaveAll={this.saveFromOutside}
            reRun={this.reRun}
          />
        ) : null}
        <ConfirmModal
          showConfirm={this.state.showConfirm}
          okbtnlbl="OK"
          cancelbtnlbl="Cancel"
          cheader={this.state.cheader}
          cbody={this.state.cbody}
          handleOk={this.handleConfirmDeleteOk}
          handleCancel={this.handleConfirmDeleteCancel}
          {...metaInfo}
        />
        <ReusableAlert
          handleClick={this.hideUIAlert}
          showAlert={this.state.showActionAlert}
          aheader={this.state.aheader}
          abody={this.state.abody}
          abtnlbl={"Ok"}
        />
        ;
        <Modal isOpen={this.state.isOpen} size="lg" style={gridStyles.modal}>
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <ModalBody>
            <Row>
              {this.state.loading && !this.state.showCustomForm && <i class="fas fa-spinner fa-spin fa-2x" style={{  color: 'green', width: 'max-content', margin: '0 auto', display: 'flex', }}></i> }
              {this.state.showAdditonalInfo && childMetaData && childMetaData.griddef.hasAlert && <Col>{this.renderAlert(childMetaData && childMetaData.griddef.hasAlert)}</Col>}
            </Row>
            <Row>
              <Col className="grid-modal mr-2 ml-2">
                {this.state.isOpen ? (
                  <Fragment>
                    {this.state.showCustomForm ? (
                      <CustomFormSaas
                        title={pgdef.pgtitle}
                        fieldData={fieldDataX}
                        updateFormValue={this.setFormValue}
                        loading={this.state.loading}
                      />
                    ) : (
                      <ReusableGrid
                        parentPageid={pageid}
                        pageid={this.state.clickedPageId}
                        metadata={childMetaData}
                        permissions={permissions}
                        griddata={this.state.modalGridData}
                        gridProps={gridProps}
                        tftools={tftools}
                        saveGridData={savegriddataAPI}
                        setFilterFormData={filterFormAction}
                        setFormData={formAction}
                        deleteGridData={deletegriddataAPI}
                        recentUsage={getUsageData}
                        renderGrid={this.renderGrid}
                        formMetaData={formMetaData}
                        formData={formData}
                        formFilterData={formFilterData}
                        fieldData={fieldData}
                        getFormData={formDataAPI}
                        clickCheckBox={this.clickCheckBox}
                        styles={gridStyles}
                        mapToolUsage={mappingToolUsageAPI}
                        className={className}
                        hideModal={this.toggle}
                        getPdfDataAPI={getPdfDataAPI}
                        setParentInfo={this.parentInfoAction}
                        fillParentInfo={this.populateParentData}
                        renderAdditionalInfo={this.renderAdditionalInfo}
                        showActionMessage={this.showActionMessage}
                      />
                    )}
                    {(childMetaData &&
                      childMetaData.griddef.hasButtonBar &&
                      childMetaData.griddef.hasButtonBar == true) ||
                    this.state.showCustomForm ? (
                      <ButtonBar
                        pageid={pageid}
                        metadata={metadata}
                        pid={pid}
                        permissions={permissions}
                        tftools={tftools}
                        customForm={this.state.showCustomForm || this.props.pageid === "custombackupRestore"}
                        handleRunLocator={clickedPageId =>
                          this.handleRunLocator(clickedPageId, childMetaData && childMetaData.griddef)
                        }
                      />
                    ) : null}
                  </Fragment>
                ) : null}
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    formData: state.formData,
    formFilterData: state.formFilterData,
    parentInfo: state.parentInfo,
    isSaas: state.environmentReducer.tfSaas
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setFilterFormData, setFormData, setParentInfo }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomGrid);
