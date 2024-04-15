import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import { palette } from 'styled-theme';
import breadcrumbIcon from '@iso/assets/images/icon/breadcrumb.svg';

const HeaderBreadCrumbWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;
  width: 100%;
`;

const DisabledLinkTextWrapper = styled(Link)`
  margin-bottom: 0;
  color: ${palette('grayscale', 12)};
  font-weight: 600;
  font-size: 30px;
  line-height: normal;
  &:hover {
    color: ${palette('secondary', 11)};
  }
  &:after {
    content: url(${breadcrumbIcon});
    color: ${palette('grayscale', 12)};
    margin-right: 7px;
  }

  @media (max-width: 767px) {
    font-size: 28px;
  }

  @media (max-width: 575px) {
    font-size: 26px;
  }
`;

export { HeaderBreadCrumbWrapper, DisabledLinkTextWrapper };
