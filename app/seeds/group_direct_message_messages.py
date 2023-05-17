from app.models import db, GroupDirectMessageMessage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_group_direct_message_messages():
    group_direct_message_messages = [
        {'group_direct_message_id': 1, 'user_id': 1, 'body': 'Hello group!!'},
        {'group_direct_message_id': 1, 'user_id': 2, 'body': 'Nice to meet you all'},
        {'group_direct_message_id': 2, 'user_id': 1, 'body': 'Hello other group!!'},
        {'group_direct_message_id': 2, 'user_id': 3, 'body': 'Oh hey whats poppin'},
    ]

    for group_direct_message_message in group_direct_message_messages:
        db.session.add(GroupDirectMessageMessage(
            group_direct_message_id=group_direct_message_message['group_direct_message_id'],
            user_id=group_direct_message_message['user_id'],
            body=group_direct_message_message['body']
        ))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the transactions table. SQLAlchemy
# doesn't have a built in function to do this. With postgres in production
# TRUNCATE removes all the data from the table, and RESET IDENTITY resets the
# auto incrementing primary key, CASCADE deletes any dependent entities. With
# sqlite3 in development you need instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_group_direct_message_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.group_direct_message_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM group_direct_message_messages"))

    db.session.commit()
