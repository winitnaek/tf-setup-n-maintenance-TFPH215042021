import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Container, UncontrolledTooltip, Alert, Button, ButtonGroup } from "reactstrap";
import { CustomFile, ViewPDF } from "bsiuilib";
import generateReportAPI from "../api/generateReportAPI";
import getPdfDataAPI from "../api/getPdfDataAPI";
import * as metaData from "../metadata/metaData";
import * as styles from "../../base/constants/AppConstants";
import * as fieldData from "../metadata/fieldData";
import { tftools } from "../../base/constants/TFTools";
import { setFilterFormData } from "../actions/filterFormActions";
import { setFormData } from "../actions/formActions";
import { ReusableGrid, DynamicForm } from "bsiuilib";
import {
    openHelp,
    compMetaData,
    compPermissions,
    formatFieldData,
  } from "../../base/utils/tfUtils";
import griddataAPI from "../../app/api/griddataAPI";
import * as gridStyles from "../../base/constants/AppConstants";
import ButtonBar from "./ButtonBar";
import CustomForm from './CustomForm';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    const pageDef = metaData[props.pgid].pgdef;
    this.state = {
      uploadResults: null,
      values: {
        
      },
      fileName: '',
      filePath: '',
      showAdditonalInfo: !pageDef.hasGrid,
      viewPdfMode: '',
      pdfData: null,
      showAlert: false,
      hideGrid: false,
      disableForm: false,
      errorMessage: null,
      loading: false,
    };
    const toBase64 = file =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

    this.onFileSelect = event => {
      const [file] = event.target.files;
      const { values } = this.state;
      this.setState(
        {
          values,
          fileName: file.name,
          filePath: event.target.value,
        },
        async () => {
          this.base64File = await toBase64(file);
        }
      );
    };

    this.onUpload = () => {
      const { pgid } = this.props;
      const { base64File } = this;
      const { fileName } = this.state;

      if(fileName === ''){
        this.setState({
          showAdditonalInfo: {
            status: "warning"
          },
          uploadResults: null,
          errorMessage: "Please Select a file to upload",
          showAlert: true,
        });
        return;
      }

      if(pgid === 'optionalRestore') {
        const fileNameArray = fileName.split(".");
        if(fileNameArray[fileNameArray.length - 1] !== "csv") {
          this.setState({
            showAdditonalInfo: {
              status: "warning"
            },
            uploadResults: null,
            errorMessage: "Only *.csv files can be restored.",
            showAlert: true,

          });
          return;
        }
      }

      const inputFile =  base64File;
      const data = inputFile.substring(inputFile.indexOf(',') + 1, inputFile.length);
      let extraInfo = { fileName };
      this.setState({
        loading: true,
      });
      generateReportAPI.generate(pgid, data, extraInfo).then(uploadResults => {
        let res = uploadResults;
        if (pgid === "databaseLoad") {
          metaData[pgid].pgdef.pgsubtitle += fileName;
        }
        if(pgid === "customdataRestore") {
            res = uploadResults.filePkgList;
        }

        if(pgid === "optionalRestore") {
          res = uploadResults.fileOutputs;
        }
        this.setState({
          uploadResults: res,
          showAlert: true,
          hideGrid: fileName.split('.')[1] === "xml",
          errorMessage: null,
          showAdditonalInfo: pgid === "optionalRestore" && this.props.isSaas,
          loading: false,
          fileName: '',
          filePath: ''
        });
      });
    };

    this.onDismiss = () => {
      this.setState({
        showAlert:false
      });
    }

    this.downloadFile = (file) => {
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
  

    this.alert = () => {
      const { pgid } = this.props;
      const pgTitle = metaData[props.pgid].pgdef.pgtitle;
      return (
        <Alert
        color={this.state.showAdditonalInfo ? this.state.showAdditonalInfo.status  : "success"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "80%",
          margin: '0 auto',
        }}
        isOpen={true} 
        toggle={this.onDismiss}
      >
        {this.state.errorMessage ? this.state.errorMessage : "Test Result for:"}
        <div style={{ display: "flex" }}>
        {(Array.isArray(this.state.showAdditonalInfo) ? this.state.showAdditonalInfo : this.state.uploadResults || []).map((info, index) => {
          return (
            <div>
              <div
                style={{
                  width: "50px",
                  display: "flex",
                  color: " rgb(76, 115, 146)",
                  justifyContent: "space-around"
                }}
              >
                {pgid !== "manualUpdate" && !this.state.errorMessage && info.fileName && !info.fileName.includes("out") && info.fileData && (
                <Fragment><span id={`downloadResult${index}`} onClick={() => this.downloadFile(info)}>
                  <i class="fa fa-download" aria-hidden="true" />
                  <UncontrolledTooltip placement="top" target={`downloadResult${index}`}>
                    <span> Download Result </span>
                  </UncontrolledTooltip>
                </span>
                </Fragment>)}
                {
                 info.fileName && info.fileName.includes("out") && info.fileData && 
                  <span id={`viewPdf${index}`} onClick={() => this.setState({ pdfData: { docData: info.fileData }, viewPdfMode: true })}>
                  <i className="fa fa-file-pdf fa-lg" />
                  <UncontrolledTooltip placement="bottom" target={`viewPdf${index}`}>
                    <span> View Result as PDF</span>
                  </UncontrolledTooltip>
                </span>
                }
                {!this.state.errorMessage && pgid === "test" && <span id={`viewer${index}`} onClick={this.openLink}>
          <i class="fa fa-eye" aria-hidden="true"></i>
          <UncontrolledTooltip placement="top" target={`viewer${index}`}>
            <span> View Result in {pgTitle} Status</span>
          </UncontrolledTooltip>
        </span>}
              </div>
            
              </div> );
        })}
        </div>
        </Alert>
      )
    }

    this.renderGrid = (pgData) => {
        renderTFSetupNMaintenance("pageContainer", pgData);
      }

       this.openLink = () => {
        const { pgdef } = metaData[this.props.pgid];
        const link = pgdef.link;
        const data = tftools.find(tool => tool.id === link);
        if (data) {
          renderTFSetupNMaintenance("pageContainer", data);
        }
      };

      this.handleHTML = (isEnable) => {
        console.log("isEna", this.props.formData)
      }

      this.handleRunLocator = async () => {
        let payload = [];
        if(document.querySelector("div[role='grid']")) {
          let _id = document.querySelector("div[role='grid']").id;
          const griddata = $("#" + _id).jqxGrid("getdatainformation");
          for (let i = 0; i < griddata.rowscount; i++) {
           const rowData = $("#" + _id).jqxGrid("getrenderedrowdata", i);
           const checkBoxKey = Object.keys(rowData).filter(k => rowData[k] === true);
           if(rowData[checkBoxKey]) {
            payload.push(rowData);
           }
          }
        }
        let extraInfo = {};
        // In order to access Form values outside formik without submit click
        if(this.props.pgid === "customdataRestore" && !this.state.disableForm) {
          if(!this.state.exitDataset) {
              this.setState({
                showAdditonalInfo: {
                  status: "warning"
                },
                uploadResults: null,
                errorMessage: "Please Select a Valid dataset",
                showAlert: true,
              });
              return;
          }
          const deleteExistingData = this.state.delData;
          const restorePermission =  this.state.restorePer;
          const newDatasetId =  this.state.set;
          const existingDataset =  this.state.exitDataset;
          extraInfo = {
            newDatasetId,
            deleteExistingData,
            restorePermission,
            existingDataset
          }
          payload = payload.map(data => data.Value)
        }
       
        const data = await generateReportAPI.generate(this.props.pgid, payload, extraInfo, true).then(response => {
         if(this.props.pgid === "customdataRestore") {
            this.openLink();
         } else {
          this.setState({
            showAdditonalInfo: response,
            errorMessage: null,
          });
         }
         
        });
      }

    this.setCustomFormData = (isSelectAll) => {
      const { setFormData, pgid } = this.props;
      const fieldDataX = formatFieldData(fieldData[pgid], pgid, 'vinit');
      let dataRecord = {};
      for(var i =0; i< fieldDataX.length; i++) {
        dataRecord[fieldDataX[i]["id"]] = false;
      }
      const data = { formData: dataRecord, mode: isSelectAll ? "Edit" : "Add" };
      setFormData(data);
    }

    this.handlePdfView = async (event) => {
      event.preventDefault();
      const { pgid, formData } = this.props;
      const pdfData = await getPdfDataAPI.getPdfData(pgid, {});
      this.setState({
        viewPdfMode: !this.state.viewPdfMode,
        pdfData,
      });
    };

    this.rowTicked = (shouldDisable) => {
      let payload = [];
      if(document.querySelector("div[role='grid']")) {
        let _id = document.querySelector("div[role='grid']").id;
        const griddata = $("#" + _id).jqxGrid("getdatainformation");
        for (let i = 0; i < griddata.rowscount; i++) {
         const rowData = $("#" + _id).jqxGrid("getrenderedrowdata", i);
         const checkBoxKey = Object.keys(rowData).filter(k => rowData[k] === true);
         if(rowData[checkBoxKey]) {
          payload.push(rowData);
         }
        }

        this.setState({ disableForm: shouldDisable  || payload.length > 1});
      }
    }
}

