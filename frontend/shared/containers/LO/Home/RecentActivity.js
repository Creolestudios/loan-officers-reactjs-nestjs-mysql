import React, { Component } from 'react';
import moment from 'moment';
import basicStyle from '@iso/assets/styles/constants';
import { Row, Col, Typography } from 'antd';
import { TableViews } from '@iso/components/Tables/AntTables';
import { isEmpty } from 'lodash';
import IsoWidgetsWrapper from '@iso/containers/Global/Common/WidgetsWrapper';
import IsoWidgetBox from '@iso/containers/Global/Common/WidgetBox';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import LayoutHeaderActionWrapper from '@iso/components/utility/layoutHeaderActionWrapper';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import IntlMessages from '@iso/components/utility/intlMessages';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DashboardAction from '@iso/redux/Dashboard/action';
import HeaderBreadCrumb, {
  DisabledLinkText,
} from '@iso/components/utility/headerBreadCrumb';

const { Title } = Typography;
const { getDashboardData } = DashboardAction;

class RecentActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DashboardD: [],
    };
  }
  componentDidMount() {
    this.props.getDashboardData();
  }
  componentDidUpdate(prevProps) {
    const data = this.props.DashboardDataList;
    if (prevProps.DashboardDataList !== data)
      this.setState({
        DashboardD: data,
      });
  }

  render() {
    const { rowStyle } = basicStyle;

    const { DashboardD } = this.state;

    const LearningContentData = !isEmpty(DashboardD)
      ? DashboardD.recent_activity.map((item, index) => ({
          key: 1,
          name: item.activity_by_name,
          loanType: (
            item.activity_text[0].toUpperCase() + item.activity_text.slice(1)
          )
            .split(',')
            .join(',  ')
            .split('-')
            .join(' - '),
          date: item.created_at,
          id: item.id,
        }))
      : [];

    const LearningContentColumns = [
      {
        title: <IntlMessages id="antTable.title.name" />,
        key: 'name',
        width: 500,
        render: (object) => {
          return {
            children: (
              <Link
                style={{
                  fontSize: 15,
                }}
                to={{
                  pathname: `/portal/dashboard/activity/users/${object.id}`,
                }}
              >
                {object.name}
              </Link>
            ),
          };
        },
        sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: false,
      },
      {
        title: <IntlMessages id="antTable.title.loanType" />,
        key: 'loanType',
        width: 500,
        render: (object) => (
          <p
            style={{
              color: '#1F2428',
              fontSize: 15,
            }}
          >
            {object.loanType}
          </p>
        ),
        sorter: false,
      },
      {
        title: <IntlMessages id="antTable.title.Date" />,
        key: 'date',
        width: 500,
        sorter: false,
        render: (object, record) => {
          return {
            children: (
              <span
                style={{
                  color: '#1F2428',
                  fontSize: 15,
                }}
              >
                {moment(object.date).format("MMM D, 'YY - h:mma")}
              </span>
            ),
          };
        },
      },
    ];

    return (
      <React.Fragment>
        <LayoutHeaderWrapper className="activityUserMainHeader">
          <LayoutHeaderActionWrapper>
            <HeaderBreadCrumb>
              <DisabledLinkText to={`/portal/dashboard/home`}>
                Dashboard
              </DisabledLinkText>
              <Title level={2}>Recent Activities</Title>
            </HeaderBreadCrumb>
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
                      isSelection={false}
                      columns={LearningContentColumns}
                      dataSource={LearningContentData}
                      isPaginate={{
                        defaultCurrent: 1,
                        // pageSizeOptions: ['10'],
                        showSizeChanger: false,
                        showTotal: (total, range) =>
                          `${range[0]}-${range[1]} of ${total}`,
                        // showQuickJumper: true,
                      }}
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
  DashboardDataList: state.Dashboard.DashboardDataList,
});

const mapDispatchToProps = (dispatch) => ({
  getDashboardData: () => dispatch(getDashboardData()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RecentActivity)
);
