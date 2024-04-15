import React, { Component } from 'react';
import moment from 'moment';
import { ReactComponent as SortIconBtn } from '@iso/assets/images/icon/sort-icon-whole.svg';
import { Row, Col, Form, Typography, Space, message } from 'antd';
import Select, { SelectOption } from '@iso/components/uielements/select';
import ViewBtn from '@iso/assets/images/icon/view-btn.svg';
import { TableViews } from '@iso/components/Tables/AntTables';
import Modal from '@iso/components/uielements/modal';
import { ArrowRightOutlined } from '@ant-design/icons';
import Box from '@iso/components/utility/box';
import { isEmpty } from 'lodash';
import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import IsoWidgetsWrapper from '@iso/containers/Global/Common/WidgetsWrapper';
import IsoWidgetBox from '@iso/containers/Global/Common/WidgetBox';
import basicStyle from '@iso/assets/styles/constants';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import LayoutHeaderActionWrapper from '@iso/components/utility/layoutHeaderActionWrapper';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import IntlMessages from '@iso/components/utility/intlMessages';
import { renderCell } from '@iso/components/Tables/AntTables/configs';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Datepicker from '@iso/components/uielements/datePicker';
import usersAction from '@iso/redux/usersActivity/action';
import { ExportCSV } from '../ExportCSV';

