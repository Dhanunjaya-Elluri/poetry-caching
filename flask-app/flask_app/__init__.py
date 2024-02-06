from flask import Flask


def create_app():
    app = Flask(__name__)

    @app.route("/")
    def index():
        return "Index Page"

    @app.route("/helloworld")
    def hello_world():
        return "Hello, World!"

    return app
