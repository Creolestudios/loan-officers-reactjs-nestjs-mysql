import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { Typography } from 'antd';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import IsoWidgetsWrapper from '@iso/containers/Global/Common/WidgetsWrapper';
import basicStyle from '@iso/assets/styles/constants';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import Collapse from '@iso/components/uielements/collapse';
import SubscriptionAction from '@iso/redux/SubscriptionsPlan/action';

const { getLOSupportFaqs } = SubscriptionAction;
const { Title } = Typography;

class Faqs extends Component {
  componentDidMount() {
    this.props.getLOSupportFaqs();
  }

  render() {
    const { rowStyle } = basicStyle;

    const faqsData = !isEmpty(this.props.LOSupportFaqs)
      ? this.props.LOSupportFaqs
      : [];
    return (
      <React.Fragment>
        <LayoutHeaderWrapper>
          <Title level={2}>FAQs</Title>
        </LayoutHeaderWrapper>
        <LayoutContentWrapper>
          <Row style={rowStyle} gutter={0} justify="start">
            <Col lg={24} md={24} sm={24} xs={24}>
              <IsoWidgetsWrapper>
                <div className="supportFaqsWrapper">
                  <Collapse accordion>
                    {faqsData.map((element) => (
                      <Collapse.Panel
                        header={element.question}
                        key={element.id}
                      >
                        <p>{element.answer}</p>
                      </Collapse.Panel>
                    ))}
                  </Collapse>
                </div>
              </IsoWidgetsWrapper>
            </Col>
          </Row>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  LOSupportFaqs: state.subscription.LOSupportFaqs,
});

const mapDispatchToProps = (dispatch) => ({
  getLOSupportFaqs: () => dispatch(getLOSupportFaqs()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Faqs));
