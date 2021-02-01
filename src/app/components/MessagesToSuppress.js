import React, { Component } from 'react';
import { Row, Col, Container, Table, UncontrolledTooltip, Button } from 'reactstrap';
import * as styles from '../../base/constants/AppConstants';
import MessageSuppressApi from '../api/messageSuppressAPI';
import GeneralApi from '../api/generalApi';
import { tftools as tfTools } from '../../base/constants/TFTools';

class MessagesToSuppress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: new Array(64).fill(0),
      validationMessage: ''
    };
    this.renderRows = () => {
      const { messages } = this.state;
      const rows = [];
      for (let i = 0, roIndex = 1; i < messages.length; i += 8, roIndex++) {
        rows.push(<RowFields start={i} end={i + 8} data={messages} onChange={this.handleChange} roIndex={roIndex} />);
      }
      return rows;
    };

    this.handleChange = event => {
      const { value, id } = event.target;
      const { messages } = this.state;
      messages[id] = value;
      this.setState({ messages, validationMessage: '' });
    };

    this.OpenHelp = () => {
      this.props.help(this.props.pgid);
    };

    this.save = () => {
      const { pgid } = this.props;
      const { messages } = this.state;
      const messageData = messages.filter(message=>!!message)
      let valid = true;
      for (let i = 0; i < messageData.length; i++) {
        if (isNaN(+messageData[i]) || +messageData[i] >= 3000) {
          valid = false;
          break;
        }
      }
      if (valid) {
        MessageSuppressApi.suppressMessages(pgid, messageData).then(res => {
          if (res.status !== 'ERORR') {
            const data = tfTools.find(tool => tool.id === 'messageViewer');
            if (data) {
              renderTFApplication('pageContainer', data);
            }
          }
        });
      } else {
        this.setState({
          validationMessage: 'Input must be valid number between 0 and 2999. Messages 3000 and above cannot be suppressed.'
        });
      }
    };

    this.reset = () => {
      this.setState({
        messages: new Array(64).fill(0)
      });
    };
  }

  componentDidMount() {
    GeneralApi.getApiData(this.props.pgid).then(res => {
      if (res.status !== 'ERORR' && res.messages) {
        const {length}=res.messages;
        const {messages}=this.state;
        const newMessages = res.messages;
        newMessages.concat(messages.slice(length));
        this.setState({
          messages: newMessages
        });
      }
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <h1 style={styles.pagetitle}>Messages to Suppress</h1>
          <span style={{ marginLeft: '10px' }}>
            <span id='help'>
              <span>
                <i className='fas fa-question-circle  fa-lg' onClick={this.OpenHelp} style={styles.helpicon} />
              </span>
            </span>
            <UncontrolledTooltip placement='right' target='help'>
              <span> </span>
            </UncontrolledTooltip>
          </span>
        </Row>
        {this.state.validationMessage ? (
          <Row>
            <div
              style={{
                backgroundColor: '#c1d7d9',
                color: 'red'
              }}
              className='text-center mb-2 w-100'
            >
              {this.state.validationMessage}
            </div>
          </Row>
        ) : null}
        <Row>
          <Col className='border'>
            <p>Enter Up To 64 Message Numbers to Suppress</p>
            <Table borderless responsive style={{ tableLayout: 'fixed' }}>
              <tbody>{this.renderRows()}</tbody>
            </Table>
            <div className='m-2 text-center'>
              <Button color='success mr-2' onClick={this.save}>
                Save
              </Button>
              <Button color='default' onClick={this.reset}>
                Reset
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MessagesToSuppress;

export const RowFields = ({ start, end, data, onChange, roIndex }) => {
  const cols = [];

  while (start < end) {
    cols.push(
      <td className='p-1'>
        <input className='w-100' type='text' value={data[start]} id={start} onChange={onChange} />
      </td>
    );
    start++;
  }
  return <tr style={{ backgroundColor: roIndex % 2 ? '#ffffff' : '#F1F0E7' }}>{cols}</tr>;
};
