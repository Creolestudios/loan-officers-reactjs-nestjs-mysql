import styled from 'styled-components';
import { palette } from 'styled-theme';
import bgImage from '@iso/assets/images/sign.png';

const VerificationStyleWrapper = styled.div`
  .isoVerificationContentWrapper {
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

    .isoVerificationContent {
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

      .isoVerificationForm {
        width: 100%;

        .formWrapper {
          margin: 0 auto;

          .isoFormHeadText {
            text-align: center;
            margin-bottom: 40px;
          }

          .verificationCodeWrapper {
            max-width: 380px;
            margin: 0 auto 20px;

            > div {
              flex-wrap: wrap;
              div {
                &:first-child {
                  .isoVerificationInput {
                    margin-left: 0px;
                  }
                }
              }
            }
            .isoVerificationInput {
              margin: 8px;
              font-size: 13px;
              line-height: 1.5;
              text-align: center;
              border: 1px solid ${palette('border', 5)};
              width: 44px !important;
              height: 44px;
              border-radius: 4px;
              padding: 6px 10px;

              &:focus {
                outline: none;
                border-color: ${palette('primary', 0)};
              }
            }
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

          .isoLeftRightComponent {
            text-align: center;
            .ant-btn {
              margin: auto;
              margin-top: 50px;
            }
          }

          .osoBtnWrapper {
            text-align: center;
            margin-top: 20px;
            .isoresend {
              text-transform: uppercase;
              color: #4fb263;
              font-weight: 700;
            }
          }
        }
      }
    }

    @media only screen and (max-width: 991px) {
      .isoVerificationContent {
        .isoVerificationForm {
          .formWrapper {
            .verificationCodeWrapper {
              max-width: 260px;
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
      .isoVerificationContent {
        width: 100%;
        .isoVerificationForm {
          .formWrapper {
            .isoFormHeadText {
              margin-bottom: 20px;
            }
            .verificationCodeWrapper {
              max-width: 380px;
            }
          }
        }
      }
    }

    @media only screen and (max-width: 480px) {
      .isoVerificationContent {
        padding: 60px 20px;
        .isoVerificationForm {
          .formWrapper {
            .verificationCodeWrapper {
              max-width: 240px;
              > div {
                justify-content: center;
                div {
                  &:first-child {
                    .isoVerificationInput {
                      margin-left: 5px;
                    }
                  }
                }
              }
              .isoVerificationInput {
                margin: 5px;
              }
            }
          }
        }
      }
    }
  }
`;

export { VerificationStyleWrapper };
