from app.models import db, GroupDirectMessage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_group_direct_messages():
    group_direct_messages = [
        { 'name': 'group1' },
        { 'name': 'group2' }
    ]

    for group_direct_message in group_direct_messages:
        db.session.add(GroupDirectMessage(
            name=group_direct_message['name']
        ))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the transactions table. SQLAlchemy
# doesn't have a built in function to do this. With postgres in production
# TRUNCATE removes all the data from the table, and RESET IDENTITY resets the
# auto incrementing primary key, CASCADE deletes any dependent entities. With
# sqlite3 in development you need instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_group_direct_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.group_direct_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM group_direct_messages"))

    db.session.commit()
