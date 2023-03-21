# SlackLine

# User Stories

## Users

### Sign up
- As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  - When I'm on the `/signup` page:
    - I would like to be able to enter my name, email, and password on a clearly laid out form.
    - I would like the website to log me in upon successful sign-up so that I can immediately access the core features.
  - When I enter invalid data on the sign-up form:
    - I would like to see error messages in red and to have the form repopulate with my entries except for the password so that I can try again.

### Log in
- As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  - When I am on the `/login` page:
    - I would like to be able to enter my email and password on a clearly laid out form.
    - I would like the website to log me in and direct me to the main page where I can immediately access the core functionality.
  - When I enter invalid data on the log-in form:
    - I would like the website to populate the related error messages in red and repopulate my email field with my past submission so that I can try again.

### Demo User
- As an unregistered and unauthorized user, I would like a clearly displayed button on both the /signup and /login pages to allow me to visit the site as a guest and use the core functionalities of the site without signing up or logging in.
  - When I am on either the /signup or /login pages:
    - I can click a "Demo User" button to log me in as a normal user so that I can start sending messages and joining channels.

### Log Out
- As a logged in user, I want to log out via an easy to find button in the profile dropdown.
  - Upon successful logout, I would like to be redirected to the splash page where I have the option of signing up or logging in.

## Channels

### Creating a Channel
- As a logged in user, I would like to have the ability to create a new channel via a + button next to the channel section on the sidebar.
  - Clicking the + button will open up a modal where I can see an input field for the channel name as well an option to add users to the channel.
  - I should see an easily visible "Create" button to create the channel on the modal.

### Joining a Channel
- As a logged in user, any channels I have not joined already have the option to join via a clearly visible "Join Channel" button.
  - Before joining a channel:
    - I should not be able to see any of the messages in the specified channel
    - I should be able to see a list of all the users currently in that channel.
  - Upon joining a channel:
    - I should be able to see all of the messages that were sent in the channel, even those that were sent before I joined.
    - I should be able to send and recieve messages to the channel.

### Editing a Channel
- As a logged in user, any channels that I have created should be able to be edited by me.
  - I should be able to see a "..." button that allows me to edit the channel name and description.
  - If I am the channel owner, I should be able to also remove any of the other users that have joined the channel.
  - If I am not the owner of the channel, I should not see the "..." button to edit or delete the channel.

### Deleting a Channel
- As a logged in user, any channels that I have created should be able to be deleted by me.
  - I should be able to see a "..." button that opens a modal which allows me to delete the channel.
  - Deleting the channel will remove the channel from all other users' home pages.
  - If I am not the owner of the channel, I should not see the "..." button to edit or delete the channel.

## Messages

### Sending Messages
- As a logged in user, I should be able to see an input field at the bottom of any channel that I have joined.
  - When sending a message:
    - I should see an input field and a submit button that allows me to submit my message to be sent.
    - I should also be able to press the `enter` key to send the message instead of pressing the submit button.

### Editing Messages
- As a logged in user, I should be able to edit any of the messages that I sent to the channel.
  - When editing a message that I sent:
    - I am able to change the contents of the message entirely down to a minimum of 1 character.
    - I am able to see a form pop-up in the place of my message that has option of saving or canceling my edit.

### Deleting Messages
- As a logged in user, I should be able to delete any of the messages that I sent to the channel.
  - I should see a "..." button next to my message that has the option to delete my message in the form of a modal confirmation.
