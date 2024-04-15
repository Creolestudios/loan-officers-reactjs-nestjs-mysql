import React, { Component } from 'react';
import { Row, Col, Form, notification } from 'antd';
import {
  getGrayIcons,
  getWhiteIcons,
  getGreenIcons,
} from '@iso/config/constant';
import { URLRegexValidator } from '@iso/lib/helpers/validators/commonValidators';
import Button from '@iso/components/uielements/button';
import Box from '@iso/components/utility/box';
import Input from '@iso/components/uielements/input';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';
import dashboardAction from '@iso/redux/loanofficer/appsetting/actions';
import { imageArr } from '@iso/config/constant';
import CoBrandListCustomLists from './CoBrandListCustomLinks';

const {
  addCustomLinkDashboard,
  addCustomLinkApp,
  addCustomLinkForCoBrandOfficer,
} = dashboardAction;
let imageArrAppMenu = imageArr.filter((img) => img.id !== 16);
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    lg: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    lg: { span: 19 },
  },
};

// Dashboard, App Menu and Co-brand Edit section, this component is being used
class CustomLinks extends Component {
  state = {
    linkImg: null,
    linkText: null,
    linkUrl: null,
  };
  handleImage = (name) => {
    this.setState({
      linkImg: name,
    });
  };
  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };
  openNotification = (error) => {
    error.map((data) => {
      if (!data.label) {
        notification.open({
          message: data.value,
        });
      }
    });
  };
  componentDidMount() {
    // For the Dashboard, require default none icon selected
    if (!this.props?.activeTab) {
      this.setState({
        linkImg: 'none',
      });
    }
  }
  handleSubmit = async () => {
    let { linkImg, linkText, linkUrl } = this.state;
    let {
      currentMenuLinks,
      addCustomLinkDashboard,
      dashboardMenuList,
      activeTab,
      addCustomLinkApp,
      appMenuList,
      appCustomLinks,
      hasCoBrandCustomLinks,
      addCustomLinkForCoBrandOfficer,
      coBrandCustomLinks,
      coBrandId,
    } = this.props;
    let dashboardIdConflict = false;
    let customIdConflict = false;
    let conflictErr = [{ label: null, value: 'Id already exists' }];
    let emptyErr = [
      { label: linkImg, value: 'Icon is required' },
      { label: linkText, value: 'Link name is required' },
      { label: linkUrl, value: 'Link url is required' },
    ];

    if (linkImg && linkText && linkUrl) {
      if (!URLRegexValidator.test(linkUrl)) {
        notification.open({
          message: 'Invalid Url',
        });
        return;
      }
      let id = linkText.replace(' ', '_').toUpperCase();
      const links =
        activeTab == 2
          ? appCustomLinks
          : hasCoBrandCustomLinks
          ? coBrandCustomLinks
          : currentMenuLinks;

      let payload = {
        id,
        type: 2,
        name: linkText.trim(),
        sequence: links.length + 1,
        link: linkUrl,
        icon:
          linkImg === 'none'
            ? {}
            : {
                white: getWhiteIcons(linkImg),
                gray: getGrayIcons(linkImg),
                green: getGreenIcons(linkImg),
              },
      };

      if (hasCoBrandCustomLinks) {
        addCustomLinkForCoBrandOfficer(payload, coBrandId);
        this.setState({
          linkImg: 'none',
          linkText: null,
          linkUrl: null,
        });
        return;
      }

      (activeTab == 2 ? appMenuList : dashboardMenuList).map((data) => {
        if (data.id == id) {
          dashboardIdConflict = true;
        }
      });
      if (activeTab == 2) {
        if (!isEmpty(appCustomLinks)) {
          appCustomLinks.map((data) => {
            if (data.id == id) {
              customIdConflict = true;
            }
          });
        }
      } else {
        if (!isEmpty(currentMenuLinks)) {
          currentMenuLinks.map((data) => {
            if (data.id == id) {
              customIdConflict = true;
            }
          });
        }
      }
      if (!dashboardIdConflict && !customIdConflict) {
        if (activeTab == 2) {
          await addCustomLinkApp(payload);
        } else {
          await addCustomLinkDashboard(payload);
        }
        this.setState({
          linkImg: activeTab ? null : 'none',
          linkText: null,
          linkUrl: null,
        });
      } else {
        this.openNotification(conflictErr);
      }
    } else {
      if (linkUrl) {
        if (!URLRegexValidator.test(linkUrl)) {
          notification.open({
            message: 'Invalid Url',
          });
        }
      }
      this.openNotification(emptyErr);
    }
  };
  render() {
    let { linkImg, linkText, linkUrl } = this.state;
    const { hasCoBrandCustomLinks } = this.props;
    return (
      <Box
        title="Custom Links"
        className={hasCoBrandCustomLinks ? 'custom-link-co-brand-wrapper' : ''}
        footer={
          <div className="dashboardButtonwrapper">
            <Button className="dashboardBtn" onClick={this.handleSubmit}>
              ADD
            </Button>
          </div>
        }
      >
        {hasCoBrandCustomLinks ? (
          <CoBrandListCustomLists coBrandId={this.props.coBrandId} />
        ) : null}
        <Row>
          <Col span={24}>
            <FormItem {...formItemLayout} label={'URL'}>
              <Input
                size="large"
                name="linkUrl"
                placeholder="Enter Here"
                onChange={this.handleChange}
                value={linkUrl}
              />
            </FormItem>
            <FormItem {...formItemLayout} label={'Link Text'}>
              <Input
                size="large"
                name="linkText"
                placeholder="Enter Here"
                onChange={this.handleChange}
                value={linkText}
              />
            </FormItem>
            <FormItem {...formItemLayout} label={'Icon'} className="menu-link">
              {this.props.activeTab === 2
                ? imageArrAppMenu.map((img) => (
                    <div
                      className={`${linkImg == img.name ? 'active' : ''}`}
                      data-name={img.name}
                      key={img.id}
                      onClick={() => this.handleImage(img.name)}
                    >
                      <img.value />
                    </div>
                  ))
                : imageArr.map((img) => (
                    <div
                      className={`${linkImg == img.name ? 'active' : ''}`}
                      data-name={img.name}
                      key={img.id}
                      onClick={() => this.handleImage(img.name)}
                    >
                      <img.value />
                    </div>
                  ))}
            </FormItem>
          </Col>
        </Row>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  currentMenuLinks: state.LOAppSetting.appSettingsDashboardMenuCurrentLinks,
  dashboardMenuList: state.LOAppSetting.appSettingsDashboardMenuList,
  appMenuList: state.LOAppSetting.appSettingsAppMenuList,
  appCustomLinks: state.LOAppSetting.appSettingsAppMenuCurrentLinks,
  coBrandCustomLinks: state.LOAppSetting.coBrandCustomLinks,
});
const mapDispatchToProps = (dispatch) => ({
  addCustomLinkDashboard: (payload) =>
    dispatch(addCustomLinkDashboard(payload)),
  addCustomLinkForCoBrandOfficer: (payload, id) =>
    dispatch(addCustomLinkForCoBrandOfficer(payload, id)),
  addCustomLinkApp: (payload) => dispatch(addCustomLinkApp(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomLinks)
);
