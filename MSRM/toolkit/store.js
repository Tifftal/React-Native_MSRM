import { configureStore } from '@reduxjs/toolkit';
import toolkitSlice from './toolkitSlice';

const store = configureStore({
  reducer: {
    toolkit: toolkitSlice,
  },
});

export default store;
