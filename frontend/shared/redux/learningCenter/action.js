const actions = {
  CONTENT_LO_LEARNING_CENTER: 'CONTENT_LO_LEARNING_CENTER',
  CONTENT_LO_LEARNING_CENTER_SUCCESS: 'CONTENT_LO_LEARNING_CENTER_SUCCESS',
  CONTENT_LO_LEARNING_CENTER_ERROR: 'CONTENT_LO_LEARNING_CENTER_ERROR',

  SAVE_CONTENT_LO_LEARNING_CENTER: 'SAVE_CONTENT_LO_LEARNING_CENTER',
  SAVE_CONTENT_LO_LEARNING_CENTER_SUCCESS:
    'SAVE_CONTENT_LO_LEARNING_CENTER_SUCCESS',
  SAVE_CONTENT_LO_LEARNING_CENTER_ERROR:
    'SAVE_CONTENT_LO_LEARNING_CENTER_ERROR',

  DEFAULT_CONTENT_LO_LEARNING_CENTER: 'DEFAULT_CONTENT_LO_LEARNING_CENTER',
  DEFAULT_CONTENT_LO_LEARNING_CENTER_SUCCESS:
    'DEFAULT_CONTENT_LO_LEARNING_CENTER_SUCCESS',
  DEFAULT_CONTENT_LO_LEARNING_CENTER_ERROR:
    'DEFAULT_CONTENT_LO_LEARNING_CENTER_ERROR',

  EDIT_CONTENT_LO_LEARNING_CENTER: 'EDIT_CONTENT_LO_LEARNING_CENTER',
  EDIT_CONTENT_LO_LEARNING_CENTER_SUCCESS:
    'EDIT_CONTENT_LO_LEARNING_CENTER_SUCCESS',
  EDIT_CONTENT_LO_LEARNING_CENTER_ERROR:
    'EDIT_CONTENT_LO_LEARNING_CENTER_ERROR',

  DELETE_CONTENT_LO_LEARNING_CENTER: 'DELETE_CONTENT_LO_LEARNING_CENTER',
  DELETE_CONTENT_LO_LEARNING_CENTER_SUCCESS:
    'DELETE_CONTENT_LO_LEARNING_CENTER_SUCCESS',
  DELETE_CONTENT_LO_LEARNING_CENTER_ERROR:
    'DELETE_CONTENT_LO_LEARNING_CENTER_ERROR',

  REARRANGE_LEARNING_CENTER: 'REARRANGE_LEARNING_CENTER',

  learningCenterList: (payload) => {
    return {
      type: actions.CONTENT_LO_LEARNING_CENTER,
      payload,
    };
  },
  defaultLearningCenterList: () => ({
    type: actions.DEFAULT_CONTENT_LO_LEARNING_CENTER,
  }),
  setIsDefaultDataEmpty: (payload) => ({
    type: actions.DEFAULT_CONTENT_LO_LEARNING_CENTER_ERROR,
    payload,
  }),
  editLearningCenter: (payload) => ({
    type: actions.EDIT_CONTENT_LO_LEARNING_CENTER,
    payload,
  }),
  deleteLearningCenter: (payload) => ({
    type: actions.DELETE_CONTENT_LO_LEARNING_CENTER,
    payload,
  }),

  saveLearningCenter: (payload) => ({
    type: actions.SAVE_CONTENT_LO_LEARNING_CENTER,
    payload,
  }),

  rearrangeLearningCenter: (payload) => ({
    type: actions.REARRANGE_LEARNING_CENTER,
    payload,
  }),
};

export default actions;
