import React from 'react';
import { Row, Col, Collapse, Typography, Empty } from 'antd';
import Box from '@iso/components/utility/box';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import basicStyle from '@iso/assets/styles/constants';
import IsoWidgetsWrapper from '@iso/containers/Global/Common/WidgetsWrapper';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import IsoWidgetBox from '@iso/containers/Global/Common/WidgetBox';
import { TableViews } from '@iso/components/Tables/AntTables';
import { SimpleLineCharts } from '@iso/components/Charts';
import * as configs from '@iso/components/Charts/config';
import IntlMessages from '@iso/components/utility/intlMessages';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DashboardAction from '@iso/redux/Dashboard/action';
import isEmpty from 'lodash/isEmpty';
import Button from '@iso/components/uielements/button';
import { Link } from 'react-router-dom';

const { getDashboardData } = DashboardAction;
const { Title } = Typography;

class Home extends React.Component {
  state = {
    DashboardD: [],
  };
  componentDidMount() {
    this.props.getDashboardData();
  }

  componentDidUpdate(prevProps) {
    const { DashboardDataList } = this.props;

    if (prevProps?.DashboardDataList !== DashboardDataList)
      this.setState({
        DashboardD: this.props.DashboardDataList,
      });
  }

  handleClick = () => {
    this.props.history.push(`/portal/dashboard/recent-activity`);
  };

  renderCustomizedLabel = ({ name, x, y, value }) => {
    return (
      <text
        fill="currentColor"
        textAnchor="end"
        x={x}
        y={y}
        dominantBaseline="central"
      >
        {value}
      </text>
    );
  };
  render() {
    const { rowStyle, colStyle } = basicStyle;

    const { DashboardD } = this.state;
    const styless = {
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
    };

    const promotion = isEmpty(DashboardD)
      ? []
      : DashboardD.promotionMessages.map((item) => ({
          message_title: item.message_title,
          message_body: item.message_body,
          id: item.id,
        }));

    const colors = [
      '#25A95B',
      '#F7810B',
      '#848CCF',
      '#F81E14',
      '#008080',
      '#FFC300',
    ];
    const style = {
      top: 0,
      left: 250,
      lineHeight: '40px',
    };

    const dataForCalculation = isEmpty(DashboardD)
      ? []
      : DashboardD.calculation.map((item) => ({
          name: item.name,
          value: item.calculation_count,
        }));

    const dataForInstalltion =
      !isEmpty(DashboardD) &&
      DashboardD.install_app.map((item, index) => ({
        user: item.number_users,
        name: moment(item.created_at).format('MMM Do'),
        value: item.number_users,
      }));

    const dataForQuickStartGuide = DashboardD.quick_start_guide;
    const LearningContentData = !isEmpty(DashboardD)
      ? DashboardD.recent_activity.slice(0, 10).map((item, index) => ({
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
        <LayoutHeaderWrapper>
          <Title level={2}> Dashboard</Title>
        </LayoutHeaderWrapper>
        <Row style={rowStyle}>
          <Col lg={12} xs={24}>
            <LayoutContentWrapper className="dashboardGridHead dashboardInstallations">
              <Col xs={24}>
                <IsoWidgetsWrapper>
                  <Box title={'Installations in last 30 days'}>
                    <div style={{ width: '100%', height: 300 }}>
                      <ResponsiveContainer>
                        {isEmpty(dataForInstalltion) ? (
                          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        ) : (
                          <SimpleLineCharts
                            {...configs.SimpleLineCharts}
                            datas={dataForInstalltion}
                            width={500}
                          />
                        )}
                      </ResponsiveContainer>
                    </div>
                  </Box>
                </IsoWidgetsWrapper>
              </Col>
            </LayoutContentWrapper>

            <LayoutContentWrapper className="dashboardGridHead dashboardRecentActivities">
              <div className="commonWidgetBox">
                <LayoutContent>
                  <Col
                    lg={24}
                    md={24}
                    sm={24}
                    xs={24}
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                  >
                    <Box title={'Recent Activities'}>
                      <IsoWidgetBox>
                        {/* TABLE */}
                        <TableViews.SimpleView
                          isSelection={false}
                          columns={LearningContentColumns}
                          dataSource={LearningContentData}
                          isPaginate={false}
                          footer={() => (
                            <Row gutter={[10]}>
                              <Col>
                                {
                                  <Button
                                    type="tag"
                                    onClick={() => this.handleClick()}
                                  >
                                    VIEW MORE
                                  </Button>
                                }
                              </Col>
                            </Row>
                          )}
                        />
                      </IsoWidgetBox>
                    </Box>
                  </Col>
                </LayoutContent>
              </div>
            </LayoutContentWrapper>
          </Col>
          <Col lg={12} xs={24}>
            <LayoutContentWrapper className="dashboardGridHead dashboardPromotions">
              <Col xs={24}>
                <IsoWidgetsWrapper>
                  <Box title={'Promotions'}>
                    {isEmpty(promotion) ? (
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    ) : (
                      <Collapse
                        expandIconPosition={'right'}
                        style={{ backgroundColor: 'white' }}
                      >
                        {promotion.map((item, index) => (
                          <Collapse.Panel
                            header={item.message_title}
                            key={item.id}
                          >
                            <p
                              dangerouslySetInnerHTML={{
                                __html: item.message_body,
                              }}
                            ></p>
                          </Collapse.Panel>
                        ))}
                      </Collapse>
                    )}
                  </Box>
                </IsoWidgetsWrapper>
              </Col>
            </LayoutContentWrapper>
            <LayoutContentWrapper className="dashboardGridHead dashboardRecentCalculations">
              <Col xs={24}>
                <Box title={'Recent Calculations'}>
                  <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      {isEmpty(dataForCalculation) ? (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      ) : (
                        <PieChart>
                          <Pie
                            isAnimationActive={false}
                            dataKey="value"
                            data={dataForCalculation}
                            outerRadius={'50%'}
                            cx={120}
                            cy={120}
                            labelLine={false}
                            label={this.renderCustomizedLabel}
                          >
                            {dataForCalculation &&
                              dataForCalculation.map((entry, index) => (
                                <Cell
                                  fill={colors[index % colors.length]}
                                  key={index}
                                />
                              ))}
                          </Pie>
                          <Legend
                            iconSize={10}
                            width={140}
                            height={140}
                            layout="vertical"
                            verticalAlign="middle"
                            wrapperStyle={style}
                          />
                        </PieChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </Box>
              </Col>
            </LayoutContentWrapper>
          </Col>
        </Row>

        <LayoutContentWrapper className="dashboardGridHead dashboardQuickGuide">
          <Row style={rowStyle} gutter={0}>
            <Col xs={24}>
              <Box title={'Quick Start Guide'}>
                <Row style={styless}>
                  {!isEmpty(dataForQuickStartGuide) &&
                    dataForQuickStartGuide.map((item, index) => (
                      <Col xl={6} lg={8} md={10} sm={12} xs={24} key={index}>
                        <span className="guideTitle">{item.title}</span>
                        <iframe
                          src={item.guide_url.replace('watch?v=', 'embed/')}
                          frameBorder="0"
                          allowFullScreen="allowfullscreen"
                        ></iframe>
                      </Col>
                    ))}
                </Row>
              </Box>
            </Col>
          </Row>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
