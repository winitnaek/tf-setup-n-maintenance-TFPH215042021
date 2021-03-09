import React, { Component } from "react";
import { Row, UncontrolledTooltip, Button } from "reactstrap";
class ButtonBar extends Component {
  constructor(props) {
    super(props);
    let pageid = this.props.pageid;
    let pid =  this.props.pid;
    let metadata =  this.props.metadata;
    let permissions = this.props.permissions;
    let tftools = this.props.tftools;
  }

  componentDidMount() {}

  renderButtonBarForPage() {
    let taxLocator = (
      <div>
        <a href="#" id="taxLocator">
          <i class="fas fa-thumbtack fa-lg fa-2x"></i>
        </a>
        <UncontrolledTooltip placement="right" target="taxLocator">
          <span> Tax Locator </span>
        </UncontrolledTooltip>
      </div>
    );
    let calculateTaxes = (
      <div>
        <a href="#" id="calculateTaxes">
          <i class="fas fa-calculator fa-lg fa-2x"></i>
        </a>
        <UncontrolledTooltip placement="right" target="calculateTaxes">
          <span> Calculate Taxes </span>
        </UncontrolledTooltip>
      </div>
    );
    let runLocatorService = (
      <div>
        <a href="#" id="runLocatorService" onClick={() => this.props.handleRunLocator('runLocatorService')}>
          <i class="fas fa-map-marker fa-lg fa-2x"></i>
        </a>
        <UncontrolledTooltip placement="right" target="runLocatorService">
          <span> Run Locator Service </span>
        </UncontrolledTooltip>
      </div>
    );
    let addressFromWorksite = (
      <div>
        <a href="#" id="addressFromWorksite" onClick={() => this.props.handleRunLocator("addressFromWorksite")}>
          <i class="fas fa-address-card fa-lg fa-2x"></i>
        </a>
        <UncontrolledTooltip placement="right" target="addressFromWorksite">
          <span> Get Address From Worksite </span>
        </UncontrolledTooltip>
      </div>
    );
    let customdataBackup = (
      <Button id="customdataBackup" color="primary" size="sm" style={{marginRight:'20px'}} onClick={() => this.props.handleRunLocator("customdataBackup")}>
        <i class="fas fa-hdd fa-lg fa-1x"></i> Backup
      </Button>
    );
    let deleteAll = (
      <Button id="deleteAll" color="primary" size="sm" style={{marginRight:'20px'}} onClick={() => this.props.handleDeleteAll(this.props.pageid)}>
        <i class="fas fa-calendar-minus fa-lg fa-1x"></i> Delete All
      </Button>
    );
    let findRedundantOverrides = (
      <div>
        <a href="#" id="findRedundantOverrides" onClick={() => this.props.handleRunLocator("findRedundantOverrides")}>
          <i class="fas fa-address-book fa-lg fa-2x"></i>
        </a>
        <UncontrolledTooltip placement="right" target="findRedundantOverrides">
          <span>Find Redundant Overrides</span>
        </UncontrolledTooltip>
      </div>
    );
    let customdataRestore = (
      <div>
        <a href="#" id="process" onClick={() => this.props.handleRunLocator("")}>
          <i class="fas fa-play-circle fa-lg fa-2x"></i>
        </a>
        <UncontrolledTooltip placement="right" target="process">
          <span> Process </span>
        </UncontrolledTooltip>
      </div>
    );

    let refreshStatusBackup = (
      <div>
        <a href="#" id="refresh" onClick={() => this.props.handleRunLocator(this.props.pageid)}>
          <i class="fas fa-sync-alt fa-lg fa-2x"></i>
        </a>
        <UncontrolledTooltip placement="right" target="refresh">
          <span> Refresh </span>
        </UncontrolledTooltip>
      </div>
    );

    
    let showstatusBackup = (
      <div>
        <a href="#" id="files" onClick={() => this.props.handleRunLocator(this.props.pageid)}>
          <i class="fas fa-file fa-lg fa-2x"></i>
        </a>
        <UncontrolledTooltip placement="right" target="files">
          <span> Show Output Files </span>
        </UncontrolledTooltip>
      </div>
    );

    let optionalBackup = (
      <div>
        <a href="#" id="process" onClick={() => this.props.handleRunLocator("optionalBackup")}>
          <i class="fas fa-play-circle fa-lg fa-2x"></i>
        </a>
        <UncontrolledTooltip placement="right" target="process">
          <span> Process </span>
        </UncontrolledTooltip>
      </div>
    );

    let viewPdfSummary = (
      <div>
        <a href="#" id="process" onClick={(event) => this.props.handlePdf(event)}>
          <i class="fas fa-play-circle fa-lg fa-2x"></i>
        </a>
        <UncontrolledTooltip placement="right" target="process">
          <span> View Pdf Summary </span>
        </UncontrolledTooltip>
      </div>
    );
    let checkAll = (
      <Button id="checkAll" color="primary" size="sm" style={{marginRight:'20px'}} onClick={() => this.props.handleCheckAll(true)}>
        <i class="fas fa-check fa-lg fa-1x"></i> Check All
      </Button>
    );
    let uncheckAll = (
      <Button id="uncheckAll" color="primary" size="sm" style={{marginRight:'20px'}} onClick={() => this.props.handleCheckAll(false)}>
        <i class="fas fa-times fa-lg fa-1x"></i> Uncheck All
      </Button>
    );
    let saveCheck = (
      <Button id="saveCheck" color="primary" size="sm" style={{marginRight:'20px'}} onClick={() => this.props.handleSaveAll(this.props.pageid)}>
        <i class="fas fa-save fa-lg fa-1x"></i> Save
      </Button>
    );
    let viewPdf = (
      <Button id="saveCheck" color="primary" size="sm" style={{marginRight:'20px'}} onClick={(event) => this.props.handlePdf(event)}>
        <i class="far fa-file-pdf fa-lg fa-1x"></i> View Pdf
      </Button>
    );

    if(this.props.pageid==='whatifEmp' || this.props.pageid==='whatifDeductionsBenefit' && this.props.pageid==='taxLocator'){ 
      //whatifEmp && whatifDeductionsBenefit && taxLocator
      taxLocator=null;
      calculateTaxes=null;
      runLocatorService=null;
      addressFromWorksite=null;
      findRedundantOverrides=null;
      customdataBackup=null;
      customdataRestore=null;
      refreshStatusBackup = null;
      showstatusBackup = null;
      optionalBackup = null;
      viewPdfSummary = null;
    }else if(this.props.pageid==='whatifTaxes'){ //whatifTaxes
      runLocatorService=null;
      addressFromWorksite=null;
      refreshStatusBackup = null;
      showstatusBackup = null;
      optionalBackup = null;
      deleteAll=null;
      findRedundantOverrides=null;
      customdataBackup=null;
      customdataRestore=null;
      viewPdfSummary = null;
    }else if(this.props.pageid==='whatifGarnishment'){ //whatifEmpGarnishment
      taxLocator=null;
      optionalBackup = null;
      runLocatorService=null;
      refreshStatusBackup = null;
      showstatusBackup = null;
      addressFromWorksite=null;
      findRedundantOverrides=null;
      customdataBackup=null;
      viewPdfSummary = null;
    }else if(this.props.pageid==='whatifLocations'){ //taxLocatorLocation
      taxLocator=null;
      calculateTaxes=null;
      deleteAll = null;
      optionalBackup = null;
      findRedundantOverrides=null;
      customdataBackup=null;
      customdataRestore=null;
      viewPdfSummary = null;
    }else if(this.props.pageid==='addressOverrides'){ //addressOverrides
      taxLocator=null;
      calculateTaxes=null;
      refreshStatusBackup = null;
      showstatusBackup = null;
      runLocatorService=null;
      addressFromWorksite=null;
      deleteAll=null;
      customdataBackup=null;
      customdataRestore=null;
      optionalBackup = null;
      viewPdfSummary = null;
    }else if(this.props.pageid==='custombackupRestore'){ //custombackupRestore
      taxLocator=null;
      calculateTaxes=null;
      runLocatorService=null;
      addressFromWorksite=null;
      deleteAll=null;
      refreshStatusBackup = null;
      showstatusBackup = null;
      findRedundantOverrides=null;
      customdataRestore=null;
      optionalBackup = null;
      viewPdfSummary = null;
      checkAll = null;
      uncheckAll = null;
      saveCheck = null;
      viewPdf = null;
    }else if(this.props.pageid==='customdataRestore' || this.props.pageid==='customdataBackup'){ //customdataRestore
      taxLocator=null;
      calculateTaxes=null;
      runLocatorService=null;
      addressFromWorksite=null;
      deleteAll=null;
      refreshStatusBackup = null;
      optionalBackup = null;
      showstatusBackup = null;
      findRedundantOverrides=null;
      customdataBackup=null;
      viewPdfSummary = null;
      checkAll = null;
      uncheckAll = null;
      saveCheck = null;
      viewPdf = null;
    }
    else if(this.props.pageid==='customrestoreStatus' || this.props.pageid==='manualupdateStatus' || this.props.pageid==="databaseloadStatus" ){ //customdataRestore
      taxLocator=null;
      calculateTaxes=null;
      runLocatorService=null;
      addressFromWorksite=null;
      deleteAll=null;
      findRedundantOverrides=null;
      customdataBackup=null;
      customdataRestore = null;
      optionalBackup = null;
      viewPdfSummary = null;
      checkAll = null;
      uncheckAll = null;
      saveCheck = null;
      viewPdf = null;
    } else if(this.props.pageid==='optionalBackup' || this.props.pageid==='databaseLoad'){ //customdataRestore
      taxLocator=null;
      calculateTaxes=null;
      refreshStatusBackup = null;
      showstatusBackup = null;
      runLocatorService=null;
      addressFromWorksite=null;
      deleteAll=null;
      customdataBackup=null;
      findRedundantOverrides = null;
      customdataRestore=null;
      viewPdfSummary = null;
      checkAll = null;
      uncheckAll = null;
      saveCheck = null;
      viewPdf = null;
    } else if(this.props.pageid === "manualUpdate") {
      taxLocator=null;
      calculateTaxes=null;
      runLocatorService=null;
      addressFromWorksite=null;
      deleteAll=null;
      findRedundantOverrides=null;
      customdataBackup=null;
      customdataRestore = null;
      optionalBackup = null;
      refreshStatusBackup = null;
      showstatusBackup = null;
      checkAll = null;
      uncheckAll = null;
      saveCheck = null;
      viewPdf = null;
    }
    else if(this.props.pageid === "permissions") {
      taxLocator=null;
      calculateTaxes=null;
      runLocatorService=null;
      addressFromWorksite=null;
      deleteAll=null;
      findRedundantOverrides=null;
      customdataBackup=null;
      customdataRestore = null;
      optionalBackup = null;
      refreshStatusBackup = null;
      showstatusBackup = null;
      viewPdfSummary = null;
    }
    else if(this.props.pageid === "auditLogViewer") {
      taxLocator=null;
      calculateTaxes=null;
      runLocatorService=null;
      addressFromWorksite=null;
      findRedundantOverrides=null;
      customdataBackup=null;
      customdataRestore = null;
      optionalBackup = null;
      refreshStatusBackup = null;
      showstatusBackup = null;
      viewPdfSummary = null;
      checkAll = null;
      uncheckAll = null;
      saveCheck = null;
      viewPdf = null;
    }
    return (
      <Row className="justify-content-center" style={{ paddingTop: "3px",paddingBottom:'2px',marginTop:'15px',borderRadius:'0.25rem'}}>
        {taxLocator}
        {calculateTaxes}
        {runLocatorService}
        {addressFromWorksite}
        {deleteAll}
        {findRedundantOverrides}
        {customdataBackup}
        {customdataRestore}
        {refreshStatusBackup}
        {showstatusBackup}
        {optionalBackup}
        {viewPdfSummary}
        {checkAll}
        {uncheckAll}
        {saveCheck}
        {viewPdf}
      </Row>
    );
  }
  render() {
    return (<div>{this.renderButtonBarForPage()}</div>);
  }
}
export default ButtonBar;