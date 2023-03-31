// ACTIONS
const GET_CHANNELS = 'channels/GET_CHANNELS'
const CREATE_CHANNEL = 'channels/CREATE'
const DELETE_CHANNEL = 'channels/DELETE'
const GET_SINGLE_CHANNEL = 'channels/GET_SINGLE_CHANNEL'
const EDIT_CHANNEL = 'channels/EDIT'

// ACTION CREATORS
const actionGetAllChannels = (channels) => ({
  type: GET_CHANNELS,
  payload: channels
})

const actionCreateChannel = (channel) => ({
  type: CREATE_CHANNEL,
  payload: channel
})

const actionDeleteChannel = (id) => ({
  type: DELETE_CHANNEL,
  id
})

const actionGetSingleChannel = (channel) => ({
  type: GET_SINGLE_CHANNEL,
  payload: channel
})

export const actionEditChannel = (channel) => ({
  type: EDIT_CHANNEL,
  payload: channel
})

// THUNKS
export const thunkGetAllChannels = () => async (dispatch) => {
  const response = await fetch('/api/channels/');

  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetAllChannels(data))
  }
}

export const thunkGetSingleChannel = (id) => async (dispatch) => {
  const response = await fetch(`/api/channels/${id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetSingleChannel(data))
    return data;
  }
}

export const thunkCreateChannel = (channelDetails) => async (dispatch) => {
  const response = await fetch('/api/channels/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(channelDetails)
  })

  if (response.ok) {
    const data = await response.json();
    if (data.errors) return data;
    await dispatch(actionCreateChannel(data));
    return data;
  }
}

export const thunkDeleteChannel = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${+channelId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(actionDeleteChannel(+channelId));
    return data;
  }
}

export const thunkEditChannel = (channelId, channel) => async (dispatch) => {
  console.log('CHANNEL ID: ', channelId)
  const response = await fetch(`/api/channels/${channelId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(channel)
  })

  if (response.ok) {
    const data = await response.json();
    if (data.errors) return data;
    dispatch(actionEditChannel(data))
    return data;
  }
}

// INITIAL STATE
const initialState = { allChannels: {}, singleChannel: {} }

// REDUCER
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHANNELS: {
      const newState = {
        allChannels: { ...state.allChannels },
        singleChannel: { ...state.singleChannel }
      };
      action.payload.channels.forEach(channel => {
        newState.allChannels[channel.id] = channel
      });
      return newState;
    }
    case GET_SINGLE_CHANNEL: {
      const newState = {
        allChannels: { ...state.allChannels },
        singleChannel: { ...state.singleChannel }
      };
      newState.singleChannel = action.payload;
      return newState;
    }
    case CREATE_CHANNEL: {
      const newState = {
        allChannels: { ...state.allChannels },
        singleChannel: { ...state.singleChannel }
      };
      newState.allChannels[action.payload.id] = action.payload
      return newState;
    }
    case EDIT_CHANNEL: {
      const newState = {
        allChannels: { ...state.allChannels },
        singleChannel: { ...state.singleChannel }
      };
      newState.allChannels[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_CHANNEL: {
      const newState = {
        allChannels: { ...state.allChannels },
        singleChannel: { ...state.singleChannel }
      };
      delete newState.allChannels[action.id]
      return newState;
    }
    default:
      return state;
  }
}
