import React, { Component } from 'react';
import { Row, Col, Form, Typography, Divider } from 'antd';
import isEmpty from 'lodash/isEmpty';
import Button from '@iso/components/uielements/button';
import Input from '@iso/components/uielements/input';
import { TableViews } from '@iso/components/Tables/AntTables';
import { renderCell } from '@iso/components/Tables/AntTables/configs';
import Card from '../../../UI/Antd/Card/Card';
import IsoWidgetBox from '@iso/containers/Global/Common/WidgetBox';
import IsoWidgetsWrapper from '@iso/containers/Global/Common/WidgetsWrapper';
import basicStyle from '@iso/assets/styles/constants';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import IntlMessages from '@iso/components/utility/intlMessages';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import Box from '@iso/components/utility/box';
import Modal from '@iso/components/uielements/modal';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SubscriptionAction from '@iso/redux/SubscriptionsPlan/action';
import moment from 'moment';

const {
  getSubscription,
  cancelSubscription,
  subscriptionApplyPromoCode,
  GetApplyPromoCode,
} = SubscriptionAction;
const { Title } = Typography;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

class Subscription extends Component {
  state = {
    showPopup: false,
  };

  componentDidMount() {
    this.props.getSubscription();
    this.props.GetApplyPromoCode();
  }

  handleCancel = () => {
    this.setState({
      showPopup: false,
    });
  };

  handleShowPopup = () => {
    this.setState({
      showPopup: true,
    });
  };

  handleApply = (data) => {
    this.props.subscriptionApplyPromoCode({
      promoCode: data?.promo_code,
    });
  };

  handleOk = () => {
    this.props.cancelSubscription();
    this.setState({
      showPopup: false,
    });
  };

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const data = this.props?.LOSubscription ?? [];

    const { SubscriptionApplyPromoCodeList } = this.props;

    const LearningContentData = isEmpty(SubscriptionApplyPromoCodeList)
      ? []
      : SubscriptionApplyPromoCodeList.map((item, index) => ({
          key: index + 1,
          promoCodeName: item.promocode,
          discount: item.discount,
          Status: item.isActive + '',
        }));

