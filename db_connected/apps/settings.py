"""
settings.py

Configuration for Flask app

"""
import os


class Config(object):
    # Set secret key to use session
    SECRET_KEY = "KAIST-Calendar-secret-key"
    debug = False


class Production(Config):
    debug = True
    CSRF_ENABLED = False
    ADMIN = "mingy831@gmail.com"
    SQLALCHEMY_DATABASE_URI = 'mysql+gaerdbms:///blog?instance=lunar-inn-630:minzy0164'
    migration_directory = 'migrations'
