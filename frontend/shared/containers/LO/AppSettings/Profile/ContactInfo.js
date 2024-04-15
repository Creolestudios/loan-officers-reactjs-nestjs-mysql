import React, { Component } from 'react';
import { Row, Col, Form, notification } from 'antd';
import InputMask from 'react-input-mask';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Button from '@iso/components/uielements/button';
import Editor from '@iso/components/uielements/editor';
import Switch from '@iso/components/uielements/switch';
import Input from '@iso/components/uielements/input';
import {
  AppConstant,
  PhoneNumberUnMaskRegex,
  PhoneNumberMaskRegex,
  NameRegex,
  StatesList,
  EmailRegex,
  appointmentImageArr,
} from '@iso/config/constant';
import {
  sanitizedObjectData,
  dashboardHeaderLinkMapper,
} from '@iso/lib/helpers/functions';
import IsoWidgetsWrapper from '@iso/containers/Global/Common/WidgetsWrapper';
import Box from '@iso/components/utility/box';
import basicStyle from '@iso/assets/styles/constants';
import UserPlaceHolderImg from '@iso/assets/images/avatar.png';
import lodashSize from 'lodash/size';
import PhonePlaceHolderImg from '@iso/assets/images/phone-img.png';
import Image from '@iso/ui/Image/Image';
import IntlMessages from '@iso/components/utility/intlMessages';
import authAction from '@iso/redux/auth/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { MobailView } from '../MobailView';
import { URLRegex } from '@iso/lib/helpers/validators/commonValidators';

const {
  saveBio,
  saveImage,
  saveProfile,
  getProfile,
  saveDashLinks,
} = authAction;
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

const dashboardSwitchkeys = [
  'bio',
  'dm',
  'call',
  'text',
  'email',
  'appointment',
];

class ProfileContactInfo extends Component {
  state = {
    editorWelcomeState: null,
    profile_photo: null,
    colorForMobail: '',
    profile_preview: null,
    dashboardHeaderForm: {
      bio: false,
      dm: false,
      call: false,
      call_input: '',
      text: false,
      text_input: '',
      email: false,
      email_input: '',
      appointment: false,
      appointment_input: '',
      appointment_icon: 'gallery',
      appointment_label: 'Link',
    },
    dashboardHeaderFormErrors: {},
  };
  formRef = React.createRef();

