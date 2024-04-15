import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Switch from '@iso/components/uielements/switch';
import IsoWidgetsWrapper from '@iso/containers/Global/Common/WidgetsWrapper';
import Box from '@iso/components/utility/box';
import basicStyle from '@iso/assets/styles/constants';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import dashboardAction from '@iso/redux/loanofficer/appsetting/actions';

const { appMortgageGuideChange } = dashboardAction;

class Guide extends Component {
  state = {
    morgageGuidesValue: [],
  };

  componentDidUpdate(prevProps) {
    const { MortgageGuideList } = this.props;
    if (prevProps?.MortgageGuideList !== MortgageGuideList)
      this.setState({
        morgageGuidesValue: this.props.MortgageGuideList,
      });
  }

  handleClick = (name, checks) => {
    let changeData = this.state.morgageGuidesValue.map((item) => ({
      ...item,
      status: item.name === name ? !checks : item.status,
    }));
    this.props.appMortgageGuideChange({
      mortgage_guide: changeData,
    });
  };

  render() {
    const { rowStyle, colStyle } = basicStyle;
    return (
      <Row style={rowStyle} gutter={0} justify="start">
        <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
          <IsoWidgetsWrapper className="mb-3">
            <Box title="Guide">
              <Row style={rowStyle} gutter={25} justify="start">
                {this.state.morgageGuidesValue.map((guide, index) => (
                  <React.Fragment key={index}>
                    <Col lg={14} md={6} sm={6} xs={18} style={colStyle}>
                      {guide.name}
                    </Col>
                    <Col lg={10} md={6} sm={6} xs={6} style={colStyle}>
                      <div className="ml-auto w-content">
                        <Switch
                          checked={guide.status}
                          onChange={() =>
                            this.handleClick(guide.name, guide.status)
                          }
                        />
                      </div>
                    </Col>
                  </React.Fragment>
                ))}
              </Row>
            </Box>
          </IsoWidgetsWrapper>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  MortgageGuideList: state.LOAppSetting.appSettingsMortgageGuideList,
});
const mapDispatchToProps = (dispatch) => ({
  appMortgageGuideChange: (payload) =>
    dispatch(appMortgageGuideChange(payload)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Guide));
