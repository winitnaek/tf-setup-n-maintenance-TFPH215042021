import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Container, UncontrolledTooltip, Alert, Button, ButtonGroup } from "reactstrap";
import { CustomFile, CustomCheckbox } from "bsiuilib";
import generateReportAPI from "../api/generateReportAPI";
import * as metaData from "../metadata/metaData";
import * as styles from "../../base/constants/AppConstants";
import * as fieldData from "../metadata/fieldData";
import { tftools as tfTools } from "../../base/constants/TFTools";
import { setFilterFormData } from "../actions/filterFormActions";

class BatchTest extends Component {
  constructor(props) {
    super(props);
    const { pgid } = this.props;
    const [uploadField, modeField] = fieldData[pgid];
    this.state = {
      uploadResults: null,
      values: {
        [uploadField.id]: uploadField.value,
        [modeField.id]: modeField.value || []
      },
      cSelected: [1],
      rSelected: 1,
      testContent: '',
      fileName: '',
    };
    const toBase64 = file =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

    this.onFileSelect = event => {
      const [file] = event.target.files;
      const { values } = this.state;
      const { pgid } = this.props;
      const [uploadField] = fieldData[pgid];
      values[uploadField.id] = event.target.value;
      this.setState(
        {
          values,
          fileName: file.name,
        },
        async () => {
          this.base64File = await toBase64(file);
        }
      );
    };

    this.onUpload = () => {
      const { pgid } = this.props;
      const [uploadField, modeField] = fieldData[pgid];
      const { base64File } = this;
      const { cSelected, rSelected, testContent, fileName } = this.state;
      const inputFile =  rSelected === 1 ? base64File : btoa(testContent);
      const payload = {
        data: inputFile.substring(inputFile.indexOf(',') + 1, inputFile.length),
        exportMode: cSelected,
        fileName,
      };
      generateReportAPI.generate(pgid, payload).then(uploadResults => {
        this.setState({
          uploadResults,
          values: {
            [uploadField.id]: "",
            [modeField.id]: []
          }
        });
      });
    };


   this.onCheckboxBtnClick = (selected) => {
     const currSelected = this.state.cSelected;
    const index = currSelected.indexOf(selected);
    if (index < 0) {
      currSelected.push(selected);
    } else {
      currSelected.splice(index, 1);
    }
    this.setState({ cSelected: currSelected });
  }
  }

  

