from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Channel

channel_routes = Blueprint('channels', __name__)


@channel_routes.route('/')
@login_required
def get_all_channels():
    """
    Query for all channels
    """
    channels = Channel.query.all()
    return {'channels': [channel.to_dict() for channel in channels]}
