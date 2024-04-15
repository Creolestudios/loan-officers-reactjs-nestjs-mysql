import React from 'react';
import { Popover } from 'antd';
import moment from 'moment';
import bellIcon from '@iso/assets/images/icon/bel-icon.svg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import IntlMessages from '@iso/components/utility/intlMessages';
import Image from '@iso/ui/Image/Image';
import TopbarDropdownWrapper from './TopbarDropdown.styles';
import { useHistory } from 'react-router-dom';

export default function TopbarNotification() {
  const [visible, setVisiblity] = React.useState(false);
  const history = useHistory();

  // const customizedTheme = useSelector(
  //   (state) => state.ThemeSwitcher.topbarTheme
  // );

  let userNotificationList = useSelector(
    (state) => state.Auth.userNotificationList
  );

  let sortedNotificationList = userNotificationList.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  function handleVisibleChange() {
    setVisiblity((visible) => !visible);
  }

  function handleNotification(constId, BorrowerID) {
    setVisiblity(false);
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

    history.push(names[constId]);
  }

  const content = (
    <TopbarDropdownWrapper className="topbarNotification">
      {/* <div className="isoDropdownHeader"></div> */}
      <div className="isoDropdownBody">
        {sortedNotificationList.slice(0, 4).map((notification) => (
          <div
            className="isoDropdownListItem"
            key={notification.id}
            onClick={() =>
              handleNotification(
                notification?.notification_category,
                notification?.notification_by
              )
            }
          >
            <p>{notification.notification_text}</p>
            <p
              style={{
                color: 'gray',
                textAlignLast: 'end',
                paddingTop: 10,
              }}
            >
              {moment(notification.created_at).format("MMM D, 'YY - h:mma")}
            </p>
          </div>
        ))}
      </div>

      <Link
        className="isoViewAllBtn"
        to={`/portal/dashboard/notification`}
        onClick={() => setVisiblity(false)}
      >
        <IntlMessages id="topbar.viewAll" />
      </Link>
    </TopbarDropdownWrapper>
  );
  return (
    <Popover
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      placement="bottomRight"
    >
      <div className="isoIconWrapper">
        <Image src={bellIcon} alt="notification icon" />
      </div>
    </Popover>
  );
}
