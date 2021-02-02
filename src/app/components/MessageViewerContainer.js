import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { tftools } from "../../base/constants/TFTools";
import { setFilterFormData } from "../../app/actions/filterFormActions";
import { setFormData } from "../../app/actions/formActions";
import * as gridStyles from "../../base/constants/AppConstants";
import MessageViewer from "./MessageViewer";
import savegriddataAPI from "../api/savegriddataAPI";
import deletegriddataAPI from "../api/deletegriddataAPI";
import { getUsageData } from "../api/getUsageDataAPI";
import formDataAPI from "../api/formDataAPI";
import mappingToolUsageAPI from "../api/mappingToolUsageAPI";

class MessageViewerContainer extends Component {
  renderGrid(pgData) {
    renderTFSetupNMaintenance("pageContainer", pgData);
  }

  render() {
    return (
      <MessageViewer
        styles={gridStyles}
        tftools={tftools}
        saveGridData={savegriddataAPI}
        deleteGridData={deletegriddataAPI}
        autoComplete={formDataAPI}
        mapToolUsage={mappingToolUsageAPI}
        recentUsage={getUsageData}
        renderGrid={this.renderGrid}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    formData: state.formData,
    formFilterData: state.formFilterData
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setFilterFormData, setFormData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageViewerContainer);
