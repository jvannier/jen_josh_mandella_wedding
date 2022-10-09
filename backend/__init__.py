from flask import Flask
from flask_cors import CORS


flask_app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(flask_app)
