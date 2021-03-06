"""
settings.py

Configuration for Flask app

"""


class Config(object):
    # Set secret key to use session
    SECRET_KEY = "likelion-flaskr-secret-key"
    debug = False

class Production(Config):
    debug = True
    CSRF_ENABLED = False
    ADMIN = "calendarkaist4@gmail.com"
    SQLALCHEMY_DATABASE_URI = 'mysql+gaerdbms:///calendar?instance=kaist-calendar-004:kaist-calendar-004'
    migration_directory = 'migrations'
