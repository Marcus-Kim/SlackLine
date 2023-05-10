from .db import db, environment, SCHEMA, add_prefix_for_prod

group_direct_message_users = db.Table(
    'group_direct_message_users',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('group_direct_message_id', db.Integer, db.ForeignKey(add_prefix_for_prod('group_direct_messages.id'), ondelete='CASCADE'), nullable=False),
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
)

if environment == "production":
    group_direct_message_users.schema = SCHEMA
