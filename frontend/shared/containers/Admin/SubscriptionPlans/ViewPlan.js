import React, { Component } from 'react';
import { Form, Typography } from 'antd';
import IntlMessages from '@iso/components/utility/intlMessages';
import LayoutHeaderActionWrapper from '@iso/components/utility/layoutHeaderActionWrapper';
import HeaderBreadCrumb, {
  DisabledLinkText,
} from '@iso/components/utility/headerBreadCrumb';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import Box from '@iso/components/utility/box';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import subscriptionAction from '@iso/redux/Admin/SubscriptionPlan/action';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';

const { viewSubscriptionPlan } = subscriptionAction;
const { Title, Text } = Typography;
const FormItem = Form.Item;

class ViewSubscriptionPlan extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.viewSubscriptionPlan({
      id: this.props?.match?.params?.id,
    });
  }

  render() {
    const data = this.props?.SubscriptionPlan;
    return (
      <React.Fragment>
        <LayoutHeaderWrapper>
          <LayoutHeaderActionWrapper>
            <HeaderBreadCrumb>
              <DisabledLinkText to={`/admin/dashboard/subscription-plans`}>
                <IntlMessages id="page.subscriptionPlans" />
              </DisabledLinkText>
              <Title level={2}>View</Title>
            </HeaderBreadCrumb>
          </LayoutHeaderActionWrapper>
        </LayoutHeaderWrapper>
        <LayoutContentWrapper className="subscriptionViewPlan">
          <Box>
            <Form onFinish={this.handleSave} ref={this.formRef}>
              <div className="subscriptionViewPlanContent">
                <FormItem label={'Plan Name'}>
                  {data?.plan_name || '--'}
                </FormItem>

                <FormItem label={'Subscription Fee'}>
                  {`$${data?.plan_fees || 0} `}
                </FormItem>

                <FormItem label={'Plan Details'}>
                  <ul style={{ paddingLeft: '0' }}>
                    <li style={{ padding: '0' }}>
                      <div className="ql-snow">
                        <div
                          className="ql-editor"
                          style={{ padding: '0' }}
                          dangerouslySetInnerHTML={{
                            __html: data?.plan_details || '--',
                          }}
                        ></div>
                      </div>
                    </li>
                  </ul>
                </FormItem>
              </div>
            </Form>
          </Box>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  SubscriptionPlan: state.AdminSubscriptioPlan.SubscriptionPlan,
});

const mapDispatchToProps = (dispatch) => ({
  viewSubscriptionPlan: (payload) => dispatch(viewSubscriptionPlan(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViewSubscriptionPlan)
);
