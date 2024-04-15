import React from 'react';
import { WidgetBox } from './Widgets.styles';

export default function ({ children, style, height, padding, ...props }) {
  return (
    <WidgetBox
      {...props}
      className="isoWidgetBox"
      height={height}
      padding={padding}
      style={style}
    >
      {children}
    </WidgetBox>
  );
}
