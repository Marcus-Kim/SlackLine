from app.models import db, DirectMessage, DirectMessageMessage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_direct_message_messages():
    direct_message_messages = [
        {'direct_message_id': 1, 'user_id': 1, 'body': 'Hi there!'},
        {'direct_message_id': 1, 'user_id': 2, 'body': 'Hi! How are you?'}
    ]

    for message in direct_message_messages:
        db.session.add(DirectMessageMessage(
            direct_message_id=message['direct_message_id'],
            user_id=message['user_id'],
            body=message['body']
        ))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the transactions table. SQLAlchemy
# doesn't have a built in function to do this. With postgres in production
# TRUNCATE removes all the data from the table, and RESET IDENTITY resets the
# auto incrementing primary key, CASCADE deletes any dependent entities. With
# sqlite3 in development you need instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_direct_message_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.direct_message_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM direct_message_messages"))

    db.session.commit()