  render() {
    const { pgid } = this.props;
    const { values, uploadResults, type, mode } = this.state;
    const { pgdef } = metaData[pgid];
    const [uploadField, modeField] = fieldData[pgid];
    return (
      <Container>
        <Row>
          <h1 style={styles.pagetitle}>{pgdef.pgtitle}</h1>
          <span style={{ marginLeft: "10px" }}>
            <span id="help">
              <span>
                <i className="fas fa-question-circle  fa-lg" onClick={this.OpenHelp} style={styles.helpicon} />
              </span>
            </span>
            <UncontrolledTooltip placement="top" target="help">
              <span> Help </span>
            </UncontrolledTooltip>
            </span>
            <span style={{ marginLeft: "10px" }}>
            <span id="pageInfo">
              <span>
                <i className="fas fa-info-circle  fa-lg" style={styles.helpicon} />
              </span>
            </span>
            <UncontrolledTooltip placement="right" target="pageInfo">
              <span> {pgdef.pgsubtitle} </span>
            </UncontrolledTooltip>
          </span>
        </Row>
         <Row>
          <Col>
            <div>
              <UploadResults {...uploadResults} />
            </div>
            {/* {pgdef.disclaimer && <p>{pgdef.disclaimer}</p>} */}
          </Col>
        </Row>
        
        <Row>
          <div style={{ display: 'flex', marginBottom: '10px'}}>
            <span style={{     width: '50px',
    display: 'inline-block',
    textAlign: 'left'}}> Test </span> :
            <div 
              style={{ 
                marginLeft: '10px',
                marginBottom: '15px',
                marginTop: '-6px'
              }} 
              class="btn-group btn-group-toggle" 
              data-toggle="buttons"
            >
              <ButtonGroup>
                <Button color="primary" onClick={() => this.setState({ rSelected:1})} active={this.state.rSelected === 1}>File</Button>
                <Button color="primary" onClick={() => this.setState({ rSelected:2})} active={this.state.rSelected === 2}>Test Content</Button>
              </ButtonGroup>
            </div>
          </div> 
        </Row>
        <Row>
        <div style={{ display: 'flex'}}>
          <span style={{     width: '50px',
    display: 'inline-block',
    textAlign: 'left'}}>Mode </span> :
          <div style={{ 
                marginLeft: '10px',
                marginBottom: '15px',
                marginTop: '-6px'
              }}  
              data-toggle="buttons"
            >
            <ButtonGroup>
              <Button id="whatifCheckbox" color="primary" onClick={() => this.onCheckboxBtnClick(1)} active={this.state.cSelected.includes(1)}> Export
              <UncontrolledTooltip placement="top" target="whatifCheckbox">
                <span> Export to What-if Test </span>
              </UncontrolledTooltip></Button>
              <Button id="extendedCheckbox" color="primary" onClick={() => this.onCheckboxBtnClick(2)} active={this.state.cSelected.includes(2)}>Extended Format
              <UncontrolledTooltip placement="top" target="extendedCheckbox">
                <span> Output in Extended Format </span>
              </UncontrolledTooltip></Button>
              <Button id="summaryCheckbox" color="primary" onClick={() => this.onCheckboxBtnClick(3)} active={this.state.cSelected.includes(3)}> Generate Summary
              <UncontrolledTooltip placement="top" target="summaryCheckbox">
                <span> Generate Summary MNC file </span>
              </UncontrolledTooltip></Button>
            </ButtonGroup>
          </div> 
          </div>
        </Row>
        <Row>
        <div style={{ display: 'flex'}}>
          <span style={{     width: '50px',
              display: 'inline-block',
              textAlign: 'left'}}>File </span> :
          <div style={{
            display: 'flex',
            marginTop: '-5px',
            marginLeft: '-5px',
            alignItems: `${this.state.rSelected === 1 ? 'flex-start' : 'flex-end'}`
          }}>
            {
              this.state.rSelected === 1
              ? <CustomFile {...uploadField} value={values[uploadField.id]} onChange={this.onFileSelect} />
              : <textarea style={{ marginLeft: '15px'}} rows="4" cols="50" value={this.state.testContent} onChange={(event) => this.setState({ testContent: event.target.value})} />
            }
              <Button style={{ height: "36px", marginLeft: `${this.state.rSelected === 1 ? '-5px' : '10px'}`, marginRight: '10px'}} color="primary" onClick={this.onUpload}>
                  Upload
              </Button>
              <span id="uploadInfo">
              <i className="fas fa-exclamation-triangle fa-lg" style={styles.helpicon} />
              </span>
              <UncontrolledTooltip placement="right" target="uploadInfo">
                  <span> {pgdef.disclaimer} </span>
              </UncontrolledTooltip>
          </div>
        </div>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    isOpen: state.formData.isOpen,
    formData: state.formData,
    formFilterData: state.formFilterData
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setFilterFormData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BatchTest);

export const UploadResults = props => {
  const { uploadStatus, batchStatus, instruction, results, resultType="success" } = props;
  const openMessageViewer = () => {
    const data = tfTools.find(tool => tool.id === "messageViewer");
    if (data) {
      renderTFApplication("pageContainer", data);
    }
  };

  return (
    // <Fragment>
    //   <div className="border p-2 mb-3" 
    //     style={{display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //     border: `2px solid ${resultType === 'success' ? 'green': 'red'} !important`,
    //     color: `${resultType === 'success' ? 'green': 'red'}`,
    //   }}>
        /* <span> Test REsult for: JAJSJASJA.txt</span> */
        <Alert color="success" style={{display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', width: '80%',
            marginLeft: '120px' }}>
          Test Result for:
        <div style={{width: '100px',
          display: 'flex', color: ' rgb(76, 115, 146)', justifyContent: 'space-around'}}>
        <span id="downloadResult" onClick={openMessageViewer}>
          <i class="fa fa-download" aria-hidden="true" />
          <UncontrolledTooltip placement="top" target="downloadResult">
            <span> Download Result </span>
          </UncontrolledTooltip>
        </span>
        <span id="viewPdf" onClick={() => {}}>
          <i className="fa fa-file-pdf fa-lg" />
          <UncontrolledTooltip placement="bottom" target="viewPdf">
            <span> View Result as PDF</span>
          </UncontrolledTooltip>
        </span>
        <span id="messageViewer" onClick={openMessageViewer}>
          <i class="fa fa-eye" aria-hidden="true"></i>
          <UncontrolledTooltip placement="top" target="messageViewer">
            <span> View Result in MessageViewer</span>
          </UncontrolledTooltip>
        </span>
        </div>
        </Alert>
        /* <p>{uploadStatus}</p>
        <p>{batchStatus}</p>
        <p>{instruction}</p>
        {results.map(result => (
          <ResultRow {...result} />
        ))} */
    //   </div>
    //  </Fragment>
  );
};

export const ResultRow = props => {
  const { label, link, linkLabel, size } = props;
  return (
    <Row>
      <Col xs="6">
        {label}
        <a href={link} target="_blank">
          {link}
        </a>
      </Col>
      <Col xs="3">
        <a className="text-danger" href={link} target="_blank">
          {linkLabel}
        </a>
      </Col>
      <Col xs="3">{size}</Col>
    </Row>
  );
};
