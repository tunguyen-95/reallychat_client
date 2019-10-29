import { ADD_MESSAGE } from '../actions';

export default function messages(state = [], action = {}) {
  console.log('reducers :', action.type, 'payload', action.payload);
  switch (action.type) {
    case ADD_MESSAGE:
      return action.payload;
    default:
      return state;
  }
}
