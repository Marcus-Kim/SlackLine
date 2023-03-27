from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Channel, db, Message
from ..forms.channel_form import ChannelCreateForm, ChannelEditForm, unique_channel_name
from .auth_routes import validation_errors_to_error_messages

from flask_socketio import emit

channel_routes = Blueprint('channels', __name__)

#TODO Get all of the channels
@channel_routes.route('/', methods=['GET'])
@login_required
def get_all_channels():
    """
    Query for all channels
    """
    channels = Channel.query.all()
    return {'channels': [channel.to_dict() for channel in channels]}

#TODO Get Channel by ID
@channel_routes.route('/<int:id>')
@login_required
def get_channel_by_id(id):
    channel = Channel.query.get(id)
    return channel.to_dict()

#TODO Create a channel
    # Creating a channel should automatically add the user to the channel_users
@channel_routes.route('/', methods=['POST'])
@login_required
def create_channel():
    req_body = request.get_json()
    channel_name = req_body['name']
    channel_description = req_body['description']
    form = ChannelCreateForm(data=req_body)
    user = current_user
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel = Channel(
            owner_id = user.id,
            name = form.data['name'],
            description = form.data['description']
        )
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}



#TODO Update a channel
    # Changing the name or description of the channel
@channel_routes.route('/<int:channelId>', methods=['PUT'])
@login_required
def edit_channel(channelId):
    channel = Channel.query.get(channelId)
    req_body = request.get_json()
    existing_name = channel.to_dict()['name']
    new_name = req_body['name']
    new_description = req_body['description']

    # Check if new name is unique
    other_channels_with_same_name = Channel.query.filter(
        Channel.name == new_name,
        Channel.id != channelId
    ).all()

    if other_channels_with_same_name:
        return {'message': 'Name already taken'}

    # Update the channel name
    channel.name = new_name
    channel.description = new_description
    db.session.commit()

    return channel.to_dict()


#TODO Delete a channel
    # Must be the owner to delete the channel
@channel_routes.route('/<int:channelId>', methods=['DELETE'])
@login_required
def delete_channel(channelId):
    channel = Channel.query.get(channelId)
    print(channel)
    db.session.delete(channel)
    db.session.commit()
    return { 'message': 'Successfully Deleted!'}

#TODO Create Message by Channel Id
@channel_routes.route('/<int:channelId>/messages', methods=['POST'])
@login_required
def create_channel_message(channelId):
    req_body = request.get_json()
    print('REQ_BODY', req_body)
    message = Message(
        user_id = current_user.id,
        channel_id = channelId,
        body = req_body['body']
    )

    db.session.add(message)
    db.session.commit()

    return message.to_dict()

#TODO Get Messages by Channel Id
@channel_routes.route('/<int:channelId>/messages')
@login_required
def get_channel_messages_by_id(channelId):
    messages = Message.query.filter_by(channel_id=channelId).all()

    return [message.to_dict() for message in messages]

#TODO Delete Message by Channel Id
@channel_routes.route('/<int:channelId>/messages/<int:messageId>', methods=['DELETE'])
@login_required
def delete_channel_message(channelId, messageId):
    message = Message.query.filter_by(channelId=channelId, id=messageId)
    
    print(message.to_dict())
