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
