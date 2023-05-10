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

#TODO Delete a direct message
@direct_message_routes.route('/<int:directMessageId>', methods=['DELETE'])
@login_required
def delete_directMessage(directMessageId):
    directMessage = DirectMessage.query.get(directMessageId)

    db.session.delete(directMessage)
    db.session.commit()

    return jsonify({ "message": "Successfully Deleted" })

#TODO Create a direct message
@direct_message_routes.route('/', methods=['POST'])
@login_required
def create_directMessage():
    req_body = request.get_json()

    dm = DirectMessage(
        user1_id = req_body['user1_id'],
        user2_id = req_body['user2_id']
    )

    db.session.add(dm)
    db.session.commit()

    return dm.to_dict()
