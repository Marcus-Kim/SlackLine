from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text

def seed_messages():
    messages = [
        {'user_id': 1, 'channel_id': 1, 'body': 'This is the first message!'},
        {'user_id': 2, 'channel_id': 1, 'body': 'Hey, how\'s it going?'},
        {'user_id': 3, 'channel_id': 1, 'body': 'Not much, just hanging out.'},
        {'user_id': 1, 'channel_id': 2, 'body': 'What\'s everyone up to tonight?'},
        {'user_id': 2, 'channel_id': 2, 'body': 'I\'m not sure, anyone have any suggestions?'},
        {'user_id': 3, 'channel_id': 2, 'body': 'I was thinking about going to that new restaurant on Main Street.'},
        {'user_id': 1, 'channel_id': 3, 'body': 'Has anyone seen the new Avengers movie?'},
        {'user_id': 2, 'channel_id': 3, 'body': 'No, I haven\'t had a chance to see it yet.'},
        {'user_id': 3, 'channel_id': 3, 'body': 'I saw it last weekend, it was really good!'},
        {'user_id': 1, 'channel_id': 1, 'body': 'Anyone want to grab lunch later?'}
    ]

    for message in messages:
        new_message = Message(
            user_id=message['user_id'],
            channel_id=message['channel_id'],
            body=message['body']
        )
        db.session.add(new_message)
        db.session.commit()

def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
