import * as R from 'ramda';

const initialState = {
  loggedIn: false,
  currentUser: {
    transient: true,
  },
  usersByIdMap: {},
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_USER_DATA': {
      return R.mergeDeepRight(state, action.data);
    }
    default: {
      return state;
    }
  }
};