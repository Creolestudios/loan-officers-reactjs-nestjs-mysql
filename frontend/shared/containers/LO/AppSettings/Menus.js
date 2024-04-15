import React, { Component } from 'react';
import { Row, Col, Typography } from 'antd';
import { connect } from 'react-redux';
import {
  CustomTabHeader,
  CustomTabPanelContainer,
  CustonTabPanel,
} from '@iso/components/uielements/tabs';
import dashboardAction from '@iso/redux/loanofficer/appsetting/actions';
import basicStyle from '@iso/assets/styles/constants';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutHeaderActionWrapper from '@iso/components/utility/layoutHeaderActionWrapper';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import IntlMessages from '@iso/components/utility/intlMessages';
import MenusDashboard from './Menus/Dashboard';
import MenusGuide from './Menus/Guide';
import ColorSchemaAction from '@iso/redux/ColorSchema/action';

const { getColorSchema } = ColorSchemaAction;
const { appDashboardMenuList, appMenuList, appMortgageGuide } = dashboardAction;
const { Title } = Typography;
const tabsHeader = [
  {
    key: 1,
    title: 'Dashboard',
  },
  {
    key: 2,
    title: 'App Menu',
  },
  {
    key: 3,
    title: 'Mortgage Guide',
  },
];

class Menus extends Component {
  state = {
    activeTab: 1,
  };

  async componentDidMount() {
    await this.props.getColorSchema();
    await this.props.appDashboardMenuList();
    await this.props.appMenuList();
  }

  async componentDidUpdate(prevProps, prevState) {
    const { activeTab } = this.state;
    if (prevState.activeTab !== activeTab) {
      if (activeTab == 2) {
        await this.props.appMenuList();
      } else if (activeTab == 3) {
        await this.props.appMortgageGuide();
      } else {
        await this.props.appDashboardMenuList();
        await this.props.appMenuList();
      }
    }
  }

  handleTabChange = (data) => {
    this.setState({
      activeTab: data.key,
    });
  };

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { activeTab } = this.state;
    return (
      <React.Fragment>
        <LayoutHeaderWrapper isTab>
          <Title level={2}>
            <IntlMessages id="sidebar.appSettings.menus" />
          </Title>
          <LayoutHeaderActionWrapper isTab>
            <CustomTabHeader
              tabs={tabsHeader}
              activeKey={activeTab}
              changeTabKey={this.handleTabChange}
            />
          </LayoutHeaderActionWrapper>
        </LayoutHeaderWrapper>
        <LayoutContentWrapper>
          <Row style={rowStyle} gutter={0} justify="start">
            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
              <CustomTabPanelContainer activeKey={activeTab}>
                {/* Dashboard Menu */}
                <CustonTabPanel tabkey={1}>
                  <MenusDashboard />
                </CustonTabPanel>
                {/* App Menu */}
                <CustonTabPanel tabkey={2}>
                  <MenusDashboard activeTab={activeTab} />
                </CustonTabPanel>
                {/* Links */}
                <CustonTabPanel tabkey={3}>
                  <MenusGuide />
                </CustonTabPanel>
              </CustomTabPanelContainer>
            </Col>
          </Row>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  appDashboardMenuList: () => dispatch(appDashboardMenuList()),
  appMenuList: () => dispatch(appMenuList()),
  appMortgageGuide: () => dispatch(appMortgageGuide()),
  getColorSchema: () => dispatch(getColorSchema()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menus);
