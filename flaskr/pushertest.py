import config
import pusher
from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash
app = Flask(__name__)
app.config.from_object(__name__)
app.config.from_envvar("FLASKR_SETTINGS", silent = True)


pusher.app_id = config.pusher_app_id
pusher.key = config.pusher_key
pusher.secret = config.pusher_secret

OT_sessionID = config.OT_sessionID
OT_apiKey = config.OT_apiKey
OT_token = config.OT_token

@app.before_request
def setup_function():
	g.OT_sessionID = config.OT_sessionID
	g.OT_apiKey = config.OT_apiKey
	g.OT_token = config.OT_token
	g.pusher = pusher.Pusher()


@app.route ("/")
def home():
	return render_template("screentest.html")

@app.route("/navigate")
def navigate():
    dest_url = request.args['destination_url']
    g.pusher['channel_name'].trigger("URL_change", {"url": dest_url})
    return ""

@app.route("/click")
def click():
	x, y = request.args['x'], request.args['y']
	g.pusher['channel_name'].trigger("click", {"x": x, "y": y})
	return ""

@app.route ("/test1")
def test1():
	return render_template("playground.html")

@app.route ("/test2")
def test2():
	return render_template("test2.html")

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")


