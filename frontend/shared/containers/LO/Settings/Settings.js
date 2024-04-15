import React from 'react';
import { Row, Col, Form, Typography, Divider } from 'antd';
import Button from '@iso/components/uielements/button';
import Input from '@iso/components/uielements/input';
import cloneDeep from 'lodash/cloneDeep';
import { useDispatch, useSelector } from 'react-redux';
import IsoWidgetsWrapper from '@iso/containers/Global/Common/WidgetsWrapper';
import basicStyle from '@iso/assets/styles/constants';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import IntlMessages from '@iso/components/utility/intlMessages';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import Switch from '@iso/components/uielements/switch';
import Box from '@iso/components/utility/box';
import { AppConstant, PasswordStrengthRegex } from '@iso/config/constant';

import authAction from '@iso/redux/auth/actions';
const {
  changePassword,
  changeReport,
  getReport,
  getNotification,
  changeNotification,
} = authAction;
const { Title } = Typography;
const FormItem = Form.Item;

export default function Setting() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const userReport = useSelector((state) => state.Auth.userReport);
  const userNotification = useSelector((state) => state.Auth.userNotification);

  function onFinish(value) {
    let payload = {
      password: value.current_password,
      new_password: value.password,
    };
    dispatch(changePassword(payload));
    form.resetFields();
  }

  React.useEffect(() => {
    dispatch(getReport());
    dispatch(getNotification());
  }, []);

  const handleChange = (value, name) => {
    const newPayload = cloneDeep(userReport);
    newPayload[name] = value;
    dispatch(changeReport(newPayload));
  };

  const handleChangeForNotification = (value, name) => {
    const newPayload = cloneDeep(userNotification);
    newPayload[name] = value;
    dispatch(changeNotification(newPayload));
  };

  const { rowStyle, colStyle } = basicStyle;

  return (
    <React.Fragment>
      <LayoutHeaderWrapper>
        <Title level={2}>Settings</Title>
      </LayoutHeaderWrapper>
      <Row justify="start">
        <Col lg={12} md={24} sm={24} xs={24}>
          <LayoutContentWrapper className="commonSettingsDiv">
            <LayoutContent className="passwordSettings">
              <Row style={rowStyle} gutter={0} justify="start">
                <Col lg={24} md={24} sm={24} xs={24}>
                  <IsoWidgetsWrapper>
                    <Title level={3}>Password Settings</Title>
                    <Form onFinish={onFinish} form={form}>
                      <div className="passwordsWrapper">
                        <Row gutter={[20]}>
                          <Col xs={24} md={12} lg={24}>
                            <FormItem
                              label={'Current Password'}
                              name="current_password"
                              className="password-form-item"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    AppConstant.FormValidation.passwordRequired,
                                },
                              ]}
                              labelCol={{
                                xs: { span: 24 },
                                lg: { span: 9 },
                                xl: { span: 8 },
                              }}
                              wrapperCol={{
                                xs: { span: 24 },
                                lg: { span: 15 },
                                xl: { span: 16 },
                              }}
                            >
                              <Input
                                size="large"
                                type="password"
                                placeholder={AppConstant.Placeholder.enterHere}
                                autoComplete="false"
                              />
                            </FormItem>
                          </Col>
                          <Col xs={24} md={12} lg={24}>
                            <FormItem
                              label={'New Password'}
                              name="password"
                              className="password-form-item"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    AppConstant.FormValidation.passwordRequired,
                                },
                                {
                                  pattern: PasswordStrengthRegex,
                                  message:
                                    AppConstant.FormValidation.passwordValid,
                                },
                              ]}
                              labelCol={{
                                xs: { span: 24 },
                                lg: { span: 9 },
                                xl: { span: 8 },
                              }}
                              wrapperCol={{
                                xs: { span: 24 },
                                lg: { span: 15 },
                                xl: { span: 16 },
                              }}
                            >
                              <Input
                                size="large"
                                type="password"
                                placeholder={AppConstant.Placeholder.enterHere}
                                autoComplete="false"
                              />
                            </FormItem>
                          </Col>
                          <Col xs={24} md={12} lg={24}>
                            <FormItem
                              label={'Confirm Password'}
                              name="confirm_password"
                              dependencies={['password']}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    AppConstant.FormValidation.confirmPassword,
                                },
                                ({ getFieldValue }) => ({
                                  validator(rule, value) {
                                    if (
                                      !value ||
                                      getFieldValue('password') === value
                                    ) {
                                      return Promise.resolve();
                                    }

                                    return Promise.reject(
                                      AppConstant.FormValidation.passwordMatch
                                    );
                                  },
                                }),
                              ]}
                              labelCol={{
                                xs: { span: 24 },
                                lg: { span: 9 },
                                xl: { span: 8 },
                              }}
                              wrapperCol={{
                                xs: { span: 24 },
                                lg: { span: 15 },
                                xl: { span: 16 },
                              }}
                            >
                              <Input
                                size="large"
                                type="password"
                                placeholder={AppConstant.Placeholder.enterHere}
                                autoComplete="false"
                              />
                            </FormItem>
                          </Col>
                        </Row>
                      </div>
                      <div className="isoInputWrapper submitbtnwrapper">
                        <Button type="primary" htmlType="submit">
                          <IntlMessages id="page.resetPassSave" />
                        </Button>
                      </div>
                    </Form>
                  </IsoWidgetsWrapper>
                </Col>
              </Row>
            </LayoutContent>
          </LayoutContentWrapper>
        </Col>
        <Col lg={12} md={24} sm={24} xs={24} style={colStyle}>
          <LayoutContentWrapper className="passwordSettingsDiv">
            <Box title="Notification Settings">
              <Row gutter={[20]} justify="start">
                <Col lg={20} sm={9} xs={18} style={colStyle}>
                  Direct Message
                </Col>
                <Col lg={4} sm={3} xs={6} style={colStyle}>
                  <div className="ml-auto w-content">
                    <Switch
                      checked={userNotification?.direct_message}
                      onChange={(value) =>
                        handleChangeForNotification(value, 'direct_message')
                      }
                    />
                  </div>
                </Col>
                <Col lg={20} sm={9} xs={18} style={colStyle}>
                  Documents Upload
                </Col>
                <Col lg={4} sm={3} xs={6} style={colStyle}>
                  <div className="ml-auto w-content">
                    <Switch
                      checked={userNotification?.document_upload}
                      onChange={(value) =>
                        handleChangeForNotification(value, 'document_upload')
                      }
                    />
                  </div>
                </Col>
                <Col lg={20} sm={9} xs={18} style={colStyle}>
                  Application downloaded from your link
                </Col>
                <Col lg={4} sm={3} xs={6} style={colStyle}>
                  <div className="ml-auto w-content">
                    <Switch
                      checked={userNotification?.app_download_from_link}
                      onChange={(value) =>
                        handleChangeForNotification(
                          value,
                          'app_download_from_link'
                        )
                      }
                    />
                  </div>
                </Col>
              </Row>
            </Box>
          </LayoutContentWrapper>{' '}
          <LayoutContentWrapper className="passwordSettingsDiv">
            <Box title="Reports">
              <Row gutter={[20]} justify="start">
                <Col lg={20} sm={9} xs={18} style={colStyle}>
                  Daily Reports
                </Col>
                <Col lg={4} sm={3} xs={6} style={colStyle}>
                  <div className="ml-auto w-content">
                    <Switch
                      checked={userReport?.daily_report}
                      onChange={(value) => handleChange(value, 'daily_report')}
                    />
                  </div>
                </Col>
                <Col lg={20} sm={9} xs={18} style={colStyle}>
                  Weekly Reports
                </Col>
                <Col lg={4} sm={3} xs={6} style={colStyle}>
                  <div className="ml-auto w-content">
                    <Switch
                      checked={userReport?.weekly_report}
                      onChange={(value) => handleChange(value, 'weekly_report')}
                    />
                  </div>
                </Col>
              </Row>
            </Box>
          </LayoutContentWrapper>{' '}
        </Col>
      </Row>
    </React.Fragment>
  );
}
