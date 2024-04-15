import styled from 'styled-components';
import { palette } from 'styled-theme';

const WidgetWrapper = styled.div`
  width: ${(props) => props.width}px;
  margin-top: ${(props) => props.gutterTop}px;
  margin-right: ${(props) => props.gutterRight}px;
  margin-bottom: ${(props) => props.gutterBottom}px;
  margin-left: ${(props) => props.gutterLeft}px;
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bgColor}px;
  @media only screen and (max-width: 767) {
    margin-right: 0 !important;
  }
`;

const WidgetBox = styled.div`
  width: 100%;
  height: ${(props) => (props.height ? `${props.height}px` : '100%')};
  padding: ${(props) => (props.padding ? props.padding : '30px')};
  background-color: #ffffff;
  border: 1px solid
    ${(props) => (!props.isborder ? palette('border', 2) : 'none')};

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;
const getAlignContent = (align = 'flex-start') => {
  if (align === 'start') return 'flex-start';
  if (align === 'end') return 'flex-end';
  return align;
};

export { WidgetWrapper, WidgetBox };
