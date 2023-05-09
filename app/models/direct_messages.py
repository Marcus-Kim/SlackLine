from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from app.models.user import User


#TODO Create direct_messages model
# Relationships -> users, direct_messages_messages

class DirectMessage(db.Model):
    __tablename__ = 'direct_messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    user2_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)

    #TODO add direct_messages_messages relationship
    user = db.relationship("User", back_populates='direct_messages')


    def to_dict(self):
        return {
            'id': self.id,
            'user1': self.user.to_dict(),
            'user2': User.query.get(self.user2_id).to_dict(),
            'created_at': self.created_at.strftime("%Y-%m-%dT%H:%M:%S"),
            'users': [self.user.id, User.query.get(self.user2_id).id]
        }