  componentDidMount() {
    this.props.getProfile();
    let { profileDetails, ColorThemesData } = this.props;
    if (!isEmpty(profileDetails)) {
      this.setState({
        editorWelcomeState: profileDetails?.welcome_text ?? null,
        profile_photo: profileDetails?.profile_photo ?? null,
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
    let { dashboardHeaderForm } = this.state;

    let contact_number = '';

    if (profileDetails?.contact_number) {
      const actualNumber = profileDetails.contact_number.toString();
      contact_number += `(${actualNumber.substring(
        0,
        3
      )}) ${actualNumber.substring(3, 6)}-${actualNumber.substring(6, 10)}`;
    }

    if (prevProps.profileDetails !== profileDetails) {
      if (!isEmpty(profileDetails)) {
        this.setState({
          editorWelcomeState: profileDetails?.welcome_text ?? null,
          profile_photo: profileDetails?.profile_photo ?? null,
        });

        this.formRef.current.setFieldsValue({
          first_name: !isEmpty(profileDetails)
            ? profileDetails.name
              ? profileDetails.name.split(' ')[0]
              : ''
            : '',
          last_name: !isEmpty(profileDetails)
            ? profileDetails.name
              ? profileDetails.name.split(' ')[1]
              : ''
            : '',
          company_name: profileDetails.company_name || '',
          designation: profileDetails.designation || '',
          licence: profileDetails.licence || '',
          contact_number: contact_number,
          street_details: profileDetails.street_details || '',
          city: profileDetails.city || '',
          state_id: profileDetails.state_id || '',
          zip_code: profileDetails.zip_code || '',
        });

        ColorThemesData.map(
          (x) =>
            x.default &&
            this.setState({
              colorForMobail: x.dark_color,
            })
        );

        if (profileDetails?.dashboard_header_links) {
          const payload = {};
          /* NOTE: Adding manually country code */
          let callNumber =
            profileDetails?.dashboard_header_links?.call?.input
              ?.toString()
              ?.replace(/\+1-/, '') ?? '';
          let textNumber =
            profileDetails?.dashboard_header_links?.text?.input
              ?.toString()
              ?.replace(/\+1-/, '') ?? '';

          // Bio
          payload.bio =
            profileDetails.dashboard_header_links?.bio?.status ?? false;
          // DM
          payload.dm =
            profileDetails.dashboard_header_links?.dm?.status ?? false;
          // Call
          payload.call =
            profileDetails.dashboard_header_links?.call?.status ?? false;
          payload.call_input = callNumber
            ? `(${callNumber.substring(0, 3)}) ${callNumber.substring(
                3,
                6
              )}-${callNumber.substring(6, 10)}`
            : '';
          // Text
          payload.text =
            profileDetails.dashboard_header_links?.text?.status ?? false;
          payload.text_input = textNumber
            ? `(${textNumber.substring(0, 3)}) ${textNumber.substring(
                3,
                6
              )}-${textNumber.substring(6, 10)}`
            : '';
          // Email
          payload.email =
            profileDetails.dashboard_header_links?.email?.status ?? false;
          payload.email_input =
            profileDetails.dashboard_header_links?.email?.input ?? '';
          // Appointment
          payload.appointment =
            profileDetails.dashboard_header_links?.appointment?.status ?? false;
          payload.appointment_input =
            profileDetails.dashboard_header_links?.appointment?.input ?? '';
          payload.appointment_icon =
            profileDetails.dashboard_header_links?.appointment?.icon ||
            'gallery';
          payload.appointment_label =
            profileDetails.dashboard_header_links?.appointment
              ?.appointment_label || 'Link';

          this.setState(
            {
              dashboardHeaderForm: {
                ...dashboardHeaderForm,
                ...payload,
              },
            },
            () => this.validateDashboardErrors()
          );
        }
      }
    }
  }
  onEditorStateWelcomeChange = (editorState) => {
    this.setState({
      editorWelcomeState: editorState,
    });
  };

  imageChange = (e) => {
    let { profile_preview } = this.state;

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
      profile_preview: e.target.files[0]
        ? URL.createObjectURL(e.target.files[0])
        : !isEmpty(profile_preview)
        ? profile_preview
        : null,
      profile_photo: isEmpty(e.target.files)
        ? this.state.profile_photo
        : e.target.files[0],
    });
  };

  handleLogin = async (data) => {
    let {
      editorWelcomeState,
      profile_photo,
      dashboardHeaderForm,
      dashboardHeaderFormErrors,
    } = this.state;
    let htmlErrorChecks = {};
    if (
      !editorWelcomeState ||
      editorWelcomeState.replace(/<(.|\n)*?>/g, '').trim().length === 0
    ) {
      htmlErrorChecks.welcomeError = true;
    }

    if (lodashSize(dashboardHeaderFormErrors)) {
      return;
    }

    const dashLinksPayload = this.mapDashLinkPayloadForResponse();

    const sanitizedData = sanitizedObjectData(data);
    Object.keys(data).map((field) => {
      if (typeof data[field] === 'string') {
        sanitizedData[field] = data[field].trim();
      } else {
        sanitizedData[field] = data[field];
      }
    });

    const payload = {};
    Object.keys(sanitizedData).map((field) => {
      if (sanitizedData[field] === undefined || sanitizedData[field] === '');
      else {
        payload[field] = sanitizedData[field];
      }
    });

    if (payload?.contact_number) {
      payload.contact_number = +payload.contact_number.replace(
        PhoneNumberUnMaskRegex,
        ''
      );
    }

    await this.props.saveBio({
      bio: this.props?.profileDetails?.bio,
      welcome_text: htmlErrorChecks?.welcomeError ? null : editorWelcomeState,
      is_contact_details: payload,
    });

    await this.props.saveDashLinks(dashLinksPayload);

    if (profile_photo && typeof profile_photo == 'object') {
      await this.props.saveImage({
        profile_photo,
      });
    }
  };

  mapDashLinkPayloadForResponse = () => {
    let { dashboardHeaderForm } = this.state;
    const payload = {};
    payload.bio = {
      status: dashboardHeaderForm.bio,
    };
    payload.dm = {
      status: dashboardHeaderForm.dm,
    };
    payload.call = {
      status: dashboardHeaderForm.call,
      input: dashboardHeaderForm.call_input
        ? +dashboardHeaderForm.call_input.replace(/[\(\)\s\-'"]/g, '')
        : '',
    };
    payload.text = {
      status: dashboardHeaderForm.text,
      input: dashboardHeaderForm.text_input
        ? +dashboardHeaderForm.text_input.replace(/[\(\)\s\-'"]/g, '')
        : '',
    };
    payload.email = {
      status: dashboardHeaderForm.email,
      input: dashboardHeaderForm.email_input,
    };
    payload.appointment = {
      status: dashboardHeaderForm.appointment,
      input: dashboardHeaderForm.appointment_input,
      icon: dashboardHeaderForm.appointment_icon,
      appointment_label: dashboardHeaderForm.appointment_label,
    };

    return payload;
  };

  handleCallDashInputChange = (event) => {
    const { dashboardHeaderForm } = this.state;
    this.setState(
      {
        dashboardHeaderForm: {
          ...dashboardHeaderForm,
          [event.target.name]: event.target.value,
        },
      },
      () => {
        this.validateDashboardErrors();
      }
    );
  };

  handleAppointmentLabelChange = (event) => {
    const { dashboardHeaderForm } = this.state;
    this.setState(
      {
        dashboardHeaderForm: {
          ...dashboardHeaderForm,
          [event.target.name]: event.target.value,
        },
      },
      () => {
        this.validateDashboardErrors();
      }
    );
  };

  handleAppointmentSelection = (value) => {
    const { dashboardHeaderForm } = this.state;
    this.setState(
      {
        dashboardHeaderForm: {
          ...dashboardHeaderForm,
          appointment_icon: value,
        },
      },
      () => {
        this.validateDashboardErrors();
      }
    );
  };

  handleDashSwitchChange = (checked, event) => {
    const { dashboardHeaderForm } = this.state;
    let keyCount = 1;
    if (checked) {
      dashboardSwitchkeys.forEach((key) => {
        if (dashboardHeaderForm[key]) {
          keyCount += 1;
        }
      });

      /* Max toggle switch is 4 */
      if (keyCount === 5) {
        notification.error({
          message: 'You can only select maximum of 4 options',
        });
        return;
      }
    }

    this.setState(
      {
        dashboardHeaderForm: {
          ...dashboardHeaderForm,
          [event.currentTarget.name]: checked,
        },
      },
      () => {
        this.validateDashboardErrors();
      }
    );
  };

  validateDashboardErrors = () => {
    let errors = {};
    const { dashboardHeaderForm } = this.state;
    // Phone validation
    if (dashboardHeaderForm.call) {
      if (!dashboardHeaderForm.call_input) {
        errors['call'] = AppConstant.FormValidation.numberRequired;
      } else if (!PhoneNumberMaskRegex.test(dashboardHeaderForm.call_input)) {
        errors['call'] = AppConstant.FormValidation.numberOnly;
      }
    }
    if (dashboardHeaderForm.text) {
      if (!dashboardHeaderForm.text_input) {
        errors['text'] = AppConstant.FormValidation.numberRequired;
      } else if (!PhoneNumberMaskRegex.test(dashboardHeaderForm.text_input)) {
        errors['text'] = AppConstant.FormValidation.numberOnly;
      }
    }

    // Email validation
    if (dashboardHeaderForm.email) {
      if (!dashboardHeaderForm.email_input) {
        errors['email'] = AppConstant.FormValidation.emailRequired;
      } else if (!EmailRegex.test(dashboardHeaderForm.email_input)) {
        errors['email'] = AppConstant.FormValidation.emailInvalid;
      }
    }

    // Appointment validation (URL)
    if (dashboardHeaderForm.appointment) {
      if (!dashboardHeaderForm.appointment_input) {
        errors['appointment'] = AppConstant.FormValidation.urlRequired;
      } else if (!URLRegex.test(dashboardHeaderForm.appointment_input)) {
        errors['appointment'] = AppConstant.FormValidation.urlInvalid;
      }
    }

    //Appointement validation (Label)
    if (!dashboardHeaderForm.appointment_label) {
      errors['appointment_label'] =
        AppConstant.FormValidation.appointmentLabelRequired;
    }

    this.setState({
      dashboardHeaderFormErrors: errors,
    });
  };

  handleSelectIcon = (icon) => {
    const { dashboardHeaderForm } = this.state;
    this.setState({
      dashboardHeaderForm: {
        ...dashboardHeaderForm,
        appointment_icon: icon.name,
      },
    });
  };

  render() {
    const { rowStyle, colStyle } = basicStyle;
    let { profileDetails } = this.props;
    const {
      editorWelcomeState,
      profile_preview,
      dashboardHeaderFormErrors,
    } = this.state;

    const {
      profile_photo,
      logo,
      designation,
      name,
      licence,
      social_links,
      dashboard_header_links,
    } = this.props.profileDetails;

    const themes =
      !isEmpty(this.props.ColorThemesData) &&
      this.props.ColorThemesData.filter((x) => x.default);

    const dashLinks = dashboardHeaderLinkMapper(dashboard_header_links);

    return (
      <Row
        style={rowStyle}
        gutter={0}
        justify="start"
        className="dashboardContent profileBioContent profileContentInfo"
      >
        <Col lg={12} md={24} sm={24} xs={24} style={colStyle}>
          <IsoWidgetsWrapper className="mb-3">
            <Box
              title={<IntlMessages id="page.profile.yourProfile" />}
              footer={
                <div className="dashboardButtonwrapper">
                  <label className="uploadPhotobtn">
                    <Input
                      name="profile_photo"
                      type="file"
                      placeholder=""
                      onChange={this.imageChange}
                      accept="image/png, image/jpeg"
                    />
                    Choose File
                  </label>
                  {/* <Button className="dashboardBtn">Edit</Button> */}
                  {/* <img alt="info" src={info} /> */}
                </div>
              }
            >
              {profile_preview ? (
                <div
                  className="bioPhotoWrapper"
                  style={{
                    backgroundImage: `${'url('}${profile_preview}${')'}`,
                  }}
                ></div>
              ) : (
                <div
                  className="bioPhotoWrapper"
                  style={{
                    backgroundImage: `${'url('}${
                      !isEmpty(profileDetails)
                        ? !isEmpty(profileDetails.profile_photo)
                          ? profileDetails.profile_photo
                          : UserPlaceHolderImg
                        : UserPlaceHolderImg
                    }${')'}`,
                  }}
                ></div>
              )}
            </Box>
          </IsoWidgetsWrapper>
          <IsoWidgetsWrapper className="mb-3">
            <Box title={<IntlMessages id="page.profile.dashboardHeader" />}>
              <Row style={rowStyle} gutter={10} justify="start" align="middle">
                <Col lg={5} md={7} sm={6} xs={18} style={colStyle}>
                  Bio
                </Col>
                <Col lg={2} md={3} sm={6} xs={6} style={colStyle}>
                  <div className="w-content">
                    <Switch
                      checked={this.state.dashboardHeaderForm.bio}
                      name="bio"
                      onChange={this.handleDashSwitchChange}
                    />
                  </div>
                </Col>
              </Row>
              <Row style={rowStyle} gutter={10} justify="start" align="middle">
                <Col lg={5} md={7} sm={6} xs={18} style={colStyle}>
                  DM
                </Col>
                <Col lg={2} md={3} sm={6} xs={6} style={colStyle}>
                  <div className="w-content">
                    <Switch
                      checked={this.state.dashboardHeaderForm.dm}
                      name="dm"
                      onChange={this.handleDashSwitchChange}
                    />
                  </div>
                </Col>
              </Row>
              <Row style={rowStyle} gutter={10} justify="start" align="middle">
                <Col lg={5} md={7} sm={6} xs={18} style={colStyle}>
                  Call
                </Col>
                <Col lg={2} md={3} sm={6} xs={6} style={colStyle}>
                  <div className="w-content">
                    <Switch
                      checked={this.state.dashboardHeaderForm.call}
                      name="call"
                      onChange={this.handleDashSwitchChange}
                    />
                  </div>
                </Col>
                {this.state.dashboardHeaderForm.call && (
                  <Col
                    lg={10}
                    md={10}
                    sm={10}
                    xs={18}
                    style={{ ...colStyle, marginLeft: 15 }}
                    className={`${
                      dashboardHeaderFormErrors?.call
                        ? 'ant-form-item-has-error'
                        : ''
                    }`}
                  >
                    <InputMask
                      mask={'(999) 999-9999'}
                      autoComplete="off"
                      placeholder={AppConstant.Placeholder.contactNumber}
                      name="call_input"
                      value={this.state.dashboardHeaderForm.call_input}
                      onChange={this.handleCallDashInputChange}
                      addonBefore={'+1'}
                      size="large"
                    >
                      {(inputProps) => {
                        return <Input {...inputProps} />;
                      }}
                    </InputMask>
                    {dashboardHeaderFormErrors?.call ? (
                      <ErrorMessageWrapper
                        msg={dashboardHeaderFormErrors?.cal}
                      />
                    ) : null}
                  </Col>
                )}
              </Row>
              <Row style={rowStyle} gutter={10} justify="start" align="middle">
                <Col lg={5} md={7} sm={6} xs={18} style={colStyle}>
                  Text
                </Col>
                <Col lg={2} md={3} sm={6} xs={6} style={colStyle}>
                  <div className="w-content">
                    <Switch
                      checked={this.state.dashboardHeaderForm.text}
                      name="text"
                      onChange={this.handleDashSwitchChange}
                    />
                  </div>
                </Col>
                {this.state.dashboardHeaderForm.text && (
                  <Col
                    lg={10}
                    md={10}
                    sm={10}
                    xs={18}
                    style={{ ...colStyle, marginLeft: 15 }}
                    className={`${
                      dashboardHeaderFormErrors?.text
                        ? 'ant-form-item-has-error'
                        : ''
                    }`}
                  >
                    <InputMask
                      mask={'(999) 999-9999'}
                      autoComplete="off"
                      placeholder={AppConstant.Placeholder.contactNumber}
                      name="text_input"
                      value={this.state.dashboardHeaderForm.text_input}
                      onChange={this.handleCallDashInputChange}
                      addonBefore={'+1'}
                      size="large"
                    >
                      {(inputProps) => {
                        return <Input {...inputProps} />;
                      }}
                    </InputMask>
                    {dashboardHeaderFormErrors?.text ? (
                      <ErrorMessageWrapper
                        msg={dashboardHeaderFormErrors?.text}
                      />
                    ) : null}
                  </Col>
                )}
              </Row>
              <Row style={rowStyle} gutter={10} justify="start" align="middle">
                <Col lg={5} md={7} sm={6} xs={18} style={colStyle}>
                  Email
                </Col>
                <Col lg={2} md={3} sm={6} xs={6} style={colStyle}>
                  <div className="w-content">
                    <Switch
                      checked={this.state.dashboardHeaderForm.email}
                      name="email"
                      onChange={this.handleDashSwitchChange}
                    />
                  </div>
                </Col>
                {this.state.dashboardHeaderForm.email && (
                  <Col
                    lg={10}
                    md={10}
                    sm={10}
                    xs={18}
                    style={{ ...colStyle, marginLeft: 15 }}
                    className={`${
                      dashboardHeaderFormErrors?.email
                        ? 'ant-form-item-has-error'
                        : ''
                    }`}
                  >
                    <Input
                      placeholder={AppConstant.Placeholder.email}
                      name="email_input"
                      value={this.state.dashboardHeaderForm.email_input}
                      onChange={this.handleCallDashInputChange}
                      size="large"
                    />
                    {dashboardHeaderFormErrors?.email ? (
                      <ErrorMessageWrapper
                        msg={dashboardHeaderFormErrors?.email}
                      />
                    ) : null}
                  </Col>
                )}
              </Row>
              <Row style={rowStyle} gutter={10} justify="start" align="middle">
                <Col
                  lg={5}
                  md={7}
                  sm={6}
                  xs={18}
                  style={colStyle}
                  className={`${
                    dashboardHeaderFormErrors?.appointment_label
                      ? 'ant-form-item-has-error'
                      : ''
                  }`}
                >
                  <Input
                    placeholder="Appointment Label"
                    name="appointment_label"
                    value={this.state.dashboardHeaderForm.appointment_label}
                    onChange={this.handleAppointmentLabelChange}
                    maxLength="11"
                  />
                  {dashboardHeaderFormErrors?.appointment_label ? (
                    <ErrorMessageWrapper
                      msg={dashboardHeaderFormErrors?.appointment_label}
                    />
                  ) : null}
                </Col>
                <Col lg={2} md={3} sm={6} xs={6} style={colStyle}>
                  <div className="w-content">
                    <Switch
                      checked={this.state.dashboardHeaderForm.appointment}
                      name="appointment"
                      onChange={this.handleDashSwitchChange}
                    />
                  </div>
                </Col>
                {this.state.dashboardHeaderForm.appointment && (
                  <Col
                    lg={10}
                    md={10}
                    sm={10}
                    xs={18}
                    style={{ ...colStyle, marginLeft: 15 }}
                    className={`${
                      dashboardHeaderFormErrors?.appointment
                        ? 'ant-form-item-has-error'
                        : ''
                    }`}
                  >
                    <Input
                      placeholder={AppConstant.Placeholder.url}
                      name="appointment_input"
                      value={this.state.dashboardHeaderForm.appointment_input}
                      onChange={this.handleCallDashInputChange}
                      size="large"
                    />
                    {dashboardHeaderFormErrors?.appointment ? (
                      <ErrorMessageWrapper
                        msg={dashboardHeaderFormErrors?.appointment}
                      />
                    ) : null}
                  </Col>
                )}
                {this.state.dashboardHeaderForm.appointment && (
                  <React.Fragment>
                    <Col className="break-row" />
                    <Col
                      lg={6}
                      md={6}
                      sm={6}
                      xs={18}
                      style={colStyle}
                      offset={4}
                      className="dashboard-header-appointment-icon-wrapper"
                    >
                      {appointmentImageArr.map((icon) => (
                        <div
                          className={`${
                            this.state.dashboardHeaderForm.appointment_icon ==
                            icon.name
                              ? 'active'
                              : ''
                          }`}
                          data-name={icon.name}
                          key={icon.id}
                          onClick={() => this.handleSelectIcon(icon)}
                        >
                          <icon.value className={`icon-${icon.name}`} />
                        </div>
                      ))}
                    </Col>
                  </React.Fragment>
                )}
              </Row>
            </Box>
          </IsoWidgetsWrapper>
          <div className="isoTexteditor">
            <IsoWidgetsWrapper className="mb-3">
              <Box title={<IntlMessages id="page.profile.welcomeScreen" />}>
                <Editor
                  moduleType="simple"
                  placeholder={'Write something...'}
                  handleChangeParent={this.onEditorStateWelcomeChange}
                  value={editorWelcomeState}
                />
              </Box>
            </IsoWidgetsWrapper>
          </div>

          <IsoWidgetsWrapper className="mb-3 dashboardContent">
            <Form onFinish={this.handleLogin} ref={this.formRef}>
              <Box
                footer={
                  <div className="dashboardButtonwrapper">
                    <Button className="dashboardBtn">PREVIEW</Button>
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
                  name="first_name"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: AppConstant.FormValidation.firstnameRequired,
                    },
                    {
                      pattern: NameRegex,
                      message: AppConstant.FormValidation.nameValid,
                    },
                  ]}
                  label={<IntlMessages id="form.profile.firstName" />}
                >
                  <Input size="large" placeholder="Enter Here" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  name="last_name"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: AppConstant.FormValidation.lastnameRequired,
                    },
                    {
                      pattern: NameRegex,
                      message: AppConstant.FormValidation.nameValid,
                    },
                  ]}
                  label={<IntlMessages id="form.profile.lastName" />}
                >
                  <Input size="large" placeholder="Enter Here" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  name="company_name"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: AppConstant.FormValidation.companyRequired,
                    },
                  ]}
                  label={<IntlMessages id="form.profile.companyName" />}
                >
                  <Input size="large" placeholder="Enter Here" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  name="designation"
                  label={<IntlMessages id="form.profile.title" />}
                >
                  <Input size="large" placeholder="Enter Here" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  name="licence"
                  label={<IntlMessages id="form.profile.licenseNMLS" />}
                >
                  <Input size="large" placeholder="Enter Here" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  name="contact_number"
                  rules={[
                    {
                      required: true,
                      message: AppConstant.FormValidation.numberRequired,
                    },
                    {
                      pattern: PhoneNumberMaskRegex,
                      message: AppConstant.FormValidation.numberOnly,
                    },
                  ]}
                  label={<IntlMessages id="form.profile.contactNumber" />}
                >
                  <InputMask
                    mask={'(999) 999-9999'}
                    autoComplete="off"
                    placeholder={AppConstant.Placeholder.enterHere}
                    size="large"
                  >
                    {(inputProps) => {
                      return <Input {...inputProps} />;
                    }}
                  </InputMask>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  name="street_details"
                  label={<IntlMessages id="form.profile.address" />}
                >
                  <Input size="large" placeholder="Enter Here" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  name="city"
                  // rules={[
                  //   {
                  //     pattern: NameRegex,
                  //     message: AppConstant.FormValidation.cityValid,
                  //   },
                  // ]}
                  label={<IntlMessages id="form.profile.city" />}
                >
                  <Input size="large" placeholder="Enter Here" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  name="state_id"
                  label={<IntlMessages id="form.profile.state" />}
                >
                  <Select placeholder="Select" size="large">
                    {StatesList.map((state) => (
                      <SelectOption value={state.value} key={state.value}>
                        {state.name}
                      </SelectOption>
                    ))}
                  </Select>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  name="zip_code"
                  label={<IntlMessages id="form.profile.zipCode" />}
                >
                  <Input size="large" placeholder="Enter Here" />
                </FormItem>
              </Box>
            </Form>
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
              themes[0]?.dark_color,
              themes[0]?.dark_color,
              social_links,
              editorWelcomeState,
              'Welcome!',
              dashLinks
            )}
          </div>
        </Col>
      </Row>
    );
  }
}

const ErrorMessageWrapper = ({ msg }) => (
  <div className="ant-form-item-explain">{msg}</div>
);

const mapStateToProps = (state) => ({
  profileDetails: state.Auth.profileObj,
  ColorThemesData: state.colorSchema.ColorSchemaTheme,
});
const mapDispatchToProps = (dispatch) => ({
  saveProfile: (payload) => dispatch(saveProfile(payload)),
  saveBio: (payload) => dispatch(saveBio(payload)),
  saveDashLinks: (payload) => dispatch(saveDashLinks(payload)),
  getProfile: () => dispatch(getProfile()),
  saveImage: (payload) => dispatch(saveImage(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileContactInfo)
);
