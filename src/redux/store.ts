import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './auth/login/LoginReducer';
import requestsReducer from './requests/RequestReducers';
import communiquesReducer from './communiques/CommuniquesReducer';
import NotificationsReducer from './notifications/NotificationsReducers';
// ...

export const store = configureStore({
  reducer: {
    login: loginReducer,
    requests: requestsReducer,
    communiques: communiquesReducer,
    notifications: NotificationsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
