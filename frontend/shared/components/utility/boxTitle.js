import React from 'react';
import { BoxTitle, BoxTitleMainWrapper } from './boxTitle.style';

export default (props) => {
  return (
    <BoxTitleMainWrapper
      className={`${props.className ? props.className : ''}`}
    >
      {props.title ? (
        <>
          <BoxTitle className="isoBoxTitle"> {props.title} </BoxTitle>
          {props.children && (
            <div className="isoBoxTitleNode">{props.children}</div>
          )}
        </>
      ) : (
        ''
      )}
    </BoxTitleMainWrapper>
  );
};
