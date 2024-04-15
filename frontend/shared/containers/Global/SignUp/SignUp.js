import React from 'react';
import { Form, Row, Col, Typography, Divider } from 'antd';
import Select, { SelectOption } from '@iso/components/uielements/select';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InputMask from 'react-input-mask';
import { SpinCustom } from '@iso/components/uielements/spin';
import {
  AppConstant,
  NameRegex,
  PasswordStrengthRegex,
  PhoneNumberMaskRegex,
} from '@iso/config/constant';
import Modal from '@iso/components/uielements/modal';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import Label from '@iso/components/uielements/label';
import logoBlack from '@iso/assets/images/lontack-logo-black.png';
import basicStyle from '@iso/assets/styles/constants';
import Button from '@iso/components/uielements/button';
import authAction from '@iso/redux/auth/actions';
import appActions from '@iso/redux/app/actions';
import IntlMessages from '@iso/components/utility/intlMessages';
import Image from '@iso/ui/Image/Image';
import SignUpStyleWrapper from './SignUp.styles';

const { signup, checkAuthorization } = authAction;
const { clearMenu } = appActions;
const FormItem = Form.Item;
const { Text, Title } = Typography;

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  // STATE
  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [form] = Form.useForm();

  const globalLoader = useSelector((state) => state.App.globalLoader);
  const authFlag = useSelector((state) => state.Auth.authFlag);

  // REDIRECTION CHECK FOR LOGGED IN
  React.useEffect(() => {
    dispatch(checkAuthorization());
    if (authFlag) {
      setRedirectToReferrer(true);
    }
  }, []);

  let { from } = location.state || {
    from: { pathname: '/portal/app-settings/profile' },
  };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  const handleLogin = (data) => {
    let payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      role: 2,
      contact_code: data.prefix,
      contact_number: +data.contact.replace(/[\(\)\s\-'"]/g, ''),
      company_name: data.company_name,
    };

    dispatch(signup(payload, history));
    dispatch(clearMenu());
  };

  const checkCheckBox = (rule, value, callback) => {
    if (!value) {
      callback('Please agree the terms and conditions!');
    } else {
      callback();
    }
  };

  const showModal = () => {
    setVisible(true);
    form.setFieldsValue({
      terms_condition: !form.getFieldsValue('terms_condition'),
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const { rowStyle, colStyle } = basicStyle;

  return (
    <SpinCustom spinning={globalLoader > 0}>
      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoLogoWrapper">
              <Link to={`/portal/signin`}>
                <Image src={logoBlack} alt="logo-black" />
              </Link>
            </div>
            <div className="isoSignUpForm">
              <div className="formWrapper">
                <div className="isoFormHeadText">
                  <h3>Sign Up</h3>
                </div>
                <Form
                  className="signup"
                  form={form}
                  onFinish={handleLogin}
                  initialValues={{
                    prefix: '+1',
                  }}
                >
                  <Row gutter={20}>
                    <Col xs={24} lg={12} style={colStyle}>
                      <Label>
                        <IntlMessages id="form.profile.firstName" />
                      </Label>
                      <FormItem
                        name="first_name"
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              AppConstant.FormValidation.firstnameRequired,
                          },
                          {
                            pattern: NameRegex,
                            message: AppConstant.FormValidation.nameValid,
                          },
                        ]}
                      >
                        <Input size="large" placeholder="Enter Here" />
                      </FormItem>
                    </Col>
                    <Col xs={24} lg={12} style={colStyle}>
                      <Label>
                        <IntlMessages id="form.profile.lastName" />
                      </Label>
                      <FormItem
                        name="last_name"
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              AppConstant.FormValidation.lastnameRequired,
                          },
                          {
                            pattern: NameRegex,
                            message: AppConstant.FormValidation.nameValid,
                          },
                        ]}
                      >
                        <Input size="large" placeholder="Enter Here" />
                      </FormItem>
                    </Col>
                    <Col xs={24} lg={12} style={colStyle}>
                      <Label>Company Name</Label>
                      <FormItem
                        name="company_name"
                        rules={[
                          {
                            required: true,
                            message: AppConstant.FormValidation.companyRequired,
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder={AppConstant.Placeholder.enterHere}
                        />
                      </FormItem>
                    </Col>
                  </Row>

                  <Row gutter={20}>
                    <Col xs={24} lg={12} style={colStyle}>
                      <Label>Email Address</Label>
                      <FormItem
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: AppConstant.FormValidation.emailRequired,
                          },
                          {
                            type: 'email',
                            message: AppConstant.FormValidation.emailInvalid,
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="abc@xyz.com"
                          autoComplete="true"
                        />
                      </FormItem>
                    </Col>
                    {/* Phonenumber + country code */}
                    <Col xs={24} lg={12} style={colStyle}>
                      <Label>Contact Number</Label>
                      <div className="phoneNumberCodeWrapper">
                        <Form.Item className="phoneCountryCode" name="prefix">
                          <Select
                            style={{
                              width: 50,
                            }}
                            size="large"
                            value="+1"
                          >
                            <SelectOption value="+1">+1</SelectOption>
                          </Select>
                        </Form.Item>
                        <FormItem
                          name="contact"
                          rules={[
                            {
                              required: true,
                              message:
                                AppConstant.FormValidation.numberRequired,
                            },
                            {
                              pattern: PhoneNumberMaskRegex,
                              message: AppConstant.FormValidation.numberOnly,
                            },
                          ]}
                          className="phoneNumberWraper"
                        >
                          <InputMask
                            mask={'(999) 999-9999'}
                            autoComplete="off"
                            placeholder={AppConstant.Placeholder.enterHere}
                            size="large"
                          >
                            {(inputProps) => {
                              return <Input {...inputProps} />;
                            }}
                          </InputMask>
                        </FormItem>
                      </div>
                    </Col>
                  </Row>

                  <Row gutter={20}>
                    <Col xs={24} lg={12} style={colStyle}>
                      <Label>Password</Label>
                      <FormItem
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
                            message: AppConstant.FormValidation.passwordValid,
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          type="password"
                          placeholder={AppConstant.Placeholder.enterHere}
                        />
                      </FormItem>
                    </Col>
                    <Col xs={24} lg={12} style={colStyle}>
                      <Label>Confirm Password</Label>
                      <FormItem
                        name="confirm"
                        dependencies={['password']}
                        rules={[
                          {
                            required: true,
                            message: AppConstant.FormValidation.confirmPassword,
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
                      >
                        <Input
                          size="large"
                          type="password"
                          placeholder={AppConstant.Placeholder.enterHere}
                        />
                      </FormItem>
                    </Col>
                  </Row>

                  <div className="isoInputWrapper">
                    <Checkbox>
                      <IntlMessages id="page.createbrandedApp" />
                    </Checkbox>
                  </div>
                  <div className="isoInputWrapper">
                    <FormItem
                      name="terms_condition"
                      rules={[
                        {
                          required: true,
                          transform: (value) => value || undefined,
                          type: 'boolean',
                          message: AppConstant.FormValidation.terms_condition,
                        },
                      ]}
                      valuePropName="checked"
                    >
                      <Checkbox>
                        <Text>
                          <IntlMessages id="page.signUpTermsConditions" />
                        </Text>
                        &nbsp;
                        <Text
                          className="isoTermConditionTextWrapper"
                          onClick={showModal}
                        >
                          <IntlMessages id="page.termsConditions" />
                        </Text>
                      </Checkbox>
                    </FormItem>
                    <Modal
                      visible={visible}
                      onCancel={handleCancel}
                      width={900}
                      footer={null}
                    >
                      <div>
                        <Title level={3}>Terms and Conditions</Title>
                        <Divider />
                      </div>
                      <span style={{ padding: 24, color: '#1F2428' }}>
                        .
                        <span style={{ padding: 5 }}>
                          Terms of service are the legal agreements between a
                          service provider and a person who wants to use that
                          service.
                        </span>
                        <br />
                        <br />
                      </span>
                      <span style={{ padding: 24, color: '#1F2428' }}>
                        .
                        <span style={{ padding: 5 }}>
                          The person must agree to abide by the terms of service
                          in order to use the offered service.
                        </span>
                        <br />
                        <br />
                      </span>
                      <span style={{ padding: 24, color: '#1F2428' }}>
                        .
                        <span style={{ padding: 5 }}>
                          Terms of service are the legal agreements between a
                          service provider and a person who wants to use that
                          service.
                        </span>
                        <br />
                        <br />
                      </span>
                    </Modal>
                  </div>

                  <div className="isoInputWrapper submitbtnwrapper">
                    <Button type="primary" htmlType="submit">
                      <IntlMessages id="page.signUpButton" />
                    </Button>
                  </div>

                  <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
                    <Text>
                      <IntlMessages id="page.signUpAlreadyAccount" /> &nbsp;
                    </Text>
                    <Link to={`/portal/signin`}>Log In</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className="isoBgImageWrapper"></div>
      </SignUpStyleWrapper>
    </SpinCustom>
  );
}
