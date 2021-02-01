import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Container, UncontrolledTooltip } from "reactstrap";
import { DynamicForm } from "bsiuilib";
import savegriddataAPI from "../api/savegriddataAPI";
import { tftools } from "../../base/constants/TFTools";
import * as metaData from "../metadata/metaData";
import * as styles from "../../base/constants/AppConstants";
import * as fieldData from "../metadata/fieldData";
import { setFilterFormData } from "../actions/filterFormActions";
import { formatFieldData } from "../../base/utils/tfUtils";

class GeneralConfigurationOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      docData: "",
    };
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
        <Row>
          <Col>
            <DynamicForm
              formData={formData}
              filterFormData={formFilterData}
              formProps={formProps}
              filter={false}
              isfilterform={false}
              tftools={tftools}
              metadata={metaData[pgid]}
              fieldData={fieldDataX}
              formHandlerService={savegriddataAPI}
              styles={styles}
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
export default connect(mapStateToProps, mapDispatchToProps)(GeneralConfigurationOption);