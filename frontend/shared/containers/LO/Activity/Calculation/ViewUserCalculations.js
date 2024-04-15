import React, { Component } from 'react';
import { Row, Col, Typography } from 'antd';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TableViews } from '@iso/components/Tables/AntTables';
import { typeofStringCheck } from '@iso/lib/helpers/utility';
import IsoWidgetsWrapper from '@iso/containers/Global/Common/WidgetsWrapper';
import IsoWidgetBox from '@iso/containers/Global/Common/WidgetBox';
import basicStyle from '@iso/assets/styles/constants';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import LayoutHeaderActionWrapper from '@iso/components/utility/layoutHeaderActionWrapper';
import IntlMessages from '@iso/components/utility/intlMessages';
import HeaderBreadCrumb, {
  DisabledLinkText,
} from '@iso/components/utility/headerBreadCrumb';
import usersAction from '@iso/redux/usersActivity/action';

const { getUserCalculations, getUserCalculationDetail } = usersAction;
const { Title } = Typography;

function converter(item) {
  if (typeofStringCheck(item)) {
    if (item.includes(',')) {
      return item;
    }
    if (item.includes('$')) {
      return Number(item.replace(/\$/, '')).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    } else if (item.includes('%')) {
      return Number(item.replace('%', '')).toFixed(3) + '%';
    }
  }
  return item;
}

class ViewUserCalculations extends Component {
  async componentDidMount() {
    if (
      this.props.match?.params?.usercalculations &&
      this.props.match?.params?.calculationId
    ) {
      await this.props.getUserCalculationDetail({
        userId: +this.props.match.params.usercalculations,
        cal_id: +this.props.match.params.calculationId,
      });
    }
  }
  LearningContentColumns = [
    {
      title: <IntlMessages id="antTable.title.name" />,
      key: 'name',
      width: 500,
      render: (object, record) => {
        return {
          props: {
            style: { borderBottom: '0px' },
          },
          children: <span>{object.name}</span>,
        };
      },
      sorter: false,
    },
    {
      title: <IntlMessages id="antTable.title.description" />,
      key: 'description',
      width: 200,
      render: (object, record) => {
        return {
          props: {
            style: { color: 'black', borderBottom: '0px' },
          },
          children: <span>{object.description}</span>,
        };
      },
    },
  ];

  handledataChange = () => {
    const data = [];
    data.push(['Loan Type', this.props.activityUserCalculationDetail?.name]);
    data.push([
      'Calculate Type',
      this.props.activityUserCalculationDetail?.calculation_category ??
        'Purchase',
    ]);

    this.props?.activityUserCalculationDetail?.details?.map((item) => {
      data.push([
        item.name === 'Base Loan Amount' ? 'New Loan Amount' : item.name,
        item.value,
      ]);
    });

    return data;
  };

  render() {
    const data = !isEmpty(this.props.activityUserCalculationDetail)
      ? this.handledataChange()
      : [];

    const UserCalculationValues = data.map((item, index) => ({
      key: index + 1,
      name: item[0],
      description: converter(item[1]),
    }));

    const { rowStyle, colStyle } = basicStyle;
    return (
      <React.Fragment>
        <LayoutHeaderWrapper>
          <HeaderBreadCrumb>
            <DisabledLinkText to={`/portal/dashboard/activity/calculations`}>
              Calculations
            </DisabledLinkText>
            <DisabledLinkText
              to={{
                pathname: `/portal/dashboard/activity/calculations/${this.props.match.params.usercalculations}`,
              }}
            >
              {this.props?.activityUserCalculationDetail?.user_name || '--'}
            </DisabledLinkText>
            <Title level={2}>View Calculation</Title>
          </HeaderBreadCrumb>
          <LayoutHeaderActionWrapper>
            <Row style={rowStyle} gutter={25}></Row>
          </LayoutHeaderActionWrapper>
        </LayoutHeaderWrapper>
        <LayoutContentWrapper>
          <div className="commonWidgetBox">
            <LayoutContent>
              <Row style={rowStyle} gutter={0} justify="start">
                <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                  <IsoWidgetsWrapper>
                    <IsoWidgetBox>
                      <TableViews.SimpleView
                        isSelection={false}
                        columns={this.LearningContentColumns}
                        dataSource={UserCalculationValues}
                        isPaginate={false}
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
  activityUserName: state.Users.activityUserName,
  activityUserCalculationDetail: state.Users.activityUserCalculationDetail,
});
const mapDispatchToProps = (dispatch) => ({
  getUserCalculations: (payload) => dispatch(getUserCalculations(payload)),
  getUserCalculationDetail: (payload) =>
    dispatch(getUserCalculationDetail(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViewUserCalculations)
);
