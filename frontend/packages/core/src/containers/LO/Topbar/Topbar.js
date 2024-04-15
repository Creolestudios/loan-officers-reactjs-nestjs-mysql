import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Badge } from 'antd';
import TopbarNotification from './TopbarNotification';
import appActions from '@iso/redux/app/actions';
// import TopbarSearch from './TopbarSearch';
import TopbarUser from './TopbarUser';
import TopbarWrapper from './Topbar.styles';

const { Header } = Layout;
const { toggleCollapsed } = appActions;

export default function Topbar({ props }) {
  const [selectedItem, setSelectedItem] = React.useState('');
  const [show, setShow] = React.useState(false);
  const customizedTheme = useSelector(
    (state) => state.ThemeSwitcher.topbarTheme
  );
  const { userNotificationList } = useSelector((state) => state.Auth);
  const usePrevious = (value) => {
    const ref = React.useRef();
    React.useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  const prevAmount = usePrevious({ userNotificationList });
  React.useEffect(() => {
    if (
      prevAmount?.userNotificationList?.length !== userNotificationList.length
    ) {
      setShow(true);
    }
  }, [userNotificationList, prevAmount]);

  const { collapsed, openDrawer } = useSelector((state) => state.App);
  const dispatch = useDispatch();

  const handleToggle = React.useCallback(() => dispatch(toggleCollapsed()), [
    dispatch,
  ]);

  const styling = {
    background: customizedTheme.backgroundColor,
    position: 'fixed',
    width: '100%',
    height: 70,
  };
  const handleShow = () => {
    setSelectedItem('notification');
    setShow(false);
  };

  const isCollapsed = collapsed && !openDrawer;

  return (
    <TopbarWrapper>
      <Header
        style={styling}
        className={
          isCollapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
        }
      >
        <div className="isoLeft">
          <button
            className={
              isCollapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
            }
            style={{ color: customizedTheme.textColor }}
            onClick={handleToggle}
          />
        </div>
        <div className="isoLeft"></div>

        <ul className="isoRight">
          {/* <li className="isoSearch">
            <TopbarSearch />
          </li> */}

          <li
            onClick={handleShow}
            className={selectedItem ? 'isoNotify active' : 'isoNotify'}
          >
            <Badge dot={show} status={show ? 'success' : ''}>
              <TopbarNotification />
            </Badge>
          </li>

          <li
            onClick={() => setSelectedItem('user')}
            className="isoUser isoMainUserPopoverContainer"
          >
            <TopbarUser />
          </li>
        </ul>
      </Header>
    </TopbarWrapper>
  );
}
