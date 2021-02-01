import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Col, Row, UncontrolledTooltip, Container } from "reactstrap";
import { setTemplateData } from "../../base/utils/tfUtils";
import { UserDataQueries } from "./UserDataQueries";
import * as metaData from "../metadata/metaData";
import { closeForm, setFormData } from "../actions/formActions";
import * as styles from "../../base/constants/AppConstants";
import { tftools } from "../../base/constants/TFTools";
import { getRecentUsage } from "../actions/usageActions";
import { setFilterFormData } from "../actions/filterFormActions";
import mappingToolUsageAPI from "../api/mappingToolUsageAPI";

class MapToolUsage extends UserDataQueries {
  constructor() {
    super();
    this.state = {
      usageGroup: []
    };
    this.OpenHelp = () => {
      this.props.help("mappingTools");
    };

    this.renderParent = parentConfig => {
      const pgData = tftools.filter(item => {
        if (item.id === parentConfig) {
          return item;
        }
      });
      renderTFApplication("pageContainer", pgData[0]);
    };
  }

  componentDidMount() {
    const { pgid, formFilterData } = this.props;
    const { customCode, taxCode, customTaxType } = formFilterData;
    mappingToolUsageAPI.getToolUsage(pgid, { mappedId: customCode || taxCode || customTaxType }).then(usageGroup => {
      this.setState({
        usageGroup: usageGroup instanceof Array ? usageGroup : []
      });
    });
  }

  render() {
    const { pgid, formFilterData } = this.props;
    const { pgdef } = metaData[pgid];
    const { pgsubtitle, pgtitle, parentConfig } = pgdef;
    const { usageGroup } = this.state;
    return (
      <Container>
        <Row>
          <h1 style={styles.pagetitle}>{pgtitle}</h1>
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
          {parentConfig ? (
            <span id="filter">
              <i class="fas fa-arrow-up" style={styles.filtericon} onClick={() => this.renderParent(parentConfig)} />
              <UncontrolledTooltip placement="right" target="filter">
                Return to prior screen
              </UncontrolledTooltip>
            </span>
          ) : null}
        </Row>
        <Row>
          <Col xs="12">
            <p>{setTemplateData(pgsubtitle, formFilterData)}</p>
          </Col>
        </Row>
        <Row>
          {usageGroup &&
            usageGroup.map(({ title, groups }) => {
              return (
                <Col xs="6" key={id}>
                  <h4 className="border-bottom border-primary">{title}</h4>
                  {groups.map(({ name }) => (
                    <p>{name}</p>
                  ))}
                </Col>
              );
            })}
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
  return bindActionCreators({ closeForm, setFormData, getRecentUsage, setFilterFormData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapToolUsage);
