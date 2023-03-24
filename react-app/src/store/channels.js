// ACTIONS
const GET_CHANNELS = 'channels/GET_CHANNELS'
const CREATE_CHANNEL = 'channels/CREATE'
const DELETE_CHANNEL = 'channels/DELETE'

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
// THUNKS
export const thunkGetAllChannels = () => async (dispatch) => {
  const response = await fetch('/api/channels/');

  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetAllChannels(data))
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
    console.log(data)
    await dispatch(actionCreateChannel(data));
    return data;
  }
}

export const thunkDeleteChannel = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(actionDeleteChannel);
  }
}

// INITIAL STATE
const initialState = { allChannels: {}, singleChannel: {} }

// REDUCER
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHANNELS: {
      const newState = { ...state };
      action.payload.channels.forEach(channel => {
        newState.allChannels[channel.id] = channel
      });
      return newState;
    }
    case CREATE_CHANNEL: {
      const newState = { ...state };
      newState.allChannels[action.payload.id] = action.payload
      return newState;
    }
    case DELETE_CHANNEL: {
      const newState = { ...state }
      delete newState.allChannels[action.payload]
      return newState;
    }
    default:
      return state;
  }
}
