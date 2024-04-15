import React, { Component } from 'react';
import { Row, Col, Typography, Form } from 'antd';
import Button from '@iso/components/uielements/button';
import moment from 'moment';
import HeaderBreadCrumb, {
  DisabledLinkText,
} from '@iso/components/utility/headerBreadCrumb';
import { isEmpty, isInteger } from 'lodash';
import LayoutHeaderActionWrapper from '@iso/components/utility/layoutHeaderActionWrapper';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import IntlMessages from '@iso/components/utility/intlMessages';
import ViewCalculation from './ViewCalculation';
import ViewSavedCalculation from './ViewSavedCalculation';
import UploadedDocuments from './UploadedDocuments';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import usersAction from '@iso/redux/usersActivity/action';
import { formatPhoneNumber } from '@iso/lib/helpers/formatPhoneNumber';

const { getUserDetailes } = usersAction;

const { Title } = Typography;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 9 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14, offset: 1 },
  },
};
class UsersDetails extends Component {
  async componentDidMount() {
    if (
      !isEmpty(this.props.match) &&
      !isEmpty(this.props.match.params) &&
      !isEmpty(this.props.match.params.userdetail)
    )
      if (!isInteger(+this.props.match.params.userdetail)) {
        return;
      }

    await this.props.getUserDetailes({
      userId: +this.props.match.params.userdetail,
      is_saved: false,
    });
  }

  render() {
    const usersCalculation = this.props.activityUserDetailes;
    return (
      <React.Fragment>
        <LayoutHeaderWrapper>
          <LayoutHeaderActionWrapper>
            <HeaderBreadCrumb>
              <DisabledLinkText to={`/portal/dashboard/activity/users`}>
                Users
              </DisabledLinkText>
              <Title level={2}>View - {usersCalculation.name} </Title>
            </HeaderBreadCrumb>
            <Row className="userDetailMainHeader">
              <Col xl={18} lg={17} sm={24}>
                <Row className="userDetailHeaderLeft">
                  <Col xl={14} lg={13} sm={12} xs={24}>
                    <FormItem {...formItemLayout} label={'User ID'}>
                      <p>{usersCalculation.user_id ?? '--'}</p>
                    </FormItem>
                  </Col>
                  <Col xl={10} lg={11} sm={12} xs={24}>
                    <FormItem {...formItemLayout} label={'Contact No.'}>
                      {formatPhoneNumber(usersCalculation.contact_number) ||
                        '--'}
                    </FormItem>
                  </Col>
                  <Col xl={14} lg={13} sm={12} xs={24}>
                    <FormItem
                      {...formItemLayout}
                      label={<IntlMessages id="antTable.title.name" />}
                    >
                      {' '}
                      {usersCalculation.name}
                    </FormItem>
                  </Col>
                  <Col xl={10} lg={11} sm={12} xs={24}>
                    <FormItem
                      {...formItemLayout}
                      label={<IntlMessages id="antTable.title.installDate" />}
                    >
                      {moment(usersCalculation.created_at).format(
                        "MMM D, 'YY - h:mma"
                      )}
                    </FormItem>
                  </Col>
                  <Col xl={14} lg={13} sm={12} xs={24}>
                    <FormItem {...formItemLayout} label={'Partner Name'}>
                      {usersCalculation.partner ?? '--'}
                    </FormItem>
                  </Col>
                  <Col xl={14} lg={13} sm={12} xs={24}>
                    <FormItem {...formItemLayout} label={'Email Address'}>
                      {usersCalculation.email ?? '--'}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col xl={6} lg={7} sm={24}>
                <div className="userDetailButton">
                  <Link
                    to={`/portal/dashboard/activity/users/${this.props.match.params.userdetail}/message`}
                  >
                    <Button type="primary">Message</Button>{' '}
                  </Link>

                  <Button className="userDetailDelete">Delete</Button>
                </div>
              </Col>
            </Row>
          </LayoutHeaderActionWrapper>
        </LayoutHeaderWrapper>
        <ViewCalculation {...this.props} />
        <ViewSavedCalculation {...this.props} />
        <UploadedDocuments {...this.props} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  pagecountforUserCalculation: state.Users.pagecountforUserCalculation,
  activityUserDetailes: state.Users.activityUserDetailes,
});
const mapDispatchToProps = (dispatch) => ({
  getUserDetailes: (payload) => dispatch(getUserDetailes(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UsersDetails)
);
