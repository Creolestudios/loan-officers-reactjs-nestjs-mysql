import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition, borderRadius } from '@iso/lib/helpers/style_utils';
import WithDirection from '@iso/lib/helpers/rtl';
import DashboardIcon from '@iso/assets/images/icon/dashboard-icon.svg';
import ActivityIcon from '@iso/assets/images/icon/activity-icon.svg';
import AppsettingIcon from '@iso/assets/images/icon/appsetting-icon.svg';
import BrandappIcon from '@iso/assets/images/icon/brandapp-icon.svg';
import CoBrandIcon from '@iso/assets/images/icon/co-brand-icon.svg';
import ContentIcon from '@iso/assets/images/icon/content-icon.svg';
import LoanSettingIcon from '@iso/assets/images/icon/loan-setting-icon.svg';
import MarketIcon from '@iso/assets/images/icon/market-icon.svg';
import SupportIcon from '@iso/assets/images/icon/support-icon.svg';

const SidebarWrapper = styled.div`
  .isomorphicSidebar {
    z-index: 1000;
    background: ${palette('secondary', 11)};
    width: 280px;
    flex: 0 0 280px;

    .menu-version-container {
      position: absolute;
      inset: 0px;
      margin-right: 0px;
      margin-bottom: 0px;
      align-content: space-between;
      display: flex;
      flex-wrap: wrap;
    }

    .scrollarea {
      height: calc(100vh - 70px);
    }

    @media only screen and (max-width: 767px) {
      width: 240px !important;
      flex: 0 0 240px !important;
    }

    &.ant-layout-sider-collapsed {
      @media only screen and (max-width: 767px) {
        width: 0;
        min-width: 0 !important;
        max-width: 0 !important;
        flex: 0 0 0 !important;
      }
    }

    .isoLogoWrapper {
      height: 70px;
      margin: 0;
      padding: 0 10px;
      text-align: center;
      overflow: hidden;
      ${borderRadius()};

      h3 {
        a {
          font-size: 21px;
          font-weight: 300;
          line-height: 70px;
          display: block;
          text-decoration: none;
          cursor: auto;
        }
      }
    }

    &.ant-layout-sider-collapsed {
      .isoLogoWrapper {
        padding: 0;

        h3 {
          a {
            font-size: 27px;
            font-weight: 500;
            letter-spacing: 0;
          }
        }
      }
    }

    .isoDashboardMenu {
      padding-top: 15px;
      padding-bottom: 20px;
      background: transparent;

      a {
        text-decoration: none;
        font-weight: 400;
      }

      .ant-menu-item {
        width: 100%;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        padding: 0 24px;
        margin: 0;
      }

      .isoMenuHolder {
        display: flex;
        align-items: center;
        /* Need to remove */
        i {
          width: 20px;
          height: 25px;
          background-size: 100% 100%;
          color: inherit;
          margin: ${(props) =>
            props['data-rtl'] === 'rtl' ? '0 0 0 30px' : '0 30px 0 0'};
          ${transition()};
          &.dashboard-icon {
            background: url(${DashboardIcon}) center no-repeat;
            background-size: 100% 100%;
          }
          &.activity-icon {
            background: url(${ActivityIcon}) center no-repeat;
            background-size: 100% 100%;
          }
          &.appsetting-icon {
            background: url(${AppsettingIcon}) center no-repeat;
            background-size: 100% 100%;
          }
          &.brandapp-icon {
            background: url(${BrandappIcon}) center no-repeat;
            background-size: 100% 100%;
          }
          &.co-brand-icon {
            background: url(${CoBrandIcon}) center no-repeat;
            background-size: 100% 100%;
          }
          &.content-icon {
            background: url(${ContentIcon}) center no-repeat;
            background-size: 100% 100%;
          }
          &.loan-setting-icon {
            background: url(${LoanSettingIcon}) center no-repeat;
            background-size: 100% 100%;
          }
          &.market-icon {
            background: url(${MarketIcon}) center no-repeat;
            background-size: 100% 100%;
          }
          &.support-icon {
            background: url(${SupportIcon}) center no-repeat;
            background-size: 100% 100%;
          }
        }

        svg {
          width: 20px;
        }
      }

      .ant-menu-item {
        &.ant-menu-item-only-child {
          border-left: 3px solid transparent;
          &.ant-menu-item-selected {
            background-color: rgba(79, 178, 99, 0.15) !important;
            border-left: 3px solid ${palette('primary', 0)};
          }
        }
      }

      .ant-menu-submenu {
        ant-menu-submenu-title {
          border-left: 3px solid transparent;
        }
      }

      .ant-menu-submenu.ant-menu-submenu-selected {
        color: #fff;
        .ant-menu-submenu-title {
          background-color: rgba(79, 178, 99, 0.15);
          border-left: 3px solid ${palette('primary', 0)};
        }
        .ant-menu-sub {
          .ant-menu-item-only-child {
            &.ant-menu-item-selected {
              background-color: transparent !important;
              border-left: 3px solid transparent;
            }
          }
        }
      }

      .anticon {
        font-size: 18px;
        margin-right: 30px;
        color: inherit;
        ${transition()};
      }

      .nav-text {
        font-size: 14px;
        color: inherit;
        font-weight: 500;
        padding-left: 10px;
        ${transition()};
      }

      .ant-menu-item-selected {
        background-color: transparent !important;
        .anticon {
          color: #fff;
        }

        i {
          color: #fff;
        }

        .nav-text {
          color: #fff;
        }
        a {
          color: ${palette('primary', 0)};
        }
      }

      > li {
        &:hover {
          i,
          .isoMenuHolder {
            .nav-text {
              color: ${palette('primary', 0)};
            }
          }
        }
      }
    }

    .ant-menu-dark .ant-menu-inline.ant-menu-sub {
      background: ${palette('secondary', 11)};
    }

    .ant-menu-submenu-inline,
    .ant-menu-submenu-vertical {
      > .ant-menu-submenu-title {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 24px;
        border-left: 3px solid transparent;

        > span {
          display: flex;
          align-items: center;
        }

        .ant-menu-submenu-arrow {
          left: ${(props) => (props['data-rtl'] === 'rtl' ? '25px' : 'auto')};
          right: ${(props) => (props['data-rtl'] === 'rtl' ? 'auto' : '15px')};

          &:before,
          &:after {
            width: 8px;
            ${transition()};
          }

          &:before {
            transform: rotate(-45deg) translateX(3px);
          }

          &:after {
            transform: rotate(45deg) translateX(-3px);
          }

          ${'' /* &:after {
            content: '\f123';
            font-family: 'Ionicons' !important;
            font-size: 16px;
            color: inherit;
            left: ${props => (props['data-rtl'] === 'rtl' ? '16px' : 'auto')};
            right: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '16px')};
            ${transition()};
          } */};
        }

        &:hover {
          .ant-menu-submenu-arrow {
            &:before,
            &:after {
              color: #ffffff;
            }
          }
        }
      }

      .ant-menu-inline,
      .ant-menu-submenu-vertical {
        > li:not(.ant-menu-item-group) {
          padding-left: ${(props) =>
            props['data-rtl'] === 'rtl' ? '0px !important' : '54px !important'};
          padding-right: ${(props) =>
            props['data-rtl'] === 'rtl' ? '74px !important' : '0px !important'};
          font-size: 14px;
          font-weight: 500;
          margin: 0;
          color: inherit;
          ${transition()};

          a {
            font-weight: 500;
          }

          &:hover {
            a {
              color: ${palette('primary', 0)} !important;
            }
          }
        }

        .ant-menu-item-group {
          padding-left: 0;

          .ant-menu-item-group-title {
            padding-left: 100px !important;
          }
          .ant-menu-item-group-list {
            .ant-menu-item {
              padding-left: 125px !important;
            }
          }
        }
      }

      .ant-menu-sub {
        box-shadow: none;
        background-color: transparent !important;
      }

      &.ant-menu-submenu-open {
        .ant-menu-submenu-arrow {
          transform: rotate(180deg);
        }
      }
    }

    &.ant-layout-sider-collapsed {
      .nav-text {
        display: none;
      }

      .ant-menu-submenu-inline > {
        .ant-menu-submenu-title:after {
          display: none;
        }
      }

      .ant-menu-submenu-vertical {
        > .ant-menu-submenu-title:after {
          display: none;
        }

        .ant-menu-sub {
          background-color: transparent !important;

          .ant-menu-item {
            height: 35px;
          }
        }
      }
    }
  }
`;

export default WithDirection(SidebarWrapper);
