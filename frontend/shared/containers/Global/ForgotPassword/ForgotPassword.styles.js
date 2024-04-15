import styled from 'styled-components';
import { palette } from 'styled-theme';
import bgImage from '@iso/assets/images/sign.png';
import WithDirection from '@iso/lib/helpers/rtl';

const ForgotPasswordStyleWrapper = styled.div`
  .isoFormContentWrapper {
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

    .isoFormContent {
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
        margin-bottom: 70px;
        justify-content: center;

        a {
          font-size: 24px;
          font-weight: 300;
          line-height: 1;
          text-transform: uppercase;
          color: ${palette('secondary', 2)};
        }
      }

      .isoForgotPassForm {
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

          .submitbtnwrapper {
            text-align: center;
            margin-top: 50px;
          }

          .cancelbtn {
            text-align: center;
            button {
              color: ${palette('primary', 0)};
              border-color: ${palette('primary', 0)};
              &:hover {
                color: ${palette('primary', 15)};
                border-color: ${palette('primary', 15)};
              }
            }
          }
        }
      }
    }

    @media only screen and (max-width: 1600px) {
      &:after {
        background-size: 75% auto;
      }
    }

    @media only screen and (max-width: 767px) {
      &:after {
        display: none;
      }
      .isoFormContent {
        width: 100%;
        .isoForgotPassForm {
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
      .isoFormContent {
        padding: 60px 20px;
      }
    }
  }
`;

export default WithDirection(ForgotPasswordStyleWrapper);
