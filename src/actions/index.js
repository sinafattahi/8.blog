import _ from 'lodash' //with this lib we could request only one time the same req 
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndusers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  const userIds = _.uniq(_.map(getState().posts, 'userId'));
  userIds.forEach(id => dispatch(fetchUser(id)));  
};
//note: when we dispach a 'function' thunk will run it automaticly
//so when we call an action creator inside an action creator we neeeed to dispatch the resault of it

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
};


// export const fetchUser = (id) =>  dispatch => _fetchUser(id , dispatch);
// const _fetchUser = _.memoize( async(id , dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
    
//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });