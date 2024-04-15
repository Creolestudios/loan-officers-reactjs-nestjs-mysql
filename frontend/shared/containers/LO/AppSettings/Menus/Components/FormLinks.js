import React, { Component } from 'react';
import { Row, Col, Form, Typography, notification } from 'antd';
import { AppConstant } from '@iso/config/constant';
import dashboardAction from '@iso/redux/loanofficer/appsetting/actions';
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import Button from '@iso/components/uielements/button';
import Box from '@iso/components/utility/box';
import basicStyle from '@iso/assets/styles/constants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';
import DeleteBtn from '@iso/assets/images/icon/delete-btn.svg';
import Modal from '@iso/components/uielements/modal';

const {
  appDashboardMenuSave,
  appMenuSave,
  deleteAppSettingMenu,
} = dashboardAction;

const { Title, Text } = Typography;

class FormLinks extends Component {
  state = {
    dashboardMenu: ['DASHBOARD'],
    mainList: [],
    showPopup: false,
    del_Id: null,
    companyMenu: ['DASHBOARD'],
    count: 0,
  };

  componentDidMount() {
    let {
      dashboardMenuList,
      appMenuList,
      activeTab,
      dashboardCompanyList,
      appCompanyList,
    } = this.props;
    let { dashboardMenu, companyMenu } = this.state;

    if (activeTab == 2) {
      if (!isEmpty(appMenuList)) {
        dashboardMenu = appMenuList.map((element) => element.id);
        this.setState({
          dashboardMenu,
          mainList: appMenuList,
        });
      }
      if (!isEmpty(appCompanyList)) {
        companyMenu = appCompanyList.map((element) => element.id);

        this.setState({
          mainList: appCompanyList,
          companyMenu,
        });
      }
    } else {
      if (!isEmpty(dashboardMenuList)) {
        dashboardMenu = dashboardMenuList.map((element) => element.id);
        this.setState({
          dashboardMenu,
          mainList: dashboardMenuList,
        });
      }
      if (!isEmpty(dashboardCompanyList)) {
        companyMenu = dashboardCompanyList.map((element) => element.id);

        this.setState({
          mainList: dashboardCompanyList,
          companyMenu,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let {
      dashboardMenuList,
      appMenuList,
      activeTab,
      dashboardCompanyList,
      appCompanyList,
      appCustomLinks,
    } = this.props;
    let { dashboardMenu, companyMenu } = this.state;
    const is_employee = this.props.profileDetails?.parent_id !== null;

    if (activeTab == 2) {
      if (appMenuList !== prevProps.appMenuList) {
        if (!isEmpty(appMenuList)) {
          if (is_employee && appMenuList.length >= 13 && this.state.count < 1) {
            let appslist = appMenuList.map((item) => item.id);
            let customlinkList = appCustomLinks.map((item) => item.id);
            let result = customlinkList.filter((item) =>
              appslist.includes(item)
            );

            let resultdashboardMenu = appMenuList
              .filter((item) => !result.includes(item.id))
              .map((item) => item.id);
            this.setState(
              {
                dashboardMenu: resultdashboardMenu,
                count: this.state.count + 1,
              },
              this.handleSaveDashboardMenu(resultdashboardMenu)
            );
          } else {
            let AppdashboardMenu = appMenuList.map((item) => item.id);
            this.setState({
              dashboardMenu: AppdashboardMenu,
              mainList: appMenuList,
              count: this.state.count + 1,
            });
          }
        }
      }
      if (appCompanyList !== prevProps.appCompanyList) {
        if (!isEmpty(appCompanyList)) {
          companyMenu = appCompanyList.map((element) => element.id);

          this.setState({
            mainList: appCompanyList,
            companyMenu,
          });
        }
      }
    } else {
      if (dashboardMenuList !== prevProps.dashboardMenuList) {
        if (!isEmpty(dashboardMenuList)) {
          dashboardMenu = dashboardMenuList.map((element) => element.id);
          this.setState({
            dashboardMenu,
            mainList: dashboardMenuList,
          });
        }
      }
      if (dashboardCompanyList !== prevProps.dashboardCompanyList) {
        if (!isEmpty(dashboardCompanyList)) {
          companyMenu = dashboardCompanyList.map((element) => element.id);

          this.setState({
            mainList: dashboardCompanyList,
            companyMenu,
          });
        }
      }
    }
  }

  handleShowPopup = (id) => {
    this.setState({
      showPopup: true,
      del_Id: id,
    });
  };

  handleCancel = () => {
    this.setState({
      showPopup: false,
      del_Id: null,
    });
  };

  handleOk = () => {
    let { activeTab } = this.props;
    const menu_type = activeTab === 2 ? 'app-menu' : 'dashboard-menu';
    this.props.deleteAppSettingMenu({ id: this.state.del_Id, menu_type });

    this.setState({
      showPopup: false,
      del_Id: null,
    });
  };

  handleOnChange = ({ target }) => {
    const { value, checked } = target;
    let { activeTab } = this.props;
    let { dashboardMenu } = this.state;
    if (!checked) {
      dashboardMenu = dashboardMenu.filter((element) => element !== value);
    } else {
      if (dashboardMenu.length + 1 > 12 && activeTab == 2) {
        notification.open({
          message: 'Custom links limit has reached',
        });
        return;
      } else {
        dashboardMenu.push(value);
      }
    }
    this.setState({
      dashboardMenu,
    });
  };

  handleOnChangeForCompany = ({ target }) => {
    const { value, checked } = target;
    let { activeTab } = this.props;
    let { companyMenu } = this.state;
    if (!checked) {
      companyMenu = companyMenu.filter((element) => element !== value);
    } else {
      if (companyMenu.length + 1 > 12 && activeTab == 2) {
        notification.open({
          message: 'Custom links limit has reached',
        });
        return;
      } else {
        companyMenu.push(value);
      }
    }
    this.setState({
      companyMenu,
    });
  };

  handleSaveDashboardMenu = (resultdashboardMenu) => {
    let { dashboardMenu, companyMenu } = this.state;
    let {
      dashboardMenuList,
      customLinks,
      appMenuList,
      activeTab,
      appCustomLinks,
      dashboardCompanyList,
      appCompanyList,
    } = this.props;

    const is_employee = this.props.profileDetails?.parent_id !== null;

    if (is_employee) {
      appCustomLinks = appCustomLinks.concat(
        appMenuList.filter(
          (item) => item?.type === 2 && item?.isChangeable === false
        )
      );
      customLinks = customLinks.concat(
        dashboardMenuList.filter(
          (item) => item?.type === 2 && item?.isChangeable === false
        )
      );
    }

    let mainListFiltered =
      activeTab == 2
        ? appMenuList.map((element) => element.id)
        : dashboardMenuList.map((element) => element.id);
    let mainListFilteredtwo =
      activeTab == 2
        ? appMenuList.map((element) => element.id)
        : dashboardMenuList.map((element) => element.id);

    let mainListFilteredForCompany =
      activeTab == 2
        ? appCompanyList?.map((element) => element.id)
        : dashboardCompanyList?.map((element) => element.id);

    let filteredDashboardMenus = !isEmpty(resultdashboardMenu)
      ? [...resultdashboardMenu]
      : [...dashboardMenu];
    let filteredDashboardMenusTwo = !isEmpty(resultdashboardMenu)
      ? [...resultdashboardMenu]
      : [...dashboardMenu];
    let filteredDashboardMenusCompany = [...companyMenu];

    filteredDashboardMenus.sort(function (a, b) {
      if (
        mainListFiltered.indexOf(a) > mainListFiltered.indexOf(b) ||
        mainListFiltered.indexOf(a) === -1
      ) {
        return 1;
      }
      if (mainListFiltered.indexOf(a) < mainListFiltered.indexOf(b)) {
        return -1;
      } else {
        return 0;
      }
    });

    filteredDashboardMenusCompany?.sort(function (a, b) {
      if (
        mainListFilteredForCompany?.indexOf(a) >
          mainListFilteredForCompany?.indexOf(b) ||
        mainListFilteredForCompany?.indexOf(a) === -1
      ) {
        return 1;
      }
      if (
        mainListFilteredForCompany?.indexOf(a) <
        mainListFilteredForCompany?.indexOf(b)
      ) {
        return -1;
      } else {
        return 0;
      }
    });

    filteredDashboardMenusTwo.sort(function (a, b) {
      if (
        mainListFilteredtwo.indexOf(a) > mainListFilteredtwo.indexOf(b) ||
        mainListFilteredtwo.indexOf(a) === -1
      ) {
        return 1;
      }
      if (mainListFilteredtwo.indexOf(a) < mainListFilteredtwo.indexOf(b)) {
        return -1;
      } else {
        return 0;
      }
    });
    filteredDashboardMenus = filteredDashboardMenus.map((element, index) => {
      let ele = AppConstant.DefaultMenus.find((data) => data.id === element);
      let ele2 =
        activeTab == 2
          ? appMenuList.find((data) => data.id === element)
          : dashboardMenuList.find((data) => data.id === element);
      if (ele) {
        return {
          ...ele,
          isChangeable: ele2 ? ele2.isChangeable : true,
          isChecked: ele2 ? ele2.isChecked : true,
          sequence: index + 1,
        };
      } else {
        if (activeTab == 2) {
          if (!isEmpty(appCustomLinks)) {
            let ele = appCustomLinks.find((data) => data.id === element);
            if (ele) {
              return {
                ...ele,
                isChangeable: ele2 ? ele2.isChangeable : true,
                isChecked: ele2 ? ele2.isChecked : true,
                sequence: index + 1,
              };
            }
          }
        } else {
          if (!isEmpty(customLinks)) {
            let ele = customLinks.find((data) => data.id === element);
            if (ele) {
              return {
                ...ele,
                isChangeable: ele2 ? ele2.isChangeable : true,
                isChecked: ele2 ? ele2.isChecked : true,
                sequence: index + 1,
              };
            }
          }
        }
      }
    });

    filteredDashboardMenusCompany = filteredDashboardMenusCompany.map(
      (element, index) => {
        let ele = AppConstant.DefaultMenus.find((data) => data.id === element);

        if (ele) {
          return {
            ...ele,
            sequence: index + 1,
            isChangeable: activeTab === 2 ? false : true,
            isChecked: activeTab === 2 ? true : true,
          };
        } else {
          if (activeTab == 2) {
            if (!isEmpty(appCustomLinks)) {
              let ele = appCustomLinks.find((data) => data.id === element);
              if (ele) {
                return {
                  ...ele,
                  sequence: index + 1,
                  isChangeable: activeTab === 2 ? false : true,
                  isChecked: activeTab === 2 ? true : true,
                };
              }
            }
          } else {
            if (!isEmpty(customLinks)) {
              let ele = customLinks.find((data) => data.id === element);
              if (ele) {
                return {
                  ...ele,
                  sequence: index + 1,
                  isChangeable: activeTab === 2 ? false : true,
                  isChecked: activeTab === 2 ? true : true,
                };
              }
            }
          }
        }
      }
    );
    filteredDashboardMenus = filteredDashboardMenus.filter(
      (i) => i !== undefined
    );
    filteredDashboardMenusCompany = filteredDashboardMenusCompany.filter(
      (i) => i !== undefined
    );

    filteredDashboardMenusTwo = filteredDashboardMenusTwo.map(
      (element, index) => {
        let ele = AppConstant.DefaultMenus.find((data) => data.id === element);
        if (ele) {
          return {
            ...ele,
            sequence: index + 1,
          };
        } else {
          if (activeTab == 2) {
            if (!isEmpty(appCustomLinks)) {
              let ele = appCustomLinks.find((data) => data.id === element);
              if (ele) {
                return {
                  ...ele,
                  sequence: index + 1,
                };
              }
            }
          } else {
            if (!isEmpty(customLinks)) {
              let ele = customLinks.find((data) => data.id === element);
              if (ele) {
                return {
                  ...ele,
                  sequence: index + 1,
                };
              }
            }
          }
        }
      }
    );
    filteredDashboardMenusTwo = filteredDashboardMenusTwo.filter(
      (i) => i !== undefined
    );

    const is_branded_user =
      this.props?.BrandedAppApplyStatus?.status === false ||
      this.props?.BrandedAppApplyStatus?.status === 'Rejected' ||
      this.props?.BrandedAppApplyStatus?.status === 'Cancelled';

    if (!is_employee) {
      if (is_branded_user) {
        filteredDashboardMenus.map((i) => delete i['isChangeable']);
      }
    }

    const payload = {
      menu: filteredDashboardMenus,
    };

    if (!is_branded_user && !is_employee) {
      let newdash_one = filteredDashboardMenusCompany;
      activeTab === 2
        ? newdash_one.map((i) => {
            i['isChangeable'] = false;
            i['isChecked'] = true;
          })
        : newdash_one.map((i) => {
            i['isChangeable'] = true;
            i['isChecked'] = true;
          });

      payload['company_menu'] = newdash_one;
      payload['menu'] = filteredDashboardMenusTwo;
    }

    if (activeTab == 2) {
      this.props.appMenuSave(payload);
    } else {
      this.props.appDashboardMenuSave(payload);
    }
    this.setState({
      mainMenuItems: filteredDashboardMenus,
      count: 0,
    });
  };

  render() {
    const { colStyle } = basicStyle;
    let {
      customLinks,
      appCustomLinks,
      activeTab,
      dashboardMenuList,
      appMenuList,
    } = this.props;
    const { dashboardMenu, mainList } = this.state;
    const is_employee = this.props.profileDetails?.parent_id !== null;

    if (is_employee) {
      appCustomLinks = appCustomLinks.concat(
        appMenuList.filter(
          (item) => item?.type === 2 && item?.isChangeable === false
        )
      );
      customLinks = customLinks.concat(
        dashboardMenuList.filter(
          (item) => item?.type === 2 && item?.isChangeable === false
        )
      );
    }

    const is_branded_user =
      this.props?.BrandedAppApplyStatus?.status === false ||
      this.props?.BrandedAppApplyStatus?.status === 'Rejected' ||
      this.props?.BrandedAppApplyStatus?.status === 'Cancelled' ||
      !this.props?.BrandedAppApplyStatus?.status;

    const dashboardList = dashboardMenu.filter((id) => {
      let noCheckList = null;
      if (activeTab == 2) {
        noCheckList = this.props.appMenuList?.find(
          (data) =>
            data.id === id &&
            data?.isChecked === false &&
            data?.isChangeable === false
        );
      } else {
        noCheckList = this.props.dashboardMenuList?.find(
          (data) =>
            data.id === id &&
            data?.isChecked === false &&
            data?.isChangeable === false
        );
      }

      if (noCheckList) return false;
      return true;
    });

    return (
      <Form onFinish={this.handleSaveDashboardMenu}>
        <Box
          title={this.props.activeTab !== 2 ? 'Dashboard Links' : 'App Links'}
          footer={
            <div className="dashboardButtonwrapper">
              <Button className="dashboardBtn" type="primary" htmlType="submit">
                SAVE
              </Button>
              <Text>
                The selected options will reflect in the{' '}
                {this.props.activeTab !== 2
                  ? '"Live App DashboardMenu".'
                  : '"Live App Menu".'}
              </Text>
            </div>
          }
        >
          <CheckboxGroup
            name="dashboard-menu"
            value={dashboardList}
            className="w-100"
          >
            <Row gutter={[20]} className="linksLabelwrapper">
              <Col
                lg={8}
                md={8}
                sm={{ span: 8, offset: 10 }}
                xs={{ span: 7, offset: 8 }}
                style={colStyle}
              >
                <span className="dashboardlinksName">
                  {this.props.activeTab !== 2
                    ? 'DASHBOARD LINKS'
                    : 'LIVE APP LINKS'}
                </span>
              </Col>
              {!is_employee && !is_branded_user && (
                <Col
                  lg={6}
                  md={6}
                  sm={{ span: 6, offset: 0 }}
                  xs={{ span: 6, offset: 1 }}
                  style={colStyle}
                >
                  <span className="dashboardlinksName">COMPANYWIDE LINKS</span>
                </Col>
              )}
            </Row>
            <div className="dashboardLinkscheckbox">
              {this.props.activeTab === 2 && (
                <Row gutter={20} justify="start">
                  <Col lg={10} md={10} sm={10} xs={12} style={colStyle}>
                    Dashboard
                  </Col>
                  <Col lg={8} md={8} sm={8} xs={6} style={colStyle}>
                    <Checkbox
                      onChange={this.handleOnChange}
                      value="DASHBOARD"
                      disabled={true}
                    />
                  </Col>
                  {!is_employee && !is_branded_user && (
                    <Col lg={6} md={6} sm={6} xs={6} style={colStyle}>
                      <CheckboxGroup
                        name="dashboard-menu"
                        value={this.state.companyMenu}
                        className="w-100"
                      >
                        <Checkbox
                          onChange={this.handleOnChangeForCompany}
                          value="DASHBOARD"
                          disabled={true}
                        />
                      </CheckboxGroup>
                    </Col>
                  )}
                </Row>
              )}
              {/* Calculator */}
              <Row gutter={20} justify="start">
                <Col lg={10} md={10} sm={10} xs={12} style={colStyle}>
                  Calculator
                </Col>
                <Col lg={8} md={8} sm={8} xs={6} style={colStyle}>
                  <Checkbox
                    onChange={this.handleOnChange}
                    value="CALCULATOR"
                    disabled={
                      is_employee
                        ? activeTab === 2
                          ? appMenuList[
                              appMenuList.findIndex(
                                (i) => i.id === 'CALCULATOR'
                              )
                            ]?.isChangeable === false
                          : dashboardMenuList[
                              dashboardMenuList.findIndex(
                                (i) => i.id === 'CALCULATOR'
                              )
                            ]?.isChangeable === false
                        : false
                    }
                  />
                </Col>
                {!is_employee && !is_branded_user && (
                  <Col lg={6} md={6} sm={6} xs={6} style={colStyle}>
                    <CheckboxGroup
                      name="dashboard-menu"
                      value={this.state.companyMenu}
                      className="w-100"
                    >
                      <Checkbox
                        onChange={this.handleOnChangeForCompany}
                        value="CALCULATOR"
                      />
                    </CheckboxGroup>
                  </Col>
                )}
              </Row>
              {/* Scan */}
              <Row gutter={20} justify="start">
                <Col lg={10} md={10} sm={10} xs={12} style={colStyle}>
                  Scan
                </Col>
                <Col lg={8} md={8} sm={8} xs={6} style={colStyle}>
                  <Checkbox
                    onChange={this.handleOnChange}
                    value="SCAN"
                    disabled={
                      is_employee
                        ? activeTab === 2
                          ? appMenuList[
                              appMenuList.findIndex((i) => i.id === 'SCAN')
                            ]?.isChangeable === false
                          : dashboardMenuList[
                              dashboardMenuList.findIndex(
                                (i) => i.id === 'SCAN'
                              )
                            ]?.isChangeable === false
                        : false
                    }
                  />
                </Col>
                {!is_employee && !is_branded_user && (
                  <Col lg={6} md={6} sm={6} xs={6} style={colStyle}>
                    <CheckboxGroup
                      name="dashboard-menu"
                      value={this.state.companyMenu}
                      className="w-100"
                    >
                      <Checkbox
                        onChange={this.handleOnChangeForCompany}
                        value="SCAN"
                      />
                    </CheckboxGroup>
                  </Col>
                )}
              </Row>
              {/* Guide */}
              <Row gutter={20} justify="start">
                <Col lg={10} md={10} sm={10} xs={12} style={colStyle}>
                  Guide
                </Col>
                <Col lg={8} md={8} sm={8} xs={6} style={colStyle}>
                  <Checkbox
                    onChange={this.handleOnChange}
                    value="GUIDE"
                    disabled={
                      is_employee
                        ? activeTab === 2
                          ? appMenuList[
                              appMenuList.findIndex((i) => i.id === 'GUIDE')
                            ]?.isChangeable === false
                          : dashboardMenuList[
                              dashboardMenuList.findIndex(
                                (i) => i.id === 'GUIDE'
                              )
                            ]?.isChangeable === false
                        : false
                    }
                  />
                </Col>
                {!is_employee && !is_branded_user && (
                  <Col lg={6} md={6} sm={6} xs={6} style={colStyle}>
                    <CheckboxGroup
                      name="dashboard-menu"
                      value={this.state.companyMenu}
                      className="w-100"
                    >
                      <Checkbox
                        onChange={this.handleOnChangeForCompany}
                        value="GUIDE"
                      />
                    </CheckboxGroup>
                  </Col>
                )}
              </Row>
              {/* Request a Callback */}
              <Row gutter={20} justify="start">
                <Col lg={10} md={10} sm={10} xs={12} style={colStyle}>
                  Callback
                </Col>
                <Col lg={8} md={8} sm={8} xs={6} style={colStyle}>
                  <Checkbox
                    onChange={this.handleOnChange}
                    value="CALLBACK_REQUEST"
                    disabled={
                      is_employee
                        ? activeTab === 2
                          ? appMenuList[
                              appMenuList.findIndex(
                                (i) => i.id === 'CALLBACK_REQUEST'
                              )
                            ]?.isChangeable === false
                          : dashboardMenuList[
                              dashboardMenuList.findIndex(
                                (i) => i.id === 'CALLBACK_REQUEST'
                              )
                            ]?.isChangeable === false
                        : false
                    }
                  />
                </Col>
                {!is_employee && !is_branded_user && (
                  <Col lg={6} md={6} sm={6} xs={6} style={colStyle}>
                    <CheckboxGroup
                      name="dashboard-menu"
                      value={this.state.companyMenu}
                      className="w-100"
                    >
                      <Checkbox
                        onChange={this.handleOnChangeForCompany}
                        value="CALLBACK_REQUEST"
                      />
                    </CheckboxGroup>
                  </Col>
                )}
              </Row>
              {/* Saved Calculations */}
              <Row gutter={20} justify="start">
                <Col lg={10} md={10} sm={10} xs={12} style={colStyle}>
                  Calculations
                </Col>
                <Col lg={8} md={8} sm={8} xs={6} style={colStyle}>
                  <Checkbox
                    onChange={this.handleOnChange}
                    value="SAVED_CALCULATIONS"
                    disabled={
                      is_employee
                        ? activeTab === 2
                          ? appMenuList[
                              appMenuList.findIndex(
                                (i) => i.id === 'SAVED_CALCULATIONS'
                              )
                            ]?.isChangeable === false
                          : dashboardMenuList[
                              dashboardMenuList.findIndex(
                                (i) => i.id === 'SAVED_CALCULATIONS'
                              )
                            ]?.isChangeable === false
                        : false
                    }
                  />
                </Col>
                {!is_employee && !is_branded_user && (
                  <Col lg={6} md={6} sm={6} xs={6} style={colStyle}>
                    <CheckboxGroup
                      name="dashboard-menu"
                      value={this.state.companyMenu}
                      className="w-100"
                    >
                      <Checkbox
                        onChange={this.handleOnChangeForCompany}
                        value="SAVED_CALCULATIONS"
                      />
                    </CheckboxGroup>
                  </Col>
                )}
              </Row>
              {/* Checklists */}
              <Row gutter={20} justify="start">
                <Col lg={10} md={10} sm={10} xs={12} style={colStyle}>
                  Checklists
                </Col>
                <Col lg={8} md={8} sm={8} xs={6} style={colStyle}>
                  <Checkbox
                    onChange={this.handleOnChange}
                    value="CHECKLISTS"
                    disabled={
                      is_employee
                        ? activeTab === 2
                          ? appMenuList[
                              appMenuList.findIndex(
                                (i) => i.id === 'CHECKLISTS'
                              )
                            ]?.isChangeable === false
                          : dashboardMenuList[
                              dashboardMenuList.findIndex(
                                (i) => i.id === 'CHECKLISTS'
                              )
                            ]?.isChangeable === false
                        : false
                    }
                  />
                </Col>
                {!is_employee && !is_branded_user && (
                  <Col lg={6} md={6} sm={6} xs={6} style={colStyle}>
                    <CheckboxGroup
                      name="dashboard-menu"
                      value={this.state.companyMenu}
                      className="w-100"
                    >
                      <Checkbox
                        onChange={this.handleOnChangeForCompany}
                        value="CHECKLISTS"
                      />
                    </CheckboxGroup>
                  </Col>
                )}
              </Row>
              {/* Uploaded Documents */}
              <Row gutter={20} justify="start">
                <Col lg={10} md={10} sm={10} xs={12} style={colStyle}>
                  Documents
                </Col>
                <Col lg={8} md={8} sm={8} xs={6} style={colStyle}>
                  <Checkbox
                    onChange={this.handleOnChange}
                    value="UPLOADED_DOCUMENTS"
                    disabled={
                      is_employee
                        ? activeTab === 2
                          ? appMenuList[
                              appMenuList.findIndex(
                                (i) => i.id === 'UPLOADED_DOCUMENTS'
                              )
                            ]?.isChangeable === false
                          : dashboardMenuList[
                              dashboardMenuList.findIndex(
                                (i) => i.id === 'UPLOADED_DOCUMENTS'
                              )
                            ]?.isChangeable === false
                        : false
                    }
                  />
                </Col>
                {!is_employee && !is_branded_user && (
                  <Col lg={6} md={6} sm={6} xs={6} style={colStyle}>
                    <CheckboxGroup
                      name="dashboard-menu"
                      value={this.state.companyMenu}
                      className="w-100"
                    >
                      <Checkbox
                        onChange={this.handleOnChangeForCompany}
                        value="UPLOADED_DOCUMENTS"
                      />
                    </CheckboxGroup>
                  </Col>
                )}
              </Row>

              {/* Message */}
              {this.props?.profileDetails?.isDM ? (
                <Row gutter={20} justify="start">
                  <Col lg={10} md={10} sm={10} xs={12} style={colStyle}>
                    DM
                  </Col>
                  <Col lg={8} md={8} sm={8} xs={6} style={colStyle}>
                    <Checkbox
                      onChange={this.handleOnChange}
                      value="MESSAGE"
                      disabled={
                        is_employee
                          ? activeTab === 2
                            ? appMenuList[
                                appMenuList.findIndex((i) => i.id === 'MESSAGE')
                              ]?.isChangeable === false
                            : dashboardMenuList[
                                dashboardMenuList.findIndex(
                                  (i) => i.id === 'MESSAGE'
                                )
                              ]?.isChangeable === false
                          : false
                      }
                    />
                  </Col>
                  {!is_employee && !is_branded_user && (
                    <Col lg={6} md={6} sm={6} xs={6} style={colStyle}>
                      <CheckboxGroup
                        name="dashboard-menu"
                        value={this.state.companyMenu}
                        className="w-100"
                      >
                        <Checkbox
                          onChange={this.handleOnChangeForCompany}
                          value="MESSAGE"
                        />
                      </CheckboxGroup>
                    </Col>
                  )}
                </Row>
              ) : null}

              {/* Notifications */}
              <Row gutter={20} justify="start">
                <Col lg={10} md={10} sm={10} xs={12} style={colStyle}>
                  Notifications
                </Col>
                <Col lg={8} md={8} sm={8} xs={6} style={colStyle}>
                  <Checkbox
                    onChange={this.handleOnChange}
                    value="NOTIFICATIONS"
                    disabled={
                      is_employee
                        ? activeTab === 2
                          ? appMenuList[
                              appMenuList.findIndex(
                                (i) => i.id === 'NOTIFICATIONS'
                              )
                            ]?.isChangeable === false
                          : dashboardMenuList[
                              dashboardMenuList.findIndex(
                                (i) => i.id === 'NOTIFICATIONS'
                              )
                            ]?.isChangeable === false
                        : false
                    }
                  />
                </Col>
                {!is_employee && !is_branded_user && (
                  <Col lg={6} md={6} sm={6} xs={6} style={colStyle}>
                    <CheckboxGroup
                      name="dashboard-menu"
                      value={this.state.companyMenu}
                      className="w-100"
                    >
                      <Checkbox
                        onChange={this.handleOnChangeForCompany}
                        value="NOTIFICATIONS"
                      />
                    </CheckboxGroup>
                  </Col>
                )}
              </Row>
              {/* Custom Links */}
              {activeTab == 2
                ? !isEmpty(appCustomLinks) &&
                  appCustomLinks.map((link) => (
                    <Row gutter={20} justify="start" key={link.id}>
                      <Col lg={10} md={10} sm={10} xs={12} style={colStyle}>
                        <p style={{ whiteSpace: 'break-spaces' }}>
                          {link.name}
                        </p>
                      </Col>
                      <Col lg={8} md={8} sm={8} xs={6} style={colStyle}>
                        <Checkbox
                          onChange={this.handleOnChange}
                          value={link.id}
                          disabled={
                            is_employee
                              ? activeTab === 2
                                ? appMenuList[
                                    appMenuList.findIndex(
                                      (i) => i.id === link.id
                                    )
                                  ]?.isChangeable === false
                                : dashboardMenuList[
                                    dashboardMenuList.findIndex(
                                      (i) => i.id === link.id
                                    )
                                  ]?.isChangeable === false
                              : false
                          }
                        />
                      </Col>
                      {!is_employee && !is_branded_user && (
                        <Col lg={4} md={4} sm={4} xs={4} style={colStyle}>
                          <CheckboxGroup
                            name="dashboard-menu"
                            value={this.state.companyMenu}
                            className="w-100"
                          >
                            <Checkbox
                              onChange={this.handleOnChangeForCompany}
                              value={link.id}
                            />
                          </CheckboxGroup>
                        </Col>
                      )}
                      <Col lg={2} md={2} sm={2} xs={4} style={colStyle}>
                        <img
                          src={DeleteBtn}
                          onClick={() => this.handleShowPopup(link.id)}
                          alt="Table Row Edit Button"
                          style={
                            is_employee
                              ? link?.isChangeable === false
                                ? {
                                    pointerEvents: 'none',
                                    opacity: '0.5',
                                    width: 35,
                                  }
                                : { width: 35, cursor: 'pointer' }
                              : { width: 35, cursor: 'pointer' }
                          }
                        />
                        <Modal
                          className="restoreDefaultsPopup"
                          visible={this.state.showPopup}
                          onOk={this.handleOk}
                          onCancel={this.handleCancel}
                        >
                          <span>Are you sure want to delete?</span>
                        </Modal>
                      </Col>
                    </Row>
                  ))
                : !isEmpty(customLinks) &&
                  customLinks.map((link) => (
                    <Row gutter={20} justify="start" key={link.id}>
                      <Col lg={10} md={10} sm={10} xs={12} style={colStyle}>
                        <p style={{ whiteSpace: 'break-spaces' }}>
                          {link.name}
                        </p>
                      </Col>
                      <Col lg={8} md={8} sm={8} xs={6} style={colStyle}>
                        <Checkbox
                          onChange={this.handleOnChange}
                          value={link.id}
                          disabled={
                            is_employee
                              ? activeTab === 2
                                ? appMenuList[
                                    appMenuList.findIndex(
                                      (i) => i.id === link.id
                                    )
                                  ]?.isChangeable === false
                                : dashboardMenuList[
                                    dashboardMenuList.findIndex(
                                      (i) => i.id === link.id
                                    )
                                  ]?.isChangeable === false
                              : false
                          }
                        />
                      </Col>
                      {!is_employee && !is_branded_user && (
                        <Col lg={4} md={4} sm={4} xs={4} style={colStyle}>
                          <CheckboxGroup
                            name="dashboard-menu"
                            value={this.state.companyMenu}
                            className="w-100"
                          >
                            <Checkbox
                              onChange={this.handleOnChangeForCompany}
                              value={link.id}
                            />
                          </CheckboxGroup>
                        </Col>
                      )}
                      <Col lg={2} md={2} sm={2} xs={4} style={colStyle}>
                        <img
                          src={DeleteBtn}
                          onClick={() => this.handleShowPopup(link.id)}
                          alt="Table Row Edit Button"
                          style={
                            is_employee
                              ? link?.isChangeable === false
                                ? {
                                    pointerEvents: 'none',
                                    opacity: '0.5',
                                    width: 35,
                                  }
                                : { width: 35, cursor: 'pointer' }
                              : { width: 35, cursor: 'pointer' }
                          }
                        />
                        <Modal
                          className="restoreDefaultsPopup"
                          visible={this.state.showPopup}
                          onOk={this.handleOk}
                          onCancel={this.handleCancel}
                        >
                          <span>Are you sure want to delete?</span>
                        </Modal>
                      </Col>
                    </Row>
                  ))}
            </div>
          </CheckboxGroup>
        </Box>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  dashboardMenuList: state.LOAppSetting.appSettingsDashboardMenuList,
  dashboardCompanyList: state.LOAppSetting.appSettingsDashboardCompanyList,
  appCompanyList: state.LOAppSetting.appSettingsAppCompanyList,
  customLinks: state.LOAppSetting.appSettingsDashboardMenuCurrentLinks,
  appMenuList: state.LOAppSetting.appSettingsAppMenuList,
  appCustomLinks: state.LOAppSetting.appSettingsAppMenuCurrentLinks,
  profileDetails: state.Auth.profileObj,
  BrandedAppApplyStatus: state.subscription.BrandedAppApplyStatus,
});
const mapDispatchToProps = (dispatch) => ({
  appDashboardMenuSave: (payload) => dispatch(appDashboardMenuSave(payload)),
  appMenuSave: (payload) => dispatch(appMenuSave(payload)),
  deleteAppSettingMenu: (payload) => dispatch(deleteAppSettingMenu(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FormLinks)
);
