import { ReactComponent as Icon1 } from '@iso/assets/images/custom-links/icon-1.svg';
import { ReactComponent as Icon2 } from '@iso/assets/images/custom-links/icon-2.svg';
import { ReactComponent as Icon3 } from '@iso/assets/images/custom-links/icon-3.svg';
import { ReactComponent as Icon4 } from '@iso/assets/images/custom-links/icon-4.svg';
import { ReactComponent as Icon5 } from '@iso/assets/images/custom-links/icon-5.svg';
import { ReactComponent as Icon6 } from '@iso/assets/images/custom-links/icon-6.svg';
import { ReactComponent as Icon7 } from '@iso/assets/images/custom-links/icon-7.svg';
import { ReactComponent as Icon8 } from '@iso/assets/images/custom-links/icon-8.svg';
import { ReactComponent as Icon9 } from '@iso/assets/images/custom-links/icon-9.svg';
import { ReactComponent as Icon10 } from '@iso/assets/images/custom-links/icon-10.svg';
import { ReactComponent as Icon11 } from '@iso/assets/images/custom-links/icon-11.svg';
import { ReactComponent as Icon12 } from '@iso/assets/images/custom-links/icon-12.svg';
import { ReactComponent as Icon13 } from '@iso/assets/images/custom-links/icon-13.svg';
import { ReactComponent as Icon14 } from '@iso/assets/images/custom-links/icon-14.svg';
import { ReactComponent as Icon15 } from '@iso/assets/images/custom-links/icon-15.svg';
import { ReactComponent as Icon16 } from '@iso/assets/images/custom-links/icon-16.svg';

import { ReactComponent as GalleryIcon } from '@iso/assets/images/appointment-icons/gallery.svg';
import { ReactComponent as GlobeIcon } from '@iso/assets/images/appointment-icons/globe.svg';
import { ReactComponent as EnvelopIcon } from '@iso/assets/images/appointment-icons/envelop.svg';
import { ReactComponent as CocktailIcon } from '@iso/assets/images/appointment-icons/cocktail.svg';
import { ReactComponent as CalenderIcon } from '@iso/assets/images/appointment-icons/calendar.svg';
import { ReactComponent as BuildingIcon } from '@iso/assets/images/appointment-icons/building.svg';
import { ReactComponent as HomeIcon } from '@iso/assets/images/appointment-icons/home.svg';
import { ReactComponent as PenIcon } from '@iso/assets/images/appointment-icons/pen.svg';
import { ReactComponent as LocationIcon } from '@iso/assets/images/appointment-icons/map.svg';
import { ReactComponent as UsersIcon } from '@iso/assets/images/appointment-icons/users.svg';
import { ReactComponent as GraphIcon } from '@iso/assets/images/appointment-icons/graph.svg';
import { ReactComponent as PlayIcon } from '@iso/assets/images/appointment-icons/play.svg';
import { ReactComponent as MessageIcon } from '@iso/assets/images/appointment-icons/message.svg';

export const getWhiteIcons = (name) =>
  name
    ? `${process.env.REACT_APP_ASSETS_URL}/icons/menu_icons/white/${name}.png`
    : null;

export const getGrayIcons = (name) =>
  name
    ? `${process.env.REACT_APP_ASSETS_URL}/icons/menu_icons/gray/${name}.png`
    : null;

export const getGreenIcons = (name) =>
  name
    ? `${process.env.REACT_APP_ASSETS_URL}/icons/menu_icons/green/${name}.png`
    : null;

export const getDashLinkIcons = (name) =>
  name
    ? `${process.env.REACT_APP_ASSETS_URL}/dashboard_header_icons/${name}.png`
    : null;

