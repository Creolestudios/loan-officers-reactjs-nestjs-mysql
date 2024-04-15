import React from 'react';
import { Form } from 'antd';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import Button from '@iso/components/uielements/button';
import Label from '@iso/components/uielements/label';
import IntlMessages from '@iso/components/utility/intlMessages';
import authAction from '@iso/redux/auth/actions';
import appAction from '@iso/redux/app/actions';
import { SignInAdminStyleWrapper } from './SignIn.styles';
import { AppConstant } from '@iso/config/constant';
import { SpinCustom } from '@iso/components/uielements/spin';
import { SignInStyleWrapper } from './SignIn.styles';
import logoBlack from '@iso/assets/images/lontack-logo-black.png';

const { login, checkAuthorization } = authAction;
const { clearMenu } = appAction;

const FormItem = Form.Item;

export default function SignIn() {
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.Auth.idToken);
  const authFlag = useSelector((state) => state.Auth.authFlag);
  const globalLoader = useSelector((state) => state.App.globalLoader);

  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
  React.useEffect(() => {
    dispatch(checkAuthorization());
    if (authFlag) {
      setRedirectToReferrer(true);
    }
  }, []);

  let { from } = location.state || {
    from: { pathname: `/admin/dashboard/home` },
  };

  function onFinish(value) {
    if (value.remember_me) {
      localStorage.setItem('remember_me', value.remember_me);
    }
    let payload = {
      email: value.email,
      password: value.password,
      is_admin: true,
    };
    let from = 'admin';
    dispatch(login(payload, history, from));
    dispatch(clearMenu());
  }

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }
  return (
    <SpinCustom spinning={globalLoader > 0}>
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to={`/admin/signin`}>
                <img src={logoBlack} alt="logo-black" />
              </Link>
            </div>
            <div className="isoSignInForm">
              <div className="formWrapper">
                <div className="isoFormHeadText">
                  <h3>Login</h3>
                </div>
                <Form
                  className="signin"
                  onFinish={onFinish}
                  initialValues={{
                    remember_me: false,
                  }}
                >
                  <div className="isoInputWrapper">
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
                  </div>

                  <div className="isoInputWrapper">
                    <Label>Password</Label>
                    <FormItem
                      name="password"
                      className="password-form-item"
                      rules={[
                        {
                          required: true,
                          message: AppConstant.FormValidation.passwordRequired,
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        type="password"
                        placeholder={AppConstant.Placeholder.enterHere}
                        autoComplete="false"
                      />
                    </FormItem>
                  </div>
                  <div className="isoInputWrapper isoLeftRightComponent">
                    <FormItem name="remember_me" valuePropName="checked">
                      <Checkbox>
                        <IntlMessages id="page.signInRememberMe" />
                      </Checkbox>
                    </FormItem>
                    <Link
                      to={`/admin/forgotpassword-admin`}
                      className="isoForgotPass"
                    >
                      <IntlMessages id="page.signInForgotPass" />
                    </Link>
                  </div>

                  <div className="isoInputWrapper submitbtnwrapper">
                    <Button type="primary" htmlType="submit">
                      <IntlMessages id="page.signInButton" />
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    </SpinCustom>
  );
}
