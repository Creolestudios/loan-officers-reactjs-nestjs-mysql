import React, { Component } from 'react';
import { Row, Col, Card, Typography, message, Avatar } from 'antd';
import Button from '@iso/components/uielements/button';
import IsoWidgetsWrapper from '@iso/containers/Global/Common/WidgetsWrapper';
import Box from '@iso/components/utility/box';
import basicStyle from '@iso/assets/styles/constants';
import PhonePlaceHolderImg from '@iso/assets/images/phone-img.png';
import CalculatorImg from '@iso/assets/images/calculator.svg';
import SearchImg from '@iso/assets/images/scheme-search.svg';
import GuideImg from '@iso/assets/images/guide.svg';
import Image from '@iso/ui/Image/Image';
import Checkbox from '@iso/components/uielements/checkbox';
import isEmpty from 'lodash/isEmpty';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import { MobailView } from '../MobailView';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ColorSchemaAction from '@iso/redux/ColorSchema/action';

const { getColorSchema, updateColorSchema } = ColorSchemaAction;
const { Title } = Typography;

class ColorScheme extends Component {
  state = {
    value: '',
    valueName: '',
    valueDefault: '',
  };

  async componentDidMount() {
    await this.props.getColorSchema();
  }

  componentDidUpdate(prevProps) {
    const themeData = this.props.ColorThemesData;

    if (prevProps.ColorThemesData !== themeData) {
      themeData.map(
        (x) =>
          x.default &&
          this.setState({
            valueDefault: x.dark_color,
            value: [x.theme],
            valueName: x.secondary_color,
          })
      );
    }
  }

  handleChange = (checkedValues) => {
    if (isEmpty(checkedValues)) {
      this.setState({
        valueName: '#1F2428',
      });
    }
    const themeData = this.props.ColorThemesData;
    themeData.map(
      (x) =>
        x.theme === checkedValues[0] &&
        this.setState({
          valueName: x.secondary_color,
          valueDefault: x.dark_color,
        })
    );
    this.setState({
      value: checkedValues,
    });
  };

  handleSubmit = () => {
    if (isEmpty(this.state.value)) {
      return message.error('Please select at least one theme color');
    } else {
      this.props.updateColorSchema({
        theme: this.state.value[0],
      });
    }
  };

