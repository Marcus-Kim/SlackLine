from .db import db, environment, SCHEMA
from datetime import datetime
from .group_direct_message_users import group_direct_message_users

class GroupDirectMessage(db.Model):
    __tablename__ = 'group_direct_messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)

    #TODO Relationships
    # group direct message users
    users = db.relationship("User", secondary=group_direct_message_users, back_populates='group_direct_messages')
    # group direct message message
    group_direct_message_messages = db.relationship("GroupDirectMessageMessage", back_populates='group_direct_message')

    @property
    def get_users(self):
        return [user.id for user in self.users]

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at.strftime("%Y-%m-%dT%H:%M:%S"),
            'users': self.get_users
        }
