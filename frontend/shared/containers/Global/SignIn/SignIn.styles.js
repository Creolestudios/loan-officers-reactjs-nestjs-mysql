import styled from 'styled-components';
import { palette } from 'styled-theme';
import bgImage from '@iso/assets/images/sign.png';

const SignInStyleWrapper = styled.div`
  .isoLoginContentWrapper {
    position: relative;
    height: 100vh;

    &:after {
      content: '';
      position: absolute;
      background-image: url(${bgImage});
      background-position: center right;
      background-size: 80% auto;
      background-repeat: no-repeat;
      top: 0;
      right: 0;
      z-index: -2;
      width: 100%;
      height: 100%;
    }

    .isoLoginContent {
      width: 50%;
      height: 100%;
      z-index: 10;
      min-height: 100%;
      position: relative;
      padding: 90px 40px;
      display: flex;
      flex-wrap: wrap;

      .isoLogoWrapper {
        width: 100%;
        display: flex;
        margin-bottom: 50px;
        justify-content: center;
        flex-shrink: 0;

        a {
          font-size: 24px;
          font-weight: 300;
          line-height: 1;
          text-transform: uppercase;
          color: ${palette('secondary', 2)};
        }
      }

      .isoSignInForm {
        width: 100%;

        .formWrapper {
          margin: 0 auto;

          .isoFormHeadText {
            text-align: center;
            margin-bottom: 40px;
          }

          .isoInputWrapper {
            margin-bottom: 20px;
            max-width: 325px;
            margin-left: auto;
            margin-right: auto;
            position: relative;

            &:last-of-type {
              margin-bottom: 0;
            }

            input {
              &::-webkit-input-placeholder {
                color: ${palette('label', 0)};
              }

              &:-moz-placeholder {
                color: ${palette('label', 0)};
              }

              &::-moz-placeholder {
                color: ${palette('label', 0)};
              }
              &:-ms-input-placeholder {
                color: ${palette('label', 0)};
              }
            }
          }

          .ant-form-item-explain {
            position: absolute;
            bottom: -23px;
            left: 0;
            width: 100%;
          }
          .password-form-item {
            .ant-form-item-explain {
              position: relative;
              bottom: 0;
            }
          }

          .submitbtnwrapper {
            text-align: center;
            margin-top: 80px;
          }
        }

        .isoHelperWrapper {
          margin-top: 20px;
          .ant-typography {
            color: ${palette('label', 0)};
          }
          a {
            color: ${palette('color', 14)};
            font-weight: 700;

            &:hover {
              color: ${palette('color', 15)};
            }
          }
        }

        .isoForgotPass {
          font-size: 14px;
          color: ${palette('color', 14)};
          text-decoration: none;

          &:hover {
            color: ${palette('color', 15)};
          }
        }

        button {
          font-weight: 500;
        }
      }
    }

    @media only screen and (max-width: 1600px) {
      &:after {
        background-size: 75% auto;
      }
    }

    @media only screen and (max-width: 767px) {
      height: 100%;
      &:after {
        display: none;
      }
      .isoLoginContent {
        width: 100%;
        .isoSignInForm {
          .formWrapper {
            .isoFormHeadText {
              margin-bottom: 20px;
            }
            .submitbtnwrapper {
              margin-top: 40px;
            }
          }
        }
      }
    }

    @media only screen and (max-width: 480px) {
      .isoLoginContent {
        padding: 60px 20px;
      }
    }
  }
`;
const SignInAdminStyleWrapper = styled(SignInStyleWrapper)``;

export { SignInStyleWrapper, SignInAdminStyleWrapper };