export const AppConstant = {
  Role: {
    LO: 'LO',
    ADMIN: 'ADMIN',
  },
  Placeholder: {
    enterHere: 'Enter Here',
    email: 'abc@xyz.com',
    contactNumber: 'Contact Number',
    url: 'URL',
    linkSelect: 'Select the link',
  },
  FormValidation: {
    emailRequired: 'Email is required',
    urlRequired: 'URL is required',
    appointmentLabelRequired: 'Label is required',
    emailInvalid: 'Email is not valid',
    passwordRequired: 'Password is required',
    passwordLength: 'Minimum 6 character are needed',
    passwordValid:
      'Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    nameRequired: 'Name is required',
    nameValid: 'Please enter valid name',
    titleValid: 'Please enter valid title',
    firstnameRequired: 'First name is required',
    lastnameRequired: 'Last name is required',
    companyRequired: 'Company Name is required',
    titleRequired: 'Title is required',
    licenceRequired: 'Licence is required',
    numberRequired: 'Contact Number is required',
    cityRequired: 'City is required',
    zipcodeRequired: 'Zip code is required',
    addressRequired: 'Address is required',
    stateSelectRequired: 'State should be selected',
    urlInvalid: 'Invalid Url',
    minNumberLength: 'Minimum 10 digits are needed',
    maxNumberLength: 'Maximum 12 digits are needed',
    numberOnly: 'Please enter valid phone number',
    cityValid: 'Please enter valid city',
    confirmPassword: 'Please confirm your password!',
    passwordMatch: 'The passwords you entered do not match!',
    terms_condition: 'Please accept terms and conditions',
    numbers_not_allowed: 'Numbers not allowed',
    checklistnameRequired: 'Please enter name',
    itemsRequired: "Please enter item's name",
  },
  stateList: [
    { id: 1, name: 'Florida' },
    { id: 2, name: 'Kentucky' },
    { id: 3, name: 'New York' },
    { id: 4, name: 'South Carolina' },
  ],
  DefaultMenus: [
    {
      id: 'DASHBOARD',
      name: 'Dashboard',
      sequence: 1,
      type: 1,
      icon: {
        white: getWhiteIcons('DASHBOARD'.toLowerCase()),
        gray: getGrayIcons('DASHBOARD'.toLowerCase()),
        green: getGreenIcons('DASHBOARD'.toLowerCase()),
      },
    },
    {
      id: 'CALCULATOR',
      type: 1,
      name: 'Calculator',
      sequence: 2,
      icon: {
        white: getWhiteIcons('CALCULATOR'.toLowerCase()),
        gray: getGrayIcons('CALCULATOR'.toLowerCase()),
        green: getGreenIcons('CALCULATOR'.toLowerCase()),
      },
    },
    {
      id: 'SCAN',
      type: 1,
      name: 'Scan',
      sequence: 3,
      icon: {
        white: getWhiteIcons('SCAN'.toLowerCase()),
        gray: getGrayIcons('SCAN'.toLowerCase()),
        green: getGreenIcons('SCAN'.toLowerCase()),
      },
    },
    {
      id: 'GUIDE',
      type: 1,
      name: 'Guide',
      sequence: 4,
      icon: {
        white: getWhiteIcons('GUIDE'.toLowerCase()),
        gray: getGrayIcons('GUIDE'.toLowerCase()),
        green: getGreenIcons('GUIDE'.toLowerCase()),
      },
    },
    {
      id: 'UPLOADED_DOCUMENTS',
      type: 1,
      name: 'Documents',
      sequence: 5,
      icon: {
        white: getWhiteIcons('UPLOADED_DOCUMENTS'.toLowerCase()),
        gray: getGrayIcons('UPLOADED_DOCUMENTS'.toLowerCase()),
        green: getGreenIcons('UPLOADED_DOCUMENTS'.toLowerCase()),
      },
    },
    {
      id: 'MESSAGE',
      type: 1,
      name: 'DM',
      sequence: 6,
      icon: {
        white: getWhiteIcons('MESSAGE'.toLowerCase()),
        gray: getGrayIcons('MESSAGE'.toLowerCase()),
        green: getGreenIcons('MESSAGE'.toLowerCase()),
      },
    },
    {
      id: 'NOTIFICATIONS',
      type: 1,
      name: 'Notifications',
      sequence: 7,
      icon: {
        white: getWhiteIcons('NOTIFICATIONS'.toLowerCase()),
        gray: getGrayIcons('NOTIFICATIONS'.toLowerCase()),
        green: getGreenIcons('NOTIFICATIONS'.toLowerCase()),
      },
    },
    {
      id: 'SAVED_CALCULATIONS',
      type: 1,
      name: 'Calculations',
      sequence: 8,
      icon: {
        white: getWhiteIcons('SAVED_CALCULATIONS'.toLowerCase()),
        gray: getGrayIcons('SAVED_CALCULATIONS'.toLowerCase()),
        green: getGreenIcons('SAVED_CALCULATIONS'.toLowerCase()),
      },
    },
    {
      id: 'CHECKLISTS',
      type: 1,
      name: 'Checklists',
      sequence: 9,
      icon: {
        white: getWhiteIcons('CHECKLISTS'.toLowerCase()),
        gray: getGrayIcons('CHECKLISTS'.toLowerCase()),
        green: getGreenIcons('CHECKLISTS'.toLowerCase()),
      },
    },
    {
      id: 'CALLBACK_REQUEST',
      type: 1,
      name: 'Callback',
      sequence: 10,
      icon: {
        white: getWhiteIcons('CALLBACK_REQUEST'.toLowerCase()),
        gray: getGrayIcons('CALLBACK_REQUEST'.toLowerCase()),
        green: getGreenIcons('CALLBACK_REQUEST'.toLowerCase()),
      },
    },
  ],
};

