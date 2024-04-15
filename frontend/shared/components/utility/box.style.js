import styled from 'styled-components';
import { palette } from 'styled-theme';

const BoxWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 0 20px 0;
  background-color: #ffffff;
  border: 1px solid ${palette('border', 0)};
  margin: 0 0 30px;

  &:last-child {
    margin-bottom: 0;
  }

  @media only screen and (max-width: 767px) {
    padding: 20px;
    ${'' /* margin: 0 10px 30px; */};
  }

  &.half {
    width: calc(50% - 34px);
    @media (max-width: 767px) {
      width: 100%;
    }
  }
`;

const BoxChildren = styled.div`
  margin-top: 10px;
  padding: 0 20px 20px 20px;
`;

const BoxFooter = styled.div`
  border-top: 1px solid ${palette('border', 0)};
`;

export { BoxWrapper, BoxChildren, BoxFooter };
