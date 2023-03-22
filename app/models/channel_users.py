from .db import db, environment, SCHEMA, add_prefix_for_prod

channel_users = db.Table(
    'channel_users',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('channel_id', db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id'), ondelete='CASCADE'), nullable=False),
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False),
)

if environment == "production":
    channel_users.schema = SCHEMA