export const imageArr = [
  { id: 16, value: Icon16, name: 'none' },
  { id: 1, value: Icon1, name: 'uploaded_documents' },
  { id: 2, value: Icon2, name: 'message' },
  { id: 3, value: Icon3, name: 'checklists' },
  { id: 4, value: Icon4, name: 'callback_request' },
  { id: 5, value: Icon5, name: 'notifications' },
  { id: 6, value: Icon6, name: 'saved_calculations' },
  { id: 7, value: Icon7, name: 'dashboard' },
  { id: 8, value: Icon8, name: 'calculator' },
  { id: 9, value: Icon9, name: 'scan' },
  { id: 10, value: Icon10, name: 'guide' },
  { id: 11, value: Icon11, name: 'bookmark' },
  { id: 12, value: Icon12, name: 'single-user' },
  { id: 13, value: Icon13, name: 'note' },
  { id: 14, value: Icon14, name: 'graph' },
  { id: 15, value: Icon15, name: 'camera' },
];

export const appointmentImageArr = [
  { id: 1, value: GalleryIcon, name: 'gallery' },
  { id: 2, value: GlobeIcon, name: 'globe' },
  { id: 3, value: EnvelopIcon, name: 'envelop' },
  { id: 4, value: CocktailIcon, name: 'cocktail' },
  { id: 5, value: CalenderIcon, name: 'calendar' },
  { id: 6, value: BuildingIcon, name: 'building' },
  { id: 7, value: HomeIcon, name: 'home' },
  { id: 8, value: PenIcon, name: 'pen' },
  { id: 9, value: GraphIcon, name: 'graph' },
  { id: 10, value: PlayIcon, name: 'play' },
  { id: 11, value: MessageIcon, name: 'message' },
  { id: 12, value: UsersIcon, name: 'users' },
  { id: 13, value: LocationIcon, name: 'map' },
];

export const imageArrForMenus = [
  { id: 'UPLOADED_DOCUMENTS', value: Icon1, name: 'uploaded_documents' },
  { id: 'MESSAGE', value: Icon2, name: 'message' },
  { id: 'CHECKLISTS', value: Icon3, name: 'checklists' },
  { id: 'CALLBACK_REQUEST', value: Icon4, name: 'callback_request' },
  { id: 'NOTIFICATIONS', value: Icon5, name: 'notifications' },
  { id: 'SAVED_CALCULATIONS', value: Icon6, name: 'saved_calculations' },
  { id: 'DASHBOARD', value: Icon7, name: 'dashboard' },
  { id: 'CALCULATOR', value: Icon8, name: 'calculator' },
  { id: 'SCAN', value: Icon9, name: 'scan' },
  { id: 'GUIDE', value: Icon10, name: 'guide' },
];

