import React, { Component } from 'react';
import { Row, Col, Typography } from 'antd';
import {
  CustomTabHeader,
  CustomTabPanelContainer,
  CustonTabPanel,
} from '@iso/components/uielements/tabs';
import basicStyle from '@iso/assets/styles/constants';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutHeaderActionWrapper from '@iso/components/utility/layoutHeaderActionWrapper';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import ProfileBio from './Profile/Bio';
import ProfileContactInfo from './Profile/ContactInfo';
import ProfileLinks from './Profile/Links';
import authAction from '@iso/redux/auth/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SubscriptionAction from '@iso/redux/SubscriptionsPlan/action';
import ColorSchemaAction from '@iso/redux/ColorSchema/action';

const { getColorSchema } = ColorSchemaAction;
const { getSubscription } = SubscriptionAction;
const { getProfile } = authAction;
const { Title } = Typography;

const tabsHeader = [
  {
    key: 1,
    title: 'Contact Information',
  },
  {
    key: 2,
    title: 'Bio',
  },
  {
    key: 3,
    title: 'Links',
  },
];

class Profile extends Component {
  state = {
    activeTab: 1,
    SubStatus: true,
  };

  async componentDidMount() {
    await this.props.getColorSchema();
    await this.props.getProfile();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.SubStatus !== prevProps.Status) {
      this.setState({
        SubStatus: this.props.Status,
      });
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
          <Title level={2}>Profile</Title>
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
                {/* Contact Information */}
                <CustonTabPanel tabkey={1}>
                  <ProfileContactInfo />
                </CustonTabPanel>
                {/* Bio */}
                <CustonTabPanel tabkey={2}>
                  <ProfileBio />
                </CustonTabPanel>
                {/* Links */}
                <CustonTabPanel tabkey={3}>
                  <ProfileLinks />
                </CustonTabPanel>
              </CustomTabPanelContainer>
            </Col>
          </Row>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  LOSubscription: state.subscription.LOSubscription,
  Status: state.subscription.status,
  profileDetails: state.Auth.profileObj,
});
const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(getProfile()),
  getSubscription: () => dispatch(getSubscription()),
  getColorSchema: () => dispatch(getColorSchema()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
