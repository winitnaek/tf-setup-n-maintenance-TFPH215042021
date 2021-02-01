import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Container, Button, Modal } from "reactstrap";

const Style = {
  margin: "0 auto"
}

class CustomComp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <Container style={{ marginTop: "-50px" }}>
        <Col>
          <Row >
            <p  sytle={Style}>
              <strong> Custom component! </strong>
            </p>
          </Row>
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
export default connect(mapStateToProps, mapDispatchToProps)(CustomComp);