import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import authActions from '@iso/redux/app/actions';
import { notification, message } from 'antd';
import {
  getCoBrandCustomList,
  getLODashboardMenuList,
  addCustomLinkDashboard,
  saveLODashboardMenu,
  addCustomLinkApp,
  getLOAppMenuList,
  saveLOAppMenu,
  updateLOMortgagteGuide,
  getLOMortgageGuide,
  deleteLOAppsettingAppMenu,
  addCoBrandCustomLink,
  removeCoBrandCustomLink,
} from '@iso/lib/services/LO/appSettings';
import actions from './actions';

/* TODO: NEEDS to be changes with actual API */
export function* getCoBrandCustomLinkList() {
  yield takeEvery(actions.CO_BRAND_CUSTOM_LINKS, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getCoBrandCustomList, payload.id);

      yield put({
        type: actions.CO_BRAND_CUSTOM_LINKS_SUCCESS,
        list: response?.data?.data?.custom_links,
      });
    } catch (error) {
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getAppSettingDashboardMenuList() {
  yield takeEvery(actions.APP_SETTING_DASHBOARD_MENU, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getLODashboardMenuList);

      yield put({
        type: actions.APP_SETTING_DASHBOARD_MENU_SUCCESS,
        list: response.data.data.list,
        currentLinks: response.data.data.custom_links,
        company_list: response.data.data.company_list,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.APP_SETTING_DASHBOARD_MENU_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteAppsetingMenuSagas() {
  yield takeEvery(actions.DELETE_APP_SETTING_MENU, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const id = payload.id;
      const menu = payload.menu_type;
      const response = yield call(deleteLOAppsettingAppMenu, id, menu);

      if (response.data.status) {
        notification.success({
          message: response.data.message,
        });

        if (menu === 'dashboard-menu') {
          yield put({
            type: actions.DELETE_APP_SETTING_DASHBOARD_MENU_SUCCESS,
            del_id: id,
          });
        } else {
          yield put({
            type: actions.DELETE_APP_SETTING_APP_MENU_SUCCESS,
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

export function* getAppSettingMortgageGuide() {
  yield takeEvery(actions.APP_SETTING_MORTGAGE_GUIDE, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(getLOMortgageGuide);
      yield put({
        type: actions.APP_SETTING_MORTGAGE_GUIDE_SUCCESS,
        list: response.data.data.mortgage_guide_list,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.APP_SETTING_MORTGAGE_GUIDE_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* changeMortgageGuide() {
  yield takeEvery(actions.CHANGE_APP_SETTING_MORTGAGE_GUIDE, function* ({
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
        type: actions.CHANGE_APP_SETTING_MORTGAGE_GUIDE_SUCCESS,
        list: response.data.data.mortgage_guide_list,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.CHANGE_APP_SETTING_MORTGAGE_GUIDE_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getAppSettingMenuList() {
  yield takeEvery(actions.APP_SETTING_MENU, function* () {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(getLOAppMenuList);

      yield put({
        type: actions.APP_SETTING_MENU_SUCCESS,
        list: response.data.data.list,
        currentLinks: response.data.data.custom_links,
        company_list: response.data.data.company_list,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.APP_SETTING_MENU_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* addCustomLinkDashboardMenu() {
  yield takeEvery(actions.ADD_CUSTOM_LINK_DASHBOARD, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(addCustomLinkDashboard, payload);
      if (response.status) {
        notification.success({
          message: 'Menu updated successfully',
        });
      }
      yield put({
        type: actions.ADD_CUSTOM_LINK_DASHBOARD_SUCCESS,
        currentLinks: response.data.data.custom_links,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.ADD_CUSTOM_LINK_DASHBOARD_ERROR });
      message.error(error?.response?.data?.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveAppSettingDashboardMenuList() {
  yield takeEvery(actions.SAVE_APP_SETTING_DASHBOARD_MENU, function* ({
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
        type: actions.SAVE_APP_SETTING_DASHBOARD_MENU_SUCCESS,
        list: response.data.data.list,
        company_list: response.data.data.company_list,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.SAVE_APP_SETTING_DASHBOARD_MENU_ERROR });
      message.error(error?.response?.data?.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* saveAppSettingMenuList() {
  yield takeEvery(actions.SAVE_APP_SETTING_MENU, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(saveLOAppMenu, payload);
      if (response.status) {
        notification.success({
          message: 'Menu updated successfully',
        });
      }
      yield put({
        type: actions.SAVE_APP_SETTING_MENU_SUCCESS,
        list: response.data.data.list,
        company_list: response.data.data.company_list,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.SAVE_APP_SETTING_MENU_ERROR });
      message.error(error?.response?.data?.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* addCustomLinkAppMenu() {
  yield takeEvery(actions.ADD_CUSTOM_LINK_APP, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(addCustomLinkApp, payload);
      if (response.status) {
        notification.success({
          message: 'Menu updated successfully',
        });
      }
      yield put({
        type: actions.ADD_CUSTOM_LINK_APP_SUCCESS,
        currentLinks: response.data.data.custom_links,
      });
    } catch (error) {
      console.log(error);
      yield put({ type: actions.ADD_CUSTOM_LINK_APP_ERROR });
      message.error(error?.response?.data?.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* addCustomLinkForCoBrandOfficer() {
  yield takeEvery(actions.ADD_CUSTOM_LINK_CO_BRAND_OFFICER, function* ({
    payload,
    id,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(addCoBrandCustomLink, payload, id);
      if (response.status) {
        notification.success({
          message: 'Link added successfully',
        });
      }

      yield put(actions.coBrandCustomLinksList({ id }));
    } catch (error) {
      console.log(error);
      message.error(error?.response?.data?.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteCustomLinkForCoBrandOfficer() {
  yield takeEvery(actions.DELETE_CUSTOM_LINK_CO_BRAND_OFFICER, function* ({
    payload,
    id,
  }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(removeCoBrandCustomLink, payload, id);
      if (response.status) {
        notification.success({
          message: 'Link removed successfully',
        });
      }

      yield put(actions.coBrandCustomLinksList({ id }));
    } catch (error) {
      console.log(error);
      message.error(error?.response?.data?.message);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getCoBrandCustomLinkList)]);
  yield all([fork(getAppSettingDashboardMenuList)]);
  yield all([fork(getAppSettingMenuList)]);
  yield all([fork(saveAppSettingDashboardMenuList)]);
  yield all([fork(saveAppSettingMenuList)]);
  yield all([fork(addCustomLinkAppMenu)]);
  yield all([fork(addCustomLinkDashboardMenu)]);
  yield all([fork(getAppSettingMortgageGuide)]);
  yield all([fork(changeMortgageGuide)]);
  yield all([fork(deleteAppsetingMenuSagas)]);
  yield all([fork(addCustomLinkForCoBrandOfficer)]);
  yield all([fork(deleteCustomLinkForCoBrandOfficer)]);
}
