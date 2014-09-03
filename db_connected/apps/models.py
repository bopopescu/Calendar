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
    date_created = db.Column(db.DateTime(), default=db.func.now())

    date_start = db.Column(db.String(255))
    # date_start_year = db.Column(db.Integer)
    # date_start_month = db.Column(db.Integer)
    # date_start_day = db.Column(db.Integer)
    # date_start_hour = db.Column(db.Integer)
    # date_start_minute = db.Column(db.Integer)

    date_end = db.Column(db.String(255))
    # date_end_year = db.Column(db.Integer)
    # date_end_month = db.Column(db.Integer)
    # date_end_day = db.Column(db.Integer)
    # date_end_hour = db.Column(db.Integer)
    # date_end_minute = db.Column(db.Integer)

    location = db.Column(db.String(255))
    link = db.Column(db.String(255))
    poster = db.Column(db.String(255))
    contact = db.Column(db.String(255))
    contact_open = db.Column(db.Boolean())
