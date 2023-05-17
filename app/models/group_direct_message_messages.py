from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class GroupDirectMessageMessage(db.Model):
    __tablename__ = 'group_direct_message_messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    group_direct_message_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('group_direct_messages.id'), ondelete='CASCADE'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    body = db.Column(db.Text(), nullable=False)
    created_at = db.Column(db.Date, default=datetime.now(tz=None), nullable=False)

    #TODO Relationships
    group_direct_message = db.relationship("GroupDirectMessage", back_populates='group_direct_message_messages')
    user = db.relationship("User", back_populates='group_direct_message_messages')

    @property
    def get_name(self):
        return self.user.username

    def to_dict(self):
        return {
            'id': self.id,
            'group_direct_message_id': self.group_direct_message_id,
            'user_id': self.user_id,
            'body': self.body,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'username': self.get_name
        }