  card = (backgroundcolor, color, theme, fontColor, defaults) => {
    return (
      <div>
        <Checkbox.Group onChange={this.handleChange} value={this.state.value}>
          <Checkbox value={defaults} style={{ fontWeight: 'bold' }}>
            {theme}
          </Checkbox>
          <Card
            style={{
              textAlign: 'center',
              width: '100%',
              hight: '20vh',
              backgroundColor: backgroundcolor,
              border: '1px solid ' + fontColor,
            }}
          >
            <div className="colorSchemeAvtar">
              <Avatar
                style={{
                  color: color,
                  backgroundColor: backgroundcolor,
                }}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 40 41"
                    width="40"
                    height="41"
                    fill={color}
                  >
                    <path
                      id="Layer"
                      fillRule="evenodd"
                      // class="shp0"
                      d="M34.14 6.61C37.89 10.36 40 15.45 40 20.75C40 24.71 38.83 28.57 36.63 31.86C34.43 35.15 31.31 37.71 27.65 39.23C24 40.74 19.98 41.14 16.1 40.37C12.22 39.59 8.65 37.69 5.86 34.89C3.06 32.1 1.16 28.53 0.38 24.65C-0.39 20.77 0.01 16.75 1.52 13.1C3.04 9.44 5.6 6.32 8.89 4.12C12.18 1.92 16.04 0.75 20 0.75C25.3 0.75 30.39 2.86 34.14 6.61ZM31.43 33.49C34.02 31.17 35.84 28.13 36.66 24.75C37.48 21.37 37.25 17.83 36.01 14.58C34.77 11.34 32.57 8.55 29.71 6.58C26.85 4.61 23.46 3.56 19.98 3.56C16.51 3.56 13.12 4.62 10.26 6.59C7.4 8.56 5.2 11.36 3.97 14.6C2.73 17.85 2.51 21.39 3.33 24.77C4.15 28.15 5.98 31.19 8.57 33.5L8.57 32.67C8.57 32.65 8.59 32.64 8.59 32.62C8.54 30.68 9.27 28.79 10.6 27.37C11.93 25.95 13.77 25.11 15.71 25.04L24.29 25.04C26.23 25.11 28.07 25.95 29.41 27.37C30.74 28.79 31.47 30.67 31.43 32.62L31.43 33.49Z"
                    />
                    <path
                      id="Layer"
                      // class="shp0"
                      d="M20 7.89C18.59 7.89 17.21 8.31 16.03 9.1C14.86 9.88 13.94 11 13.4 12.3C12.86 13.61 12.72 15.04 12.99 16.43C13.27 17.81 13.95 19.09 14.95 20.09C15.95 21.09 17.22 21.77 18.61 22.04C19.99 22.32 21.43 22.18 22.73 21.63C24.04 21.09 25.15 20.18 25.94 19C26.72 17.83 27.14 16.45 27.14 15.04C27.14 13.14 26.39 11.32 25.05 9.98C23.71 8.65 21.89 7.89 20 7.89Z"
                    />
                  </svg>
                }
              />
            </div>
            <Card
              style={{
                backgroundColor: 'white',
                textAlign: 'center',
              }}
            >
              <div className="colorSchemeDesc">
                <span className="schemeDesc calculator">
                  <Image src={CalculatorImg} alt={'calculator image'} />
                  <p>Calculator</p>
                </span>
                <span className="schemeDesc explore">
                  <Image src={SearchImg} alt={'search image'} />
                  <p>Explore</p>
                </span>
                <span className="schemeDesc guide">
                  <Image src={GuideImg} alt={'guide image'} />
                  <p>Guide</p>
                </span>
              </div>
            </Card>
          </Card>
        </Checkbox.Group>
      </div>
    );
  };
  render() {
    const { rowStyle, colStyle } = basicStyle;
    const themeData = this.props.ColorThemesData;
    const {
      profile_photo,
      logo,
      bio,
      designation,
      name,
      licence,
      social_links,
    } = this.props.profileDetails;

    return (
      <React.Fragment>
        <LayoutHeaderWrapper>
          <Title level={2}>Color Scheme</Title>
        </LayoutHeaderWrapper>
        <LayoutContentWrapper className="isoLayoutContentWrapper appSettingsColorScheme">
          <Row
            style={rowStyle}
            gutter={0}
            justify="start"
            className="dashboardContent profileBioContent"
          >
            <Col lg={12} md={24} sm={24} xs={24} style={colStyle}>
              <IsoWidgetsWrapper className="mb-3">
                <Box
                  footer={
                    <div className="dashboardButtonwrapper">
                      {/* <Button className="dashboardBtn">Preview</Button> */}
                      <Button
                        className="dashboardBtn"
                        type="primary"
                        onClick={this.handleSubmit}
                      >
                        Save
                      </Button>
                    </div>
                  }
                >
                  <div className="coloSchemeWrapper">
                    {themeData.map((item, index) => (
                      <div className="colorSchemeLists" key={index}>
                        {this.card(
                          item.dark_color,
                          item.secondary_color,
                          item.theme,
                          item.font_color,
                          item.theme
                        )}
                      </div>
                    ))}
                  </div>
                </Box>
              </IsoWidgetsWrapper>
            </Col>
            <Col xl={12} lg={11} md={10} xs={24} style={colStyle}>
              <div className="dashboardPhoneImg">
                <Image src={PhonePlaceHolderImg} alt={'phone image'} />
                {MobailView(
                  logo,
                  profile_photo,
                  name,
                  designation,
                  licence,
                  this.state.valueDefault,
                  this.state.valueDefault,
                  social_links,
                  bio,
                  'Bio'
                )}
              </div>
            </Col>
          </Row>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  ColorThemesData: state.colorSchema.ColorSchemaTheme,
  profileDetails: state.Auth.profileObj,
});
const mapDispatchToProps = (dispatch) => ({
  getColorSchema: () => dispatch(getColorSchema()),
  updateColorSchema: (payload) => dispatch(updateColorSchema(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ColorScheme)
);
