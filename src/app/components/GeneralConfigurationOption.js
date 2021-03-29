import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Container, UncontrolledTooltip, Label, Input, Button } from "reactstrap";
import { ConfirmModal } from "bsiuilib";
import formDataAPI from "../api/formDataAPI";
import savegriddataAPI from "../api/savegriddataAPI";
import griddataAPI from "../api/griddataAPI";
import generateReportApi from "../api/generateReportApi";
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
      options: [],
      val: [],
      showConfirm: false,
      message: '',
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

  onValueChange(index, value, item = {}) {
    if (this.state.val.length > 0) {
      const val = this.state.val;
      const i = index === 6 ? 7 : index; 
      val[i].optnrsp = value;
      this.setState({ val });
    } else {
      this.setState({ 
        [index]: value 
      });
    }

    //this.props.updateFormValue(id, value);
  }

  async saveData(pgid) {
      let options = await savegriddataAPI.saveGridData(pgid, this.state.val, {});
      console.log('res',options);
      this.setState({ showConfirm: true, message: options.message });
}
  async getData(isReset) {
    const response = await griddataAPI.getGridData(this.props.pgid, {userId: appUserId(),
    dataset: appDataset(),
    resetConfig: isReset}, {});
    const val = response.optnList;
    this.setState({ val });
  }
  
  componentDidMount(){
    this.getData(false);  
  }

  getValue(index) {
    if (this.state.val.length > 0) {
      const item = index === 6 ? 7 : index;
      return this.state.val[item].optnrsp;
    } else {
      return 0;
    }
  }

  render() {
    const { pgid, formData, formFilterData, isSaas } = this.props;
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
        <Row style={{ border: '1px solid black '}}>
          <Col>
            {/*
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
            /> */
            }
            {fieldDataX.map((field, index) => {
              const { id, value, checked, hideSaas, label, alignedField = '', name, fieldtype, fieldinfo } = field;
              return (
                !(isSaas && hideSaas) && <Row>
                    <Row style={{ marginTop: '15px', marginBottom: '10px', width: '100%' }}>
                        <Label style={{ width: '40%',textAlign: 'right' }}>
                            {label}
                        </Label>
                        <Input style={{
                                    height: '30px',
                                    width: '300px',
                                    margin: '0 20px'
                            }} value={this.getValue(index)} onChange={(evt) => this.onValueChange(index, evt.target.value)} type={fieldtype} name={id} id={id} defaultValue={value}>
                                {fieldinfo.options.map((opt) => {
                                    return (
                                        <option index={opt.id || opt} value={opt.id || opt}>
                                         {opt.label || opt}
                                        </option>
                                    );
                                })}
                            </Input>
                    </Row>
                </Row>
              )
            })
            }
          </Col>
        </Row>
        <Row style={{ marginTop: '30px', marginLeft: '35%' }}>
              <Button onClick={() => this.saveData(this.props.pgid)} className="btn btn-success">Save</Button>
              <Button onClick={() => this.getData(true)} className="btn btn-primary mr-auto btn btn-warning" style={{marginLeft:'90px'}}>Reset</Button>
          </Row>
          <ConfirmModal
          showConfirm={this.state.showConfirm}
          okbtnlbl="OK"
          cancelbtnlbl=""
          cheader="Save"
          cbody={this.state.message}
          handleOk={() => { this.setState({ showConfirm: false, message: '' });}}
          handleCancel={() => {}}
        />
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    isOpen: state.formData.isOpen,
    formData: state.formData,
    formFilterData: state.formFilterData,
    isSaas: state.environmentReducer.tfSaas,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setFilterFormData }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(GeneralConfigurationOption);