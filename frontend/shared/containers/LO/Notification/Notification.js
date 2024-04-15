import React, { Component } from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import authAction from '@iso/redux/auth/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { isEmpty } from 'lodash';

const { getNotificationListing } = authAction;
const { Title } = Typography;

class Notification extends Component {
  componentDidMount() {
    this.props.getNotificationListing();
  }

  handleNotification = (constId, BorrowerID) => {
    const names = {
      1: `/portal/dashboard/activity/users/${BorrowerID}/uploaded-documents`,
      2: `/portal/dashboard/marketing/qrcode`,
      3: `/portal/dashboard/home`,
      4: `/portal/dashboard/activity/callback-request`,
      5: `/portal/dashboard/subscription`,
      6: `/portal/dashboard/brand-app/sub-branded-app`,
      7: `Receives_msg_admin`,
      8: `Receives_msg_LoanOfficer`,
    };

    this.props.history.push(names[constId]);
  };

  render() {
    const { userNotificationList } = this.props;
    let sortedNotificationList = userNotificationList.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    return (
      <React.Fragment>
        <LayoutHeaderWrapper>
          <Title level={2}>Notifications</Title>
        </LayoutHeaderWrapper>
        <LayoutContentWrapper className="notification-section">
          <LayoutContent>
            {/* Checklists Table */}
            {!isEmpty(userNotificationList) &&
              sortedNotificationList.map((item, index) => (
                <Row
                  key={index}
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    this.handleNotification(
                      item?.notification_category,
                      item?.notification_by
                    )
                  }
                >
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
  getNotificationListing: () => dispatch(getNotificationListing()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Notification)
);
