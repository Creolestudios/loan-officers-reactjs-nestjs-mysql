import React, { Component } from 'react';
import moment from 'moment';
import { ReactComponent as SortIconBtn } from '@iso/assets/images/icon/sort-icon-whole.svg';
import { isEmpty } from 'lodash';
import { Row, Col, Form, Typography, Space } from 'antd';
import Select, { SelectOption } from '@iso/components/uielements/select';
import ViewBtn from '@iso/assets/images/icon/view-btn.svg';
import { TableViews } from '@iso/components/Tables/AntTables';
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
import usersAction from '@iso/redux/usersActivity/action';
import { ExportCSV } from '../ExportCSV';

const { getUsers } = usersAction;
const FormItem = Form.Item;
const { Title } = Typography;

class Calculations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      search: '',
      pagesize: 10,
      selectedRows: [],
      filextention: 'Excel',
    };
  }

  async componentDidMount() {
    const { page, search, pagesize } = this.state;
    await this.props.getUsers({ page, search, pagesize, is_export: true });
  }
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows });
  };

  handleChangeForSelect = (value) => {
    this.setState({
      filextention: value,
    });
  };

  handleChange = (pagination) => {
    this.setState({ page: pagination.current, pagesize: pagination.pageSize });

    if (
      this.state.page !== pagination.current ||
      this.state.pagesize !== pagination.pageSize
    ) {
      this.props.getUsers({
        page: pagination.current,
        pagesize: pagination.pageSize,
        is_export: true,
      });
    }
  };

  handleSearch = (e) => {
    this.setState({ search: e.target.value, page: 1 });
    this.props.getUsers({
      page: 1,
      search: e.target.value,
      pagesize: this.state.pagesize,
      is_export: true,
    });
  };

  render() {
    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const { rowStyle, colStyle } = basicStyle;
    const data = this.props.activityUserList;
    const newData = this.state.selectedRows.filter(
      (x) => data.filter((i) => i.id === x.id)[0]
    );

    const UsersData = isEmpty(data)
      ? []
      : data
          .filter((item, index) => item.total_calculations > 0)
          .map((item, index) => ({
            key: item.id,
            userid: item.user_id,
            id: item.id,
            name: item.name,
            partner: item.partner || '--',
            email: item.email,
            totalCalculations: item.total_calculations,
            date: item.created_at,
          }));

    const fileTypes = this.state.filextention === 'CSV' ? '.csv' : '.xlsx';

    const dataOfExel = newData.map((item, index) => ({
      UserID: item.userid,
      Name: item.name,
      Partner: item.partner,
      Email: item.email,
      TotalCalculations: item.totalCalculations,
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
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: (object) => {
          return {
            children: (
              <Link
                to={{
                  pathname: `/portal/dashboard/activity/users/${object.id}`,
                  // state: {
                  //   user: object,
                  //   activityUserDetailes: this.props.activityUserDetailes,
                  // },
                }}
              >
                {object.name}
              </Link>
            ),
          };
        },
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
            <IntlMessages id="antTable.title.totalCalculations" />
            <SortIconBtn />
          </Space>
        ),
        key: 'totalCalculations',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'totalCalculations'),
        sorter: (a, b) => a.totalCalculations - b.totalCalculations,
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
                  pathname: `/portal/dashboard/activity/calculations/${object.userid}`,
                }}
              >
                <button>
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
          <Title level={2}>Calculations</Title>
          <LayoutHeaderActionWrapper>
            <Row style={rowStyle} gutter={25}>
              <Col xl={5} lg={6} sm={9} xs={24} className="exportToSelect">
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
                  onClick={() =>
                    ExportCSV(dataOfExel, 'Calculations', fileTypes)
                  }
                >
                  <IntlMessages id="button.export" />
                </Button>
              </Col>

              <Col
                xl={4}
                lg={6}
                sm={8}
                xs={24}
                className="generateReportBtn activityCalculations"
              >
                <Link to={`/portal/dashboard/activity/generate-report`}>
                  <Button type="tag">
                    <IntlMessages id="button.generateReport" />
                  </Button>
                </Link>
              </Col>
              <Col xl={6} lg={7} xs={24} className="searchUsers altSearchUser">
                <FormItem label={<IntlMessages id="label.search" />}>
                  <Input
                    size="large"
                    value={this.state.search}
                    onChange={this.handleSearch}
                  />
                </FormItem>
              </Col>
            </Row>
          </LayoutHeaderActionWrapper>
        </LayoutHeaderWrapper>
        <LayoutContentWrapper>
          <LayoutContent>
            <Row style={rowStyle} gutter={0} justify="start">
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <IsoWidgetsWrapper className="commonWidgetBox">
                  <IsoWidgetBox>
                    <TableViews.SimpleView
                      isSelection={true}
                      columns={UsersDataColumns}
                      rowSelection={rowSelection}
                      dataSource={UsersData}
                      isPaginate={{
                        current: this.state.page,
                        defaultCurrent: 1,
                        total: UsersData.length,
                        pageSizeOptions: ['5', '10', '15'],
                        showSizeChanger: true,
                        showTotal: (total, range) =>
                          `${range[0]}-${range[1]} of ${UsersData.length}`,
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
  activityUserList: state.Users.activityAllUserList,
  pageCount: state.Users.pageCount,
});
const mapDispatchToProps = (dispatch) => ({
  getUsers: (payload) => dispatch(getUsers(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Calculations)
);
