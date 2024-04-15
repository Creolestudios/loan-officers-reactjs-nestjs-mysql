import React, { Component } from 'react';
import { Row, Col, Typography, Form, Space } from 'antd';
import { TableViews } from '@iso/components/Tables/AntTables';
import Button from '@iso/components/uielements/button';
import moment from 'moment';
import HeaderBreadCrumb, {
  DisabledLinkText,
} from '@iso/components/utility/headerBreadCrumb';
import Input from '@iso/components/uielements/input';
import { typeofStringCheck } from '@iso/lib/helpers/utility';
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
import { converter } from '@iso/lib/helpers/convertToLocalSting';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import usersAction from '@iso/redux/usersActivity/action';

const { getUserDetailes, getUserCalculations } = usersAction;
const { Title } = Typography;
const FormItem = Form.Item;

class ViewCalculation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      page: 1,
      search: '',
      pagesize: 10,
    };
  }
  async componentDidMount() {
    if (this.props.match.path.includes('view-calculation')) {
      const { page, search, pagesize } = this.state;
      await this.props.getUserCalculations({
        userId: +this.props.match.params.userdetail,
        is_saved: false,
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
        userId: +this.props.match.params.userdetail,
        is_saved: false,
        page: pagination.current,
        pagesize: pagination.pageSize,
      });
    }
  };

  handleSearch = (e) => {
    this.setState({ search: e.target.value, page: 1 });
    this.props.getUserCalculations({
      userId: +this.props.match.params.userdetail,
      is_saved: false,
      page: 1,
      search: e.target.value,
      pagesize: this.state.pagesize,
    });
  };
  render() {
    const { rowStyle } = basicStyle;

    const checkCurrentRouteComponent = this.props?.match?.path.includes(
      'view-calculation'
    );

    const data = checkCurrentRouteComponent
      ? this.props.activityUserCalculationList
      : this.props.activityUserDetailes?.unsaved_calculation?.data
      ? this.props.activityUserDetailes?.unsaved_calculation?.data
      : [];

    const LearningContentData = data.map((item, index) => ({
      key: index + 1,
      calculation: checkCurrentRouteComponent
        ? item.calculation_name
        : item.calculation_name,
      id: item.id,
      date: item.created_at,
      PropertyPrice: converter(item.property_price),
      DownPayment: converter(item.downpayment),
      IntrestRate: typeofStringCheck(item.interest_rate)
        ? item.interest_rate
        : item.interest_rate + '%',
    }));

    const LearningContentColumns = [
      {
        title: () => {
          return (
            <Space>
              <IntlMessages id="antTable.title.calculation" />
              {checkCurrentRouteComponent && <SortIconBtn />}
            </Space>
          );
        },
        key: 'calculation',
        width: 400,
        render: (object) => (
          <Link
            to={{
              pathname: `/portal/dashboard/activity/calculations/${this.props.match.params.userdetail}/view-user-calculation/${object.id}`,
            }}
          >
            {object.calculation}
          </Link>
        ),
        sorter: checkCurrentRouteComponent
          ? (a, b) => a.calculation.localeCompare(b.calculation)
          : false,
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: () => {
          return (
            <Space>
              <IntlMessages id="antTable.title.PropertyPrice" />
              {checkCurrentRouteComponent && <SortIconBtn />}
            </Space>
          );
        },
        key: 'PropertyPrice',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'PropertyPrice'),
        sorter: checkCurrentRouteComponent
          ? (a, b) =>
              `${a.PropertyPrice}`.replace(/\,|\$/gi, '') -
              `${b.PropertyPrice}`.replace(/\,|\$/gi, '')
          : false,
        sortDirections: ['ascend', 'descend', 'ascend'],
      },

      {
        title: () => {
          return (
            <Space>
              <IntlMessages id="antTable.title.DownPayment" />
              {checkCurrentRouteComponent && <SortIconBtn />}
            </Space>
          );
        },
        key: 'DownPayment',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'DownPayment'),
        sorter: checkCurrentRouteComponent
          ? (a, b) =>
              `${a.DownPayment}`.replace(/\,|\$/gi, '') -
              `${b.DownPayment}`.replace(/\,|\$/gi, '')
          : false,
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: () => {
          return (
            <Space>
              <IntlMessages id="antTable.title.IntrestRate" />
              {checkCurrentRouteComponent && <SortIconBtn />}
            </Space>
          );
        },
        key: 'IntrestRate',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'IntrestRate'),
        sorter: checkCurrentRouteComponent
          ? (a, b) =>
              `${a.IntrestRate}`.replace(/\,|\%/gi, '') -
              `${b.IntrestRate}`.replace(/\,|\%/gi, '')
          : false,
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.Date" />
            {checkCurrentRouteComponent && <SortIconBtn />}
          </Space>
        ),
        key: 'date',
        width: 500,
        sorter: checkCurrentRouteComponent
          ? (a, b) => moment(a.date).unix() - moment(b.date).unix()
          : false,
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
        {checkCurrentRouteComponent && (
          <LayoutHeaderWrapper>
            <LayoutHeaderActionWrapper>
              <Row style={rowStyle}>
                <Col flex="1 1 200px">
                  <HeaderBreadCrumb>
                    <DisabledLinkText to={`/portal/dashboard/activity/users`}>
                      Users
                    </DisabledLinkText>
                    <DisabledLinkText
                      to={{
                        pathname: `/portal/dashboard/activity/users/${this.props.match?.params?.userdetail}`,
                      }}
                    >
                      View - {this.props?.activityUserName}{' '}
                    </DisabledLinkText>
                    <Title level={2}>View Calculations</Title>
                  </HeaderBreadCrumb>
                </Col>

                <Col flex="0 1 300px" className="searchUsers">
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
        )}
        <LayoutContentWrapper>
          <div className="commonWidgetBox">
            <LayoutContent>
              {!checkCurrentRouteComponent && (
                <Title level={2} className="commonWidgetTitle">
                  View Calculations
                </Title>
              )}
              <Row style={rowStyle} gutter={0} justify="start">
                <Col lg={24} md={24} sm={24} xs={24}>
                  <IsoWidgetsWrapper className="viewUserDetailActivity">
                    <IsoWidgetBox>
                      {/* Checklists Table */}
                      <TableViews.SimpleView
                        isSelection={false}
                        columns={LearningContentColumns}
                        dataSource={LearningContentData}
                        isPaginate={
                          checkCurrentRouteComponent && {
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
                        footer={(currentPageData) => (
                          <Row gutter={[10]}>
                            <Col>
                              {!checkCurrentRouteComponent && (
                                <Link
                                  to={{
                                    pathname: `/portal/dashboard/activity/users/${this.props?.match?.params?.userdetail}/view-calculation`,
                                  }}
                                >
                                  <Button type="tag">
                                    <IntlMessages id="button.viewAll" />
                                  </Button>
                                </Link>
                              )}
                            </Col>
                          </Row>
                        )}
                      />
                    </IsoWidgetBox>
                  </IsoWidgetsWrapper>
                </Col>
              </Row>
            </LayoutContent>
          </div>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  pageCalculationCount: state.Users.pageCalculationCount,
  activityUserDetailes: state.Users.activityUserDetailes,
  activityUserName: state.Users.activityUserName,
  activityUserCalculationList: state.Users.activityUserCalculationList,
});
const mapDispatchToProps = (dispatch) => ({
  getUserDetailes: (payload) => dispatch(getUserDetailes(payload)),
  getUserCalculations: (payload) => dispatch(getUserCalculations(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViewCalculation)
);
