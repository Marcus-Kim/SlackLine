// ACTIONS
const GET_ALL_MESSAGES = 'messages/GET_ALL';
const CREATE_CHANNEL_MESSAGE = 'messages/channel/CREATE'
const GET_CHANNELID_MESSAGES = 'messages/CHANNEL_ID_GET'
const DELETE_CHANNEL_MESSAGE = 'messages/channel/DELETE'

// ACTION CREATORS
const actionGetAllMessages = (messages) => ({
  type: GET_ALL_MESSAGES,
  payload: messages
})

const actionGetChannelIdMessages = (messages, channelId) => ({
  type: GET_CHANNELID_MESSAGES,
  payload: {
    messages,
    channelId
  }
})

export const actionCreateChannelMessage = (message) => ({
  type: CREATE_CHANNEL_MESSAGE,
  payload: message
})

const actionDeleteChannelMessage = (channelId, messageId) => ({
  type: DELETE_CHANNEL_MESSAGE,
  payload: {
    channelId,
    messageId
  }
})

// THUNKS
export const thunkGetAllMessages = () => async (dispatch) => {
  const response = await fetch('/api/messages/');

  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetAllMessages(data));

    return data;
  }
}

export const thunkGetAllChannelIdMessages = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}/messages`);

  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetChannelIdMessages(data, channelId));
    return data;
  }
}

export const thunkCreateChannelMessage = (message) => async (dispatch) => {
  // const response = await fetch(`/api/channels/${+channelId}/messages`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(message)
  // })

  // if (response.ok) {
  //   const data = await response.json();
  //   dispatch(actionCreateChannelMessage(data));
  //   return data;
  // }
  dispatch(actionCreateChannelMessage(message));
}

export const thunkDeleteChannelMessage = (channelId, messageId) => async (dispatch) => {
  const response = await fetch(`/api/messages/${messageId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(actionDeleteChannelMessage(channelId, messageId))
    return data;
  }
}

// INITIAL STATE
const initialState = {
  channelMessages: {},
  directMessages: {},
  groupDirectMessages: {}
}

// REDUCER
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_MESSAGES: {
      const newState = { ...state };
      action.payload.forEach(message => {
        const channelId = message.channel_id;
        if (!newState.channelMessages[channelId]) {
          newState.channelMessages[channelId] = {};
        }
        newState.channelMessages[channelId][message.id] = message;
      });
      return newState;
    }
    case CREATE_CHANNEL_MESSAGE: {
      const newState = { ...state };
      if (!newState.channelMessages[action.payload.channel_id]) newState.channelMessages[action.payload.channel_id] = {};
      newState.channelMessages[action.payload.channel_id][action.payload.id] = action.payload
      return newState;
    }
    case GET_CHANNELID_MESSAGES: {
      const newState = { ...state };
      action.payload.messages.forEach(message => {
        newState.channelMessages[action.payload.channelId][message.id] = message
      })
      return newState;
    }
    case DELETE_CHANNEL_MESSAGE: {
      const newState = { ...state };
      delete newState.channelMessages[action.payload.channelId][action.payload.messageId]
      return newState;
    }
    default:
      return state;
  }
}
