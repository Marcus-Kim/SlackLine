// ACTIONS
const GET_ALL_MESSAGES = 'messages/GET_ALL';
const GET_CHANNELID_MESSAGES = 'messages/CHANNEL_ID_GET'

// ACTION CREATORS
const actionGetAllMessages = (messages) => ({
  type: GET_ALL_MESSAGES,
  payload: messages
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
    default:
      return state;
  }
}
