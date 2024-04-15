import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { SpinCustom } from '@iso/components/uielements/spin';
import useWindowSize from '@iso/lib/hooks/useWindowSize';
import appActions from '@iso/redux/app/actions';
import siteConfig from '@iso/config/site.config';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import DashboardRoutes from './DashboardRoutes';
import authAction from '@iso/redux/auth/actions';

import { DashboardContainer, DashboardGlobalStyles } from './Dashboard.styles';
import SubscriptionAction from '@iso/redux/SubscriptionsPlan/action';
const { getSubscription } = SubscriptionAction;

const { Content, Footer } = Layout;
const { getProfile, getNotificationListing, setIntID } = authAction;
const { toggleAll } = appActions;
const styles = {
  layout: { flexDirection: 'row', overflowX: 'hidden' },
  content: {
    padding: '70px 0 0',
    flexShrink: '0',
    background: '#f1f3f6',
    position: 'relative'
  },
  footer: {
    background: '#ffffff',
    textAlign: 'center',
    borderTop: '1px solid #ededed',
    position: 'relative'
  },
  version: {
    position: 'absolute',
    right: 30
  }
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const appHeight = useSelector((state) => state.App.height);
  const globalLoader = useSelector((state) => state.App.globalLoader);
  const profileDetails = useSelector((state) => state.Auth.profileObj);

  const [mounted, setMounted] = React.useState(1);
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getNotificationListing());
    }, 15000);

    dispatch(
      setIntID({
        id: intervalId
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    dispatch(getProfile());
    dispatch(getNotificationListing());
    setMounted(2);
  }, [dispatch]);

  React.useEffect(() => {
    if (!isEmpty(profileDetails) && mounted === 2) {
      dispatch(getSubscription());
      setMounted(3);
    }
  }, [profileDetails, dispatch, mounted]);

  React.useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [width, height, dispatch]);
  return (
    <DashboardContainer>
      <DashboardGlobalStyles />
      <Layout style={{ height: height }}>
        <Topbar />
        <Layout style={styles.layout}>
          <Sidebar />
          <Layout
            className="isoContentMainLayout"
            style={{
              height: appHeight
            }}
          >
            <SpinCustom spinning={globalLoader > 0}>
              <Content className="isomorphicContent" style={styles.content}>
                <DashboardRoutes />
              </Content>
            </SpinCustom>
            <Footer style={styles.footer}>
              <span>{siteConfig.footerText(false)}</span>
              <span style={styles.version}>version: {siteConfig.version}</span>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </DashboardContainer>
  );
}
