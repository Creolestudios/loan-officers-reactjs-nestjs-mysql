import React, { Component } from 'react';
import { List, Typography } from 'antd';
import { connect } from 'react-redux';
import { isEmpty, cloneDeep } from 'lodash';
import dashboardAction from '@iso/redux/loanofficer/appsetting/actions';
import Button from '@iso/components/uielements/button';
import Box from '@iso/components/utility/box';
import UpIcon from '@iso/assets/images/icon/box-up-arrow.svg';
import UpDisableIcon from '@iso/assets/images/icon/box-up-disable-arrow.svg';
import DownIcon from '@iso/assets/images/icon/box-down-arrow.svg';
import DownDisableIcon from '@iso/assets/images/icon/box-down-disable-arrow.svg';
import Image from '@iso/ui/Image/Image';

const { appDashboardMenuSave, appMenuSave } = dashboardAction;

const { Text } = Typography;

class ChangeSequence extends Component {
  state = {
    mainList: [],
    // The list which isChecked = false and isChangeable = false for employee LO only
    noCheckList: [],
  };
  componentDidMount() {
    let { dashboardMenuList, activeTab, appMenuList } = this.props;

    if (activeTab == 2) {
      if (!isEmpty(appMenuList)) {
        const noDashArr = cloneDeep(appMenuList);
        this.updateListState(noDashArr);
      } else {
        if (!isEmpty(dashboardMenuList)) {
          const noDashArr = cloneDeep(dashboardMenuList);
          this.updateListState(noDashArr);
        }
      }
    }
  }
  componentDidUpdate(prevProps) {
    let { dashboardMenuList, appMenuList, activeTab } = this.props;

    if (activeTab == 2) {
      if (appMenuList !== prevProps.appMenuList) {
        if (!isEmpty(appMenuList)) {
          const noDashArr = cloneDeep(appMenuList);
          this.updateListState(noDashArr);
        }
      }
    } else {
      if (dashboardMenuList !== prevProps.dashboardMenuList) {
        if (!isEmpty(dashboardMenuList)) {
          const noDashArr = cloneDeep(dashboardMenuList);
          this.updateListState(noDashArr);
        }
      }
    }
  }

  updateListState = (noDashArr) => {
    noDashArr.shift();
    const mainList = [];
    const noCheckList = [];

    noDashArr.forEach((list) => {
      if (list?.isChecked === false && list?.isChangeable === false) {
        noCheckList.push(list);
      } else {
        mainList.push(list);
      }
    });

    this.setState({
      mainList,
      noCheckList,
    });
  };

  handleArrow = (item, newIndex, oldIndex) => {
    const { mainList } = this.state;
    const movedItem = mainList.find((elment, index) => index === oldIndex);
    const remainingItems = mainList.filter(
      (elment, index) => index !== oldIndex
    );

    const reorderedItems = [
      ...remainingItems.slice(0, newIndex),
      movedItem,
      ...remainingItems.slice(newIndex),
    ];

    this.setState({
      mainList: reorderedItems,
    });
  };

  handleSubmit = () => {
    const { mainList, noCheckList } = this.state;
    const { dashboardMenuList, activeTab, appMenuList } = this.props;
    if (isEmpty(mainList)) {
      return;
    }
    let allDataArr = cloneDeep(mainList);
    if (activeTab == 2) {
      allDataArr.unshift(appMenuList[0]);
    } else {
      allDataArr.unshift(dashboardMenuList[0]);
    }

    // Adding noChecked list which would be used for visible flag for later use-case.
    allDataArr = allDataArr.concat(noCheckList);

    let payload = allDataArr.map((element, index) => {
      return {
        ...element,
        sequence: index + 1,
      };
    });

    const is_branded_user =
      this.props?.BrandedAppApplyStatus?.status === false ||
      this.props?.BrandedAppApplyStatus?.status === 'Rejected' ||
      this.props?.BrandedAppApplyStatus?.status === 'Cancelled';

    const is_employee = this.props.profileDetails?.parent_id !== null;

    payload = {
      menu: payload,
    };

    if (!is_branded_user && !is_employee) {
      payload['company_menu'] = this.props.dashboardCompanyList;
    }
    if (activeTab == 2) {
      this.props.appMenuSave(payload);
    } else {
      this.props.appDashboardMenuSave(payload);
    }
  };

  render() {
    return (
      <Box
        title={
          this.props.activeTab !== 2
            ? 'Live App Dashboard Menu'
            : 'Live App Menu'
        }
        footer={
          <div className="dashboardButtonwrapper">
            <Button className="dashboardBtn" onClick={this.handleSubmit}>
              Save
            </Button>
          </div>
        }
      >
        <List
          className="isoListComponentWrapper"
          itemLayout="horizontal"
          dataSource={this.state.mainList}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                index === 0 ? (
                  <Image src={UpDisableIcon} alt="up icon" />
                ) : (
                  <Image
                    src={UpIcon}
                    alt="up icon"
                    onClick={() => this.handleArrow(item, index - 1, index)}
                  />
                ),
                index === this.state?.mainList?.length - 1 ? (
                  <Image src={DownDisableIcon} alt="down icon" />
                ) : (
                  <Image
                    src={DownIcon}
                    alt="down icon"
                    onClick={() => this.handleArrow(item, index + 1, index)}
                  />
                ),
              ]}
            >
              <Text style={{ whiteSpace: 'break-spaces' }}>{item.name}</Text>
            </List.Item>
          )}
        />
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  dashboardMenuList: state.LOAppSetting.appSettingsDashboardMenuList,
  dashboardCompanyList: state.LOAppSetting.appSettingsDashboardCompanyList,
  BrandedAppApplyStatus: state.subscription.BrandedAppApplyStatus,
  appMenuList: state.LOAppSetting.appSettingsAppMenuList,
  profileDetails: state.Auth.profileObj,
});
const mapDispatchToProps = (dispatch) => ({
  appDashboardMenuSave: (payload) => dispatch(appDashboardMenuSave(payload)),
  appMenuSave: (payload) => dispatch(appMenuSave(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeSequence);
