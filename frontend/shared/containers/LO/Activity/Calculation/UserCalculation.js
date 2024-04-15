import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, Typography, Space } from 'antd';
import { isEmpty } from 'lodash';
import { ReactComponent as SortIconBtn } from '@iso/assets/images/icon/sort-icon-whole.svg';
import { typeofStringCheck } from '@iso/lib/helpers/utility';
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
import HeaderBreadCrumb, {
  DisabledLinkText,
} from '@iso/components/utility/headerBreadCrumb';
import usersAction from '@iso/redux/usersActivity/action';
import { ExportCSV } from '../ExportCSV';
import { converter } from '@iso/lib/helpers/convertToLocalSting';

const { getUserCalculations } = usersAction;
const FormItem = Form.Item;
const { Title } = Typography;

class UserCalculations extends Component {
  state = {
    page: 1,
    search: '',
    pagesize: 10,
    filextention: 'Excel',
    selectedRows: [],
  };

  async componentDidMount() {
    if (this.props.match?.params?.usercalculations) {
      const { page, search, pagesize } = this.state;
      await this.props.getUserCalculations({
        userId: +this.props.match.params.usercalculations,
        page,
        search,
        pagesize,
      });
    }
  }

  handleChange = (pagination) => {
    this.setState({ page: pagination.current });
    if (
      this.state.page !== pagination.current ||
      this.state.pagesize !== pagination.pageSize
    ) {
      this.props.getUserCalculations({
        userId: +this.props.match.params.usercalculations,
        page: pagination.current,
        pagesize: pagination.pageSize,
      });
    }
  };

  handleChangeForSelect = (value) => {
    this.setState({
      filextention: value,
    });
  };
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows });
  };

  handleSearch = (e) => {
    this.setState({ search: e.target.value, page: 1 });
    this.props.getUserCalculations({
      userId: +this.props.match.params.usercalculations,
      page: 1,
      search: e.target.value,
      pagesize: this.state.pagesize,
    });
  };
  render() {
    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const { rowStyle, colStyle } = basicStyle;

    const data = !isEmpty(this.props.activityUserCalculationList)
      ? this.props.activityUserCalculationList
      : [];

    const CalculationData = data.map((item, index) => ({
      key: index + 1,
      cal_id: item.id,
      calculation: item.calculation_name,
      PropertyPrice: converter(item.property_price),
      DownPayment: converter(item.downpayment),
      IntrestRate: typeofStringCheck(item.interest_rate)
        ? item.interest_rate
        : item.interest_rate + '%',
      saved: item?.saved ? 'Yes' : 'No',
    }));

    const fileTypes = this.state.filextention === 'CSV' ? '.csv' : '.xlsx';
    const dataOfExel = this.state.selectedRows.map((item, index) => ({
      Calculation: item.calculation,
      PropertyPrice: item.PropertyPrice,
      DownPayment: item.DownPayment,
      IntrestRate: item.IntrestRate,
      saved: item.saved,
    }));

    const UsersDataColumns = [
      {
        title: () => {
          return (
            <Space>
              <IntlMessages id="antTable.title.calculation" />
              <SortIconBtn />
            </Space>
          );
        },
        key: 'calculation',
        width: 400,
        render: (object) => renderCell(object, 'TextCell', 'calculation'),
        sorter: (a, b) => a.calculation.localeCompare(b.calculation),
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: () => {
          return (
            <Space>
              <IntlMessages id="antTable.title.PropertyPrice" />
              <SortIconBtn />
            </Space>
          );
        },
        key: 'PropertyPrice',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'PropertyPrice'),
        sorter: (a, b) =>
          `${a.PropertyPrice}`.replace(/\,|\$/gi, '') -
          `${b.PropertyPrice}`.replace(/\,|\$/gi, ''),
        sortDirections: ['ascend', 'descend', 'ascend'],
      },

      {
        title: () => {
          return (
            <Space>
              <IntlMessages id="antTable.title.DownPayment" />
              <SortIconBtn />
            </Space>
          );
        },
        key: 'DownPayment',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'DownPayment'),
        sorter: (a, b) =>
          `${a.DownPayment}`.replace(/\,|\$/gi, '') -
          `${b.DownPayment}`.replace(/\,|\$/gi, ''),
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: () => {
          return (
            <Space>
              <IntlMessages id="antTable.title.IntrestRate" />
              <SortIconBtn />
            </Space>
          );
        },
        key: 'IntrestRate',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'IntrestRate'),
        sorter: (a, b) =>
          `${a.IntrestRate}`.replace(/\,|\%/gi, '') -
          `${b.IntrestRate}`.replace(/\,|\%/gi, ''),
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.saved" />
            <SortIconBtn />
          </Space>
        ),
        key: 'saved',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'saved'),
        sorter: (a, b) => a.saved.localeCompare(b.saved),
        sortDirections: ['ascend', 'descend', 'ascend'],
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
                  pathname: `/portal/dashboard/activity/calculations/${this.props.match?.params?.usercalculations}/view-user-calculation/${object.cal_id}`,
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
        <LayoutHeaderWrapper className="activityUserMainHeader altactivityUserMainHeader">
          <HeaderBreadCrumb>
            <DisabledLinkText to={`/portal/dashboard/activity/calculations`}>
              Calculations
            </DisabledLinkText>
            <Title level={2}>{this.props?.activityUserName}</Title>
          </HeaderBreadCrumb>
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
                    ExportCSV(dataOfExel, 'UserCalculations', fileTypes)
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
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <IsoWidgetsWrapper className="commonWidgetBox">
                  <IsoWidgetBox>
                    <TableViews.SimpleView
                      isSelection={true}
                      rowSelection={rowSelection}
                      columns={UsersDataColumns}
                      dataSource={CalculationData}
                      isPaginate={
                        !isEmpty(this.props.activityUserCalculationList) && {
                          current: this.state.page,
                          defaultCurrent: 1,
                          total: this.props.pageCalculationCount,
                          pageSizeOptions: ['5', '10', '15'],
                          showSizeChanger: true,
                          showTotal: (total, range) =>
                            `${range[0]}-${range[1]} of ${total}`,
                          showQuickJumper: true,
                        }
                      }
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
  pageCalculationCount: state.Users.pageCalculationCount,
  activityUserName: state.Users.activityUserName,
  activityUserCalculationList: state.Users.activityUserCalculationList,
});
const mapDispatchToProps = (dispatch) => ({
  getUserCalculations: (payload) => dispatch(getUserCalculations(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserCalculations)
);
