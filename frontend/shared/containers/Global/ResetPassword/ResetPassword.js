import React from 'react';
import { Form } from 'antd';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppConstant, PasswordStrengthRegex } from '@iso/config/constant';
import Input from '@iso/components/uielements/input';
import Label from '@iso/components/uielements/label';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import ResetPasswordStyleWrapper from './ResetPassword.styles';
import authAction from '@iso/redux/auth/actions';
import Image from '@iso/ui/Image/Image';
import logoBlack from '@iso/assets/images/lontack-logo-black.png';

const { resetPassword, checkAuthorization } = authAction;

const FormItem = Form.Item;

export default function () {
  const authFlag = useSelector((state) => state.Auth.authFlag);
  // STATE
  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  // REDIRECTION CHECK FOR LOGGED IN
  React.useEffect(() => {
    dispatch(checkAuthorization());
    if (authFlag) {
      setRedirectToReferrer(true);
    }
  }, []);

  let { from } = location.state || {
    from: { pathname: '/portal/dashboard/home' },
  };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  function onFinish(value) {
    let searchParams = new URLSearchParams(history.location.search);
    let email = searchParams.get('email');
    let code = parseInt(searchParams.get('code'));
    let payload = {
      email,
      code,
      password: value.password,
    };
    dispatch(resetPassword(payload, history));
  }
  return (
    <ResetPasswordStyleWrapper className="isoResetPassPage">
      <div className="isoFormContentWrapper">
        <div className="isoFormContent">
          <div className="isoLogoWrapper">
            <Link to={`/portal/signin`}>
              <Image src={logoBlack} alt="logo-black" />
            </Link>
          </div>

          <div className="isoResetpassForm">
            <div className="formWrapper">
              <div className="isoFormHeadText">
                <h3>
                  <IntlMessages id="page.resetPassSubTitle" />
                </h3>
              </div>

              <Form onFinish={onFinish}>
                <div className="isoInputWrapper">
                  <Label>New Password</Label>
                  <FormItem
                    name="password"
                    className="password-form-item"
                    rules={[
                      {
                        required: true,
                        message: AppConstant.FormValidation.passwordRequired,
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
                      autoComplete="false"
                    />
                  </FormItem>
                </div>

                <div className="isoInputWrapper">
                  <Label>Confirm Password</Label>
                  <FormItem
                    name="confirm_password"
                    dependencies={['password']}
                    rules={[
                      {
                        required: true,
                        message: AppConstant.FormValidation.confirmPassword,
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue('password') === value) {
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
                      autoComplete="false"
                    />
                  </FormItem>
                </div>

                <div className="isoInputWrapper submitbtnwrapper">
                  <Button type="primary" htmlType="submit">
                    <IntlMessages id="page.resetPassSave" />
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div className="isoBgImageWrapper"></div>
    </ResetPasswordStyleWrapper>
  );
}
