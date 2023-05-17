from flask_socketio import SocketIO, join_room, leave_room, emit
from .models import Message, db, Channel, channel_users, group_direct_message_users, DirectMessageMessage, GroupDirectMessageMessage, GroupDirectMessage

# Create your SocketIO instance
socketio = SocketIO(cors_allowed_origins="*")

@socketio.on("channel_message")
def handle_channel_message(message):
    new_message = Message(
        user_id = message['user_id'],
        channel_id = message['channel_id'],
        body = message['body']
    )
    db.session.add(new_message)
    db.session.commit()

    emit('channel_message', new_message.to_dict(), broadcast=True)

@socketio.on("edit_message")
def handle_edit_message(message_data):
    message = Message.query.get(message_data['messageId'])
    message.body = message_data['newMessage']
    db.session.commit()

    emit("message_edited", message.to_dict(), broadcast=True)

@socketio.on("delete_message")
def handle_delete_message(message_id):
    message = Message.query.get(message_id)
    db.session.delete(message)
    db.session.commit()

    emit("message_deleted", message_id, broadcast=True)

@socketio.on("join_channel")
def handle_join_channel(join_data):
    user_id = join_data['userId']
    channel_id = join_data['channelId']

    new_channel_user_statement = channel_users.insert().values(channel_id=channel_id, user_id=user_id)
    result = db.session.execute(new_channel_user_statement)
    db.session.commit()

    channel = Channel.query.get(channel_id)

    emit("added_user_to_channel", channel.to_dict(), broadcast=True)

@socketio.on("join_gdm")
def handle_join_gdm(join_data):
    user_id = join_data['userId']
    gdm_id = join_data['gdmId']

    new_gdm_user_statement = group_direct_message_users.insert().values(group_direct_message_id=gdm_id, user_id=user_id)
    result = db.session.execute(new_gdm_user_statement)
    db.session.commit()

    gdm = GroupDirectMessage.query.get(gdm_id)

    emit("added_user_to_gdm", gdm.to_dict(), broadcast=True)

@socketio.on('direct_message')
def handle_direct_message(data):
    direct_message_id = data['direct_message_id']
    user_id = data['user_id']
    body = data['body']

    new_direct_message = DirectMessageMessage(
        direct_message_id=direct_message_id,
        user_id=user_id,
        body=body
    )

    db.session.add(new_direct_message)
    db.session.commit()

    emit("created_direct_message", new_direct_message.to_dict(), broadcast=True)

@socketio.on('edit_direct_message')
def handle_edit_direct_message(data):
    message = DirectMessageMessage.query.get(data['messageId'])

    message.body = data['newMessage']
    db.session.commit()

    emit('direct_message_edited', message.to_dict(), broadcast=True)

@socketio.on('delete_direct_message_message')
def handle_delete_direct_message_message(data):
    message = DirectMessageMessage.query.get(data['id'])
    db.session.delete(message)
    db.session.commit()

    emit('direct_message_message_deleted', data, broadcast=True)

@socketio.on('create_group_direct_message_message')
def handle_create_group_direct_message_message(message):
    message = GroupDirectMessageMessage(
        group_direct_message_id=message['group_direct_message_id'],
        user_id=message['user_id'],
        body=message['body']
    )

    db.session.add(message)
    db.session.commit()

    emit('group_direct_message_message_created', message.to_dict(), broadcast=True)

@socketio.on('edit_group_direct_message_message')
def handle_edit_group_direct_message_message(messageData):
    print(messageData['messageId'])
    message = GroupDirectMessageMessage.query.get(messageData['messageId'])

    message.body = messageData['newMessage']
    db.session.commit()

    emit('group_direct_message_message_edited', message.to_dict(), broadcast=True)

@socketio.on('delete_group_direct_message_message')
def handle_delete_group_direct_message_message(message):
    selectedMessage = GroupDirectMessageMessage.query.get(message['id'])
    db.session.delete(selectedMessage)
    db.session.commit()

    emit('group_direct_message_message_deleted', message, broadcast=True)
