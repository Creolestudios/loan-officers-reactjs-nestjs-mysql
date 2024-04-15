import React, { Component } from 'react';
import { Row, Col, Form, Typography } from 'antd';
import Input from '@iso/components/uielements/input';
import { isEmpty } from 'lodash';
import Button from '@iso/components/uielements/button';
import IsoWidgetsWrapper from '@iso/containers/Global/Common/WidgetsWrapper';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutHeaderActionWrapper from '@iso/components/utility/layoutHeaderActionWrapper';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import basicStyle from '@iso/assets/styles/constants';
import LayoutContent from '@iso/components/utility/layoutContent';
import IntlMessages from '@iso/components/utility/intlMessages';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Box from '@iso/components/utility/box';
import { StatesList } from '@iso/config/constant';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Months, years } from '@iso/config/constant';
import SubscriptionAction from '@iso/redux/SubscriptionsPlan/action';
import Card from '../../../UI/Antd/Card/Card';

const { subscribePlan, getAllSubscriptionPlan } = SubscriptionAction;
const FormItem = Form.Item;
const { Title } = Typography;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    md: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 16 },
  },
};

class Subscribe extends Component {
  constructor() {
    super();
    this.state = {
      value: 'select',
      detail: null,
    };
  }

  componentDidMount() {
    this.props.getAllSubscriptionPlan();
  }

  formRef = React.createRef();
  handleChange = (value) => {
    const selectedDataPlan = this.props.LOSubscriptionPlans.find(
      (element) => element.id === value
    );
    if (selectedDataPlan) {
      this.setState({
        detail: selectedDataPlan?.plan_details,
      });

      this.formRef.current.setFieldsValue({
        subscription_fees: selectedDataPlan?.plan_fees,
      });

      this.formRef.current.setFieldsValue({
        plan_details: selectedDataPlan?.plan_details,
      });
    }
  };

  handleSubmit = (data) => {
    const payload = {
      ...data,
    };

    payload['plan_id'] = data.plan_name;
    payload['exp_month'] = Number(data.exp_month);
    payload['exp_year'] = Number(data.exp_year);
    delete payload.plan_details;
    delete payload.subscription_fees;
    delete payload.plan_name;
    this.props.subscribePlan(payload);
  };