    const LearningContentColumns = [
      {
        title: <IntlMessages id="antTable.title.promoCodeApply" />,
        key: 'promoCodeApply',
        width: 500,
        render: (object) => (
          <span style={{ display: 'flex' }}>
            {object.promoCodeName}, Discount:&nbsp;
            <p style={{ fontWeight: 800 }}>
              {this.props.SubscriptionApplyPromoCodeList[
                this.props.SubscriptionApplyPromoCodeList.findIndex(
                  (obj) => obj.promocode === object.promoCodeName
                )
              ].discountType === 0 ? (
                <>{object.discount}% </>
              ) : (
                <> ${object.discount}</>
              )}
            </p>
          </span>
        ),
        sorter: false,
      },
      {
        title: <IntlMessages id="antTable.title.Status" />,
        key: 'Status',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'Status'),
        sorter: false,
      },
    ];
    let detailOfSubScription = [];

    if (!isEmpty(data)) {
      const {
        amount_paid,
        created_at,
        payment_method,
        recurring_term,
        subscription_plan_name,
      } = Boolean(Object.keys(data).length) && data;

      detailOfSubScription = [
        ['Subscription Plan Name', subscription_plan_name || '--'],
        ['Payment Method', payment_method],
        ['Recuring Term', recurring_term],
        ['Amount', '$' + amount_paid],
        ['Date', moment(created_at).format('MMM D, YYYY - h:mma')],
      ];
    }

    return (
      <React.Fragment>
        <LayoutHeaderWrapper>
          <Title level={2}>Subscription</Title>
        </LayoutHeaderWrapper>
        <Row gutter={30} justify="start">
          <Col lg={12} md={24} sm={24} xs={24}>
            <LayoutContentWrapper className="subscriptionCurrent">
              <LayoutContent>
                <Row style={rowStyle} gutter={0} justify="start">
                  <Col lg={24} md={24} sm={24} xs={24}>
                    <Box
                      title="Current Subscription"
                      footer={
                        Boolean(Object.keys(data).length) > 0 ? (
                          <>
                            <Button
                              type="Secondry"
                              onClick={this.handleShowPopup}
                            >
                              <IntlMessages id="button.cancelSubscription" />
                            </Button>
                            <Modal
                              className="restoreDefaultsPopup"
                              visible={this.state.showPopup}
                              onOk={this.handleOk}
                              onCancel={this.handleCancel}
                            >
                              <span>
                                Are you sure want to cancel your subscription?
                              </span>
                            </Modal>
                          </>
                        ) : (
                          <Button type="Secondry" disabled>
                            <IntlMessages id="button.cancelSubscription" />
                          </Button>
                        )
                      }
                    >
                      {Object.keys(data).length > 0 ? (
                        detailOfSubScription.map((item, index) => (
                          <Row className="currentSubRow" key={index}>
                            <Col className="label" md={10} sm={8} xs={24}>
                              {item[0]}
                            </Col>
                            <Col className="value" md={14} sm={16} xs={24}>
                              {item[1]}
                            </Col>
                          </Row>
                        ))
                      ) : (
                        <span>No Subscription</span>
                      )}
                    </Box>
                  </Col>
                </Row>
              </LayoutContent>
            </LayoutContentWrapper>
          </Col>
          <Col lg={12} md={24} sm={24} xs={24}>
            <LayoutContentWrapper className="subscriptionApplyCode">
              <div className="commonWidgetBox">
                <LayoutContent>
                  <Row style={rowStyle} gutter={0} justify="start">
                    <Col lg={24} md={24} sm={24} xs={24}>
                      <Box title="Apply Promo Code">
                        <IsoWidgetsWrapper>
                          <Form onFinish={this.handleApply} ref={this.formRef}>
                            <Row className="applyPromoCode">
                              <Col span={24}>
                                <FormItem
                                  {...formItemLayout}
                                  label={'Promo Code'}
                                  name="promo_code"
                                  style={{ textAlign: 'start' }}
                                  rules={[
                                    {
                                      required: true,
                                      whitespace: true,
                                      message: 'Please enter promo code',
                                    },
                                  ]}
                                >
                                  <Input
                                    size="large"
                                    placeholder="Enter Here"
                                  />
                                </FormItem>
                                <span className="discountCodeNote">
                                  The discount of code applied shall be deducted
                                  from the next transaction
                                </span>
                              </Col>
                            </Row>
                            <Button
                              className="applyCodeBtn"
                              type="primary"
                              htmlType="submit"
                            >
                              <IntlMessages id="button.apply" />
                            </Button>
                          </Form>

                          <IsoWidgetBox>
                            <TableViews.SimpleView
                              className="promoCodeStatusTable"
                              isSelection={false}
                              columns={LearningContentColumns}
                              dataSource={LearningContentData}
                              isPaginate={false}
                            />
                          </IsoWidgetBox>
                        </IsoWidgetsWrapper>
                      </Box>
                    </Col>
                  </Row>
                </LayoutContent>
              </div>
            </LayoutContentWrapper>{' '}
          </Col>
          <Col lg={24} md={24} sm={24} xs={24}>
            <IsoWidgetsWrapper className="learnMoreOwnApp">
              <Card>
                <div className="learnMoreSec">
                  {' '}
                  Interested in having your own App in the App Store with your
                  name/company name?
                </div>
                <Link
                  to={{
                    pathname: `/portal/dashboard/brand-app`,
                  }}
                >
                  <Button type="primary">
                    <IntlMessages id="button.learnMore" />
                  </Button>
                </Link>
              </Card>
            </IsoWidgetsWrapper>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  LOSubscription: state.subscription.LOSubscription,
  SubscriptionApplyPromoCodeList:
    state.subscription.SubscriptionApplyPromoCodeList,
  profileDetails: state.Auth.profileObj,
});

const mapDispatchToProps = (dispatch) => ({
  getSubscription: () => dispatch(getSubscription()),
  GetApplyPromoCode: () => dispatch(GetApplyPromoCode()),
  cancelSubscription: () => dispatch(cancelSubscription()),
  subscriptionApplyPromoCode: (payload) =>
    dispatch(subscriptionApplyPromoCode(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Subscription)
);
