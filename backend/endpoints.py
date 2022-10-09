from flask import (
    Flask,
    render_template,
    send_from_directory,
    request,
    jsonify,
    make_response,
)
from flask_cors import cross_origin

from . import flask_app


@flask_app.route('/api')
@cross_origin()
def Welcome():
    return "Welcome to the API!!!"
