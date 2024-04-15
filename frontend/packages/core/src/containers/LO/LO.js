import React from 'react';
import LORoutes from './LORoutes';
import LOGlobalWrapper from './LO.style';
export default class LO extends React.Component {
  render() {
    return (
      <LOGlobalWrapper>
        <LORoutes />
      </LOGlobalWrapper>
    );
  }
}
