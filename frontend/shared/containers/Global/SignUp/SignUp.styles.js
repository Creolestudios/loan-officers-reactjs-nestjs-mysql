import styled from 'styled-components';
import { palette } from 'styled-theme';
import bgImage from '@iso/assets/images/sign.png';
import WithDirection from '@iso/lib/helpers/rtl';

const SignUpStyleWrapper = styled.div`
  .isoSignUpContentWrapper {
    position: relative;
    height: 100vh;

    &:after {
      content: '';
      position: absolute;
      background-image: url(${bgImage});
      background-position: right 0px top -200px;
      background-size: 80% auto;
      background-repeat: no-repeat;
      top: 0;
      right: 0;
      z-index: -2;
      width: 100%;
      height: 100%;
    }

    .isoSignUpContent {
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

      .isoSignUpForm {
        width: 100%;

        .formWrapper {
          margin: 0 auto;

          .isoFormHeadText {
            text-align: center;
            margin-bottom: 40px;
          }

          .signup {
            .phoneNumberCodeWrapper {
              display: flex;
              .phoneCountryCode {
                .ant-form-item-control-input-content {
                  max-width: fit-content;
                }
                .ant-select-selector {
                  height: 42px;
                  border-right: none;
                  background-color: #fafafa;
                  border-radius: 5px 0 0 5px;
                }
                .ant-select-selection-item {
                  left: 2px;
                }
                .ant-select-selection-item {
                  text-overflow: initial;
                }
                .ant-select-arrow {
                  top: 50%;
                  right: 8px;
                }
              }
              .phoneNumberWraper {
                flex: 1;
              }
            }

            .ant-input-group-addon {
              border-radius: 4px;
              .ant-select-arrow {
                top: 48%;
                right: 9px;
              }
            }

            .ant-input-group-addon {
              border-top-right-radius: 0px;
              border-bottom-right-radius: 0px;
            }

            #contact {
              &.ant-input {
                border-radius: 4px;
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;
                &:focus {
                  /* border-color: ${palette('primary', 0)};
                  box-shadow: 0 0 0 2px #4fb26338; */
                }
              }
            }

            .password-form-item {
              .ant-form-item-explain {
                position: relative;
                bottom: 0;
              }
            }

            .isoInputWrapper {
              margin-bottom: 20px;
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

              .ant-checkbox-wrapper {
                .ant-typography {
                  color: ${palette('label', 0)};
                  &.isoTermConditionTextWrapper {
                    color: ${palette('color', 16)};
                  }
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
              margin-top: 80px;
            }
          }
        }

        .isoLeftRightComponent {
          input {
            width: calc(100% - 10px);

            &:first-child {
              margin-right: ${(props) =>
                props['data-rtl'] === 'rtl' ? 'inherit' : '20px'};
              margin-left: ${(props) =>
                props['data-rtl'] === 'rtl' ? '20px' : 'inherit'};
            }
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

          &.btnFacebook {
            background-color: ${palette('color', 7)};

            &:hover {
              background-color: ${palette('color', 8)};
            }
          }

          &.btnGooglePlus {
            background-color: ${palette('color', 9)};
            margin-top: 15px;

            &:hover {
              background-color: ${palette('color', 10)};
            }
          }

          &.btnAuthZero {
            background-color: ${palette('color', 11)};
            margin-top: 15px;

            &:hover {
              background-color: ${palette('color', 12)};
            }
          }

          &.btnFirebase {
            background-color: ${palette('color', 5)};
            margin-top: 15px;

            &:hover {
              background-color: ${palette('color', 6)};
            }
          }

          &.btnAccountKit {
            ${'' /* background-color: rgb(150, 189, 235); */}
            margin-top: 15px;

            &:hover {
              ${'' /* background-color: ${palette('color', 6)}; */}
            }
          }
        }
      }

      .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
        border-color: ${palette('border', 5)} !important;
        border-right-width: 0px !important;
      }
      .ant-select-focused.ant-select-single:not(.ant-select-customize-input)
        .ant-select-selector {
        border-color: ${palette('border', 5)} !important;
        box-shadow: none !important;
      }
    }

    @media only screen and (max-width: 1600px) {
      &:after {
        background-position: right 0px top -160px;
        background-size: 75% auto;
      }
    }

    @media only screen and (max-width: 1380px) {
      &:after {
        background-position: right 0 top -100px;
      }
    }

    @media only screen and (max-width: 991px) {
      .ant-input {
        &.ant-input-lg {
          max-width: 100%;
        }
      }
    }

    @media only screen and (max-width: 767px) {
      &:after {
        display: none;
      }
      .isoSignUpContent {
        width: 100%;
        .isoSignUpForm {
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
      .isoSignUpContent {
        padding: 60px 20px;
      }
    }
  }

  .ant-input-group-addon {
    border-color: ${palette('border', 5)};
    .ant-select-single:not(.ant-select-customize-input) {
      .ant-select-selector {
        padding: 0px;
      }
    }
  }
  .ant-select-single {
    &.ant-select-show-arrow {
      .ant-select-selection-item {
        padding-right: 14px;
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
  .ant-input {
    border-color: ${palette('border', 5)};
    &:hover {
      border-color: ${palette('primary', 0)};
    }
  }
`;

export default WithDirection(SignUpStyleWrapper);
