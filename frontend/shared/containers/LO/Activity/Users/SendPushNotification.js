import React, { Component } from 'react';
import { Row, Col, Form, Typography } from 'antd';
import HeaderBreadCrumb, {
  DisabledLinkText,
} from '@iso/components/utility/headerBreadCrumb';
import Button from '@iso/components/uielements/button';
import IsoWidgetsWrapper from '@iso/containers/Global/Common/WidgetsWrapper';
import basicStyle from '@iso/assets/styles/constants';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import LayoutHeaderActionWrapper from '@iso/components/utility/layoutHeaderActionWrapper';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import usersAction from '@iso/redux/usersActivity/action';
import { Textarea } from '@iso/components/uielements/input';
import Box from '@iso/components/utility/box';

const { sendPushNotification } = usersAction;
const { Title } = Typography;
const FormItem = Form.Item;

const formItemLayout = {
  wrapperCol: {
    lg: { span: 24 },
  },
};

class SendPushNotificaton extends Component {
  handleSubmit = (data) => {
    this.props.sendPushNotification({
      message: data?.m_s_g,
    });
  };

  render() {
    const { rowStyle, colStyle } = basicStyle;
    return (
      <React.Fragment>
        <LayoutHeaderWrapper>
          <LayoutHeaderActionWrapper>
            <HeaderBreadCrumb>
              <DisabledLinkText to={`/portal/dashboard/activity/users`}>
                Users
              </DisabledLinkText>
              <Title level={2}>Send Push Notification</Title>
            </HeaderBreadCrumb>
          </LayoutHeaderActionWrapper>
        </LayoutHeaderWrapper>
        <LayoutContentWrapper>
          <div className="userPushNotification">
            <LayoutContent>
              <Title level={4} className="commonWidgetTitle">
                Message
              </Title>
              <Row style={rowStyle} gutter={0} justify="start">
                <Col xs={24}>
                  <Form onFinish={this.handleSubmit} ref={this.formRef}>
                    <Box
                      className="cal-disclaimer"
                      footer={
                        <Button type="primary" htmlType="submit">
                          SEND
                        </Button>
                      }
                    >
                      <IsoWidgetsWrapper>
                        <FormItem
                          {...formItemLayout}
                          name="m_s_g"
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: 'Please enter message',
                            },
                          ]}
                        >
                          <Textarea
                            style={{ resize: 'none' }}
                            rows={4}
                            placeholder="Enter Here"
                          />
                        </FormItem>
                      </IsoWidgetsWrapper>
                    </Box>
                  </Form>
                </Col>
              </Row>
            </LayoutContent>
          </div>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendPushNotification: (payload) => dispatch(sendPushNotification(payload)),
});

export default withRouter(
  connect(null, mapDispatchToProps)(SendPushNotificaton)
);
