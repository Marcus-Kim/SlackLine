from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError
from ..models.channel import Channel

def unique_channel_name(form, field):
    channel = Channel.query.filter_by(name=field.data).first()
    if channel is not None:
        raise ValidationError('Channel name already exists.')

class ChannelCreateForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=100), unique_channel_name])
    description = TextAreaField('Description', validators=[Length(max=500)])

class ChannelEditForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=100), unique_channel_name])
    description = TextAreaField('Description', validators=[Length(max=500)])
