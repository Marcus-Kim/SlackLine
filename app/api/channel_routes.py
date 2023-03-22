from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Channel, db
from ..forms.channel_form import ChannelCreateForm, ChannelEditForm
from .auth_routes import validation_errors_to_error_messages

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

#TODO Create a channel
    # Creating a channel should automatically add the user to the channel_users
@channel_routes.route('/', methods=['POST'])
@login_required
def create_channel():
    req_body = request.get_json()
    channel_name = req_body['name']
    channel_description = req_body['description']
    form = ChannelCreateForm(data=req_body)

    print("FORM DATA: ", form.data['name'])
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
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



#TODO Update a channel
    # Changing the name or description of the channel

#TODO Delete a channel
    # Must be the owner to delete the channel
