// ACTIONS
const GET_ALL_MESSAGES = 'messages/GET_ALL';
const CREATE_CHANNEL_MESSAGE = 'messages/channel/CREATE';
const GET_CHANNELID_MESSAGES = 'messages/CHANNEL_ID_GET';
const DELETE_CHANNEL_MESSAGE = 'messages/channel/DELETE';
const EDIT_MESSAGE = 'messages/delete';
const GET_ALL_DIRECT_MESSAGES = 'direct_messages/GET_ALL';
const CREATE_DIRECT_MESSAGE = 'direct_messages/CREATE';
const EDIT_DIRECT_MESSAGE = 'direct_messages/EDIT';
const DELETE_DIRECT_MESSAGE_MESSAGE = 'direct_messages/DELETE';

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

export const actionDeleteChannelMessage = (channelId, messageId) => ({
  type: DELETE_CHANNEL_MESSAGE,
  payload: {
    channelId,
    messageId
  }
})

export const actionEditMessage = (message) => ({
  type: EDIT_MESSAGE,
  payload: message
})

const actionGetDirectMessages = (messages) => ({
  type: GET_ALL_DIRECT_MESSAGES,
  payload: messages
})

export const actionCreateDirectMessage = (message) => ({
  type: CREATE_DIRECT_MESSAGE,
  payload: message
})

export const actionEditDirectMessage = (message) => ({
  type: EDIT_DIRECT_MESSAGE,
  payload: message
})

export const actionDeleteDirectMessageMessage =  (message) => ({
  type: DELETE_DIRECT_MESSAGE_MESSAGE,
  payload: message
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

export const thunkGetAllDirectMessages = () => async (dispatch) => {
  const response = await fetch('/api/messages/direct_messages/');

  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetDirectMessages(data));
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
      const newState = {
        channelMessages: { ...state.channelMessages },
        directMessages: { ...state.directMessages },
        groupDirectMessages: { ...state.groupDirectMessages }
      };
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
      const newState = {
        channelMessages: { ...state.channelMessages },
        directMessages: { ...state.directMessages },
        groupDirectMessages: { ...state.groupDirectMessages }
      };
      if (!newState.channelMessages[action.payload.channel_id]) newState.channelMessages[action.payload.channel_id] = {};
      newState.channelMessages[action.payload.channel_id][action.payload.id] = action.payload
      return newState;
    }
    case GET_CHANNELID_MESSAGES: {
      const newState = {
        channelMessages: { ...state.channelMessages },
        directMessages: { ...state.directMessages },
        groupDirectMessages: { ...state.groupDirectMessages }
      };
      action.payload.messages.forEach(message => {
        newState.channelMessages[action.payload.channelId][message.id] = message
      })
      return newState;
    }
    case EDIT_MESSAGE: {
      const newState = {
        channelMessages: { ...state.channelMessages },
        directMessages: { ...state.directMessages },
        groupDirectMessages: { ...state.groupDirectMessages }
      };
      newState.channelMessages[action.payload.channel_id][action.payload.id] = action.payload
      return newState;
    }
    case DELETE_CHANNEL_MESSAGE: {
      const newState = {
        channelMessages: { ...state.channelMessages },
        directMessages: { ...state.directMessages },
        groupDirectMessages: { ...state.groupDirectMessages }
      };
      delete newState.channelMessages[action.payload.channelId][action.payload.messageId]
      return newState;
    }
    case GET_ALL_DIRECT_MESSAGES: {
      const newState = {
        channelMessages: { ...state.channelMessages },
        directMessages: { ...state.directMessages },
        groupDirectMessages: { ...state.groupDirectMessages }
      };
      action.payload.forEach(directMessage => {
        if (!newState.directMessages[directMessage.direct_message_id]) {
          newState.directMessages[directMessage.direct_message_id] = {};
        }
        newState.directMessages[directMessage.direct_message_id][directMessage.id] = directMessage;
      })
      return newState;
    }
    case CREATE_DIRECT_MESSAGE: {
      const newState = {
        channelMessages: { ...state.channelMessages },
        directMessages: { ...state.directMessages },
        groupDirectMessages: { ...state.groupDirectMessages }
      };
      if (!newState.directMessages[action.payload.direct_message_id]) newState.directMessages[action.payload.direct_message_id] = {}
      newState.directMessages[action.payload.direct_message_id][action.payload.id] = action.payload
      return newState;
    }
    case EDIT_DIRECT_MESSAGE: {
      const newState = {
        channelMessages: { ...state.channelMessages },
        directMessages: { ...state.directMessages },
        groupDirectMessages: { ...state.groupDirectMessages }
      };
      newState.directMessages[action.payload.direct_message_id][action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_DIRECT_MESSAGE_MESSAGE: {
      const newState = {
        channelMessages: { ...state.channelMessages },
        directMessages: { ...state.directMessages },
        groupDirectMessages: { ...state.groupDirectMessages }
      };
      delete newState.directMessages[action.payload.direct_message_id][action.payload.id]
      return newState;
    }
    default:
      return state;
  }
}
