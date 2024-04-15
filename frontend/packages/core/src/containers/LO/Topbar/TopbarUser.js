import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Popover from '@iso/components/uielements/popover';
import { AppConstant } from '@iso/config/constant';
import IntlMessages from '@iso/components/utility/intlMessages';
import userpic from '@iso/assets/images/avatar.png';
import SelectDropdownIcon from '@iso/assets/images/icon/select-dropdown.svg';
import { ReactComponent as LogoutIcon } from '@iso/assets/images/icon/logout.svg';
import { ReactComponent as SettingIcon } from '@iso/assets/images/icon/setting-icon.svg';
import { ReactComponent as SubscriptionIcon } from '@iso/assets/images/icon/subscription-icon.svg';
import { ReactComponent as BilingHistoryIcon } from '@iso/assets/images/icon/BillingHistory.svg';

import authAction from '@iso/redux/auth/actions';
import TopbarDropdownWrapper from './TopbarDropdown.styles';
import { isEmpty } from 'lodash';
import { ReactComponent as UserIcon } from '@iso/assets/images/icon/users-icon.svg';

const { logout } = authAction;
const { Text } = Typography;

export default function TopbarUser() {
  const profileDetails = useSelector((state) => state.Auth.profileObj);
  const intervalId = useSelector((state) => state.Auth?.IntID?.id);
  const [visible, setVisibility] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const listOfDropDownItems = [
    { name: 'Subscription', icon: <SubscriptionIcon />, path: 'subscription' },
    { name: 'My Account', icon: <UserIcon />, path: 'my-account' },
    {
      name: ' Billing History',
      icon: <BilingHistoryIcon />,
      path: 'billing-history',
    },
    { name: 'Settings', icon: <SettingIcon />, path: 'setting' },
  ];

  function handleVisibleChange() {
    setVisibility((visible) => !visible);
  }

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      {listOfDropDownItems.map((item, index) => (
        <div
          key={index}
          className="isoDropdownLink"
          onClick={() => {
            history.push(`/portal/dashboard/${item.path}`);
            setVisibility(false);
          }}
        >
          {item.icon}
          {item.name}
        </div>
      ))}
      <div
        className="isoDropdownLink"
        onClick={() => {
          clearInterval(intervalId);
          dispatch(logout(AppConstant.Role.LO, history));
        }}
      >
        <LogoutIcon />
        <IntlMessages id="topbar.logout" />
      </div>
    </TopbarDropdownWrapper>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      arrowPointAtCenter={true}
      getPopupContainer={() =>
        document.querySelector('.isoMainUserPopoverContainer .isoImgWrapper')
      }
      placement="bottomLeft"
    >
      <div className="dropdownProfile">
        <div
          className="isoImgWrapper"
          style={{
            backgroundImage: `url(${
              !isEmpty(profileDetails)
                ? !isEmpty(profileDetails.profile_photo)
                  ? profileDetails.profile_photo
                  : userpic
                : userpic
            })`,
          }}
        ></div>
        <Text>
          {!isEmpty(profileDetails)
            ? !isEmpty(profileDetails.name)
              ? profileDetails.name
              : ''
            : ''}
        </Text>
        <img
          className="profileDropdownImage"
          src={SelectDropdownIcon}
          alt="dropdown icon"
        />
      </div>
    </Popover>
  );
}