// componentDidMount() {
//   this.setCustomFormData(false);
// }

  render() {
    const { pgid, formData, formFilterData } = this.props;
    const { values, uploadResults, type, mode } = this.state;
    const { pgdef, griddef, formdef } = metaData[pgid];
    const hasGrid = pgdef.hasGrid;
    const hasAlert = pgdef.hasAlert;
    const extension = pgdef.extension;
    const fieldDataX = formatFieldData(fieldData[pgid], pgid, 'vinit');
    return (
      <Container>
        <ViewPDF view={this.state.viewPdfMode} handleHidePDF={() => this.setState({ viewPdfMode: false })} pdfData={this.state.pdfData} />
        <Row>
          <h1 style={styles.pagetitle}>{pgdef.pgtitle}</h1>
          <span style={{ marginLeft: "10px" }}>
            <span id="help">
              <span>
                <i className="fas fa-question-circle  fa-lg" onClick={this.OpenHelp} style={styles.helpicon} />
              </span>
            </span>
            <UncontrolledTooltip placement="top" target="help">
              <span> Help </span>
            </UncontrolledTooltip>
            </span>
        </Row>
        <Row></Row>
        {this.state.uploadResults ?
        <Fragment> 
            {hasAlert && this.state.showAdditonalInfo && this.state.showAlert ? this.alert()  : null }
            {hasGrid && !this.state.hideGrid ?  
            <Fragment>
            <ReusableGrid
            styles={gridStyles}
            tftools={tftools}
            pageid={pgid}
            metadata={compMetaData(pgid)}
            pid={"CF"}
            permissions={compPermissions}
            griddata={uploadResults}
            help={openHelp}
            gridProps={{}}
            fieldData={fieldDataX}
            formMetaData={compMetaData(pgid)}
            getGridData={griddataAPI.getGridData}
            renderGrid={this.renderGrid}
            handleHTML={this.handleHTML}
            hideLabel={true}
            renderAdditionalInfo={() => {}}
            selectAllOutside={this.setCustomFormData}
            rowTicked={this.rowTicked}
        />  
        </Fragment>: null}
        {fieldDataX && fieldDataX.length ? <Row>
          <Col>
          <div>
            <CustomForm 
              disableForm={this.state.disableForm} 
              fieldData={fieldDataX} 
              updateFormValue={(id, value) => this.setState({ [id]: value })}
              hasGrid={!this.state.hideGrid} 
            />
            </div>
          </Col>
        </Row> : null}
        
        <Row>
          <Col>
        
        {(pgid === "optionalRestore" || pgid === "manualUpdate" || pgid === "installmachineKey") && <div style={{ display: 'flex', marginTop: '40px'}}>
          <span style={{ display: 'inline-block',
              textAlign: 'left', marginLeft: '-12px'}}>{formdef.title} </span> :
          <div style={{
            display: 'flex',
            marginTop: '-3px',
            marginLeft: '-7px',
            alignItems: `${this.state.rSelected === 1 ? 'flex-start' : 'flex-end'}`
          }}>
            <CustomFile accept={extension || '.xml'} name={this.state.fileName || ''}  value={this.state.filePath || ''} onChange={this.onFileSelect} />  
              <Button style={{ height: "36px", marginLeft: '-5px', marginRight: '10px', marginBottom: '11px'}} color="primary" onClick={this.onUpload}>
                  {formdef.submitButtonText}
              </Button>
          </div>
        </div> }
        {griddef.hasButtonBar && griddef.hasButtonBar == true ? (
          <ButtonBar
            pageid={pgid}
            metadata={compMetaData(pgid)}
            pid={"CF"}
            permissions={compPermissions}
            tftools={tftools}
            handleRunLocator={this.handleRunLocator}
            handlePdf={this.handlePdfView}
          />
        ) : null}
        </Col>
        </Row>
        </Fragment>  : <Fragment>
        {hasAlert && this.state.showAdditonalInfo && this.state.showAlert ? this.alert()  : null }
        <div style={{ display: 'flex', marginTop: '40px'}}>
          <span style={{ display: 'inline-block',
              textAlign: 'left', marginLeft: '-12px'}}>{formdef.title} </span> :
          <div style={{
            display: 'flex',
            marginTop: '-3px',
            marginLeft: '-7px',
            alignItems: `${this.state.rSelected === 1 ? 'flex-start' : 'center'}`
          }}>
            <CustomFile accept={extension || '.xml'} name={this.state.fileName || ''}  value={this.state.filePath || ''} onChange={this.onFileSelect} />  
              <Button style={{ height: "36px", marginLeft: '-5px', marginRight: '10px', marginBottom: '11px'}} color="primary" onClick={this.onUpload}>
                  {formdef.submitButtonText}
              </Button>
              {this.state.loading && <i class="fas fa-spinner fa-spin fa-2x" style={{  color: 'green', width: 'max-content', marginTop: "-9px", display: 'flex', }}></i> }
          </div>
        </div>
        <Row>
              <Col>
              {griddef.hasButtonBar && griddef.hasButtonBar == true && pgid !== "databaseLoad" && pgid !=="customdataRestore" ? (
                <ButtonBar
                  pageid={pgid}
                  metadata={compMetaData(pgid)}
                  pid={"CF"}
                  permissions={compPermissions}
                  tftools={tftools}
                  handleRunLocator={this.handleRunLocator}
                  handlePdf={this.handlePdfView}
                />
              ) : null}
              </Col>
            </Row>
        </Fragment> }
      </Container>
    );
  }
}
var mapStateToProps = state => {
  return {
    isOpen: state.formData.isOpen,
    formData: state.formData,
    formFilterData: state.formFilterData,
    isSaas: state.environmentReducer.tfSaas,
  };
};

var mapDispatchToProps = dispatch => {
  return bindActionCreators({ setFilterFormData, setFormData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);

