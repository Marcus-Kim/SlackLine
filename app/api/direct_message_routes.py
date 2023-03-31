from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import DirectMessage, db

direct_message_routes = Blueprint('direct_messages', __name__)

#TODO Get all Direct Messages
@direct_message_routes.route('/')
@login_required
def get_direct_messages():
    directMessages = DirectMessage.query.all()

    data = [directMessage.to_dict() for directMessage in directMessages];

    return data;
