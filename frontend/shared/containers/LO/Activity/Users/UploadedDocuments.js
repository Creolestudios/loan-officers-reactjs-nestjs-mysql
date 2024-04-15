import React, { Component } from 'react';
import { Row, Col, Typography, Form, message } from 'antd';
import { TableViews } from '@iso/components/Tables/AntTables';
import Button from '@iso/components/uielements/button';
import ViewBtn from '@iso/assets/images/icon/view-btn.svg';
import HeaderBreadCrumb, {
  DisabledLinkText,
} from '@iso/components/utility/headerBreadCrumb';
import FileViewer from '@iso/components/uielements/fileViewer';
import Input from '@iso/components/uielements/input';
import axios from 'axios';
import DownloadeBtn from '@iso/assets/images/download.png';
import IsoWidgetsWrapper from '@iso/containers/Global/Common/WidgetsWrapper';
import IsoWidgetBox from '@iso/containers/Global/Common/WidgetBox';
import basicStyle from '@iso/assets/styles/constants';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import LayoutContent from '@iso/components/utility/layoutContent';
import LayoutHeaderActionWrapper from '@iso/components/utility/layoutHeaderActionWrapper';
import LayoutHeaderWrapper from '@iso/components/utility/layoutHeaderWrapper';
import IntlMessages from '@iso/components/utility/intlMessages';
import { renderCell } from '@iso/components/Tables/AntTables/configs';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import usersAction from '@iso/redux/usersActivity/action';
import { downloadBlobFile } from '@iso/lib/helpers/utility';

const { getUserDetailes, getUserUploadDocuments } = usersAction;
const { Title } = Typography;
const FormItem = Form.Item;

class UploadedDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      page: 1,
      search: '',
      pagesize: 10,
      viewer: {
        open: false,
        url: '',
      },
    };
  }

  async componentDidMount() {
    if (this.props.match.path.includes('uploaded-documents')) {
      const { page, search, pagesize } = this.state;
      await this.props.getUserUploadDocuments({
        userId: +this.props.match.params.userdetail,
        page,
        search,
        pagesize,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (this.props.match.path.includes('uploaded-documents')) {
        const { page, search, pagesize } = this.state;
        this.props.getUserUploadDocuments({
          userId: +this.props.match.params.userdetail,
          page,
          search,
          pagesize,
        });
      }
    }
  }

  handleChange = (pagination) => {
    this.setState({ page: pagination.current });
    this.props.getUserUploadDocuments({
      userId: +this.props.match.params.userdetail,
      page: pagination.current,
      pagesize: pagination.pageSize,
    });
  };

  openViewer = (url) => {
    this.setState({
      viewer: {
        open: true,
        url,
      },
    });
  };
  handleSearch = (e) => {
    this.setState({ search: e.target.value, page: 1 });
    this.props.getUserUploadDocuments({
      userId: +this.props.match.params.userdetail,
      page: 1,
      search: e.target.value,
      pagesize: this.state.pagesize,
    });
  };
  render() {
    const { rowStyle } = basicStyle;

    const checkCurrentRouteComponent = this.props?.match?.path.includes(
      'uploaded-documents'
    );

    const data = checkCurrentRouteComponent
      ? this.props.activityUserDocumentList
      : this.props.activityUserDetailes.upload_documents
      ? this.props.activityUserDetailes.upload_documents.data
      : [];

    const UploadedDocsData = data.map((item, index) => ({
      key: index + 1,
      documentName: checkCurrentRouteComponent
        ? item.original_name
        : item.document_name,
      url: item.url,
      docs: item.url.split('/').slice(-1)[0],
      partnerName: '--',
      uploadDate: moment(item.upload_date || item.created_at).format(
        "MMM D, 'YY - h:mma"
      ),
    }));
    const UploadedDocsColumns = [
      {
        title: <IntlMessages id="antTable.title.documentName" />,
        key: 'documentName',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'documentName'),
        sorter: false,
      },
      {
        title: <IntlMessages id="antTable.title.partnerName" />,
        key: 'partnerName',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'partnerName'),
        sorter: false,
      },
      {
        title: <IntlMessages id="antTable.title.uploadDate" />,
        key: 'uploadDate',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'uploadDate'),
        sorter: false,
      },
      {
        title: <IntlMessages id="antTable.title.actions" />,
        key: 'actions-view',
        width: 200,
        render: (object) => (
          <Row className="table-action-btns-grp" style={{ flexFlow: 'row' }}>
            <Col>
              <a onClick={() => this.openViewer(object.url)}>
                <button>
                  <img
                    src={ViewBtn}
                    alt="Table Row View Button"
                    name={object.title}
                  />
                </button>
              </a>
            </Col>
            <Col>
              <button onClick={() => downloadBlobFile(object.url, object.docs)}>
                <img src={DownloadeBtn} alt="Table Row Edit Button" />
              </button>
            </Col>
          </Row>
        ),
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
                    <Title level={2}>View Uploaded Documents</Title>
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
                  Uploaded Documents
                </Title>
              )}
              <Row style={rowStyle} gutter={0} justify="start">
                <Col lg={24} md={24} sm={24} xs={24}>
                  <IsoWidgetsWrapper className="viewUserDetailActivity">
                    <IsoWidgetBox>
                      {this.state.viewer.open && (
                        <FileViewer
                          visible={this.state.viewer.open}
                          url={this.state.viewer.url}
                          handleClose={() =>
                            this.setState({
                              viewer: {
                                open: false,
                                url: '',
                              },
                            })
                          }
                        />
                      )}
                      {/* Checklists Table */}
                      <TableViews.SimpleView
                        isSelection={false}
                        columns={UploadedDocsColumns}
                        dataSource={UploadedDocsData}
                        isPaginate={
                          checkCurrentRouteComponent && {
                            current: this.state.page,
                            defaultCurrent: 1,
                            total: this.props.pageUserDocumentCount,
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
                                    pathname: `/portal/dashboard/activity/users/${this.props?.match?.params?.userdetail}/uploaded-documents`,
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
  pageUserDocumentCount: state.Users.pageUserDocumentCount,
  activityUserName: state.Users.activityUserName,
  activityUserDetailes: state.Users.activityUserDetailes,
  activityUserDocumentList: state.Users.activityUserDocumentList,
});
const mapDispatchToProps = (dispatch) => ({
  getUserDetailes: (payload) => dispatch(getUserDetailes(payload)),
  getUserUploadDocuments: (payload) =>
    dispatch(getUserUploadDocuments(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UploadedDocuments)
);
