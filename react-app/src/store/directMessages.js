// ACTIONS
const GET_DMS = 'directMessages/dms/GET_ALL'

// ACTION CREATORS
const actionGetAllDMS = (dms) => ({
  type: GET_DMS,
  payload: dms
})

// THUNKS
export const thunkGetAllDMS = () => async (dispatch) => {
  const response = await fetch('/api/direct_messages/');

  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetAllDMS(data));
    return data;
  }
}

// INITIAL STATE
const initialState = { dms: {}, gdms: {} }

// REDUCER
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DMS: {
      const newState = {
        dms: { ...state.dms },
        gdms: { ...state.gdms }
      };
      action.payload.forEach(dm => {
        newState.dms[dm.id] = dm;
      })
      return newState;
    }
    default:
      return state;
  }
}