const { getUsers, getUserDetailes, getGenerateReport } = usersAction;
const FormItem = Form.Item;
const { Title } = Typography;

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      page: 1,
      search: '',
      pagesize: 10,
      selectedRows: [],
      filextention: 'Excel',
      From: null,
      To: null,
    };
  }

  showModal = (e) => {
    this.setState({
      visible: true,
    });
  };

  onChange1 = (date, dateString) => {
    this.setState({
      From: date ? date._d : null,
    });
  };

  onChange2 = (date, dateString) => {
    this.setState({
      To: date ? date._d : null,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleChangeForSelect = (value) => {
    this.setState({
      filextention: value,
    });
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows });
  };

  componentDidMount() {
    const { page, search, pagesize } = this.state;
    this.props.getUsers({ page, search, pagesize });
  }

  handleChange = (pagination) => {
    this.setState({
      page: pagination.current,
      pagesize: pagination.pageSize,
      keys: pagination.pageSize,
    });

    if (
      this.state.page !== pagination.current ||
      this.state.pagesize !== pagination.pageSize
    ) {
      this.props.getUsers({
        page: pagination.current,
        pagesize: pagination.pageSize,
      });
    }
  };

  handleViewUserDetailes = (id) => {
    this.props.getUserDetailes({
      userId: id,
    });
  };

  handleSearch = (e) => {
    this.setState({ search: e.target.value, page: 1 });
    this.props.getUsers({
      page: 1,
      search: e.target.value,
      pagesize: this.state.pagesize,
    });
  };

  generateReports = () => {
    const { To, From } = this.state;
    if (To !== null && From !== null) {
      if (
        new Date(new Date(this.state.To).toISOString()).getTime() >
        new Date(new Date(this.state.From).toISOString()).getTime()
      ) {
        return this.props.getGenerateReport({
          to: new Date(To).toISOString(),
          from: new Date(From).toISOString(),
          filename: 'UserGenerateReport',
        });
      } else {
        return message.error('Invalid Date');
      }
    } else if (From === null && To === null) {
      return message.error('Please select from and to date');
    } else if (!From) {
      return message.error('Please select from date');
    } else if (!To) {
      return message.error('Please select to date');
    }
  };

  render() {
    const rowSelection = {
      onChange: this.onSelectChange,
    };

    const dateFormatList = ['MM/DD/YYYY', 'MM/DD/YYYY'];
    const reportDetails = [
      'Number of users registered to system',
      'Name of the users',
      'Total number of Calculations run by every individual',
      'Number of documents uploaded by every individual',
    ];

    const { rowStyle } = basicStyle;
    const data = this.props.activityUserList;
    const newData = this.state.selectedRows.filter(
      (x) => data.filter((i) => i.user_id === x.userid)[0]
    );

    const fileTypes = this.state.filextention === 'CSV' ? '.csv' : '.xlsx';
    let UsersData = isEmpty(data)
      ? []
      : data.map((item, index) => ({
          key: item.user_id,
          userid: item.user_id,
          name: item.name,
          partner: item.partner || '--',
          email: item.email,
          date: item.created_at,
        }));

    const headers = [
      { label: 'User ID', key: 'UserID' },
      { label: 'Name', key: 'Name' },
      { label: 'Email', key: 'Email' },
      { label: 'Partner Name', key: 'Partner' },
      { label: 'Install Date', key: 'Install Date' },
    ];

    const dataOfExel = newData.map((item) => ({
      UserID: item.userid,
      Name: item.name,
      Partner: item.partner || '--',
      Email: item.email,
      InstallDate: moment(item.date).format("MMM D, 'YY - h:mma"),
    }));

    const UsersDataColumns = [
      {
        title: () => {
          return (
            <Space>
              <IntlMessages id="antTable.title.userId" />
              <SortIconBtn />
            </Space>
          );
        },
        key: 'userid',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'userid'),
        sorter: (a, b) => a.userid - b.userid,
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.name" />
            <SortIconBtn />
          </Space>
        ),
        key: 'name',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'name'),
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.partner" />
            <SortIconBtn />
          </Space>
        ),
        key: 'partner',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'partner'),
        sorter: (a, b) => a.partner.localeCompare(b.partner),
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.email" />
            <SortIconBtn />
          </Space>
        ),
        key: 'email',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'email'),
        sorter: (a, b) => a.email.localeCompare(b.email),
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.installDate" />
            <SortIconBtn />
          </Space>
        ),
        key: 'date',
        width: 500,
        sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: (object, record) => {
          return {
            children: (
              <span>{moment(object.date).format("MMM D, 'YY - h:mma")}</span>
            ),
          };
        },
      },
      {
        title: <IntlMessages id="antTable.title.actions" />,
        key: 'actions-view',
        width: 200,
        render: (object) => (
          <Row className="table-action-btns-grp">
            <Col>
              <Link
                to={{
                  pathname: `/portal/dashboard/activity/users/${object.userid}`,
                  state: {
                    user: object,
                    activityUserDetailes: this.props.activityUserDetailes,
                  },
                }}
              >
                <button
                  onClick={() => this.handleViewUserDetailes(object.userid)}
                >
                  <img src={ViewBtn} alt="Table Row View Button" />
                </button>
              </Link>
            </Col>
          </Row>
        ),
      },
    ];

    return (
      <React.Fragment>
        <LayoutHeaderWrapper className="activityUserMainHeader">
          <Title level={2}>Users</Title>
          <LayoutHeaderActionWrapper>
            <Row style={rowStyle} gutter={20}>
              <Col xl={5} lg={6} sm={8} xs={24} className="exportToSelect">
                <FormItem label={<IntlMessages id="page.global.exportTo" />}>
                  <Select
                    value={this.state.filextention}
                    className="exportSelectInput"
                    onChange={this.handleChangeForSelect}
                  >
                    {['Excel', 'CSV'].map((item, index) => (
                      <SelectOption key={index} value={item}>
                        {item}
                      </SelectOption>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col xl={3} lg={4} sm={6} xs={24} className="exportBtn">
                <Button
                  type="primary"
                  onClick={() => ExportCSV(dataOfExel, 'Users', fileTypes)}
                >
                  <IntlMessages id="button.export" />
                </Button>
              </Col>
              <Col
                xl={5}
                lg={7}
                sm={10}
                xs={24}
                className="pushNotificationBtn"
              >
                <Link
                  to={{
                    pathname: `/portal/dashboard/activity/send-push-notification`,
                  }}
                >
                  <Button>
                    <IntlMessages id="button.pushNotification" />
                  </Button>
                </Link>
              </Col>
              <Col xl={4} lg={6} sm={8} xs={24} className="generateReportBtn">
                <Button type="tag" onClick={this.showModal}>
                  <IntlMessages id="button.generateReport" />
                </Button>
              </Col>
              <Col xl={6} lg={24} sm={16} xs={24} className="searchUsers">
                <FormItem label={<IntlMessages id="label.search" />}>
                  <Input
                    size="large"
                    value={this.state.search}
                    onChange={this.handleSearch}
                  />
                  {/* <Datepicker format={dateFormatList} /> */}
                </FormItem>
              </Col>

              <Modal
                visible={this.state.visible}
                onCancel={this.handleCancel}
                width={900}
                footer={null}
                className="generateReportPopupWrapper"
              >
                <Box
                  title="Generate Report"
                  className="generateReportPopup"
                  footer={
                    <Button type="primary" onClick={this.generateReports}>
                      <IntlMessages id="button.generate" />
                    </Button>
                  }
                >
                  <Row>
                    <Col xs={24} md={12} className="datePickerFromDate">
                      <FormItem
                        label={'From'}
                        labelCol={{ xs: { span: 24 }, sm: { span: 4 } }}
                        wrapperCol={{ xs: { span: 24 }, sm: { span: 18 } }}
                      >
                        <Datepicker
                          size="large"
                          format={dateFormatList}
                          name="From"
                          placeholder="Pick Date"
                          onChange={this.onChange1}
                        />
                      </FormItem>
                    </Col>
                    <Col xs={24} md={12}>
                      <FormItem
                        label={'To'}
                        name="To"
                        labelCol={{ xs: { span: 24 }, sm: { span: 4 } }}
                        wrapperCol={{ xs: { span: 24 }, sm: { span: 18 } }}
                      >
                        <Datepicker
                          format={dateFormatList}
                          placeholder="Pick Date"
                          onChange={this.onChange2}
                        />
                      </FormItem>
                    </Col>
                  </Row>
                  <div className="generatedReports">
                    <span className="generateReportsLabel">
                      These details will be present in the generated report:{' '}
                    </span>
                    {reportDetails.map((item, index) => (
                      <div className="generatedReportsDetails" key={index}>
                        <ArrowRightOutlined /> {item}
                      </div>
                    ))}
                  </div>
                </Box>
              </Modal>
            </Row>
          </LayoutHeaderActionWrapper>
        </LayoutHeaderWrapper>
        <LayoutContentWrapper>
          <LayoutContent>
            <Row style={rowStyle} gutter={0} justify="start">
              <Col lg={24} md={24} sm={24} xs={24}>
                <IsoWidgetsWrapper className="commonWidgetBox">
                  <IsoWidgetBox>
                    {/* TABLE */}
                    <TableViews.SimpleView
                      isSelection={true}
                      columns={UsersDataColumns}
                      dataSource={UsersData}
                      rowSelection={rowSelection}
                      isPaginate={{
                        current: this.state.page,
                        defaultCurrent: 1,
                        total: this.props.pageCount,
                        pageSizeOptions: ['5', '10', '15'],
                        showSizeChanger: true,
                        showTotal: (total, range) =>
                          `${range[0]}-${range[1]} of ${total}`,
                        showQuickJumper: true,
                      }}
                      onChange={this.handleChange}
                    />
                  </IsoWidgetBox>
                </IsoWidgetsWrapper>
              </Col>
            </Row>
          </LayoutContent>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  activityUserList: state.Users.activityUserList,
  pageCount: state.Users.pageCount,
  activityUserDetailes: state.Users.activityUserDetailes,
});
const mapDispatchToProps = (dispatch) => ({
  getUsers: (payload) => dispatch(getUsers(payload)),
  getGenerateReport: (payload) => dispatch(getGenerateReport(payload)),
  getUserDetailes: (payload) => dispatch(getUserDetailes(payload)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
