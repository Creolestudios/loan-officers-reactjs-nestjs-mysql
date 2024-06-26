import React from 'react';
import { Typography } from 'antd';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Popover from '@iso/components/uielements/popover';
import IntlMessages from '@iso/components/utility/intlMessages';
import userpic from '@iso/assets/images/avatar.png';
import authAction from '@iso/redux/auth/actions';
import TopbarDropdownWrapper from './TopbarDropdown.styles';
import { AppConstant } from '@iso/config/constant';
import SelectDropdownIcon from '@iso/assets/images/icon/select-dropdown.svg';
import { ReactComponent as UserIcon } from '@iso/assets/images/icon/my-ac.svg';
import { ReactComponent as ChangePassIcon } from '@iso/assets/images/icon/padlock.svg';
import { ReactComponent as LogoutIcon } from '@iso/assets/images/icon/logout-icon.svg';
import { isEmpty } from 'lodash';

const { logout } = authAction;
const { Text } = Typography;

export default function TopbarUser() {
  const [visible, setVisibility] = React.useState(false);
  const profileDetails = useSelector(
    (state) => state.AdminAccount.AdminProfileDetailes
  );

  const dispatch = useDispatch();
  const history = useHistory();
  function handleVisibleChange() {
    setVisibility((visible) => !visible);
  }

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      <div
        className="isoDropdownLink"
        onClick={() => {
          history.push(`/admin/dashboard/my-account`);
          setVisibility(false);
        }}
      >
        <UserIcon />
        My Account
      </div>

      <div
        className="isoDropdownLink"
        onClick={() => {
          history.push(`/admin/dashboard/change-password`);
          setVisibility(false);
        }}
      >
        <ChangePassIcon />
        Change Password
      </div>
      <div
        className="isoDropdownLink"
        onClick={() => dispatch(logout(AppConstant.Role.ADMIN, history))}
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
