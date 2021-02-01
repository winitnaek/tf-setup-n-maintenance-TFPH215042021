import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Container, UncontrolledTooltip,Alert,Form,Button } from "reactstrap";
import { DynamicForm } from "bsiuilib";
import generateReportApi from "../api/generateReportAPI";
import { tftools } from "../../base/constants/TFTools";
import * as metaData from "../metadata/metaData";
import * as styles from "../../base/constants/AppConstants";
import * as fieldData from "../metadata/fieldData";
import { setFilterFormData } from "../actions/filterFormActions";
import { formatFieldData } from "../../base/utils/tfUtils";

class MaritalStatusReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      docData: "",
      showAlert:true,
      reportGenInProgress:false
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.showProgress = this.showProgress.bind(this);
    this.renderMe = (pgid, formValues, response) => {
      console.log("pgid");
      console.log(pgid);
      console.log("response");
      console.log(response);
      console.log("formValues");
      console.log(formValues);
      formValues && this.props.setFilterFormData(formValues);
      this.setState({ url: response.message, docData: response.docData, showAlert:true,reportGenInProgress:false });
    };

    this.OpenHelp = () => {
      this.props.help(this.props.pgid);
    };
  }
  onDismiss() {
    this.setState({
      showAlert:false
    });
  }
  showProgress(show){
    this.setState({
      reportGenInProgress:show,showAlert:false
    });
  }
  download() {
    const byteCharacters = atob(this.state.docData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const output = new Blob([byteArray]);
    var anchor = document.createElement("a");
    var url = window.URL || window.webkitURL;
    anchor.href = url.createObjectURL(output);
    var downloadFileName = this.state.url;
    anchor.download = downloadFileName;
    document.body.append(anchor);
    anchor.click();

    setTimeout(function () {
      document.body.removeChild(anchor);
      url.revokeObjectURL(anchor.href);
    }, 100);
  }
  exportToCsv() {
    alert('export csv');
  }
  render() {
    const { pgid, formData, formFilterData } = this.props;
    const { url } = this.state;
    const { pgdef } = metaData[pgid];
    const formProps = {
      pgid,
      permissions: "",
      close: () => {},
      filter: false,
      renderMe: this.renderMe,
    };
    const fieldDataX = formatFieldData(fieldData[pgid], pgid, appUserId());
    return (
      <Container>
        <Row>
          <h1 style={styles.pagetitle}>{pgdef.pgtitle}</h1>
          <span style={{ marginLeft: "10px" }}>
            <span id="help">
              <span>
                <i
                  className="fas fa-question-circle  fa-lg"
                  onClick={this.OpenHelp}
                  style={styles.helpicon}
                />
              </span>
            </span>
            <UncontrolledTooltip placement="right" target="help">
              <span> {pgdef.helpLblTxt} </span>
            </UncontrolledTooltip>
          </span>
        </Row>
        {url && (<Form style={{
                      display: 'flex',
                      margin: '0 auto',
                      width: '70%',
                      flexWrap: 'wrap'
                    }}>
          <Col>
            <Alert color="success" isOpen={this.state.showAlert} toggle={this.onDismiss} fade={false}>
            Marital Status Report Generated Successfully.
            <a href="#" id="exportToCsv" class="float-right" onClick={() => this.download()}>
            <i class="fas fa-pen-square fa-lg fa-2x"></i>
            </a>
            <UncontrolledTooltip placement="right" target="exportToCsv">
              <span>Download CSV</span>
            </UncontrolledTooltip>
            </Alert>
          </Col>
        </Form>
        )}
        {this.state.reportGenInProgress && (<Form style={{
                      display: 'flex',
                      margin: '0 auto',
                      width: '70%',
                      flexWrap: 'wrap'
                    }}>
          <Col>
            <Alert color="success" isOpen={this.state.reportGenInProgress} fade={false}>
              <span href="#" id="inProgressSpinner"> <i class="fas fa-spinner fa-spin"></i> Marital Status Report Generation is in progress.</span>
            </Alert>
          </Col>
        </Form>
        )}
        <Row>
          <Col>
            <DynamicForm
              formData={formData}
              filterFormData={formFilterData}
              formProps={formProps}
              filter={true}
              isfilterform={false}
              tftools={tftools}
              metadata={metaData[pgid]}
              fieldData={fieldDataX}
              formHandlerService={generateReportApi}
              styles={styles}
              showProgress={this.showProgress}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    isOpen: state.formData.isOpen,
    formData: state.formData,
    formFilterData: state.formFilterData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setFilterFormData }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MaritalStatusReport);