import React from 'react';
import { Form } from 'antd';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppConstant } from '@iso/config/constant';
import Label from '@iso/components/uielements/label';
import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import ForgotPasswordStyleWrapper from './ForgotPassword.styles';
import authAction from '@iso/redux/auth/actions';
import Image from '@iso/ui/Image/Image';
import logoBlack from '@iso/assets/images/lontack-logo-black.png';

const { forgotPassword, checkAuthorization } = authAction;

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
    from: { pathname: `/admin/dashboard/home` },
  };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  function onFinish(value) {
    let payload = {
      email: value.email,
      is_admin: true,
    };
    dispatch(forgotPassword(payload, history));
  }
  return (
    <ForgotPasswordStyleWrapper className="isoForgotPassPage">
      <div className="isoFormContentWrapper">
        <div className="isoFormContent">
          <div className="isoLogoWrapper">
            <Link to={`/admin/signin`}>
              <Image src={logoBlack} alt="logo-black" />
            </Link>
          </div>
          <div className="isoForgotPassForm">
            <div className="formWrapper">
              <div className="isoFormHeadText">
                <h3>
                  <IntlMessages id="page.forgetPassSubTitle" />
                </h3>
              </div>
              <Form onFinish={onFinish}>
                <div className="isoInputWrapper">
                  <Label>Email</Label>
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
                      placeholder={AppConstant.Placeholder.email}
                    />
                  </FormItem>
                </div>

                <div className="isoInputWrapper submitbtnwrapper">
                  <Button type="primary" htmlType="submit">
                    <IntlMessages id="button.proceed" />
                  </Button>
                </div>
                <div className="isoInputWrapper cancelbtn">
                  <Link to={`/admin/signin`}>
                    <Button>
                      <IntlMessages id="button.cancel" />
                    </Button>
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </ForgotPasswordStyleWrapper>
  );
}
