from flask_socketio import SocketIO, join_room, leave_room, emit
from .models import Message, db
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
