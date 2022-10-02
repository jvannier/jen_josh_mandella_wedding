from flask import (
    Flask,
    render_template,
    send_from_directory,
    request,
    jsonify,
    make_response,
)
from flask_cors import CORS, cross_origin
import os


app = Flask(__name__, static_folder='client/build',static_url_path='')
cors = CORS(app)


@app.route('/api')
@cross_origin()
def Welcome():
    return "Welcome to the API!!!"


if __name__ == '__main__':
    app.run(host='0.0.0.0')
