import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Menu from '@iso/components/uielements/menu';
import IntlMessages from '@iso/components/utility/intlMessages';
const SubMenu = Menu.SubMenu;

const stripTrailingSlash = (str) => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
};
export default React.memo(function SidebarMenu({
  singleOption,
  submenuStyle,
  submenuColor,
  ...rest
}) {
  let match = useRouteMatch();

  const { key, label, leftIcon: LeftIcons, children } = singleOption;
  const url = stripTrailingSlash(match.url);

  if (children) {
    return (
      <SubMenu
        key={key}
        title={
          <span className="isoMenuHolder">
            <LeftIcons />
            <span className="nav-text">
              <IntlMessages id={label} />
            </span>
          </span>
        }
        {...rest}
      >
        {children.map((child) => {
          const linkTo = child.withoutDashboard
            ? `/${child.key}`
            : `${url}/${child.key}`;
          return (
            <Menu.Item style={submenuStyle} key={child.key}>
              <Link to={linkTo}>
                <IntlMessages id={child.label} />
              </Link>
            </Menu.Item>
          );
        })}
      </SubMenu>
    );
  }

  return (
    <Menu.Item key={key} {...rest}>
      <Link to={`${key === '' ? url : url + '/' + key}`}>
        <span className="isoMenuHolder">
          <LeftIcons />
          <span className="nav-text">
            <IntlMessages id={label} />
          </span>
        </span>
      </Link>
    </Menu.Item>
  );
});
