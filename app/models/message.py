from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
#TODO Create message table

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id'), ondelete='CASCADE'), nullable=False)
    body = db.Column(db.Text(), nullable=False)
    created_at = db.Column(db.Date, default=datetime.now(tz=None), nullable=False)

    user = db.relationship("User", back_populates='messages')
    channel = db.relationship("Channel", back_populates='messages')

    @property
    def get_name(self):
        return self.user.username

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'channel_id': self.channel_id,
            'body': self.body,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'username': self.get_name
        }
