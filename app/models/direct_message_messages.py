from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .direct_messages import DirectMessage

class DirectMessageMessage(db.Model):
    __tablename__ = 'direct_message_messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    direct_message_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('direct_messages.id'), ondelete='CASCADE'))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'))
    body = db.Column(db.Text(), nullable=False)
    created_at = db.Column(db.Date, default=datetime.now(tz=None), nullable=False)

    user = db.relationship("User", back_populates='direct_message_messages')
    direct_message = db.relationship("DirectMessage", back_populates='direct_message_messages', cascade='all, delete')

    @property
    def get_username(self):
        return self.user.username

    def to_dict(self):
        return {
            'id': self.id,
            'direct_message_id': self.direct_message_id,
            'user_id': self.user_id,
            'body': self.body,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'username': self.get_username
        }
