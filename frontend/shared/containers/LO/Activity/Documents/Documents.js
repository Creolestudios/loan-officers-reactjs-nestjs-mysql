import React, { Component } from 'react';
import { ReactComponent as SortIconBtn } from '@iso/assets/images/icon/sort-icon-whole.svg';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Input from '@iso/components/uielements/input';
import FileViewer from '@iso/components/uielements/fileViewer';
import moment from 'moment';
import { Row, Col, Typography, Form, Space, message } from 'antd';
import ViewBtn from '@iso/assets/images/icon/view-btn.svg';
import DownloadeBtn from '@iso/assets/images/download.png';
import axios from 'axios';
import { isEmpty } from 'lodash';
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
import LayoutHeaderActionWrapper from '@iso/components/utility/layoutHeaderActionWrapper';
import { ExportCSV } from '../ExportCSV';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import documentsAction from '@iso/redux/documentsActivity/action';
import { downloadBlobFile } from '@iso/lib/helpers/utility';

const { getDocuments } = documentsAction;
const { Title } = Typography;
const FormItem = Form.Item;

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      nameOfChekList: '',
      page: 1,
      search: '',
      pagesize: 10,
      selectedRows: [],
      filextention: 'Excel',
      viewer: {
        open: false,
        url: '',
      },
      pdfPage: 0,
    };
  }
  async componentDidMount() {
    const { page, search, pagesize } = this.state;

    await this.props.getDocuments({ page, search, pagesize });
  }
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
      this.props.getDocuments({
        page: pagination.current,
        pagesize: pagination.pageSize,
      });
    }
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows });
  };

  handleSearch = (e) => {
    this.setState({ search: e.target.value, page: 1 });
    this.props.getDocuments({
      page: 1,
      search: e.target.value,
      pagesize: this.state.pagesize,
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

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({
      pdfPage: numPages,
    });
  };

  render() {
    const { rowStyle, colStyle } = basicStyle;

    const rowSelection = {
      onChange: this.onSelectChange,
    };
    const data = this.props.activityDocumentsList;

    const newData = this.state.selectedRows.filter(
      (x) => data.filter((i) => i.id === x.id)[0]
    );

    const UsersData = isEmpty(data)
      ? []
      : data.map((item, index) => ({
          key: item.id,
          userid: item.user_id,
          id: item.id,
          name: item.name,
          url: item.url,
          docs: item.url.split('/').slice(-1)[0],
          partner: item.partner || '--',
          documentName: item.original_name,
          date: item.created_at,
        }));

    const fileTypes = this.state.filextention === 'CSV' ? '.csv' : '.xlsx';

    const dataOfExel = newData.map((item, index) => ({
      UserID: item.userid,
      Name: item.name,
      Partner: item.partner,
      DocumentName: item.documentName,
      Date: moment(item.date).format("MMM D, 'YY - h:mma"),
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
            <IntlMessages id="antTable.title.documentName" />
            <SortIconBtn />
          </Space>
        ),
        key: 'documentName',
        width: 500,
        render: (object) => renderCell(object, 'TextCell', 'documentName'),
        sorter: (a, b) => a.documentName.localeCompare(b.documentName),
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
      {
        title: <IntlMessages id="antTable.title.actions" />,
        key: 'actions-view',
        width: 200,
        render: (object) => (
          <Row style={{ flexFlow: 'row' }}>
            <Col>
              <button onClick={() => downloadBlobFile(object.url, object.docs)}>
                <img src={DownloadeBtn} alt="document download button" />
              </button>
            </Col>
            <Col>
              <a onClick={() => this.openViewer(object.url)}>
                <button>
                  <img
                    src={ViewBtn}
                    alt="document view button"
                    name={object.title}
                  />
                </button>
              </a>
            </Col>
          </Row>
        ),
      },
    ];

    return (
      <React.Fragment>
        <LayoutHeaderWrapper className="activityUserMainHeader altactivityUserMainHeader">
          <Title level={2}>Documents</Title>
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
                  onClick={() => ExportCSV(dataOfExel, 'Documents', fileTypes)}
                >
                  <IntlMessages id="button.export" />
                </Button>
              </Col>

              <Col className="searchUsers altSearchUser" xl={6} lg={7} xs={24}>
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
                      className="documentTable isoSimpleTable"
                      isSelection={true}
                      rowSelection={rowSelection}
                      columns={UsersDataColumns}
                      dataSource={UsersData}
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
  activityDocumentsList: state.documents.activityDocumentsList,
  pageCount: state.documents.pageCount,
});
const mapDispatchToProps = (dispatch) => ({
  getDocuments: (payload) => dispatch(getDocuments(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Documents)
);
