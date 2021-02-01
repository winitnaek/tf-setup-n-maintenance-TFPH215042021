import React, { Component } from "react";
import { ReusableGrid, Progress, CustomSelect } from "bsiuilib";

class MessageViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridData: null,
      error: ""
    };
    this.getFilterComponent = this.getFilterComponent.bind(this);
    this.onMessageTypeChange = this.onMessageTypeChange.bind(this);
    this.deleteGridData = this.deleteGridData.bind(this);
  }

  componentDidMount() {
    // pageid : camel case not followed as ReusableGrid needs in this format
    const { getGridData, pageid, gridInput, metadata: metaData, formFilterData } = this.props;
    const { messageType } = gridInput;
    const { pgdef } = metaData;
    let pageUrl = pageid;

    // if Child
    if (!pgdef.childConfig && messageType) {
      pageUrl = "messageViewListByMessageType";
    }
    // for parent
    if (pgdef.childConfig && (formFilterData.startdate || formFilterData.enddate)) {
      pageUrl = "getMessageRunListByFilterDate";
    }

    getGridData(pageUrl, gridInput)
      .then(response => response)
      .then(gridData => {
        metaData.pgdef.subHeader = `There are ${gridData.length} message(s) stored for the current Dataset.`;
        this.setState({ gridData });
      })
      .catch(error => {
        this.setState({
          error
        });
      });
  }

  getFilterComponent() {
    const { gridInput, fieldData, metadata: metaData } = this.props;
    const { messageType = "0" } = gridInput;
    // const metaData = metadata(pageid);
    const { pgdef } = metaData;

    // if Child
    if (!pgdef.childConfig) {
      return (
        <CustomSelect
          {...fieldData[0]}
          value={messageType}
          onChange={this.onMessageTypeChange}
          className="row"
          columnClassName="d-flex p-0 align-items-center"
          labelClassName="mb-0 mr-2"
          inputClassName="w-25"
          resetFields={{}}
        />
      );
    }
    return null;
  }

  onMessageTypeChange(event, selected) {
    const { pageid, setFilterFormData, tftools, renderGrid, fieldData, formFilterData } = this.props;

    const { id } = fieldData[0];
    formFilterData[id] = selected.id;
    setFilterFormData(formFilterData);
    const pgData = tftools.find(tool => tool.id === pageid);
    renderGrid(pgData);
  }

  deleteGridData(pageId, rows, mode) {
    const metaData = this.props.metadata;
    this.props.deleteGridData.deleteGridData(pageId, rows, mode).then(res => {
      if (res.status === "SUCCESS") {
        metaData.pgdef.subHeader = `There are ${0} message(s) stored for the current Dataset.`;
        this.setState({ gridData: [] });
      }
    });
  }

  render() {
    const { gridData } = this.state;
    if (gridData) {
      return (
        <ReusableGrid
          {...this.props}
          griddata={gridData}
          filterComp={this.getFilterComponent()}
          deleteGridData={this}
        />
      );
    }
    return <Progress />;
  }
}

export default MessageViewer;
