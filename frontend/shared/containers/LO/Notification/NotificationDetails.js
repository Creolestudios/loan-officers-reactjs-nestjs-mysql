import React, { Component } from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';

import authAction from '@iso/redux/auth/actions';
const { Title } = Typography;
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { isEmpty } from 'lodash';

const { getNotificationListing, getNotification } = authAction;

class NotificationDetails extends Component {
  componentDidMount() {
    // this.props.getNotification();
    this.props.getNotificationListing();
  }
  render() {
    const { userNotificationList } = this.props;
    // let sortedNotificationList = userNotificationList.sort(
    //   (a, b) => new Date(b.created_at) - new Date(a.created_at)
    // );
    let sortedNotificationList = userNotificationList.filter(
      (input) => input.id == this.props.match.params.id
    );
   

    return (
      <React.Fragment>
        <LayoutHeaderWrapper>
          <Title level={2}>Notification Details</Title>
        </LayoutHeaderWrapper>
        <LayoutContentWrapper className="notification-section">
          <LayoutContent style={{ height: '70vh' }}>
            {/* Checklists Table */}
            {/* <h1>Notification details</h1> */}
            {!isEmpty(userNotificationList) &&
              sortedNotificationList.map((item, index) => (
                <Row key={index}>
                  <Col xs={24} sm={16}>
                    {item.notification_text}
                  </Col>
                  <Col xs={24} sm={8} className="mob-space">
                    {moment(item.created_at).format("MMM D, 'YY - h:mma")}
                  </Col>
                  <Divider></Divider>
                </Row>
              ))}
          </LayoutContent>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userNotificationList: state.Auth.userNotificationList,
  userNotificationSetting: state.Auth.userNotification,
});
const mapDispatchToProps = (dispatch) => ({
  getNotification: () => dispatch(getNotification()),
  getNotificationListing: () => dispatch(getNotificationListing()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NotificationDetails)
);
