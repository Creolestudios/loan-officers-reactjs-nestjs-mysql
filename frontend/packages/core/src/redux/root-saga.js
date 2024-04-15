import { all } from 'redux-saga/effects';
import appSagas from '@iso/redux/app/saga';
import authSagas from '@iso/redux/auth/saga';
import loAppSettingSagas from '@iso/redux/loanofficer/appsetting/saga';
import loLoanProgramSagas from '@iso/redux/loanPrograms/saga';
import loLearningCenterSagas from '@iso/redux/learningCenter/saga';
import loLegalSagas from '@iso/redux/legal/saga';
import callBackRequestSagas from '@iso/redux/callbackRequestActivity/saga';
import checkListSagas from '@iso/redux/CheckListContent/saga';
import documentsSagas from '@iso/redux/documentsActivity/saga';
import usersSagas from '@iso/redux/usersActivity/saga';
import feesSagas from '@iso/redux/feesLoanSetting/saga';
import fhaSagas from '@iso/redux/FHACalculator/saga';
import conventionalSagas from '@iso/redux/ConventionalCalculator/saga';
import jumboSagas from '@iso/redux/JumboCalculator/saga';
import usdaSagas from '@iso/redux/USDACalculator/saga';
import VASagas from '@iso/redux/VACalculator/saga';
import affordabilitySagas from '@iso/redux/AffordabilityCalculator/saga';
import calculatorTypesSagas from '@iso/redux/calculatorTypes/saga';
import QrCodeSagas from '@iso/redux/MarketQrCode/saga';
import EmailSignatureSagas from '@iso/redux/marketEmailSignature/saga';
import AutoResponderSagas from '@iso/redux/autoResponder/saga';
import DashboardSagas from '@iso/redux/Dashboard/saga';
import CoBrandSagas from '@iso/redux/COBranding/saga';
import ColorSchemaSagas from '@iso/redux/ColorSchema/saga';
import widgetSagas from '@iso/redux/marketWidget/saga';
import billingHistorySagas from '@iso/redux/BillingHistory/saga';
import subscriptionSagas from '@iso/redux/SubscriptionsPlan/saga';
import brandedappSagas from '@iso/redux/BrandedApp/saga';
import webLinkSagas from '@iso/redux/desktopLink/saga';

import AdminBrandedAppSagas from '@iso/redux/Admin/BrandedAppAdmin/saga';
import AdminBillingPrimaryLOSagas from '@iso/redux/Admin/BillingPrimaryLO/saga';
import AdminUsersBorrowersSagas from '@iso/redux/Admin/UsersBorrowers/saga';
import AdminSubcriptionPlanSagas from '@iso/redux/Admin/SubscriptionPlan/saga';
import AdminUsersLOSagas from '@iso/redux/Admin/UsersLO/saga';
import AdminSupportGuideSagas from '@iso/redux/Admin/GuideSupport/saga';
import AdminChecklistSagas from '@iso/redux/Admin/Checklist/saga';
import AdminLearningCenterSagas from '@iso/redux/Admin/LearningCenter/saga';
import AdminFeesSagas from '@iso/redux/Admin/Fees/saga';
import AdminLoanProgramSagas from '@iso/redux/Admin/LoanProgram/saga';
import AdminAppDefaultMenuSagas from '@iso/redux/Admin/Menus/saga';
import AdminAppDefaultLegalSagas from '@iso/redux/Admin/Legal/saga';
import AdminAppDefaultGlossarySagas from '@iso/redux/Admin/Glossary/saga';
import AdminAppDefaultAffordabilitySagas from '@iso/redux/Admin/AffordabilityCalculator/saga';
import AdminAppDefaultFHASagas from '@iso/redux/Admin/FHACalculator/saga';
import AdminAppDefaultConventionalSagas from '@iso/redux/Admin/ConventionalCalculator/saga';
import AdminAppDefaultJumboSagas from '@iso/redux/Admin/JumboCalculator/saga';
import AdminAppDefaultUSDASagas from '@iso/redux/Admin/USDACalculator/saga';
import AdminAppDefaultVASagas from '@iso/redux/Admin/VACalculator/saga';
import AdminAppDefaultCalculatorTypesSagas from '@iso/redux/Admin/calculationTypes/saga';
import AdminDiscountSagas from '@iso/redux/Admin/Discounts/saga';
import AdminAccountSagas from '@iso/redux/Admin/MyAccount/saga';
import AdminMessageSagas from '@iso/redux/Admin/Messages/saga';
import AdminDashboardSagas from '@iso/redux/Admin/Dashboard/saga';
import AdminAppDefaultSagas from '@iso/redux/Admin/EmailSignature/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    appSagas(),
    loAppSettingSagas(),
    loLoanProgramSagas(),
    loLearningCenterSagas(),
    loLegalSagas(),
    callBackRequestSagas(),
    checkListSagas(),
    documentsSagas(),
    usersSagas(),
    feesSagas(),
    fhaSagas(),
    conventionalSagas(),
    jumboSagas(),
    usdaSagas(),
    VASagas(),
    affordabilitySagas(),
    calculatorTypesSagas(),
    QrCodeSagas(),
    EmailSignatureSagas(),
    AutoResponderSagas(),
    DashboardSagas(),
    CoBrandSagas(),
    ColorSchemaSagas(),
    widgetSagas(),
    billingHistorySagas(),
    subscriptionSagas(),
    brandedappSagas(),
    webLinkSagas(),

    AdminBrandedAppSagas(),
    AdminBillingPrimaryLOSagas(),
    AdminUsersBorrowersSagas(),
    AdminSubcriptionPlanSagas(),
    AdminUsersLOSagas(),
    AdminSupportGuideSagas(),
    AdminChecklistSagas(),
    AdminLearningCenterSagas(),
    AdminFeesSagas(),
    AdminLoanProgramSagas(),
    AdminAppDefaultMenuSagas(),
    AdminAppDefaultLegalSagas(),
    AdminAppDefaultGlossarySagas(),
    AdminAppDefaultAffordabilitySagas(),
    AdminAppDefaultFHASagas(),
    AdminAppDefaultConventionalSagas(),
    AdminAppDefaultJumboSagas(),
    AdminAppDefaultUSDASagas(),
    AdminAppDefaultVASagas(),
    AdminAppDefaultCalculatorTypesSagas(),
    AdminDiscountSagas(),
    AdminAccountSagas(),
    AdminMessageSagas(),
    AdminDashboardSagas(),
    AdminAppDefaultSagas(),
  ]);
}
