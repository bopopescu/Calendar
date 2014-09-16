"""
models.py

"""
from apps import db


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    title_cal = db.Column(db.String(255))
    content = db.Column(db.Text())
    host = db.Column(db.String(255))
    category_char = db.Column(db.String(255))
    category_host = db.Column(db.String(255))

    date_created = db.Column(db.DateTime(timezone=True), default=db.func.now())
    date_start = db.Column(db.DateTime(timezone=True))
    date_end = db.Column(db.DateTime(timezone=True))
    
    location = db.Column(db.String(255))
    link = db.Column(db.String(255))
    poster = db.Column(db.String(255))
    contact = db.Column(db.String(255))
    contact_open = db.Column(db.Boolean())

    acceptance = db.Column(db.Boolean())