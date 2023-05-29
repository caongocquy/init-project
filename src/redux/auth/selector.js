import { createSelector } from 'reselect';
export const reducer = state => state.auth;
// get accessToken in reducer
export const accessToken = createSelector(
  reducer,
  data => data.access_token || '',
);
