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


OT_apiKey = config.OT_apiKey


@app.before_request
def setup_function():
	g.OT_apiKey = config.OT_apiKey
	g.pusher = pusher.Pusher()


@app.route ("/")
def home():
	return render_template("screentest.html")

def create_session_id():
	unique_session = opentok_sdk.create_session()
	print unique_session.session_id
	return unique_session.session_id

@app.route ("/session")
def create_session():
	print "bloop"
	session_id = create_session_id()
	unique_token = opentok_sdk.generate_token(session_id, None, None, None)
	print "this is my" + unique_token
	# return jsonify(session_id = session_id, unique_token = unique_token)
	return render_template("screentest.html", session_id=session_id, unique_token=unique_token)	

@app.route("/join", methods = "GET")
def join_session():
	session_id = request.form("session_id")
	unique_token = opentok_sdk.generate_token(session_id, None, None, None)
	return render_template("screentest.html", session_id = session_id)

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


