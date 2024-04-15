import styled from 'styled-components';
import { palette } from 'styled-theme';

const AntTab = (ComponentName) => styled(ComponentName)`
  &.ant-tabs {
    &:not(.ant-tabs-vertical) {
      > .ant-tabs-content-animated {
        display: ${(props) => (props['data-rtl'] === 'rtl' ? 'block' : 'flex')};
      }
    }

    .ant-tabs-nav {
      .ant-tabs-tab {
        margin: ${(props) =>
          props['data-rtl'] === 'rtl' ? '0 0 0 24px' : '0 24px 0 0'};

        .anticon:not(.anticon-close) {
          margin: ${(props) =>
            props['data-rtl'] === 'rtl' ? '0 0 0 8px' : '0 8px 0 0'};

          &.anticon-close {
            right: ${(props) =>
              props['data-rtl'] === 'rtl' ? 'inherit' : '2px'};
            left: ${(props) =>
              props['data-rtl'] === 'rtl' ? '2px' : 'inherit'};
          }
        }
      }
    }

    .ant-tabs-tab-prev {
      left: 0;
      right: inherit;
      transform: ${(props) =>
        props['data-rtl'] === 'rtl' ? 'rotate(180deg)' : 'rotate(0)'};
    }

    .ant-tabs-tab-next {
      left: inherit;
      right: 2px;
      transform: rotate(0);
    }

    &.ant-tabs-vertical {
      .ant-tabs-tab-prev,
      .ant-tabs-tab-next {
        transform: rotate(0);
      }
    }
  }
`;

export const CustomTabsHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  .customTabHeaderItems {
    display: flex;
    margin: 0 -15px;
    .customTabHeaderItem {
      cursor: pointer;
      padding: 0px 0px 15px;
      margin: 10px 15px 0px;
      font-weight: bold;
      color: ${palette('grayscale', 12)};
      &.activeTabKey {
        position: relative;
        color: ${palette('text', 6)};

        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: ${palette('primary', 0)};
        }
      }
    }

    @media (max-width: 400px) {
      width: 100%;
      margin: 0px;
      .customTabHeaderItem {
        padding: 0 0 10px;
        margin: 10px 10px 0px;
        &:first-child {
          margin-left: 0px;
        }
      }
    }
  }
`;

export const CustomTabsPanelWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const CustonTabPanelWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export default AntTab;
