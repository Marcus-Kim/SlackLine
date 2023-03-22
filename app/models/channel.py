from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .channel_users import channel_users

#TODO Create Channel Model
    #Relationships -> messages, channel users


class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text())
    created_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)

    users = db.relationship('User', secondary=channel_users, back_populates='channels')
    messages = db.relationship('Message', back_populates='channel')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'description': self.description,
            'created_at': self.created_at,
        }
