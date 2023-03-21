```js
store = {
  session: {},

  channels: {
    // To get the data about all of the channels
    allChannels: {
      [channelId]: {
        channelData,
      },
    },

    // Get a specific channel
    singleChannel: {channelData},
  },

  messages: {
    channelMessages: {
      [channelId]: [
        /* Array of messages for channel Id */
        ]
    },
    directMessages: {
      // Same as channelMessages
    },
    groupDirectMessages: {
      // Same as channelMessages
    }
  }
}
```