export const imageObj = {
  uploaded_documents: Icon1,
  message: Icon2,
  checklists: Icon3,
  callback_request: Icon4,
  notifications: Icon5,
  saved_calculations: Icon6,
  dashboard: Icon7,
  calculator: Icon8,
  scan: Icon9,
  guide: Icon10,
  bookmark: Icon11,
  'single-user': Icon12,
  note: Icon13,
  graph: Icon14,
  camera: Icon15,
};

export const Months = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
];
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
export const years = [0, 1, 2, 3, 4, 5, 6, 7].map((i) =>
  String(currentYear + i)
);

export const PasswordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
export const PhoneNumberRegex = /^[0-9]{10,12}$/;
export const PhoneNumberMaskRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
export const PhoneNumberUnMaskRegex = /[\(\)\s\-'"]/g;
export const NameRegex = /^[a-zA-Z ]*$/;
export const HttpCheckRegex = /https?:\/\//;
export const EmailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const HTMLEmpty = /(((<\w+>)+[ \n(<br>)]*(<\/\w+>)+)+)|<br>/g;

export const StatesList = [
  {
    value: 1,
    name: 'Alabama',
  },
  {
    value: 2,
    name: 'Alaska',
  },
  {
    value: 3,
    name: 'Arizona',
  },
  {
    value: 4,
    name: 'Arkansas',
  },
  {
    value: 5,
    name: 'California',
  },
  {
    value: 6,
    name: 'Colorado',
  },
  {
    value: 7,
    name: 'Connecticut',
  },
  {
    value: 8,
    name: 'Delaware',
  },
  {
    value: 9,
    name: 'Florida',
  },
  {
    value: 10,
    name: 'Georgia',
  },
  {
    value: 11,
    name: 'Hawaii',
  },
  {
    value: 12,
    name: 'Idaho',
  },
  {
    value: 13,
    name: 'Illinois',
  },
  {
    value: 14,
    name: 'Indiana',
  },
  {
    value: 15,
    name: 'Iowa',
  },
  {
    value: 16,
    name: 'Kansas',
  },
  {
    value: 17,
    name: 'Kentucky',
  },
  {
    value: 18,
    name: 'Louisiana',
  },
  {
    value: 19,
    name: 'Maine',
  },
  {
    value: 20,
    name: 'Maryland',
  },
  {
    value: 21,
    name: 'Massachusetts',
  },
  {
    value: 22,
    name: 'Michigan',
  },
  {
    value: 23,
    name: 'Minnesota',
  },
  {
    value: 24,
    name: 'Mississippi',
  },
  {
    value: 25,
    name: 'Missouri',
  },
  {
    value: 26,
    name: 'Montana',
  },
  {
    value: 27,
    name: 'Nebraska',
  },
  {
    value: 28,
    name: 'Nevada',
  },
  {
    value: 29,
    name: 'New Hampshire',
  },
  {
    value: 30,
    name: 'New Jersey',
  },
  {
    value: 31,
    name: 'New Mexico',
  },
  {
    value: 32,
    name: 'New York',
  },
  {
    value: 33,
    name: 'North Carolina',
  },
  {
    value: 34,
    name: 'North Dakota',
  },
  {
    value: 35,
    name: 'Ohio',
  },
  {
    value: 36,
    name: 'Oklahoma',
  },
  {
    value: 37,
    name: 'Oregon',
  },
  {
    value: 38,
    name: 'Pennsylvania',
  },
  {
    value: 39,
    name: 'Rhode Island',
  },
  {
    value: 40,
    name: 'South Carolina',
  },
  {
    value: 41,
    name: 'South Dakota',
  },
  {
    value: 42,
    name: 'Tennessee',
  },
  {
    value: 43,
    name: 'Texas',
  },
  {
    value: 44,
    name: 'Utah',
  },
  {
    value: 45,
    name: 'Vermont',
  },
  {
    value: 46,
    name: 'Virginia',
  },
  {
    value: 47,
    name: 'Washington',
  },
  {
    value: 48,
    name: 'West Virginia',
  },
  {
    value: 49,
    name: 'Wisconsin',
  },
  {
    value: 50,
    name: 'Wyoming',
  },
];
