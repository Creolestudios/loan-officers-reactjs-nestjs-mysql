import React, { Component } from 'react';
import { Row, Col, Typography, Space } from 'antd';
import LayoutHeaderActionWrapper from '@iso/components/utility/layoutHeaderActionWrapper';
import ViewBtn from '@iso/assets/images/icon/view-btn.svg';
import { ReactComponent as SortIconBtn } from '@iso/assets/images/icon/sort-icon-whole.svg';
import EditBtn from '@iso/assets/images/icon/edit-btn.svg';
import DeleteBtn from '@iso/assets/images/icon/delete-btn.svg';
import { TableViews } from '@iso/components/Tables/AntTables';
import Button from '@iso/components/uielements/button';
import IsoWidgetsWrapper from '@iso/containers/Global/Common/WidgetsWrapper';
import IsoWidgetBox from '@iso/containers/Global/Common/WidgetBox';
import basicStyle from '@iso/assets/styles/constants';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import IntlMessages from '@iso/components/utility/intlMessages';
import { renderCell } from '@iso/components/Tables/AntTables/configs';
import { Link, withRouter } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import { connect } from 'react-redux';
import subscriptionAction from '@iso/redux/Admin/SubscriptionPlan/action';

const { subscriptionPlanList, deleteSubscriptionPlan } = subscriptionAction;
const { Title } = Typography;

class SubscriptionPlans extends Component {
  componentDidMount() {
    this.props.subscriptionPlanList();
  }

  handleDelete = async (id) => {
    await this.props.deleteSubscriptionPlan({ id });
  };

  render() {
    const { rowStyle, colStyle } = basicStyle;

    const data = this.props.SubscriptionPlanList;

    const SubscriptionContentData = data[0]
      ? data.map((item, index) => ({
          key: index + 1,
          planName: item.plan_name,
          id: item.id,
          subscriptionFees: item.plan_fees,
          duration: item.duration,
        }))
      : [];

    const SubscriptionContentColumns = [
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.planname" />
            <SortIconBtn />
          </Space>
        ),
        key: 'planName',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'planName'),
        sorter: (a, b) => a.planName.localeCompare(b.planName),
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.subscriptionfees" />
            <SortIconBtn />
          </Space>
        ),
        key: 'subscriptionFees',
        width: 500,
        render: (object) => <p>{'$' + object.subscriptionFees}</p>,
        sorter: (a, b) => a.subscriptionFees - b.subscriptionFees,
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
                  pathname: `/admin/dashboard/subscription-plans/view-plan/${object.id}`,
                }}
              >
                <button>
                  <img src={ViewBtn} alt="Table Row View Button" />
                </button>
              </Link>
            </Col>
            <Col>
              <Link
                to={{
                  pathname: `/admin/dashboard/subscription-plans/edit/${object.id}`,
                  state: { duration: object.duration },
                }}
              >
                <button>
                  <img src={EditBtn} alt="Table Row Edit Button" />
                </button>
              </Link>
            </Col>
            <Col>
              <button onClick={() => this.handleDelete(object.id)}>
                <img src={DeleteBtn} alt="Table Row Edit Button" />
              </button>
            </Col>
          </Row>
        ),
      },
    ];

    return (
      <React.Fragment>
        <LayoutHeaderWrapper className="subscriptionHeaderWrap">
          <Title level={2}>
            <IntlMessages id="page.subscriptionPlans" />
          </Title>
          <LayoutHeaderActionWrapper>
            <Row style={rowStyle} gutter={25}>
              <Col lg={3}>
                <Link
                  to={{
                    pathname: `/admin/dashboard/subscription-plans/add-new`,
                  }}
                >
                  <Button type="primary">
                    <IntlMessages id="button.addNew" />
                  </Button>
                </Link>
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
                    <div className="contentLearningCenter">
                      {/* SubscriptionPlan Table */}
                      <TableViews.SimpleView
                        isSelection={false}
                        columns={SubscriptionContentColumns}
                        dataSource={SubscriptionContentData}
                        isPaginate={false}
                      />
                    </div>
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
  SubscriptionPlanList: state.AdminSubscriptioPlan.SubscriptionPlanList,
});
const mapDispatchToProps = (dispatch) => ({
  subscriptionPlanList: () => dispatch(subscriptionPlanList()),
  deleteSubscriptionPlan: (payload) =>
    dispatch(deleteSubscriptionPlan(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SubscriptionPlans)
);
