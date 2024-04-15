import actions from './actions';

const initState = {
  idToken: null,
  loggedInUser: null, // User's data - Role and Redirection check
  userEmail: null,
  authFlag: false,
  profileObj: {},
  userReport: {
    daily_report: false,
    weekly_report: false,
  },
  userNotification: {
    direct_message: true,
    document_upload: false,
    app_download_from_link: false,
  },
  userNotificationList: [],
  IntID: null,
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.SIGNUP_SUCCESS:
      return {
        ...state,
        userEmail: action.email,
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        idToken: action.token,
        authFlag: true,
      };
    case actions.SAT_INTERVAL:
      return {
        ...state,
        IntID: action.payload,
      };

    case actions.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        userEmail: action.email,
      };
    case actions.CHECK_AUTHORIZATION:
      return {
        ...state,
        idToken: action.token,
      };
    case actions.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profileObj: action.payload,
      };
    case actions.SAVE_BIO_STATE:
      return {
        ...state,
        profileObj: {
          ...state.profileObj,
          bio: action.payload.bio,
          welcome_text: action.payload.welcome_text,
        },
      };
    case actions.SAVE_BIO_STATE:
      return {
        ...state,
        profileObj: {
          ...state.profileObj,
          bio: action.payload.bio,
          welcome_text: action.payload.welcome_text,
        },
      };
    case actions.SAVE_IMAGE_STATE:
      return {
        ...state,
        profileObj: {
          ...state.profileObj,
          profile_photo: action.payload.profile_photo,
        },
      };
    case actions.SAVE_LOGO_STATE:
      return {
        ...state,
        profileObj: {
          ...state.profileObj,
          logo: action.payload.logo,
          brand_app_logo: state.profileObj?.parent_id
            ? state.profileObj?.brand_app_logo
            : state.profileObj?.is_brand
            ? action.payload.logo
            : null,
        },
      };
    case actions.SAVE_LINKS_SUCCESS:
      return {
        ...state,
        profileObj: {
          ...state.profileObj,
          social_links: {
            ...action.links,
          },
        },
      };
    case actions.GET_REPORT_SUCCESS:
      return {
        ...state,
        userReport: action.payload,
      };
    case actions.CHANGE_REPORT_SUCCESS:
      return {
        ...state,
        userReport: action.payload,
      };
    case actions.GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        userNotification: action.payload,
      };

    case actions.GET_NOTIFICATION_LISTING_SUCCESS:
      return {
        ...state,
        userNotificationList: action.payload,
      };
    case actions.CHANGE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        userNotification: action.payload,
      };
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
