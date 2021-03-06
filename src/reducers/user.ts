import { Map, fromJS } from 'immutable';
import { ADD_USER, CLEAR_USER, APPEND_TO_USER } from '../constants/user';
import { get, save, remove } from '../localStorage';

export type User = Map<string, string|number>;

export interface UserAction {
  payload?: any;
  type: string;
};

const initialState: User = fromJS(get('user')) || Map<string, string | number>();

export default (state = initialState, action: UserAction) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_USER:
      save('user', payload);
      return payload;

    case APPEND_TO_USER:
      const res = state.set(payload.key, payload.value);
      save('user', res);
      return res;

    case CLEAR_USER:
      remove('user');
      return Map<string, string | number>();

    default:
      return state;
  }
};
