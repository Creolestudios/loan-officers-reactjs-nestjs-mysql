import styled from 'styled-components';
import { palette, font } from 'styled-theme';

const MenuStyleWrapper = styled.div`
  .menu-link {
    .ant-form-item-control-input-content {
      display: flex;
      flex-wrap: wrap;
      div {
        padding: 6px;
        margin-right: 15px;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 2px;
        line-height: 0px;
        &.active {
          border: 1px solid ${palette('primary', 0)};
          svg {
            path {
              fill: ${palette('primary', 0)};
            }
          }
        }
      }
    }
    @media only screen and (max-width: 1199px) {
      .ant-form-item-control-input-content {
        div {
          padding: 4px;
          margin-right: 10px;
        }
      }
    }
  }
`;

export { MenuStyleWrapper };
