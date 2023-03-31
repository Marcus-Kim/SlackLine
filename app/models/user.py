from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .channel_users import channel_users

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # Relationships
    messages = db.relationship("Message", back_populates='user')
    channels = db.relationship("Channel", secondary=channel_users, back_populates='users')
    direct_messages = db.relationship("DirectMessage", back_populates='user')
    direct_message_messages = db.relationship("DirectMessageMessage", back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    @property
    def get_channels(self):
        return [channel.id for channel in self.channels]

    @property
    def get_direct_messages(self):
        return [direct_message.id for direct_message in self.direct_messages]

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'channels': self.get_channels,
            'direct_messages': self.get_direct_messages,
            'username': self.username
        }