  render() {
    const { rowStyle } = basicStyle;

    const plan = !isEmpty(this.props.LOSubscriptionPlans)
      ? this.props.LOSubscriptionPlans
      : [];
    const data = this.props?.LOSubscription ?? [];

    return (
      <React.Fragment>
        <LayoutHeaderWrapper>
          <LayoutHeaderActionWrapper>
            <Title level={2}>Subscribe</Title>
          </LayoutHeaderActionWrapper>
        </LayoutHeaderWrapper>
        <LayoutContentWrapper className="subscriptionSubscribe">
          {isEmpty(data) && (
            <Col lg={24} md={24} sm={24} xs={24}>
              <IsoWidgetsWrapper className="learnMoreOwnAppError">
                <Card
                  style={{
                    backgroundColor: '#BAFAC7',
                  }}
                >
                  <div className="learnMoreSec" style={{ color: 'darkgreen' }}>
                    {' '}
                    Your subscription is expired or no longer active, please
                    subscribe below
                  </div>
                </Card>
              </IsoWidgetsWrapper>
            </Col>
          )}
          <LayoutContent>
            <Col lg={24} md={24} sm={24} xs={24}>
              <Row style={rowStyle} gutter={0} justify="start">
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Form onFinish={this.handleSubmit} ref={this.formRef}>
                    <Box
                      footer={
                        <div className="cancelSubscriptionWrapper">
                          <Button type="Secondry">
                            <IntlMessages id="button.cancel" />
                          </Button>
                          <Button type="primary" htmlType="submit">
                            <IntlMessages id="button.subscribe" />{' '}
                          </Button>
                        </div>
                      }
                    >
                      <Row>
                        <Col xs={24} md={12} className="subscribeSelectPlan">
                          <FormItem
                            {...formItemLayout}
                            label={'Select a Plan'}
                            name="plan_name"
                            rules={[
                              {
                                required: true,
                                message: 'Please select a plan',
                              },
                            ]}
                          >
                            <Select
                              size="large"
                              style={{ width: '100%' }}
                              onChange={this.handleChange}
                              placeholder="Select"
                              className="exportSelectInput"
                            >
                              {plan.map((item, index) => (
                                <SelectOption key={item?.id} value={item?.id}>
                                  {item?.plan_name}
                                </SelectOption>
                              ))}
                            </Select>
                          </FormItem>
                        </Col>
                        <Col xs={24} md={12}>
                          <FormItem
                            {...formItemLayout}
                            label={'Promo Code'}
                            name="promo_code"
                          >
                            <Input size="large" placeholder="Enter Here" />
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} xs={24}>
                          <FormItem
                            {...formItemLayout}
                            label={'Subscription Fee'}
                            name="subscription_fees"
                          >
                            <Input
                              addonBefore="$"
                              size="large"
                              placeholder="Enter Here"
                              disabled
                            />
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={24}>
                          <FormItem
                            label={'Plan Details'}
                            name="plan_details"
                            labelCol={{
                              xs: { span: 24 },
                              sm: { span: 6 },
                              md: { span: 4 },
                            }}
                            wrapperCol={{
                              xs: { span: 24 },
                              sm: { span: 18 },
                              md: { span: 20 },
                            }}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: this.state.detail,
                              }}
                              style={{
                                height: 90,
                                overflow: 'auto',
                                border: '1px solid #CACACA',
                                borderRadius: 8,
                                padding: 8,
                              }}
                            ></div>
                          </FormItem>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={12} xs={24}>
                          <IsoWidgetsWrapper>
                            <FormItem
                              {...formItemLayout}
                              label={'Card Number'}
                              name="card_number"
                              normalize={(e) =>
                                !/^-?\d*(\.\d*)?$/.test(e) ? e.slice(0, -1) : e
                              }
                              rules={[
                                {
                                  required: true,
                                  message: 'Please enter card number',
                                },
                              ]}
                            >
                              <Input
                                size="large"
                                placeholder="Enter Here"
                                maxLength={16}
                              />
                            </FormItem>
                          </IsoWidgetsWrapper>
                        </Col>

                        <Col
                          className="ml-auto expiryDateColumn"
                          lg={10}
                          md={12}
                          xs={24}
                        >
                          <IsoWidgetsWrapper>
                            <FormItem
                              label={'Expiry Date'}
                              labelCol={{
                                xs: { span: 24 },
                                sm: { span: 6 },
                                md: { span: 8 },
                                lg: { span: 5 },
                              }}
                            >
                              <FormItem
                                name="exp_month"
                                className="exportSelectInput"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please select a expiry month',
                                  },
                                ]}
                              >
                                <Select size="large" placeholder="MM">
                                  {Months.map((item, index) => (
                                    <SelectOption key={item} value={item}>
                                      {item}
                                    </SelectOption>
                                  ))}
                                </Select>
                              </FormItem>
                              <FormItem
                                name="exp_year"
                                className="exportSelectInput"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please select a expiry year',
                                  },
                                ]}
                              >
                                <Select size="large" placeholder="YYYY">
                                  {years.map((item, index) => (
                                    <SelectOption key={item} value={item}>
                                      {item}
                                    </SelectOption>
                                  ))}
                                </Select>
                              </FormItem>
                            </FormItem>
                          </IsoWidgetsWrapper>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} xs={24} className="subscribeNameCard">
                          <FormItem
                            {...formItemLayout}
                            label={'Name on Card'}
                            name="name_on_card"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter name',
                              },
                            ]}
                          >
                            <Input size="large" placeholder="Enter Here" />
                          </FormItem>
                        </Col>
                        <Col md={12} xs={24}>
                          <FormItem
                            {...formItemLayout}
                            label={'CVV'}
                            name="cvv"
                            normalize={(e) =>
                              !/^-?\d*(\.\d*)?$/.test(e) ? e.slice(0, -1) : e
                            }
                            rules={[
                              {
                                required: true,
                                message: 'Please enter cvv',
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="Enter Here"
                              maxLength={3}
                            />
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={24}>
                          <IsoWidgetsWrapper>
                            <FormItem
                              label={'Billing Address'}
                              name="billing_address"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please enter billing address',
                                },
                              ]}
                              labelCol={{
                                xs: { span: 24 },
                                sm: { span: 6 },
                                md: { span: 4 },
                              }}
                              wrapperCol={{
                                xs: { span: 24 },
                                sm: { span: 18 },
                                md: { span: 20 },
                              }}
                            >
                              <Input size="large" placeholder="Enter Here" />
                            </FormItem>
                          </IsoWidgetsWrapper>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="subscribeCityDropdown" md={12} xs={24}>
                          <IsoWidgetsWrapper>
                            <FormItem
                              {...formItemLayout}
                              label={'City'}
                              name="city"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please enter city',
                                },
                              ]}
                            >
                              <Input size="large" placeholder="Enter Here" />
                            </FormItem>
                          </IsoWidgetsWrapper>
                        </Col>
                        <Col md={12} xs={24}>
                          <IsoWidgetsWrapper>
                            <FormItem
                              {...formItemLayout}
                              label={'State'}
                              name="state"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please enter state',
                                },
                              ]}
                            >
                              <Select
                                placeholder="Select"
                                size="large"
                                style={{ width: '100%' }}
                                onChange={this.handleChange}
                                className="exportSelectInput"
                              >
                                {StatesList.map((state) => (
                                  <SelectOption
                                    value={state.name}
                                    key={state.name}
                                  >
                                    {state.name}
                                  </SelectOption>
                                ))}
                              </Select>
                            </FormItem>
                          </IsoWidgetsWrapper>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} xs={24}>
                          <IsoWidgetsWrapper>
                            <FormItem
                              {...formItemLayout}
                              label={'Zip Code'}
                              name="zip_code"
                              normalize={(e) =>
                                !/^-?\d*(\.\d*)?$/.test(e) ? e.slice(0, -1) : e
                              }
                              rules={[
                                {
                                  required: true,
                                  message: 'Please enter zip code',
                                },
                              ]}
                            >
                              <Input
                                size="large"
                                placeholder="Enter Here"
                                maxLength={6}
                              />
                            </FormItem>
                          </IsoWidgetsWrapper>
                        </Col>
                      </Row>
                    </Box>
                  </Form>
                </Col>
              </Row>
            </Col>
          </LayoutContent>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  LOSubscriptionPlans: state.subscription.LOSubscriptionPlans,
  LOSubscription: state.subscription.LOSubscription,
});

const mapDispatchToProps = (dispatch) => ({
  subscribePlan: (payload) => dispatch(subscribePlan(payload)),
  getAllSubscriptionPlan: () => dispatch(getAllSubscriptionPlan()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Subscribe)
);
