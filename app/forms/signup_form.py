from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User
from email_validator import validate_email

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    try:
        validate_email(email)
    except Exception as e:
        raise ValidationError('It looks like this isn\'t a valid email.')
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('This email address is already in use.')



def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), Length(min=3, max=20, message="Username must be between 3 and 20 characters long"), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
