import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  Row,
  Col,
  Container,
  Button,
  Modal,
  ListGroup,
  ListGroupItem
} from "reactstrap";

class PayrollAndEmployeeTestMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);

    this.setState({});
  }

  render() {
    const { messages } = this.props;

    return (
      <Container style={{marginTop: "50px"}}>
        <Col>
          <p>
            <strong> Payroll &amp; Employee Test Messages </strong>
          </p>
          <hr />
          <ul>
            <li>
              There are {messages ? messages.length : 0}
              &nbsp; for the current Dataset
            </li>
            <li>
              Messages for the last run were recorde on:
              {/* need to find out where this value is located */}
            </li>
            <li>
              <a> click here to veiw/manage messages</a>
            </li>
          </ul>
        </Col>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    messages: []
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PayrollAndEmployeeTestMessages);
