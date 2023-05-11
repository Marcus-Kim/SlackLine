from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import GroupDirectMessage, db, GroupDirectMessageMessage

group_direct_message_routes = Blueprint('group_direct_messages', __name__)

#TODO Get all Group Direct Messages
@group_direct_message_routes.route('/')
@login_required
def get_group_direct_messages():
    group_direct_messages = GroupDirectMessage.query.all()

    data = [group_direct_message.to_dict() for group_direct_message in group_direct_messages]

    return data

#TODO Create Group Direct Message
@group_direct_message_routes.route('/', methods=['POST'])
@login_required
def create_group_direct_message():
    req_body = request.get_json()

    group_direct_message = GroupDirectMessage(
        name = req_body['name']
    )

    db.session.add(group_direct_message)
    db.session.commit()

    return(group_direct_message.to_dict())

#TODO Edit Group Direct Message
@group_direct_message_routes.route('/<int:groupDirectMessageId>', methods=['PUT'])
@login_required
def edit_group_direct_message(groupDirectMessageId):
    req_body = request.get_json()
    new_name = req_body['new_name']
    group_direct_message = GroupDirectMessage.query.get(groupDirectMessageId)

    group_direct_message.name = new_name
    db.session.commit()

    return group_direct_message.to_dict()

#TODO Delete Group Direct Message
@group_direct_message_routes.route('/<int:groupDirectMessageId>', methods=['DELETE'])
@login_required
def delete_group_direct_message(groupDirectMessageId):
    group_direct_message = GroupDirectMessage.query.get(groupDirectMessageId)
    db.session.delete(group_direct_message)
    db.session.commit()

    return { 'message': 'Successfully Deleted!' }

#! <------------------------------------------------------------------------------------->

#TODO Read Group Direct Message Messages
@group_direct_message_routes.route('/messages')
@login_required
def get_group_direct_message_messages():
    messages = GroupDirectMessageMessage.query.all()

    data = [message.to_dict() for message in messages]

    return data
