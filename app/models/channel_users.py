from .db import db, environment, SCHEMA, add_prefix_for_prod

class ChannelUser(db.Model):
    __tablename__ = 'channel_users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(Integer, primary_key=True)
    channel_id = db.Column(Integer, ForeignKey(add_prefix_for_prod('channels.id')), nullable=False)
    user_id = db.Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
