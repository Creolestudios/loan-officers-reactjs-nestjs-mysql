import React, { Component } from 'react';
import { Row, Col, Typography } from 'antd';
import Box from '@iso/components/utility/box';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GuideAction from '@iso/redux/SubscriptionsPlan/action';

const { getLOSupportGUide } = GuideAction;
const { Title } = Typography;

const styless = {
  display: 'flex',
  flexWrap: 'nowrap',
  overflowX: 'auto',
};

class Guide extends Component {
  componentDidMount() {
    this.props.getLOSupportGUide();
  }

  handleDisplay = (arr, name, indexofkey) => {
    const data = this.props.SupportGuideCategoryList;

    return (
      <LayoutContentWrapper
        className="guideGeneralSection guideCommonSection"
        key={indexofkey}
      >
        <Row gutter={0}>
          <Col lg={24} md={24} sm={24} xs={24}>
            <Box title={name}>
              <Row style={styless}>
                {arr.map((item, index) => (
                  <Col xl={6} lg={8} md={10} sm={12} xs={24} key={index}>
                    <span className="guideTitle">{item.title}</span>
                    <iframe
                      src={item.guide_url}
                      frameBorder="0"
                      allowFullScreen="allowfullscreen"
                      height="190px"
                    ></iframe>
                    <span className="guideDesc">{item.description}</span>
                  </Col>
                ))}
              </Row>
            </Box>
          </Col>
        </Row>
      </LayoutContentWrapper>
    );
  };

  render() {
    const { SupprtGuideList } = this.props;
    const data = Object.keys(SupprtGuideList);

    return (
      <React.Fragment>
        <LayoutHeaderWrapper>
          <Title level={2}>Guide</Title>
        </LayoutHeaderWrapper>
        {data.map((item, index) =>
          this.handleDisplay(SupprtGuideList[item], item, index)
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  SupprtGuideList: state.subscription.LOSupportGuides,
  SupportGuideCategoryList: state.AdminSupportGuide.SupportGuideCategory,
});
const mapDispatchToProps = (dispatch) => ({
  getLOSupportGUide: () => dispatch(getLOSupportGUide()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Guide));
