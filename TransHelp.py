from flask import Flask, render_template
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Has to be here as it requires app and is required in database creation.
import config

db = SQLAlchemy(app)
engine = create_engine(config.db_path, convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

# Load order is important here, otherwise commands dont have access to all the models.
from models import *
from commands import *

@app.route('/')
def index():
    return render_template('home.html')

if __name__ == '__main__':
    app.run()