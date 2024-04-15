import { combineReducers } from 'redux';
import App from '@iso/redux/app/reducer';
import Auth from '@iso/redux/auth/reducer';
import LOAppSetting from '@iso/redux/loanofficer/appsetting/reducer';
import Box from '@iso/redux/box/reducer';
import ThemeSwitcher from '@iso/redux/themeSwitcher/reducer';
import LanguageSwitcher from '@iso/redux/languageSwitcher/reducer';
import drawer from '@iso/redux/drawer/reducer';
import modal from '@iso/redux/modal/reducer';
import loanProgram from '@iso/redux/loanPrograms/reducer';
import learningCenter from '@iso/redux/learningCenter/reducer';
import Legal from '@iso/redux/legal/reducer';
import CallBackRequest from '@iso/redux/callbackRequestActivity/reducer';
import checkList from '@iso/redux/CheckListContent/reducer';
import documents from '@iso/redux/documentsActivity/reducer';
import Users from '@iso/redux/usersActivity/reducer';
import Fees from '@iso/redux/feesLoanSetting/reducer';
import FHA from '@iso/redux/FHACalculator/reducer';
import Conventional from '@iso/redux/ConventionalCalculator/reducer';
import Jumbo from '@iso/redux/JumboCalculator/reducer';
import USDA from '@iso/redux/USDACalculator/reducer';
import VA from '@iso/redux/VACalculator/reducer';
import Affordability from '@iso/redux/AffordabilityCalculator/reducer';
import CalculatorType from '@iso/redux/calculatorTypes/reducer';
import QrCode from '@iso/redux/MarketQrCode/reducer';
import EmailSignature from '@iso/redux/marketEmailSignature/reducer';
import AutoResponder from '@iso/redux/autoResponder/reducer';
import Dashboard from '@iso/redux/Dashboard/reducer';
import CoBrand from '@iso/redux/COBranding/reducer';
import colorSchema from '@iso/redux/ColorSchema/reducer';
import WidGet from '@iso/redux/marketWidget/reducer';
import BillingHistory from '@iso/redux/BillingHistory/reducer';
import subscription from '@iso/redux/SubscriptionsPlan/reducer';
import brandedApp from '@iso/redux/BrandedApp/reducer';
import webLink from '@iso/redux/desktopLink/reducer';

import AdminBrandedApp from '@iso/redux/Admin/BrandedAppAdmin/reducer';
import AdminBillingUser from '@iso/redux/Admin/BillingPrimaryLO/reducer';
import AdminUsersBorrowers from '@iso/redux/Admin/UsersBorrowers/reducer';
import AdminSubscriptioPlan from '@iso/redux/Admin/SubscriptionPlan/reducer';
import AdminUsersLO from '@iso/redux/Admin/UsersLO/reducer';
import AdminSupportGuide from '@iso/redux/Admin/GuideSupport/reducer';
import AdminChecklist from '@iso/redux/Admin/Checklist/reducer';
import AdminLearningCenter from '@iso/redux/Admin/LearningCenter/reducer';
import AdminFees from '@iso/redux/Admin/Fees/reducer';
import AdminLoanProgram from '@iso/redux/Admin/LoanProgram/reducer';
import AdminAppDefaultMenus from '@iso/redux/Admin/Menus/reducer';
import AdminAppDefaultLegal from '@iso/redux/Admin/Legal/reducer';
import AdminAppDefaultGlossary from '@iso/redux/Admin/Glossary/reducer';
import AdminAppDefaultAffordability from '@iso/redux/Admin/AffordabilityCalculator/reducer';
import AdminAppDefaultFHA from '@iso/redux/Admin/FHACalculator/reducer';
import AdminAppDefaultConventional from '@iso/redux/Admin/ConventionalCalculator/reducer';
import AdminAppDefaultJumbo from '@iso/redux/Admin/JumboCalculator/reducer';
import AdminAppDefaultUSDA from '@iso/redux/Admin/USDACalculator/reducer';
import AdminAppDefaultVA from '@iso/redux/Admin/VACalculator/reducer';
import AdminAppDefaultCalculatorTypes from '@iso/redux/Admin/calculationTypes/reducer';
import AdminDiscount from '@iso/redux/Admin/Discounts/reducer';
import AdminAccount from '@iso/redux/Admin/MyAccount/reducer';
import AdminMessage from '@iso/redux/Admin/Messages/reducer';
import AdminDashboard from '@iso/redux/Admin/Dashboard/reducer';
import AdminAppDefault from '@iso/redux/Admin/EmailSignature/reducer';

export default combineReducers({
  Auth,
  App,
  ThemeSwitcher,
  LanguageSwitcher,
  Box,
  modal,
  drawer,
  loanProgram,
  learningCenter,
  Legal,
  CallBackRequest,
  checkList,
  documents,
  Users,
  Fees,
  FHA,
  Conventional,
  Jumbo,
  USDA,
  VA,
  Affordability,
  CalculatorType,
  QrCode,
  EmailSignature,
  AutoResponder,
  Dashboard,
  CoBrand,
  colorSchema,
  WidGet,
  BillingHistory,
  subscription,
  brandedApp,
  AdminBrandedApp,
  AdminBillingUser,
  AdminUsersBorrowers,
  AdminSubscriptioPlan,
  AdminUsersLO,
  AdminSupportGuide,
  AdminChecklist,
  AdminLearningCenter,
  AdminFees,
  AdminLoanProgram,
  AdminAppDefaultMenus,
  AdminAppDefaultLegal,
  AdminAppDefaultGlossary,
  AdminAppDefaultAffordability,
  AdminAppDefaultFHA,
  AdminAppDefaultConventional,
  AdminAppDefaultJumbo,
  AdminAppDefaultUSDA,
  AdminAppDefaultVA,
  AdminAppDefaultCalculatorTypes,
  AdminDiscount,
  AdminAccount,
  AdminMessage,
  AdminDashboard,
  AdminAppDefault,
  LOAppSetting: LOAppSetting,
  webLink,
});
