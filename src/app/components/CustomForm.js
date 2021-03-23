import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Col, Row, Label, Input } from "reactstrap";
import formDataAPI from "../api/formDataAPI";

class CustomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        enableArray: [],
        disableArray: [],
        options: [],
    };

    this.onValueChange = this.onValueChange.bind(this);
    this.setFieldState = this.setFieldState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      if(this.props.disableForm !== nextProps.disableForm) {
          let disable = this.state.disableArray, enableArray = this.state.enableArray;
          if(nextProps.disableForm) {
            disable = this.props.fieldData.map(field => field.id) || [];
            enableArray = [];
            this.setState({ disableArray: disable, enableArray });
          } else {
             this.setFieldState();
          }
      }
  }

  componentDidMount() {
    if(this.props.isSaas) {
      this.setState({ disableArray: []});
      return;
    }
    this.setFieldState();
  }

  setFieldState() {
    const disable = [];
    const enable = [];
    let fieldCollection = {};
    this.props.fieldData.forEach(field => {
        fieldCollection[field.id] = null;
        if(field.enable) {
            enable.push(...field.enable);
        }
        if(field.disable) {
            disable.push(...field.disable);
        }
    })
    fieldCollection.disableArray = disable;
    fieldCollection.enableArray = enable;
    this.setState(fieldCollection);
  }

  onValueChange(id, value, item = {}) {
    this.setState({ 
        [id]: value , 
        enableArray: item.enable,
        disableArray: item.disable || [],
    }, () => {
        if(id === "exDataset") {
            this.setState({ newDataset: false })
        }
        if(id === "newDataset") {
            this.setState({ exDataset: false })
        }
        if(!this.state.disableArray.includes(id)) {
            this.props.updateFormValue(id, value);
        }
       
    });
  }

  async getOptions(id, value) {
      if(!this.state.options.length) {
        let options = await formDataAPI.getFormData(id, value);
        this.setState({ options });
      }
  }

  render() {
    const { fieldData, isSaas } = this.props;
    let finalFields = fieldData;
    if(isSaas) {
      finalFields = fieldData.filter(field => !field.hideSaas) || [];
    } else {
      finalFields = fieldData.filter(field => !field.hideNonSaas) || [];
    }
    let style = { display: 'flex', alignItems: 'center'};
    if(isSaas) {
      style = { display: 'flex', alignItems: 'center', marginLeft: '-20px', marginTop: '20px'};
    }
    return (
      <div>
          {finalFields.map((field) => {
              const { id, value, checked, placeholder, label, alignedField = '', name, fieldtype } = field;
              switch(field.fieldtype) {
                case "select":
                  return (
                  <Row>
                      <Col sm="6">
                          <Label style={style}>
                              {placeholder}
                              <Input disabled={this.state.disableArray.includes(id)} style={{
                                      height: '30px',
                                      width: '200px',
                                      margin: '0 20px'
                              }} value={this.state[id]} onClick={() => fieldtype === "select" && this.getOptions(id, value)} onChange={(evt) => this.onValueChange(id, evt.target.value)} type={fieldtype} name={id} id={id} defaultValue={value}>
                                  {this.state.options.map((opt) => {
                                      return (
                                          <option index={opt.id || opt} value={opt.id || opt}>
                                           {opt.label || opt}
                                          </option>
                                      );
                                  })}
                              </Input>
                          </Label>
                      </Col>
                  </Row>
                )
                  case "checkbox": return (
                    <Row>
                    <Col>
                        <Label check>
                            <Input disabled={this.state.disableArray.includes(id)} type="checkbox" name={id} id={id} onChange={(evt) => this.onValueChange(id, evt.target.checked)} checked={this.state[id]} />
                            {placeholder}
                        </Label>
                    </Col>
                </Row>
                  )
              case "radio":
                const nextField = fieldData.find(data => data.id === alignedField) || {};
                return (
                <Row>
                    <Col sm="3">
                        <Label>
                            <Input disabled={this.state.disableArray.includes(id)} type="radio" name={name} id={id}  onClick={(event) => this.onValueChange(id, event.target.checked, field)}  checked={this.state[id]} />
                            {placeholder}
                        </Label>
                    </Col>
                    <Col sm="6">
                        <Label style={{ display: 'flex', alignItems: 'center'}}>
                            {nextField.placeholder}
                            <Input disabled={this.state.disableArray.includes(nextField.id)} style={{
                                    height: '30px',
                                    width: '200px',
                                    margin: '0 20px'
                            }} value={this.state[nextField.id]} onClick={() => nextField.fieldtype === "select" && this.getOptions(nextField.id, nextField.value)} onChange={(evt) => this.onValueChange(nextField.id, evt.target.value)} type={nextField.fieldtype} name={nextField.id} id={nextField.id} defaultValue={nextField.value}>
                                {this.state.options.map((opt) => {
                                    return (
                                        <option index={opt.id || opt} value={opt.id || opt}>
                                         {opt.label || opt}
                                        </option>
                                    );
                                })}
                            </Input>
                        </Label>
                    </Col>
                </Row>
              )
              }
          })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isOpen: state.formData.isOpen,
    formData: state.formData,
    isSaas: state.environmentReducer.tfSaas,
  };
}

export default connect(mapStateToProps)(CustomForm);
