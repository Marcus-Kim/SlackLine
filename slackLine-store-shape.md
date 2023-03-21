```js
store = {
  session: {},

  channels: {
    [channelId]: {
      channelData,
      Users: [usersData]
    }
  },

  messages: {
    [messageId]: {
      messageData
    }
  }
}
```

```js
store = {
  session: {},

  channels: {
    // To get the data about all of the channels
    allChannels: {
      [channelId]: {
        channelData,
      },
    }

    userChannel: {},
    // Get a specific channel
    singleChannel: {
      channelData,
      Users: [usersData],
      Messages: [messagesData]
    }
  }
}
```
