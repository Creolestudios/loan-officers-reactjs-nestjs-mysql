import React from 'react';
import BoxTitleWrapper from './boxTitle';
import { BoxWrapper, BoxChildren, BoxFooter } from './box.style';

export default (props) => (
  <BoxWrapper
    className={`${props.className ? props.className : ''} isoBoxWrapper`}
    style={props.style}
  >
    {props.title && (
      <BoxTitleWrapper title={props.title} className="isoBoxHeaderWrapper">
        {props.renderChildren}
      </BoxTitleWrapper>
    )}
    <BoxChildren className="isoBoxChildrenWrapper">
      {props.children}
    </BoxChildren>
    {props.footer && (
      <BoxFooter className="isoBoxFooterWrapper">{props.footer}</BoxFooter>
    )}
  </BoxWrapper>
);
