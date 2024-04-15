import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Layout, Row, Typography } from 'antd';
import styled from 'styled-components';
import options from './options';
import Scrollbars from '@iso/components/utility/customScrollBar';
import Menu from '@iso/components/uielements/menu';
import imgLoantack from '@iso/assets/images/loantack-logo.png';
import appActions from '@iso/redux/app/actions';
import Logo from '@iso/components/utility/logo';
import SidebarWrapper from './Sidebar.styles';
import SidebarMenu from './SidebarMenu';
import { useHistory } from 'react-router-dom';
import { isEmpty } from 'lodash';

const { Sider } = Layout;
const { Text } = Typography;
const {
  changeOpenKeys,
  changeCurrent,
  toggleOpenDrawer,
  toggleCollapsed,
} = appActions;

const LoantackFooterRow = styled(Row)`
  text-align: center;
  .ant-typography {
    color: white;
  }
  img {
    padding: 0.5em;
  }
`;

export default function Sidebar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const statusOfSubscription = useSelector(
    (state) => state.subscription.LOSubscription
  );
  const userProfile = useSelector((state) => state.Auth?.profileObj);

  const checkRoute = React.useCallback(() => {
    options.map((singleOption) => {
      if (singleOption.children && singleOption.children.length > 0) {
        singleOption.children.map((data) => {
          if (
            data.key ===
            history.location.pathname.split('/').slice(3, 5).join('/')
          ) {
            dispatch(changeOpenKeys([singleOption.key]));
            dispatch(changeCurrent([data.key]));
          }
          return null;
        });
      }
      if (
        singleOption.key === history.location.pathname.split('dashboard/')[1]
      ) {
        dispatch(changeOpenKeys([singleOption.key]));
        dispatch(changeCurrent([singleOption.key]));
      }
      return null;
    });
  }, [dispatch, history]);

  React.useEffect(() => {
    checkRoute();
  }, [history.location.pathname, checkRoute]);

  const {
    view,
    openKeys,
    collapsed,
    openDrawer,
    current,
    height,
  } = useSelector((state) => state.App);

  const customizedTheme = useSelector(
    (state) => state.ThemeSwitcher.sidebarTheme
  );
  function handleClick(e) {
    dispatch(changeCurrent([e.key]));
    if (view === 'MobileView') {
      setTimeout(() => {
        dispatch(toggleCollapsed());
        // dispatch(toggleOpenDrawer());
      }, 100);

      // clearTimeout(timer);
    }
  }

  function onOpenChange(newOpenKeys) {
    const latestOpenKey = newOpenKeys.find(
      (key) => !(openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = openKeys.find(
      (key) => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }

    dispatch(changeOpenKeys(nextOpenKeys));
  }

  const getAncestorKeys = (key) => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };

  const isCollapsed = collapsed && !openDrawer;
  const mode = isCollapsed === true ? 'vertical' : 'inline';
  const styling = {
    backgroundColor: customizedTheme.backgroundColor,
  };
  const submenuStyle = {};
  const submenuColor = {
    color: customizedTheme.textColor,
  };

  const onMouseEnter = (event) => {
    if (collapsed && openDrawer === false) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };
  const onMouseLeave = () => {
    if (collapsed && openDrawer === true) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };

  return (
    <SidebarWrapper>
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={isCollapsed}
        width={240}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="isomorphicSidebar"
        style={styling}
      >
        <Logo collapsed={isCollapsed} brandLogo={userProfile?.brand_app_logo} />
        <Scrollbars style={{ height: height - 70 }}>
          <div className="menu-version-container">
            <Menu
              onClick={handleClick}
              theme="dark"
              className="isoDashboardMenu"
              mode={mode}
              openKeys={isCollapsed ? [] : openKeys}
              selectedKeys={current}
              onOpenChange={onOpenChange}
            >
              {options.map((singleOption) => (
                <SidebarMenu
                  disabled={!isEmpty(statusOfSubscription) ? false : true}
                  key={singleOption.key}
                  submenuStyle={submenuStyle}
                  submenuColor={submenuColor}
                  singleOption={singleOption}
                />
              ))}
            </Menu>
            {!isCollapsed &&
            userProfile?.is_brand &&
            userProfile?.brand_app_logo ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <LoantackFooterRow>
                  <Col span={24}>
                    <Text>Powered by</Text>
                  </Col>
                  <Col span={24}>
                    <img src={imgLoantack} alt={'loantack logo'} />
                  </Col>
                </LoantackFooterRow>
              </div>
            ) : null}
          </div>
        </Scrollbars>
      </Sider>
    </SidebarWrapper>
  );
}
