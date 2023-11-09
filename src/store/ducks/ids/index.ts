import { Reducer } from 'redux';
import { idsState, idsTypes } from './types';

const INITIAL_STATE: idsState = {
  carId: '',
  error: false,
  loading: false,
};

const reducer: Reducer<idsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case idsTypes.UPDATECAR:
      return {
        ...state, loading: false, error: false, carId: action.payload.id
      };

    default:
      return state;
  }
};

export default reducer;
