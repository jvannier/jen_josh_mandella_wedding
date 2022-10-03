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


app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
cors = CORS(app)


@app.route('/api')
@cross_origin()
def Welcome():
    return "Welcome to the API!!!"


@app.route('/')
def serve():
    print("AAAAaaaanot found aaaAAA")
    # return app.send_static_file('index.html')
    # root_dir = os.path.dirname(os.getcwd())
    return send_from_directory(app.static_folder, 'index.html')


@app.errorhandler(404)
def not_found(e):
    print("not found")
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0')
