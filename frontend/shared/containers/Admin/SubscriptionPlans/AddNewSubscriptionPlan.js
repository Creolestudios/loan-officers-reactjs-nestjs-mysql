import React, { Component } from 'react';
import { Row, Col, Form, Typography } from 'antd';
import Input from '@iso/components/uielements/input';
import IntlMessages from '@iso/components/utility/intlMessages';
import LayoutHeaderActionWrapper from '@iso/components/utility/layoutHeaderActionWrapper';
import HeaderBreadCrumb, {
  DisabledLinkText,
} from '@iso/components/utility/headerBreadCrumb';
import Button from '@iso/components/uielements/button';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import Box from '@iso/components/utility/box';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Editor from '@iso/components/uielements/editor';
import subscriptionPlanAction from '@iso/redux/Admin/SubscriptionPlan/action';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const { saveSubscriptionPlan } = subscriptionPlanAction;
const { Title } = Typography;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 5 },
    lg: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 19 },
    lg: { span: 18 },
  },
};

class AddNewSubscriptionPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      PlanDetails: '',
      editorError: '',
      plan_name: '',
      subscription_fee: '',
      duration: 'Select',
    };
  }
  formRef = React.createRef();

  handleEditorChange = (value) => {
    if (
      !value ||
      (!value.includes('img') &&
        value.replace(/<(.|\n)*?>/g, '').trim().length === 0)
    ) {
      this.setState({
        PlanDetails: value,
        editorError: 'Please enter Description',
      });
      return;
    }
    this.setState({
      PlanDetails: value,
      editorError: '',
    });
  };

  handleChangeForSelect = (value) => {
    this.setState({
      duration: value,
    });
  };

  handleChange = (e) => {
    if (e.target.name === 'subscription_fee') {
      let value = e.target.value;
      let dot = '';

      if (value[0] === '.') {
        value = '';
      } else {
        if (value.slice(0, -1) === '.') {
          dot = '.';
        }
      }

      this.setState({
        [e.target.name]: /^-?\d*(\.\d*)?$/.test(value)
          ? value + dot
          : value.slice(0, -1),
      });
      this.formRef.current.setFieldsValue({
        subscription_fee: /^-?\d*(\.\d*)?$/.test(value)
          ? value + dot
          : value.slice(0, -1),
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  handleSave = () => {
    const { PlanDetails, plan_name, subscription_fee, duration } = this.state;
    if (
      !PlanDetails ||
      (!PlanDetails.includes('img') &&
        PlanDetails.replace(/<(.|\n)*?>/g, '').trim().length === 0)
    ) {
      this.setState({
        editorError: 'Please enter Description',
      });
      return;
    }
    if (PlanDetails && plan_name && subscription_fee && duration) {
      this.props.saveSubscriptionPlan({
        plan_name: plan_name,
        subscription_fees: Number(subscription_fee),
        duration: duration === 'Monthly' ? 1 : 2,
        plan_details: PlanDetails,
      });
    }
  };

  render() {
    const { PlanDetails, plan_name, subscription_fee, duration } = this.state;
    return (
      <React.Fragment>
        <LayoutHeaderWrapper>
          <LayoutHeaderActionWrapper>
            <HeaderBreadCrumb>
              <DisabledLinkText to={`/admin/dashboard/subscription-plans`}>
                <IntlMessages id="page.subscriptionPlans" />
              </DisabledLinkText>
              <Title level={2}>Add New</Title>
            </HeaderBreadCrumb>
          </LayoutHeaderActionWrapper>
        </LayoutHeaderWrapper>
        <LayoutContentWrapper className="subscriptionPlansAddNew">
          <Form
            onFinish={this.handleSave}
            ref={this.formRef}
            style={{ width: '-webkit-fill-available' }}
          >
            <Box
              footer={
                <div className="dashboardButtonwrapper">
                  <Button
                    className="dashboardBtn"
                    type="primary"
                    htmlType="submit"
                  >
                    Save
                  </Button>
                  <Link
                    to={{
                      pathname: `/admin/dashboard/subscription-plans`,
                    }}
                  >
                    <Button>
                      <IntlMessages id="button.cancel" />
                    </Button>
                  </Link>
                </div>
              }
            >
              <div className="subscriptionPlansAddNewContent">
                <Row>
                  <Col lg={{ span: 11, offset: 1 }} xs={{ span: 24 }}>
                    <FormItem
                      {...formItemLayout}
                      label={'Plan Name'}
                      name="plan_name"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter plan name',
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        value={plan_name}
                        name="plan_name"
                        placeholder="Enter Here"
                        onChange={this.handleChange}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={{ span: 10, offset: 2 }} xs={{ span: 24 }}>
                    <FormItem
                      labelCol={{
                        xs: { span: 24 },
                        md: { span: 5 },
                        lg: { span: 8 },
                      }}
                      wrapperCol={{
                        xs: { span: 24 },
                        md: { span: 19 },
                        lg: { span: 16 },
                      }}
                      label={'Subscription Fee'}
                      name="subscription_fee"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter subscription fee',
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        value={subscription_fee}
                        addonBefore="$"
                        name="subscription_fee"
                        placeholder="Enter Here"
                        onChange={this.handleChange}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={{ span: 11, offset: 1 }} xs={{ span: 24 }}>
                    <FormItem
                      {...formItemLayout}
                      label={'Duration'}
                      name="duration"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter duration',
                        },
                      ]}
                    >
                      <Select
                        size="large"
                        style={{ width: '100%' }}
                        placeholder="Select"
                        onChange={this.handleChangeForSelect}
                        value={duration}
                        name="duration"
                        className="exportSelectInput"
                      >
                        {['Annual', 'Monthly'].map((item, index) => (
                          <SelectOption key={index} value={item}>
                            {item}
                          </SelectOption>
                        ))}
                      </Select>
                    </FormItem>
                  </Col>
                  <Col
                    lg={{ span: 23 }}
                    xs={{ span: 24 }}
                    className="subscriptionPlansEditor"
                  >
                    <FormItem
                      label={'Plan Details'}
                      validateStatus={this.state.editorError && 'error'}
                      help={this.state.editorError}
                      labelCol={{
                        lg: { span: 3 },
                        md: { span: 5 },
                        xs: { span: 24 },
                      }}
                      wrapperCol={{
                        lg: { span: 21 },
                        md: { span: 19 },
                        xs: { span: 24 },
                      }}
                    >
                      <Editor
                        moduleType="contents"
                        placeholder="Enter here"
                        handleChangeParent={this.handleEditorChange}
                        value={PlanDetails}
                      />
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </Box>
          </Form>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  marketingAutoResponder: state.AutoResponder.marketingAutoResponder,
});

const mapDispatchToProps = (dispatch) => ({
  saveSubscriptionPlan: (payload) => dispatch(saveSubscriptionPlan(payload)),
  getAutoresponder: () => dispatch(getAutoresponder()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddNewSubscriptionPlan)
);
