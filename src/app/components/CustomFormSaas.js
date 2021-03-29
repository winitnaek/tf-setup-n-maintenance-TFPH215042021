import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Col, Row, Label, Input } from "reactstrap";
import formDataAPI from "../api/formDataAPI";

class CustomFormSaas extends React.Component {
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
            disable = this.props.fieldData.map(field => field.id);
            enableArray = [];
            this.setState({ disableArray: disable, enableArray });
          } else {
             this.setFieldState();
          }
      }
  }

  componentDidMount() {
    const { fieldData } = this.props;

    fieldData.map(data => {
      if(data.fieldtype === 'select' && data.fieldinfo.isasync){
        this.getOptions(data.id, data.value);
      }
    });
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
        enableArray: item.enable || [],
        disableArray: item.disable || [],
    }, () => {
        this.props.updateFormValue(id, value);
    });
  }

  async getOptions(id, value) {
      if(!this.state.options.length) {
        let options = await formDataAPI.getFormData(id, value);
        this.setState({ options });
      }
  }

  render() {
    const { fieldData, loading, title } = this.props;
    return (
      <div>
          <div>
            {loading && <i class="fas fa-spinner fa-spin fa-2x" style={{  color: 'green', width: 'max-content', margin: '0 auto', display: 'flex', }}></i> }
          </div>
          <p style={{fontWeight:'bold',fontSize:'1.5em',color:'rgb(76, 115, 146)'}}>{title}</p>
          <p style={{marginTop: '60px'}}>Select a Data Set to backup.</p>
          <p>You may select one data set to back up from the dropdown box below.</p>
          {fieldData.map((field) => {
              const { id, value, placeholder, fieldtype } = field;
              switch(fieldtype) {
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
              case "select":
                return (
                <Row>
                    <Col sm="6">
                        <Label style={{ display: 'flex', alignItems: 'center'}}>
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
              }
          })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isOpen: state.formData.isOpen,
    formData: state.formData
  };
}

export default connect(mapStateToProps)(CustomFormSaas);
