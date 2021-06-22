import { actionTypes } from './actions';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  count: 0,
  error: false,
  provinces: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FAILURE:
      return {
        ...state,
        ...{ error: action.error }
      };

    case actionTypes.INCREMENT:
      return {
        ...state,
        count: state.count + 10
      };

    case actionTypes.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };

    case actionTypes.RESET:
      return {
        ...state,
        count: initialState.count
      };

    case actionTypes.SET_PROVINCES:
      return { ...state, provinces: action.payload };

    default:
      return state;
  }
}

export default reducer;
