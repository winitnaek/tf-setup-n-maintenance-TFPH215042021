import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { tftools } from "../../base/constants/TFTools";
import { ReusableGrid, ConfirmModal } from "bsiuilib";
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
import { compMetaData,populateParentData} from "../../base/utils/tfUtils";
import {setParentInfo} from '../../app/actions/parentInfoActions';
import { Modal, ModalHeader, ModalBody, Row, Col, Alert, UncontrolledTooltip } from "reactstrap";
import generateReportApi from "../api/generateReportAPI";
class CustomGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      isOpen: false,
      clickedPageId: "",
      modalGridData: [],
      showSummary: false,
      showAdditonalInfo: null,
      status: "success"
    };

    this.renderGrid = pgData => {
      renderTFSetupNMaintenance("pageContainer", pgData);
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
    

    this.getMarginTop = () =>  {
      const childMetaData = this.state.clickedPageId && compMetaData(this.state.clickedPageId);
      
      if(this.state.isOpen) {
        if (childMetaData.pgdef.pgsubtitle === "") {
          return "30px";
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

    this.getMarginLeft = () =>  {
      const childMetaData = this.state.clickedPageId && compMetaData(this.state.clickedPageId);
      
      if(this.state.isOpen) {
        return "190px";
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
  }

  componentDidMount() {
    const { metadata, pageid } = this.props;
    const { pgdef } = metadata;
    const { metaInfo } = pgdef;
    this.setState({
      showAlert: !!metaInfo
    });
  }

  renderAlert(isAlert) {
    return (
      this.state.showAdditonalInfo && isAlert
                      ? this.state.showAdditonalInfo.map(info => {
                          return (
                            <Alert
                              color={info.status}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "50%",
                                marginLeft: this.getMarginLeft(),
                                marginTop: this.getMarginTop(),
                                position: "absolute"
                              }}
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
                                <span id="downloadResult" onClick={() => {}}>
                                  <i class="fa fa-download" aria-hidden="true" />
                                  <UncontrolledTooltip placement="top" target="downloadResult">
                                    <span> Download Result </span>
                                  </UncontrolledTooltip>
                                </span>
                                <span id="viewPdf" onClick={() => {}}>
                                  <i className="fa fa-file-pdf fa-lg" />
                                  <UncontrolledTooltip placement="bottom" target="viewPdf">
                                    <span> View Result as PDF</span>
                                  </UncontrolledTooltip>
                                </span>
                              </div>
                            </Alert>
                          );
                        }) : null
    )
  }

  handleRunLocator(clickPageId, gridDef) {
    this.setState(
      {
        clickedPageId: clickPageId
      },
      () => {
        const isAlert = gridDef.hasAlert;
        if(isAlert) {
          this.renderAdditionalInfo(clickPageId);
        } else {
          this.getGridPopupData();
        }
       
      }
    );
  }

  clickCheckBox(event) {
    this.setState({
      showSummary: event.target.value === "on"
    });
  }

  parentInfoAction(formData){
    this.props.setParentInfo(formData);
  };
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  async getGridPopupData() {
    const data = await this.props.getDataForChildGrid({
      pgid: this.state.clickedPageId,
      showSummary: this.state.showSummary
    });
    const { griddef } = this.props.metadata;
    this.setState({
      modalGridData: data.length === 1 && griddef.responseKey ? data[0][responseKey] : data,
      isOpen: true
    });
  }

  async renderAdditionalInfo(pgid, values) {
    const data = await generateReportApi.generate(pgid, values).then(response => {
      this.setState({
        showAdditonalInfo: response
      });
    });
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

    const { formAction, filterFormAction , parentInfoAction } = this;
    const childMetaData = this.state.clickedPageId && compMetaData(this.state.clickedPageId);
    return (
      <Fragment>
         {this.renderAlert(griddef.hasAlert)}
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
        />
        {griddef.hasButtonBar && griddef.hasButtonBar == true ? (
          <ButtonBar
            pageid={pageid}
            metadata={metadata}
            pid={pid}
            permissions={permissions}
            tftools={tftools}
            handleRunLocator={(clickedPageId) => this.handleRunLocator(clickedPageId, griddef)}
          />
        ) : null}
        <ConfirmModal showConfirm={this.state.showAlert} handleOk={this.handleOk} {...metaInfo} />

        <Modal isOpen={this.state.isOpen} size="lg" style={gridStyles.modal}>
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <ModalBody>
            <Row>
              <Col className="grid-modal mr-2 ml-2">
                {this.state.isOpen ? (
                  <Fragment>
                    {this.renderAlert(childMetaData && childMetaData.griddef.hasAlert)}
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
                    />
                    {childMetaData && childMetaData.griddef.hasButtonBar && childMetaData.griddef.hasButtonBar == true ? (
                      <ButtonBar
                        pageid={pageid}
                        metadata={metadata}
                        pid={pid}
                        permissions={permissions}
                        tftools={tftools}
                        handleRunLocator={(clickedPageId) => this.handleRunLocator(clickedPageId, childMetaData && childMetaData.griddef)}
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
    parentInfo:state.parentInfo
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setFilterFormData, setFormData, setParentInfo }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomGrid);