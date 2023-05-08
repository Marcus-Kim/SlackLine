// ACTIONS
const GET_DMS = 'directMessages/dms/GET_ALL';
const DELETE_DM = 'directMessages/dms/DELETE';
const CREATE_DM = 'directMessages/dms/CREATE';

// ACTION CREATORS
const actionGetAllDMS = (dms) => ({
  type: GET_DMS,
  payload: dms
})

const actionCreateDM = (dm) => ({
  type: CREATE_DM,
  payload: dm
})

const actionDeleteDM = (dm) => ({
  type: DELETE_DM,
  payload: dm
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

export const thunkCreateDM = (dm) => async (dispatch) => {
  const reponse = await fetch(`/api/direct_messages/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: dm
  })
}

export const thunkDeleteDM = (dm) => async (dispatch) => {
  const response = await fetch(`/api/direct_messages/${dm.id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(actionDeleteDM(dm));
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
    case DELETE_DM: {
      const newState = {
        dms: { ...state.dms },
        gdms: { ...state.gdms }
      };
      delete newState.dms[action.payload.id];
      return newState;
    }
    default:
      return state;
  }
}
