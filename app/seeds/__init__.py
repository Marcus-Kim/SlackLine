from flask.cli import AppGroup
from .users import seed_users, undo_users
from .channels import seed_channels, undo_channels
from .channel_users import seed_channel_users, undo_channel_users
from .messages import seed_messages, undo_messages
from .direct_messages import seed_direct_messages, undo_direct_messages
from .direct_message_messages import seed_direct_message_messages, undo_direct_message_messages
from .group_direct_messages import seed_group_direct_messages, undo_group_direct_messages
from .group_direct_message_users import seed_group_direct_message_users, undo_group_direct_message_users
from .group_direct_message_messages import seed_group_direct_message_messages, undo_group_direct_message_messages

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_group_direct_message_messages()
        undo_group_direct_message_users()
        undo_group_direct_messages()
        undo_direct_message_messages()
        undo_direct_messages()
        undo_messages()
        undo_channel_users()
        undo_channels()
        undo_users()
    seed_users()
    seed_channels()
    seed_channel_users()
    seed_messages()
    seed_direct_messages()
    seed_direct_message_messages()
    seed_group_direct_messages()
    seed_group_direct_message_users()
    seed_group_direct_message_messages()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_group_direct_message_messages()
    undo_group_direct_message_users()
    undo_group_direct_messages()
    undo_direct_message_messages()
    undo_direct_messages()
    undo_messages()
    undo_channel_users()
    undo_channels()
    undo_users()
    # Add other undo functions here
