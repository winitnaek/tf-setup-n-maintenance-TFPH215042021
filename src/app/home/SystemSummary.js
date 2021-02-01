import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Sidebar from "./Sidebar";
import {
  Row,
  Col,
  Container,
  Button,
  Modal,
  ListGroup,
  ListGroupItem
} from "reactstrap";


class SystemSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);

    this.setState({});
  }

  render() {
    const { taxCodes, unmappedAuthorites, overrides } = this.props;

    const displayOverrides = () => {
      overrides.map(item => {
          console.log(item.label)
        return (
          <li>
            <a href={item.link}> {item.label} </a>
          </li>
        );
      });
    };

    return (
      <Container>
        <Col>
            <p>
              <strong> System Summary </strong>
            </p>
        </Col>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {

  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SystemSummary);
