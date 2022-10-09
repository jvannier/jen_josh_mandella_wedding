# Getting started local development

The first time, install requirements:
```
pip install -r requirements.txt
```

Starting the application itself:
```
./start.sh
```

To skip building the frontend, you can start the application by running
```
./app.py
```

# Heroku Application

https://jen-josh-mandella-wedding.herokuapp.com/

The Heroku app works by using the Flask app in `app.py` to render the frontend (in React) after it's been compiled into a static build (see `/frontend/build`). Normally these files wouldn't be committed, but we're leaving them in for ease of development.

More specifically, the Heroku app uses a web dyno, as seen in `Procfile` which renders the Flask app by telling Heroku `app:flask_app` where the `app:` is the name of the file containing the base Flask app (`app.py`) and the second `:flask_app` is the name of the Flask app created in `backend/__init__.py` (`flask_app = Flask(...)`).

# Developers

Jen Vannier (soon to be Mandella)
Josh Mandella
