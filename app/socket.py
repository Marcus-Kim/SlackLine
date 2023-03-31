from flask_socketio import SocketIO, join_room, leave_room, emit
from .models import Message, db, Channel, channel_users

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
