"""
settings.py

Configuration for Flask app

"""
import os


class Config(object):
    # Set secret key to use session
    SECRET_KEY = "KAIST-Calendar-secret-key"

class Production(Config):
    debug = True
    CSRF_ENABLED = False
    ADMIN = "calendarkaist3@gmail.com"
    SQLALCHEMY_DATABASE_URI = 'mysql+gaerdbms:///event?instance=kaist-calendar-002:kaist3'
    migration_directory = 'migrations'
