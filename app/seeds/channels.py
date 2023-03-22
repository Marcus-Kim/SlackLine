from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text

def seed_channels():
    channels = [
        {'owner_id': 1, 'name': 'general', 'description': 'This is the general chat'},
        {'owner_id': 2, 'name': 'second chat', 'description': 'This is the second chat'},
        {'owner_id': 3, 'name': 'third chat', 'description': 'This is the third chat'}
    ]

    for channel in channels:
        db.session.add(Channel(
            owner_id=channel['owner_id'],
            name=channel['name'],
            description=channel['description']
        ))

        db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the transactions table. SQLAlchemy
# doesn't have a built in function to do this. With postgres in production
# TRUNCATE removes all the data from the table, and RESET IDENTITY resets the
# auto incrementing primary key, CASCADE deletes any dependent entities. With
# sqlite3 in development you need instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
