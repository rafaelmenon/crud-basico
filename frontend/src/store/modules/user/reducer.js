import produce from 'immer';

const INITIAL_STATE = {
  profile: {
    id: '',
    name: '',
    email: '',
    avatar: '',
    admin: false,
  },
};

export default function user(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  return produce(state, draft => {
    switch (type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = payload.user;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.profile = {
          id: '',
          name: '',
          email: '',
          avatar: '',
          admin: false,
        };
        break;
      }

      default:
    }
  });
}
