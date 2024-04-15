import React, { Component } from 'react';
import { Row, Col, Form } from 'antd';
import Button from '@iso/components/uielements/button';
import Input from '@iso/components/uielements/input';
import IsoWidgetsWrapper from '@iso/containers/Global/Common/WidgetsWrapper';
import { AppConstant, HttpCheckRegex } from '@iso/config/constant';
import Box from '@iso/components/utility/box';
import { URLRegexValidator } from '@iso/lib/helpers/validators/commonValidators';
import basicStyle from '@iso/assets/styles/constants';
import PhonePlaceHolderImg from '@iso/assets/images/phone-img.png';
import Image from '@iso/ui/Image/Image';
import IntlMessages from '@iso/components/utility/intlMessages';
import { connect } from 'react-redux';
import authAction from '@iso/redux/auth/actions';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { MobailView } from '../MobailView';

const { getProfile, saveLinks } = authAction;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class ProfileLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: false,
    };
  }

  formRef = React.createRef();

  handlePreview = () => {
    this.setState({ preview: true });
  };

  handleSubmit = async (data) => {
    const filteredData = {};
    Object.keys(data).map((field) => {
      if (!data[field]) {
        filteredData[field] = null;
      } else {
        /* HTTP check */
        if (HttpCheckRegex.test(data[field])) {
          filteredData[field] = data[field];
          return;
        }

        filteredData[field] = 'http://' + data[field];
        return;
      }
    });

    await this.props.saveLinks(filteredData);
  };

  render() {
    const { rowStyle, colStyle } = basicStyle;
    let { profileDetails } = this.props;
    const BioType = 'Bio';

    const {
      profile_photo,
      logo,
      bio,
      designation,
      name,
      licence,
      social_links,
    } = this.props.profileDetails;

    const themes =
      !isEmpty(this.props.ColorThemesData) &&
      this.props.ColorThemesData.filter((x) => x.default);

    return (
      <Row
        style={rowStyle}
        gutter={0}
        justify="start"
        className="dashboardContent profileBioContent"
      >
        <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
          <IsoWidgetsWrapper className="mb-3 dashboardContent">
            <Form
              fields={[
                {
                  name: ['website_link'],
                  value: !isEmpty(profileDetails)
                    ? profileDetails.social_links.website_link
                    : '',
                },
                {
                  name: ['facebook_link'],
                  value: !isEmpty(profileDetails)
                    ? profileDetails.social_links.facebook_link
                    : '',
                },
                {
                  name: ['twitter_link'],
                  value: !isEmpty(profileDetails)
                    ? profileDetails.social_links.twitter_link
                    : '',
                },
                {
                  name: ['linkedin_link'],
                  value: !isEmpty(profileDetails)
                    ? profileDetails.social_links.linkedin_link
                    : '',
                },
                {
                  name: ['instagram_link'],
                  value: !isEmpty(profileDetails)
                    ? profileDetails.social_links.instagram_link
                    : '',
                },
                {
                  name: ['youtube_link'],
                  value: !isEmpty(profileDetails)
                    ? profileDetails.social_links.youtube_link
                    : '',
                },
                {
                  name: ['tikTok_link'],
                  value: !isEmpty(profileDetails)
                    ? profileDetails.social_links.tikTok_link
                    : '',
                },
              ]}
              ref={this.formRef}
              onFinish={this.handleSubmit}
            >
              <Box
                footer={
                  <div className="dashboardButtonwrapper">
                    <Button
                      className="dashboardBtn"
                      onClick={this.handlePreview}
                    >
                      PREVIEW
                    </Button>
                    <Button
                      className="dashboardBtn"
                      type="primary"
                      htmlType="submit"
                    >
                      SAVE
                    </Button>
                  </div>
                }
              >
                <FormItem
                  {...formItemLayout}
                  name="website_link"
                  // rules={[
                  //   {
                  //     pattern: URLRegexValidator,
                  //     message: AppConstant.FormValidation.urlInvalid,
                  //   },
                  // ]}
                  label={<IntlMessages id="form.profile.websiteURL" />}
                >
                  <Input size="large" placeholder="Enter Here" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  name="facebook_link"
                  // rules={[
                  //   {
                  //     pattern: URLRegexValidator,
                  //     message: AppConstant.FormValidation.urlInvalid,
                  //   },
                  // ]}
                  label={<IntlMessages id="form.profile.facebookURL" />}
                >
                  <Input size="large" placeholder="Enter Here" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  name="twitter_link"
                  // rules={[
                  //   {
                  //     pattern: URLRegexValidator,
                  //     message: AppConstant.FormValidation.urlInvalid,
                  //   },
                  // ]}
                  label={<IntlMessages id="form.profile.twitterURL" />}
                >
                  <Input size="large" placeholder="Enter Here" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  name="linkedin_link"
                  // rules={[
                  //   {
                  //     pattern: URLRegexValidator,
                  //     message: AppConstant.FormValidation.urlInvalid,
                  //   },
                  // ]}
                  label={<IntlMessages id="form.profile.linkedInURL" />}
                >
                  <Input size="large" placeholder="Enter Here" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  name="instagram_link"
                  // rules={[
                  //   {
                  //     pattern: URLRegexValidator,
                  //     message: AppConstant.FormValidation.urlInvalid,
                  //   },
                  // ]}
                  label={<IntlMessages id="form.profile.instagramURL" />}
                >
                  <Input size="large" placeholder="Enter Here" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  name="youtube_link"
                  // rules={[
                  //   {
                  //     pattern: URLRegexValidator,
                  //     message: AppConstant.FormValidation.urlInvalid,
                  //   },
                  // ]}
                  label={<IntlMessages id="form.profile.youtubeURL" />}
                >
                  <Input size="large" placeholder="Enter Here" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  name="tikTok_link"
                  // rules={[
                  //   {
                  //     pattern: URLRegexValidator,
                  //     message: AppConstant.FormValidation.urlInvalid,
                  //   },
                  // ]}
                  label={<IntlMessages id="form.profile.tiktokURL" />}
                >
                  <Input size="large" placeholder="Enter Here" />
                </FormItem>
              </Box>
            </Form>
          </IsoWidgetsWrapper>
        </Col>
        <Col lg={12} md={24} sm={24} xs={24} style={colStyle}>
          <div className="dashboardPhoneImg">
            <Image src={PhonePlaceHolderImg} alt={'phone image'} />
            {!this.state.preview
              ? MobailView(
                  logo,
                  profile_photo,
                  name,
                  designation,
                  licence,
                  themes[0]?.dark_color,
                  themes[0]?.dark_color,
                  social_links,
                  bio,
                  BioType
                )
              : MobailView(
                  logo,
                  profile_photo,
                  name,
                  designation,
                  licence,
                  themes[0]?.dark_color,
                  themes[0]?.dark_color,
                  this.state.formData,
                  bio,
                  BioType
                )}
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  ColorThemesData: state.colorSchema.ColorSchemaTheme,
  profileDetails: state.Auth.profileObj,
});
const mapDispatchToProps = (dispatch) => ({
  saveLinks: (payload) => dispatch(saveLinks(payload)),
  getProfile: (payload) => dispatch(getProfile()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileLinks)
);
