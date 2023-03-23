// ACTIONS
const GET_CHANNELS = 'channels/GET_CHANNELS'

// ACTION CREATORS
const actionGetAllChannels = () => ({
  type: GET_CHANNELS,
})

// THUNKS

export const thunkGetAllChannels = () => async (dispatch) => {
  const response = await fetch('/api/channels/');

  if (response.ok) {
    const data = await response.json();
    dispatch(actionGetAllChannels())
  }
}

// INITIAL STATE
const initialState = { allChannels: {}, singleChannel: {} }

// REDUCER
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHANNELS:
      const newState = { ...initialState }
      for (channel in action.payload) {
        
      }
  }
}
