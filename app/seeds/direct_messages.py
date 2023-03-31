from app.models import db, DirectMessage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_direct_messages():
    direct_messages = [
        {'user1_id': 1, 'user2_id': 2},
        {'user1_id': 1, 'user2_id': 3},
    ]

    for direct_message in direct_messages:
        db.session.add(DirectMessage(
            user1_id=direct_message['user1_id'],
            user2_id=direct_message['user2_id']
        ))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the transactions table. SQLAlchemy
# doesn't have a built in function to do this. With postgres in production
# TRUNCATE removes all the data from the table, and RESET IDENTITY resets the
# auto incrementing primary key, CASCADE deletes any dependent entities. With
# sqlite3 in development you need instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_direct_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.direct_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM direct_messages"))

    db.session.commit()
