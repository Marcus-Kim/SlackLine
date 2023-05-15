// DM ACTIONS
const GET_DMS = 'directMessages/dms/GET_ALL';
const DELETE_DM = 'directMessages/dms/DELETE';
const CREATE_DM = 'directMessages/dms/CREATE';

// GDM ACTIONS
const GET_GDMS = 'directMessages/gdms/GET_ALL';
const CREATE_GDM = 'directMessages/gdm/CREATE';
const UPDATE_GDM = 'directMessages/gdm/UPDATE';
const DELETE_GDM = 'directMessage/gdm/DELETE';

// DM ACTION CREATORS
const actionGetAllDMS = (dms) => ({
  type: GET_DMS,
  payload: dms
})

const actionCreateDM = (dm) => ({
  type: CREATE_DM,
  payload: dm
})

const actionDeleteDM = (dmId) => ({
  type: DELETE_DM,
  payload: dmId
})

// GDM ACTION CREATORS
const actionGetAllGDMS = (gdms) => ({
  type: GET_GDMS,
  payload: gdms
})

const actionCreateGDM = (gdm) => ({
  type: CREATE_GDM,
  payload: gdm
})

export const actionUpdateGDM = (gdm) => ({
  type: UPDATE_GDM,
  payload: gdm
})

// DM THUNKS
export const thunkGetAllDMS = () => async (dispatch) => {
  const response = await fetch('/api/direct_messages/');

  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetAllDMS(data));
    return data;
  }
}

export const thunkCreateDM = (dm) => async (dispatch) => {
  const response = await fetch(`/api/direct_messages/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dm)
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(actionCreateDM(data));
    return data;
  }
}

export const thunkDeleteDM = (dmId) => async (dispatch) => {
  const response = await fetch(`/api/direct_messages/${dmId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(actionDeleteDM(dmId));
    return data;
  }
}

// GDM THUNKS
export const thunkGetGDMS = () => async (dispatch) => {
  const response = await fetch(`/api/group_direct_messages/`);

  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetAllGDMS(data))
    return data;
  };
}

export const thunkCreateGDM = (gdm) => async (dispatch) => {
  const response = await fetch(`/api/group_direct_messages/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gdm)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(actionCreateGDM(data));
    return data;
  }
}

export const thunkAddUsersGDM = (gdm, users) => async (dispatch) => {
  console.log("HELLO", users)
  const response = await fetch(`/api/group_direct_messages/${gdm}`, {
    method: ['POST'],
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(users)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(actionUpdateGDM(data))
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
    case CREATE_DM: {
      const newState = {
        dms: { ...state.dms },
        gdms: { ...state.gdms }
      }
      newState.dms[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_DM: {
      const newState = {
        dms: { ...state.dms },
        gdms: { ...state.gdms }
      };
      delete newState.dms[action.payload];
      return newState;
    }
    case GET_GDMS: {
      const newState = {
        dms: { ...state.dms },
        gdms: { ...state.gdms }
      };
      action.payload.forEach(gdm => {
        newState.gdms[gdm.id] = gdm;
      })
      return newState;
    }
    case CREATE_GDM: {
      const newState = {
        dms: { ...state.dms },
        gdms: { ...state.gdms }
      };
      newState.gdms[action.payload.id] = action.payload;
      return newState;
    }
    case UPDATE_GDM: {
      const newState = {
        dms: { ...state.dms },
        gdms: { ...state.gdms }
      };
      newState.gdms[action.payload.id] = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
