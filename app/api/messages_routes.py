from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, db

message_routes = Blueprint('messages', __name__)

#TODO Get all channel messages
@message_routes.route('/')
@login_required
def get_messages():
    messages = Message.query.all();

    data = [message.to_dict() for message in messages];

    return data;

#TODO Delete message by id
@message_routes.route('/<int:messageId>', methods=['DELETE'])
@login_required
def delete_message(messageId):
    message = Message.query.get(messageId)

    db.session.delete(message)
    db.session.commit()

    return { 'message': 'Successfully Deleted' }
