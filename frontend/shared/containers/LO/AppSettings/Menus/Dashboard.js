import React, { Component } from 'react';
import { Row, Col } from 'antd';
import IsoWidgetsWrapper from '@iso/containers/Global/Common/WidgetsWrapper';
import basicStyle from '@iso/assets/styles/constants';
import FormLinks from './Components/FormLinks';
import ChangeSequence from './Components/ChangeSequence';
import CustomLinks from './Components/CustomLinks';
import { MenuStyleWrapper } from '../Menus.styles';
import PhonePlaceHolderImg from '@iso/assets/images/phone-img.png';
import Image from '@iso/ui/Image/Image';
import MobailMenus from './MobailMenus';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { imageArrForMenus } from '@iso/config/constant';
import { dashboardHeaderLinkMapper } from '@iso/lib/helpers/functions';

class AppSettingDashboard extends Component {
  render() {
    const { rowStyle, colStyle } = basicStyle;
    const {
      profile_photo,
      designation,
      name,
      licence,
      dashboard_header_links,
    } = this.props.profileDetails;

    const dashboardMenuList = [];
    const appMenuList = [];

    this.props.dashboardMenuList.forEach((list) => {
      if (list?.isChecked === false && list?.isChangeable === false) {
        return;
      }
      dashboardMenuList.push(list);
    });

    this.props.appMenuList.forEach((list) => {
      if (list?.isChecked === false && list?.isChangeable === false) {
        return;
      }
      appMenuList.push(list);
    });

    let dashboardMenuListWithIcon = [];
    imageArrForMenus.map((icon) =>
      dashboardMenuList.map(
        (item) =>
          icon.id === item.id &&
          dashboardMenuListWithIcon.push({
            ...item,
            addIcon: icon,
          })
      )
    );

    dashboardMenuList.map(
      (item) =>
        item.type === 2 &&
        dashboardMenuListWithIcon.push({
          ...item,
          addIcon: item.icon.white,
        })
    );

    dashboardMenuListWithIcon = dashboardMenuListWithIcon.sort(function (a, b) {
      return a.sequence - b.sequence;
    });

    let appMenuListwithIcon = [];
    imageArrForMenus.map((icon) =>
      appMenuList.map(
        (item) =>
          icon.id === item.id &&
          appMenuListwithIcon.push({
            ...item,
            addIcon: icon,
          })
      )
    );

    appMenuList.map(
      (item) =>
        item.type === 2 &&
        appMenuListwithIcon.push({
          ...item,
          addIcon: item.icon.white,
        })
    );

    appMenuListwithIcon = appMenuListwithIcon.sort(function (a, b) {
      return a.sequence - b.sequence;
    });

    const dashLinks = dashboardHeaderLinkMapper(dashboard_header_links);

    return (
      <MenuStyleWrapper className="menu-wrapper">
        <Row
          gutter={30}
          justify="start"
          className="dashboardContent profileBioContent"
        >
          <Col xxl={8} xl={12} lg={12} md={24} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper className="mb-3 dashboardContent dashboardLinksWrapper">
              <FormLinks activeTab={this.props.activeTab} />
            </IsoWidgetsWrapper>
          </Col>
          <Col xxl={8} xl={12} lg={12} md={24} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper className="mb-3 dashboardContent">
              <ChangeSequence activeTab={this.props.activeTab} />
            </IsoWidgetsWrapper>
          </Col>
          <Col xxl={8} xl={24} lg={24} md={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper className="mb-3 dashboardContent">
              <div className="dashboardPhoneImg menu">
                <Image src={PhonePlaceHolderImg} alt={'phone image'} />

                <MobailMenus
                  profilePhoto={profile_photo}
                  UserName={name}
                  Title={designation}
                  LiOrNMLS={licence}
                  BackGroungColor={
                    this.props.ColorThemesData.filter((x) => x.default)[0]?.[
                      'dark_color'
                    ]
                  }
                  DashboardItem={dashboardMenuListWithIcon}
                  dashLinks={dashLinks}
                  AppMenuItems={appMenuListwithIcon}
                  ActiveTab={this.props.activeTab}
                />
              </div>
            </IsoWidgetsWrapper>
          </Col>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper className="dashboardContent customLinksWrapper">
              <CustomLinks activeTab={this.props.activeTab} />
            </IsoWidgetsWrapper>
          </Col>
        </Row>
      </MenuStyleWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  profileDetails: state.Auth.profileObj,
  ColorThemesData: state.colorSchema.ColorSchemaTheme,
  dashboardMenuList: state.LOAppSetting.appSettingsDashboardMenuList,
  appMenuList: state.LOAppSetting.appSettingsAppMenuList,
});

export default withRouter(connect(mapStateToProps, null)(AppSettingDashboard));
