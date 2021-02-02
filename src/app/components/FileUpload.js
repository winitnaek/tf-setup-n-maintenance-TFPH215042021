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
      const inputFile =  base64File;
      const payload = {
              };
      generateReportAPI.generate(pgid, payload).then(uploadResults => {
        if (pgid === "databaseLoad") {
          metaData[pgid].pgdef.pgsubtitle += fileName;
        }
        this.setState({
          uploadResults,
          showAlert: true
        });
      });
    };

    this.onDismiss = () => {
      this.setState({
        showAlert:false
      });
    }

    this.alert = () => {
      const { pgid } = this.props;
      const pgTitle = metaData[props.pgid].pgdef.pgtitle;
      return (
        (Array.isArray(this.state.showAdditonalInfo) ? this.state.showAdditonalInfo : this.state.uploadResults).map((info, index) => {
          return (
            <Alert
              color={info.status}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "80%",
                marginLeft: "90px"
              }}
              isOpen={true} 
              toggle={this.onDismiss}
            >
              Test Result for:
              <div
                style={{
                  width: "100px",
                  display: "flex",
                  color: " rgb(76, 115, 146)",
                  justifyContent: "space-around"
                }}
              >
                {pgid !== "manualUpdate" && (<Fragment><span id={`downloadResult${index}`} onClick={() => {}}>
                  <i class="fa fa-download" aria-hidden="true" />
                  <UncontrolledTooltip placement="top" target={`downloadResult${index}`}>
                    <span> Download Result </span>
                  </UncontrolledTooltip>
                </span>
                <span id={`viewPdf${index}`} onClick={() => {}}>
                  <i className="fa fa-file-pdf fa-lg" />
                  <UncontrolledTooltip placement="bottom" target={`viewPdf${index}`}>
                    <span> View Result as PDF</span>
                  </UncontrolledTooltip>
                </span></Fragment>)}
                <span id={`viewer${index}`} onClick={this.openLink}>
          <i class="fa fa-eye" aria-hidden="true"></i>
          <UncontrolledTooltip placement="top" target={`viewer${index}`}>
            <span> View Result in {pgTitle} Status</span>
          </UncontrolledTooltip>
        </span>
              </div>
            </Alert>
          );
        })
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
        let _id = document.querySelector("div[role='grid']").id;
        const griddata = $("#" + _id).jqxGrid("getdatainformation");
        const payload = [];
        for (let i = 0; i < griddata.rowscount; i++) {
         const rowData = $("#" + _id).jqxGrid("getrenderedrowdata", i);
         const checkBoxKey = Object.keys(rowData).filter(k => rowData[k] === true);
         if(rowData[checkBoxKey]) {
          payload.push(rowData);
         }
        }
        const data = await generateReportAPI.generate(this.props.pgid, payload).then(response => {
          this.setState({
            showAdditonalInfo: response
          });
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
    const fieldDataX = formatFieldData(fieldData[pgid], pgid, 'vinit');
    return (
      <Container>
        <ViewPDF view={this.state.viewPdfMode} handleHidePDF={this.handlePdfView} pdfData={this.state.pdfData} />
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
            {hasGrid ?  
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
        />  
        </Fragment>: null}
        {fieldDataX && fieldDataX.length ? <Row>
          <Col>
          <div style={{marginLeft: '-117px'}}>
            <DynamicForm
              formData={formData}
              filterFormData={formFilterData}
              formProps={{}}
              filter={true}
              isfilterform={false}
              tftools={tftools}
              metadata={compMetaData(pgid)}
              fieldData={fieldDataX}
              formHandlerService={() => {}}
              showProgress={() => {}}
              formActions={true}
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
            <CustomFile name={this.state.fileName}  value={this.state.filePath} onChange={this.onFileSelect} />  
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
        <div style={{ display: 'flex', marginTop: '40px'}}>
          <span style={{ display: 'inline-block',
              textAlign: 'left', marginLeft: '-12px'}}>{formdef.title} </span> :
          <div style={{
            display: 'flex',
            marginTop: '-3px',
            marginLeft: '-7px',
            alignItems: `${this.state.rSelected === 1 ? 'flex-start' : 'flex-end'}`
          }}>
            <CustomFile name={this.state.fileName}  value={this.state.filePath} onChange={this.onFileSelect} />  
              <Button style={{ height: "36px", marginLeft: '-5px', marginRight: '10px', marginBottom: '11px'}} color="primary" onClick={this.onUpload}>
                  {formdef.submitButtonText}
              </Button>
             
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
    formFilterData: state.formFilterData
  };
};

var mapDispatchToProps = dispatch => {
  return bindActionCreators({ setFilterFormData, setFormData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);

