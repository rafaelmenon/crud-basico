import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  return persistReducer(
    {
      key: 'teste-empresa',
      storage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );
};
