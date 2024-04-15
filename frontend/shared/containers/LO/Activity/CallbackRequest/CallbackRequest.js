import React, { Component } from 'react';
import { Row, Col, Form, Typography, Space } from 'antd';
import Select, { SelectOption } from '@iso/components/uielements/select';
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
import { ReactComponent as SortIconBtn } from '@iso/assets/images/icon/sort-icon-whole.svg';
import { ExportCSV } from '../ExportCSV';
import { isEmpty } from 'lodash';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import callBackRequestAction from '@iso/redux/callbackRequestActivity/action';
import { Link } from 'react-router-dom';
import moment from 'moment';

const { getCallbackRequest } = callBackRequestAction;
const FormItem = Form.Item;
const { Title } = Typography;

class CallbackRequest extends Component {
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
    await this.props.getCallbackRequest({ page, search, pagesize });
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
      this.props.getCallbackRequest({
        page: pagination.current,
        pagesize: pagination.pageSize,
      });
    }
  };

  handleSearch = (e) => {
    this.setState({ search: e.target.value, page: 1 });
    this.props.getCallbackRequest({
      page: 1,
      search: e.target.value,
      pagesize: this.state.pagesize,
    });
  };

  render() {
    const rowSelection = {
      onChange: this.onSelectChange,
    };

    const { rowStyle } = basicStyle;
    const data = this.props.activityCallbackRequestList;
    const newData = this.state.selectedRows.filter(
      (x) => data.filter((i) => i.id === x.id)[0]
    );
    const callbacklist = isEmpty(data)
      ? []
      : data.map((item, index) => ({
          key: item.id,
          userid: item.user_id,
          id: item.id,
          name: item.name,
          contact: item.contact_number,
          comments: item.comment,
          date: item.created_at,
          bestTimeToCall:
            item.best_time_to_call === 1
              ? 'ASAP'
              : item.best_time_to_call === 2
              ? 'Morning'
              : 'Evening',
        }));

    const fileTypes = this.state.filextention === 'CSV' ? '.csv' : '.xlsx';
    const dataOfExel = newData.map((item) => ({
      UseID: item.userid,
      Name: item.name,
      Contact: item.contact,
      Comments: item.comments,
      BestTimeToCall: item.bestTimeToCall,
    }));

    const CallbackColumns = [
      // {
      //   title: () => {
      //     return (
      //       <Space>
      //         <IntlMessages id="antTable.title.userId" />
      //         <SortIconBtn />
      //       </Space>
      //     );
      //   },
      //   key: 'userid',
      //   width: 500,
      //   render: (object) => renderCell(object, 'TextCell', 'userid'),
      //   sorter: (a, b) => a.userid - b.userid,
      //   sortDirections: ['ascend', 'descend', 'ascend'],
      // },
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
                  pathname: `/portal/dashboard/activity/users/${object.userid}`,
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
            <IntlMessages id="antTable.title.contact" />
            <SortIconBtn />
          </Space>
        ),
        key: 'contact',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'contact'),
        sorter: (a, b) => a.contact - b.contact,
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.comment" />
            <SortIconBtn />
          </Space>
        ),
        key: 'comments',
        className: 'callbackComments',
        sorter: (a, b) => a.comments.localeCompare(b.comments),
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: (object, record) => {
          return {
            children: <p>{object.comments}</p>,
          };
        },
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.bestTimeToCall" />
            <SortIconBtn />
          </Space>
        ),
        key: 'bestTimeToCall',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'bestTimeToCall'),
        sorter: (a, b) => a.bestTimeToCall.localeCompare(b.bestTimeToCall),
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.Date" />
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
    ];

    return (
      <React.Fragment>
        <LayoutHeaderWrapper className="activityUserMainHeader altactivityUserMainHeader">
          <Title level={2}>Callback Request</Title>
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
                    ExportCSV(dataOfExel, 'Callback Request', fileTypes)
                  }
                >
                  <IntlMessages id="button.export" />
                </Button>
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
              <Col lg={24} md={24} sm={24} xs={24}>
                <IsoWidgetsWrapper className="commonWidgetBox">
                  <IsoWidgetBox>
                    <TableViews.SimpleView
                      className="documentTable isoSimpleTable"
                      isSelection={true}
                      columns={CallbackColumns}
                      rowSelection={rowSelection}
                      dataSource={callbacklist}
                      isPaginate={true}
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
  activityCallbackRequestList:
    state.CallBackRequest.activityCallbackRequestList,
  pageCount: state.CallBackRequest.pageCount,
});
const mapDispatchToProps = (dispatch) => ({
  getCallbackRequest: (payload) => dispatch(getCallbackRequest(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CallbackRequest)
);
