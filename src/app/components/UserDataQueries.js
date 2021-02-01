import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Col, Row, Button, UncontrolledTooltip, Container, Card, CardHeader, CardBody } from "reactstrap";
import { tftools } from "../../base/constants/TFTools";
import { formatFieldData } from "../../base/utils/tfUtils";
import { closeForm, setFormData } from "../actions/formActions";
import * as styles from "../../base/constants/AppConstants";
import * as formMetaData from "../metadata/metaData";
import * as fieldData from "../metadata/fieldData";
import { ReusableModal, DynamicForm } from "bsiuilib";

//import { getRecentUsage } from "../actions/usageActions";
import { getUsageData } from "../api/getUsageDataAPI";
import formDataAPI from "../api/formDataAPI";
import savegriddataAPI from "../api/savegriddataAPI";
import { setFilterFormData } from "../actions/filterFormActions";

const renderTFCustomComp = "renderTFCustomComp";

export class UserDataQueries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      helpLabel: "Click here for more info",
      title: "Reporting",
      pgid: "",
      formTitle: "",
      isOpen: false,
      isfilterform: false,
      permissions: " "
    };

    this.OpenHelp = () => {
      this.props.help("userDataQueries");
    };

    this.renderMe = (pgid, values, filter) => {
      filter && this.props.setFilterFormData(values);
      let data = tftools.filter(tftool => {
        if (tftool.id == pgid) return tftool;
      });
      renderTFApplication("pageContainer", data[0]);
    };

    this.renderCustom = renderName => {
      renderTFApplication("pageContainer", renderName);
    };

    this.toggle = (id, title, type) => {
      if (!fieldData[id] || id === "maritalStatusReport" || id === "paServicesTaxReport") {
        this.renderMe(id);
      } else {
        const payload = { data: {}, mode: "New" };
        this.props.setFormData(payload);
        this.setState({
          isOpen: true,
          pgid: id,
          formTitle: title,
          isfilterform: true
        });
      }
    };

    this.handleClose = () => {
      this.setState({ isOpen: false });
    };
  }
  GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }
  renderSection(sectionHeader, sectionName, cols) {
    return (
      <Row>
        <Card style={{ width: "100%" }}>
          <CardHeader>{sectionHeader}</CardHeader>
          <CardBody>
            <Row>
              {tftools.sort(this.GetSortOrder("label")).map(({ label, id, value, type, href, section }, index) => {
                return value === "UQ" && sectionName === section && label !== "Reporting" ? (
                  <Col xs={cols}>
                    <h3>
                      <Button
                        color="link"
                        onClick={() =>
                          type === "externallink" && href ? window.open(href, "_blank") : this.toggle(id, label)
                        }
                      >
                        {label}
                      </Button>
                    </h3>
                  </Col>
                ) : null;
              })}
            </Row>
          </CardBody>
        </Card>
      </Row>
    );
  }
  render() {
    const { permissions, cruddef, isfilterform, pgid } = this.state;
    const { deleteRow, handleChange, renderMe, handleSubmit } = this;
    const { formData } = this.props;
    let filter;
    if (isfilterform) {
      filter = true;
    }
    const close = this.handleClose;
    const formProps = {
      close,
      handleChange,
      pgid,
      permissions,
      deleteRow,
      handleSubmit,
      renderMe,
      filter
    };
    const fieldDataX = formatFieldData(fieldData[pgid], pgid, appUserId());
    return (
      <Container>
        <Row>
          <h1 style={styles.pagetitle}>{this.state.title}</h1>
          <span style={{ marginLeft: "10px" }}>
            <span id="help">
              <span>
                <i className="fas fa-question-circle  fa-lg" onClick={this.OpenHelp} style={styles.helpicon} />
              </span>
            </span>
            <UncontrolledTooltip placement="right" target="help">
              <span> {this.state.helpLabel} </span>
            </UncontrolledTooltip>
          </span>
        </Row>
        <Row>
          <Col style={{ marginBottom: 10 }}>{this.renderSection("Tax Details", "Tax Details", 6)}</Col>
          <Col style={{ marginBottom: 10, marginLeft: 10 }}>{this.renderSection("Quick Formulas", "formulas", 6)}</Col>
          <p>{this.renderSection("User Data Queries", undefined, 4)}</p>
        </Row>

        <ReusableModal
          open={this.state.isOpen}
          close={this.handleClose}
          title={this.state.formTitle}
          cruddef={cruddef}
          styles={styles}
        >
          <DynamicForm
            formData={formData}
            formProps={formProps}
            filter={filter}
            isfilterform={this.state.isfilterform}
            tftools={tftools}
            metadata={formMetaData[pgid]}
            fieldData={fieldDataX}
            recentUsage={getUsageData}
            getFormData={formDataAPI}
            saveGridData={savegriddataAPI}
            styles={styles}
          />
        </ReusableModal>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    isOpen: state.formData.isOpen,
    formData: state.formData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeForm, setFormData, setFilterFormData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDataQueries);
