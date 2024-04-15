import React, { Component } from 'react';
import { Row, Col, Form } from 'antd';
import Modal from '@iso/components/uielements/modal';
import { ArrowRightOutlined } from '@ant-design/icons';
import Button from '@iso/components/uielements/button';
import basicStyle from '@iso/assets/styles/constants';
import IntlMessages from '@iso/components/utility/intlMessages';
import Select, { SelectOption } from '@iso/components/uielements/select';
import usersAction from '@iso/redux/usersActivity/action';
import Box from '@iso/components/utility/box';
import { message } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const { getUsers, getGenerateReport } = usersAction;
const FormItem = Form.Item;

class GenerateReport extends Component {
  state = {
    visible: false,
    nameOfChekList: '',
    bName: 'Select',
    Type: 'Select',
    bNameId: null,
  };

  componentDidMount() {
    this.props.getUsers({ is_export: true });
  }

  showModal = (e) => {
    this.setState({
      value: 'Select',
      visible: true,
      nameOfChekList: e.target.name,
    });
  };

  handleCancel = (e) => {
    this.props.history.push(`/portal/dashboard/activity/calculations`);
  };

  handleChange = (e, value) => {
    this.setState({
      bName: value.children,
      bNameId: e,
    });
  };
  handleChangeForTypes = (value) => {
    this.setState({
      Type: value,
    });
  };

  handleGenerateReport = () => {
    const { bNameId, Type, bName } = this.state;

    if (bName !== 'Select' && Type !== 'Select') {
      if (Type === 'Affordability') {
        const loan_type = 'affordability';
        const calculate_type = 'purchase';
        return this.props.getGenerateReport({
          id: bNameId,
          loan_type,
          calculate_type,
          filename: 'CalculationGenerateReport',
        });
      }
      const loan_type = Type.split('-')[0].toLowerCase().trim();
      const calculate_type = Type.split('-')[1].toLowerCase().trim();
      return this.props.getGenerateReport({
        id: bNameId,
        loan_type,
        calculate_type,
        filename: 'CalculationGenerateReport',
      });
    } else if (bName === 'Select' && Type === 'Select') {
      return message.error('Please select borrower name and loan type ');
    } else if (bName === 'Select') {
      return message.error('Please select borrower name');
    } else {
      return message.error('Please select loan type');
    }
  };

  render() {
    const { rowStyle } = basicStyle;

    const loanType = [
      'FHA - Refinance',
      'FHA - Purchase',
      'Conventional - Refinance',
      'Conventional - Purchase',
      'Jumbo - Refinance',
      'Jumbo - Purchase',
      'USDA - Refinance',
      'USDA - Purchase',
      'Affordability',
      'VA - Refinance',
      'VA - Purchase',
    ];
    const borrowerName = this.props.activityAllUserList.map((user, index) => ({
      key: index + 1,
      id: user.id,
      name: user.name,
    }));

    const reportDetails = [
      'Loan Type',
      'Term',
      'Calculate Type',
      'FICO',
      'Property Value',
      'Principal & Interest',
      'Down Payment',
      'Annual Property Tax',
      'Loan Amount',
      'Annual Hazard Insurance',
      'Interest Rate',
      'Annual Tax Rate',
      'Mortgage Payment',
      'Mortgage Insurance',
    ];
    const style = {
      lineHeight: '50px',
    };
    return (
      <React.Fragment>
        <Modal
          visible={true}
          onCancel={this.handleCancel}
          width={900}
          footer={null}
        >
          <Box
            title="Generate Report"
            footer={
              <Button type="primary" onClick={this.handleGenerateReport}>
                <IntlMessages id="button.generate" />
              </Button>
            }
          >
            <Row style={rowStyle} gutter={25} style={{ marginTop: '30px' }}>
              <Col lg={12} md={12}>
                <FormItem
                  label={<IntlMessages id="page.activity.borrowerName" />}
                >
                  <Select
                    style={{ width: '100%' }}
                    onChange={(e, value) => this.handleChange(e, value)}
                    value={this.state.bName}
                    className="exportSelectInput"
                  >
                    {borrowerName.map((item) => (
                      <SelectOption key={item.id}>{item.name}</SelectOption>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col lg={12} md={12}>
                <FormItem
                  label={<IntlMessages id="page.widgets.selectLoanType" />}
                >
                  <Select
                    style={{ width: '100%' }}
                    onChange={this.handleChangeForTypes}
                    value={this.state.Type}
                    className="exportSelectInput"
                  >
                    {loanType.map((item) => (
                      <SelectOption key={item}>{item}</SelectOption>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col
                lg={24}
                md={24}
                style={{ marginTop: '20px', marginBottom: '10px' }}
              >
                <span>
                  These details will be present in the generated report:{' '}
                </span>
              </Col>
              {reportDetails.map((item) => (
                <Col lg={12} md={12} style={style}>
                  <ArrowRightOutlined /> {item}
                </Col>
              ))}
            </Row>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  activityAllUserList: state.Users.activityAllUserList,
});
const mapDispatchToProps = (dispatch) => ({
  getUsers: (payload) => dispatch(getUsers(payload)),
  getGenerateReport: (payload) => dispatch(getGenerateReport(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GenerateReport)
);
