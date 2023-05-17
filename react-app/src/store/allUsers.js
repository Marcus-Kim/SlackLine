const GET_ALL_USERS = 'users/all';

const actionGetUsers = (users) => ({
  type: GET_ALL_USERS,
  payload: users
})

export const thunkGetUsers = () => async (dispatch) => {
  const response = await fetch('/api/users/');

  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetUsers(data));
    return data;
  }
}

const initialState = {}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS: {
      const newState = {...state}
      action.payload.users.forEach(user => {
        newState[user.id] = user;
      })
      return newState;
    }
    default:
      return state;
  }
}
