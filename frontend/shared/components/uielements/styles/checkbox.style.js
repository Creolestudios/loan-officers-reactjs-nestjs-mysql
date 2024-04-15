import styled from 'styled-components';
import { palette } from 'styled-theme';

const AntCheckbox = (ComponentName) => styled(ComponentName)`
  &.ant-checkbox-wrapper {
    font-size: 14px;
    color: ${palette('label', 0)};
    vertical-align: middle;

    &:hover {
      .ant-checkbox-inner {
        border-color: ${palette('primary', 0)};
      }
    }

    .ant-checkbox {
      top: inherit;

      &.ant-checkbox-checked {
        .ant-checkbox-inner {
          background-color: ${palette('primary', 0)};
        }
        &:after {
          border-color: ${palette('primary', 0)};
        }
      }

      &:hover {
        .ant-checkbox-inner {
          border-color: ${palette('primary', 0)};
        }
      }
    }

    .ant-checkbox-inner {
      border-color: ${palette('border', 6)};
    }

    .ant-checkbox-input {
      &:focus {
        & + {
          .ant-checkbox-inner {
            border-color: ${palette('primary', 0)};
          }
        }
      }
    }
  }
`;

export default AntCheckbox;
