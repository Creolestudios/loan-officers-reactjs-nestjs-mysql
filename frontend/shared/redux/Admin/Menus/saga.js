import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import { notification, message } from 'antd';
import {
  getLODashboardMenuList,
  addCustomLinkDashboard,
  saveLODashboardMenu,
  addCustomLinkApp,
  getLOAppMenuList,
  saveLOAppMenu,
  updateLOMortgagteGuide,
  getLOMortgageGuide,
  deleteAdminAppMenu,
} from '@iso/lib/services/Admin/MenusAppDefault';
import actions from './action';

export function* getAppSettingDashboardMenuList() {
  yield takeEvery(actions.APP_DEF_DASHBOARD_MENU_ADMIN, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getLODashboardMenuList);

      yield put({
        type: actions.APP_DEF_DASHBOARD_MENU_ADMIN_SUCCESS,
        list: response.data.data.list,
        currentLinks: response.data.data.custom_links,
        company_list: response.data.data.company_list,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.APP_DEF_DASHBOARD_MENU_ADMIN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getAppSettingMortgageGuide() {
  yield takeEvery(actions.APP_DEF_MORTGAGE_GUIDE_ADMIN, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getLOMortgageGuide);
      yield put({
        type: actions.APP_DEF_MORTGAGE_GUIDE_ADMIN_SUCCESS,
        list: response.data.data.mortgage_guide_list,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.APP_DEF_MORTGAGE_GUIDE_ADMIN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* changeMortgageGuide() {
  yield takeEvery(actions.CHANGE_APP_DEF_MORTGAGE_GUIDE_ADMIN, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(updateLOMortgagteGuide, payload);
      if (response.status) {
        notification.success({
          message: 'Mortgage Guide update successfully',
        });
      }
      yield put({
        type: actions.CHANGE_APP_DEF_MORTGAGE_GUIDE_ADMIN_SUCCESS,
        list: response.data.data.mortgage_guide_list,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.CHANGE_APP_DEF_MORTGAGE_GUIDE_ADMIN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getAppSettingMenuList() {
  yield takeEvery(actions.APP_DEF_MENU_ADMIN, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getLOAppMenuList);

      yield put({
        type: actions.APP_DEF_MENU_ADMIN_SUCCESS,
        list: response.data.data.list,
        currentLinks: response.data.data.custom_links,
        company_list: response.data.data.company_list,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.APP_DEF_MENU_ADMIN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteMenuSagas() {
  yield takeEvery(actions.DELETE_APP_DEF_MENU_ADMIN, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const id = payload.id;
      const menu = payload.menu_type;
      const response = yield call(deleteAdminAppMenu, id, menu);

      if (response.data.status) {
        notification.success({
          message: response.data.message,
        });

        if (menu === 'dashboard-menu') {
          yield put({
            type: actions.DELETE_APP_DEF_DASHBOARD_MENU_ADMIN_SUCCESS,
            del_id: id,
          });
        } else {
          yield put({
            type: actions.DELETE_APP_DEF_APP_MENU_ADMIN_SUCCESS,
            del_id: id,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* addCustomLinkDashboardMenu() {
  yield takeEvery(actions.ADD_CUSTOM_LINK_DASHBOARD_ADMIN, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(addCustomLinkDashboard, payload);
      if (response.status) {
        notification.success({
          message: 'Menu updated successfully',
        });
      }
      yield put({
        type: actions.ADD_CUSTOM_LINK_DASHBOARD_ADMIN_SUCCESS,
        list: response.data.data.list,
        currentLinks: response.data.data.custom_links,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.ADD_CUSTOM_LINK_DASHBOARD_ADMIN_ERROR });
      message.error(error?.response?.data?.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveAppSettingDashboardMenuList() {
  yield takeEvery(actions.SAVE_APP_DEF_DASHBOARD_MENU_ADMIN, function* ({
    payload,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(saveLODashboardMenu, payload);
      if (response.status) {
        notification.success({
          message: 'Menu updated successfully',
        });
      }
      yield put({
        type: actions.SAVE_APP_DEF_DASHBOARD_MENU_ADMIN_SUCCESS,
        list: response.data.data.list,
        company_list: response.data.data.company_list,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.SAVE_APP_DEF_DASHBOARD_MENU_ADMIN_ERROR });
      message.error(error?.response?.data?.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveAppSettingMenuList() {
  yield takeEvery(actions.SAVE_APP_DEF_MENU_ADMIN, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(saveLOAppMenu, payload);
      if (response.status) {
        notification.success({
          message: 'Menu updated successfully',
        });
      }
      yield put({
        type: actions.SAVE_APP_DEF_MENU_ADMIN_SUCCESS,
        list: response.data.data.list,
        company_list: response.data.data.company_list,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.SAVE_APP_DEF_MENU_ADMIN_ERROR });
      message.error(error?.response?.data?.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* addCustomLinkAppMenu() {
  yield takeEvery(actions.ADD_CUSTOM_LINK_APP_ADMIN, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(addCustomLinkApp, payload);
      if (response.status) {
        notification.success({
          message: 'Menu updated successfully',
        });
      }
      yield put({
        type: actions.ADD_CUSTOM_LINK_APP_ADMIN_SUCCESS,
        list: response.data.data.list,
        currentLinks: response.data.data.custom_links,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.ADD_CUSTOM_LINK_APP_ADMIN_ERROR });
      message.error(error?.response?.data?.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getAppSettingDashboardMenuList)]);
  yield all([fork(getAppSettingMenuList)]);
  yield all([fork(saveAppSettingDashboardMenuList)]);
  yield all([fork(saveAppSettingMenuList)]);
  yield all([fork(addCustomLinkAppMenu)]);
  yield all([fork(addCustomLinkDashboardMenu)]);
  yield all([fork(getAppSettingMortgageGuide)]);
  yield all([fork(changeMortgageGuide)]);
  yield all([fork(deleteMenuSagas)]);
}
