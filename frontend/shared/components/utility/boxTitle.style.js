import styled from 'styled-components';
import { palette } from 'styled-theme';

const BoxTitleMainWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${palette('border', 0)};
  padding: 15px;
  min-height: 60px;
  margin-bottom: 15px;
  .isoBoxTitleNode {
    margin-left: auto;
  }
`;

const BoxTitle = styled.h3`
  font-size: 17px;
  font-weight: 500;
  align-self: center;
  color: ${palette('text', 0)};
  margin: 0;
  margin-bottom: 0px;
`;

export { BoxTitle, BoxTitleMainWrapper };
