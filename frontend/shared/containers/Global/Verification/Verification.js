import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SpinCustom } from '@iso/components/uielements/spin';
import Label from '@iso/components/uielements/label';
import OtpInput from 'react-otp-input';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import { VerificationStyleWrapper } from './Verification.styles';
import authAction from '@iso/redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import Image from '@iso/ui/Image/Image';
import logoBlack from '@iso/assets/images/lontack-logo-black.png';

const { verify, resend } = authAction;

export default function Verification(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const userEmail = useSelector((state) => state.Auth.userEmail);
  const globalLoader = useSelector((state) => state.App.globalLoader);
  const st = useSelector((s) => s);
  // STATE
  const [otp, setotp] = React.useState('');

  const handleChange = (otp) => {
    setotp(otp);
  };
  const handleResend = () => {
    let searchParams = new URLSearchParams(history.location.search);
    let email = searchParams.get('email');
    let type = searchParams.get('type');
    let payload = {
      email,
      type,
    };
    dispatch(resend(payload));
  };

  const handleVerification = () => {
    let searchParams = new URLSearchParams(history.location.search);
    let email = searchParams.get('email');
    let type = searchParams.get('type');
    if (email) {
      let payload = {
        email,
        code: parseInt(otp),
        type,
      };
      if (searchParams.get('type') === 'reset') {
        history.replace({ state: '' });
      }
      dispatch(verify(payload, history));
    }
  };

  return (
    <SpinCustom spinning={globalLoader > 0}>
      <VerificationStyleWrapper className="isoVerificationPage">
        <div className="isoVerificationContentWrapper">
          <div className="isoVerificationContent">
            <div className="isoLogoWrapper">
              <Link to={`/portal/signin`}>
                <Image src={logoBlack} alt="logo-black" />
              </Link>
            </div>
            <div className="isoVerificationForm">
              <div className="formWrapper">
                <div className="isoFormHeadText">
                  <h3>Verification Code</h3>
                </div>
                <form>
                  <div className="verificationCodeWrapper">
                    <Label>Enter Verification Code</Label>
                    <OtpInput
                      value={otp}
                      onChange={handleChange}
                      numInputs={6}
                      separator={<span>-</span>}
                      inputStyle="isoVerificationInput"
                    />
                  </div>
                  <div className="isoInputWrapper isoLeftRightComponent">
                    <Button
                      type="primary"
                      onClick={handleVerification}
                      className={`${otp.length == 6 ? '' : 'disabled'}`}
                    >
                      <IntlMessages id="page.verificationButton" />
                    </Button>
                  </div>

                  <div className="osoBtnWrapper">
                    <a className="isoresend" onClick={handleResend}>
                      <IntlMessages id="page.verificationPreview" />
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="isoBgImageWrapper"></div>
      </VerificationStyleWrapper>
    </SpinCustom>
  );
}
