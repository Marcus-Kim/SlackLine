from app.models import db, environment, SCHEMA
from ..models.channel_users import channel_users
from sqlalchemy.sql import text

def seed_channel_users():
    channel_users_data = [
        {'channel_id': 1, 'user_id': 1},
        {'channel_id': 1, 'user_id': 2},
        {'channel_id': 1, 'user_id': 3},
        {'channel_id': 2, 'user_id': 1},
        {'channel_id': 2, 'user_id': 2},
        {'channel_id': 2, 'user_id': 3},
        {'channel_id': 3, 'user_id': 1},
        {'channel_id': 2, 'user_id': 2},
        {'channel_id': 3, 'user_id': 3},
    ]

    for channel_user in channel_users_data:
        user = channel_users.insert().values(
            channel_id=channel_user['channel_id'],
            user_id=channel_user['user_id']
        )
        db.session.execute(user)

    db.session.commit()

def undo_channel_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channel_users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channel_users"))

    db.session.commit()
