import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Container } from "reactstrap";
import * as formMetaData from "../metadata/metaData";
import * as fieldData from "../metadata/fieldData";
import { setModuleLinks } from "./actions/moduleLinksActions";
import { saveFavoriteLinks} from "./favoriteLinksActions";
import { tftools } from "../../base/constants/TFTools";
import { formatFieldData } from "../../base/utils/tfUtils";
import { ReusableModal, DynamicForm, FlyoutMenu, SearchBar } from "bsiuilib";
import { setFormData } from "../actions/formActions";
import { setFilterFormData } from "../actions/filterFormActions";
import * as styles from "../../base/constants/AppConstants";
import { getUsageData } from "../api/getUsageDataAPI";
import formDataAPI from "../api/formDataAPI";
import savegriddataAPI from "../api/savegriddataAPI";
import {setUnSetFavorite} from "../home/actions/favoriteUtil";
import { isMock } from '../../tf_setup_n_maintenance';
class TFHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: true,
      sideDrawerOpen: true,
      getGridData: this.props.fetchGridData
    };

    this.sectionLayout = [
      [
        {
          section: "Access Tools",
          sectionHeader: "Access Tools",
          sectionIcon: "sign-in-alt",
          value: "SM"
        },
        {
          section: "Configuration",
          sectionHeader: "Configuration",
          sectionIcon: "cog",
          value: "SM"
        }
      ],
      [
        {
          section: "Database Tools",
          sectionHeader: "Database Tools",
          sectionIcon: "database",
          value: "SM"
        }
      ],
      [
        {
          section: "Maintenance Tools",
          sectionHeader: "Maintenance Tools",
          sectionIcon: "gavel",
          value: "SM"
        }
      ]
    ];

    this.handleClose = this.handleClose.bind(this);
    this.toggle = this.toggle.bind(this);
    this.renderApplication = this.renderApplication.bind(this);
    this.renderMe = this.renderMe.bind(this);
    this.setFavorite = this.setFavorite.bind(this);
  }

  toggle(pageData) {
    const { id, label } = pageData;
    const payload = { data: {}, mode: "New" };
    this.props.setFormData(payload);
    this.setState({
      isOpen: true,
      pgid: id,
      formTitle: label,
      isfilterform: true
    });
  }

  handleClose() {
    this.setState({ isOpen: false });
  }

  renderMe(pageId, values, filter) {
    filter && this.props.setFilterFormData(values);
    let data = tftools.find(tftool => tftool.id == pageId);
    renderTFSetupNMaintenance("pageContainer", data);
  }

  renderApplication(data) {
    const { id, value } = data;
    if (!fieldData[id] || value !== "UQ" || id === "maritalStatusReport" || id === "paServicesTaxReport") {
      this.renderMe(id);
    } else {
      this.toggle(data);
    }
  }
  /**
   * setFavorite
   * @param {*} favorites 
   * @param {*} selectedFavorite 
   * @param {*} action 
   */
  setFavorite(favorites, selectedFavorite, action) {
    setUnSetFavorite(favorites, selectedFavorite, action);
  }

  getOptions() {
    let excluededPages=[];
    if(!isMock()){
      excluededPages = ["testHarness", "selectSamplePage", "dateFieldDoc","UQ","CD","GD","CT","MT","TS","PD"];
    }
    let perms = getAllRights();
    if(perms && perms['PN'] && perms['PN'][0]===1){
      perms["SM"] = perms['PN'];
    }
    let arr = tftools.filter(tool => !excluededPages.includes(tool.value) && perms[tool.value] && perms[tool.value][0]===1).sort(this.GetSortOrder("label"));
    console.log(arr);

    const env = this.props.environment;

    if(env.tfSaas) {
      arr = arr.filter(screen => !screen.hideSaaS)
    }
    return arr ;//tftools.filter(tool => !excluededPages.includes(tool.value)).sort(this.GetSortOrder("label"));
  }
  getTFTools() {
    let perms = getAllRights();
    if(perms && perms['PN'] && perms['PN'][0]===1){
      perms["SM"] = perms['PN'];
    }
    let arr = tftools.filter(tool => perms[tool.value] && perms[tool.value][0]===1).sort(this.GetSortOrder("label"));
    const env = this.props.environment;

    if(env.tfSaas) {
      arr = arr.filter(screen => !screen.hideSaaS)
    }
    return arr;
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

  render() {
    const { isOpen, formTitle, isfilterform, pgid } = this.state;
    const { formData } = this.props;
    const formProps = {
      close: this.handleClose,
      pgid,
      renderMe: this.renderMe,
      filter: isfilterform
    };

    const fieldDataX = formatFieldData(fieldData[pgid], pgid, appUserId());

    return (
      <div style={{ marginTop: 0 }}>
        <Container fluid style={{ overflowY: "auto", minHeight: "calc(100vh - 75px)" }}>
          <SearchBar
            title="Setup & Maintenance"
            sectionLayout={this.sectionLayout}
            options={this.getOptions()}
            favorites={this.props.favorites}
            setFavorite={this.setFavorite}
            renderApplication={this.renderApplication}
          />

          <ReusableModal open={isOpen} close={this.handleClose} title={formTitle} styles={styles}>
            <DynamicForm
              formData={formData}
              formProps={formProps}
              filter={false}
              isfilterform={isfilterform}
              tftools={this.getTFTools().sort(this.GetSortOrder("label"))}
              metadata={formMetaData[pgid]}
              fieldData={fieldDataX}
              recentUsage={getUsageData}
              getFormData={formDataAPI}
              saveGridData={savegriddataAPI}
              styles={styles}
            />
          </ReusableModal>

          <Row>
            <Col>
              <div id="pageContainer" className="container w-100 pl-5 pr-5" style={{ maxWidth: "100%" }}>
                <FlyoutMenu
                  favorites={this.props.favorites}
                  options={this.getTFTools()}
                  showSideMenu={false}
                  setFavorite={this.setFavorite}
                  renderApplication={this.renderApplication}
                  sectionLayout={this.sectionLayout}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    formData: state.formData,
    favorites: state.favoriteLinks,//.filter(opt => opt.id !== "testHarness")
    environment: state.environmentReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setModuleLinks, saveFavoriteLinks, setFilterFormData, setFormData}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TFHome);
