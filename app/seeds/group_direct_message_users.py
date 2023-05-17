from app.models import db, environment, SCHEMA
from ..models.group_direct_message_users import group_direct_message_users
from sqlalchemy.sql import text


def seed_group_direct_message_users():
    group_direct_message_users_data = [
        {'group_direct_message_id': 1, 'user_id': 1},
        {'group_direct_message_id': 1, 'user_id': 2},
        {'group_direct_message_id': 2, 'user_id': 1},
        {'group_direct_message_id': 2, 'user_id': 3},
    ]

    for group_direct_message_user in group_direct_message_users_data:
        user = group_direct_message_users.insert().values(
            group_direct_message_id=group_direct_message_user['group_direct_message_id'],
            user_id=group_direct_message_user['user_id']
        )
        db.session.execute(user)

    db.session.commit()

def undo_group_direct_message_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.group_direct_message_users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM group_direct_message_users"))

    db.session.commit()
