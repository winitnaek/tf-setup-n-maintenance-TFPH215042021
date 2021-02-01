import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Col, Row, UncontrolledTooltip, Container } from "reactstrap";
import { tftools } from "../../base/constants/TFTools";
import Tool from "./Tool";

import { UserDataQueries } from "./UserDataQueries";
import { mappingTools } from "../metadata/metaData";

import { closeForm, setFormData } from "../actions/formActions";
import * as styles from "../../base/constants/AppConstants";
import * as formMetaData from "../metadata/metaData";
import * as fieldData from "../metadata/fieldData";
import { ReusableModal } from "bsiuilib";
import { DynamicForm } from "bsiuilib";

import { getRecentUsage } from "../actions/usageActions";
import formDataAPI from "../api/formDataAPI";
import savegriddataAPI from "../api/savegriddataAPI";
import GeneralApi from "../api/generalApi";
import { setFilterFormData } from "../actions/filterFormActions";

class MappingTools extends UserDataQueries {
  constructor() {
    super();
    this.state = {
      tools: []
    };
    this.OpenHelp = () => {
      this.props.help("mappingTools");
    };
  }

  componentDidMount() {
    const { pgid } = this.props;
    const { tools } = this.state;
    GeneralApi.getApiData(pgid).then(res => {

      tftools.forEach(tool => {
        const { value, type, id, label } = tool;
        if (value === "MT" && type !== "page" && mappingTools.tools[id]) {
          tools.push(Object.assign({ label, id, type, value }, mappingTools.tools[id], { items: res[id] || [] }));
        }
      });
      this.setState({
        tools
      });
    });
  }

  render() {
    const { permissions, cruddef, isfilterform, pgid, tools } = this.state;
    const { deleteRow, handleChange, renderMe, handleSubmit } = this;
    const { getRecentUsage, formData } = this.props;
    let filter;
    if (isfilterform) {
      filter = true;
    }
    const close = this.handleClose;
    const formProps = { close, handleChange, pgid, permissions, deleteRow, handleSubmit, renderMe, filter };

    return (
      <Container>
        <Row>
          <h1 style={styles.pagetitle}>Mapping Tools</h1>
          <span style={{ marginLeft: "10px" }}>
            <span id="help">
              <span>
                <i className="fas fa-question-circle  fa-lg" onClick={this.OpenHelp} style={styles.helpicon} />
              </span>
            </span>
            <UncontrolledTooltip placement="right" target="help">
              <span> Help Label </span>
            </UncontrolledTooltip>
          </span>
        </Row>
        <Row>
          {tools.map(tool => (
            <Col xs="12" key={tool.id}>
              <Tool {...tool} toggle={this.toggle} />
            </Col>
          ))}
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
            fieldData={fieldData[pgid]}
            recentUsage={getRecentUsage}
            autoComplete={formDataAPI}
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
  return bindActionCreators({ closeForm, setFormData, getRecentUsage, setFilterFormData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MappingTools);
