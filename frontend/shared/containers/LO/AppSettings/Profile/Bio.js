import React, { Component } from 'react';
import { Row, Col, Typography, notification, Tooltip } from 'antd';
import Editor from '@iso/components/uielements/editor';
import Switch from '@iso/components/uielements/switch';
import Button from '@iso/components/uielements/button';
import IsoWidgetsWrapper from '@iso/containers/Global/Common/WidgetsWrapper';
import Box from '@iso/components/utility/box';
import basicStyle from '@iso/assets/styles/constants';
import BlankPlaceHolderImg from '@iso/assets/images/blank.png';
import PhonePlaceHolderImg from '@iso/assets/images/phone-img.png';
import infoImg from '@iso/assets/images/info.png';
import Image from '@iso/ui/Image/Image';
import IntlMessages from '@iso/components/utility/intlMessages';
import authAction from '@iso/redux/auth/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';
import Input from '@iso/components/uielements/input';
import { MobailView } from '../MobailView';

const { saveBio, getProfile, saveImage, saveLogo } = authAction;
const { Text } = Typography;

class ProfileBio extends Component {
  state = {
    editorBioState: null,
    company_logo: null,
    company_preview: null,
    colorForMobail: '',
    preview: false,
  };

  componentDidMount() {
    let { profileDetails, ColorThemesData } = this.props;

    if (!isEmpty(profileDetails)) {
      this.setState({
        editorBioState: profileDetails?.bio ?? null,
        company_logo: profileDetails.logo ?? null,
      });
      ColorThemesData.map(
        (x) =>
          x.default &&
          this.setState({
            colorForMobail: x.dark_color,
          })
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { profileDetails, ColorThemesData } = this.props;
    if (prevProps.profileDetails !== profileDetails) {
      if (!isEmpty(profileDetails)) {
        this.setState({
          editorBioState: profileDetails?.bio ?? null,
          company_logo: profileDetails?.logo ?? null,
        });
        ColorThemesData.map(
          (x) =>
            x.default &&
            this.setState({
              colorForMobail: x.dark_color,
            })
        );
      }
    }
  }

  onEditorStateBioChange = (editorState) => {
    this.setState({
      editorBioState: editorState,
    });
  };

  logoChange = (e) => {
    let { company_preview } = this.state;
    if (e.target.files[0]) {
      if (
        !['image/png', 'image/jpeg', 'image/jpg'].includes(
          e.target.files[0].type
        )
      ) {
        notification.open({
          message: 'Please select only image files',
        });
        return;
      }
    }
    this.setState({
      company_preview: e.target.files[0]
        ? URL.createObjectURL(e.target.files[0])
        : !isEmpty(company_preview)
        ? company_preview
        : null,
      company_logo: isEmpty(e.target.files)
        ? this.state.company_logo
        : e.target.files[0],
    });
  };

  handlePreview = async () => {
    let {
      editorBioState,
      profile_photo,
      company_logo,
      company_preview,
    } = this.state;

    this.setState({
      editorBioState: editorBioState,
      profile_photo: profile_photo,
      company_logo: company_logo,
      company_preview: company_preview,
      preview: true,
    });
  };

  handleSubmit = async () => {
    let { editorBioState, company_logo, company_preview } = this.state;

    let htmlErrorChecks = {};
    if (
      !editorBioState ||
      editorBioState.replace(/<(.|\n)*?>/g, '').trim().length === 0
    ) {
      htmlErrorChecks.bioError = true;
    }

    await this.props.saveBio({
      bio: htmlErrorChecks?.bioError ? null : editorBioState,
      welcome_text: this.props.bi,
    });

    if (company_logo && typeof company_logo == 'object') {
      await this.props.saveLogo({
        company_logo,
      });
    }

    this.setState({
      company_preview: company_preview,
    });
  };

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const BioType = 'Bio';
    const {
      editorBioState,
      company_logo,
      company_preview,
      preview,
    } = this.state;
    const { profileDetails } = this.props;

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
      <Row
        style={rowStyle}
        gutter={0}
        justify="start"
        className="dashboardContent profileBioContent"
      >
        <Col xl={12} lg={13} md={14} xs={24} style={colStyle}>
          <IsoWidgetsWrapper className="mb-3">
            <Box
              title={<IntlMessages id="page.profile.companyLogo" />}
              footer={
                <div className="dashboardButtonwrapper">
                  <label className="uploadPhotobtn">
                    <Input
                      name="company_logo"
                      type="file"
                      placeholder=""
                      onChange={this.logoChange}
                      accept="image/png, image/jpeg"
                    />
                    Choose File
                  </label>
                  <Tooltip title="Please upload company logo in 512x280 resolution">
                    <img alt="info" src={infoImg} />
                  </Tooltip>
                </div>
              }
            >
              {company_preview ? (
                <div
                  className="bioPhotoWrapper"
                  style={{
                    backgroundImage: `${'url('}${company_preview}${')'}`,
                  }}
                ></div>
              ) : (
                <div
                  className="bioPhotoWrapper"
                  style={{
                    backgroundImage: `${'url('}${
                      !isEmpty(profileDetails)
                        ? !isEmpty(profileDetails.logo)
                          ? profileDetails.logo
                          : BlankPlaceHolderImg
                        : BlankPlaceHolderImg
                    }${')'}`,
                  }}
                ></div>
              )}
            </Box>
          </IsoWidgetsWrapper>
          <div className="isoTexteditor">
            {/* <IsoWidgetsWrapper className="mb-3">
              <Box title={<IntlMessages id="page.profile.welcomeScreen" />}>
                <Editor
                  moduleType="simple"
                  placeholder={'Write something...'}
                  handleChangeParent={this.onEditorStateWelcomeChange}
                  value={editorWelcomeState}
                />
              </Box>
            </IsoWidgetsWrapper> */}
            <IsoWidgetsWrapper className="mb-3">
              <Box title={<IntlMessages id="page.profile.bio" />}>
                <Editor
                  moduleType="simple"
                  placeholder={'Write something...'}
                  handleChangeParent={this.onEditorStateBioChange}
                  value={editorBioState}
                />
              </Box>
            </IsoWidgetsWrapper>
          </div>
          <IsoWidgetsWrapper>
            <Box
              footer={
                <div className="dashboardButtonwrapper">
                  <Button className="dashboardBtn" onClick={this.handlePreview}>
                    Preview
                  </Button>
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
              <div className="launchIconSwitch">
                <Text>Use my photo for Android launch icon</Text>
                <Switch />
              </div>
            </Box>
          </IsoWidgetsWrapper>
        </Col>
        <Col xl={12} lg={11} md={10} xs={24} style={colStyle}>
          <div className="dashboardPhoneImg">
            <Image src={PhonePlaceHolderImg} alt={'phone image'} />
            {!preview
              ? MobailView(
                  logo,
                  profile_photo,
                  name,
                  designation,
                  licence,
                  this.state.colorForMobail,
                  this.state.colorForMobail,
                  social_links,
                  bio,
                  BioType
                )
              : MobailView(
                  company_logo,
                  profile_photo,
                  name,
                  designation,
                  licence,
                  this.state.colorForMobail,
                  this.state.colorForMobail,
                  social_links,
                  editorBioState,
                  BioType
                )}
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  profileDetails: state.Auth.profileObj,
  ColorThemesData: state.colorSchema.ColorSchemaTheme,
});
const mapDispatchToProps = (dispatch) => ({
  saveBio: (payload) => dispatch(saveBio(payload)),
  getProfile: (payload) => dispatch(getProfile()),
  saveImage: (payload) => dispatch(saveImage(payload)),
  saveLogo: (payload) => dispatch(saveLogo(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileBio)
);
