import config
import pusher
import OpenTokSDK
from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash, jsonify
app = Flask(__name__)
app.config.from_object(__name__)
app.config.from_envvar("FLASKR_SETTINGS", silent = True)


pusher.app_id = config.pusher_app_id
pusher.key = config.pusher_key
pusher.secret = config.pusher_secret

OT_sessionID = config.OT_sessionID
OT_apiKey = config.OT_apiKey
api_secret = config.OT_apiSecret
OT_token = config.OT_token
api_url = "https://api.opentok.com/hl"
opentok_sdk = OpenTokSDK.OpenTokSDK(OT_apiKey, api_secret, staging=True)


@app.before_request
def setup_function():
	g.OT_apiKey = config.OT_apiKey
	g.pusher = pusher.Pusher()


@app.route ("/")
def home():
	return render_template("homepage.html")

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

@app.route("/join", methods = ["POST"])
def join_session():
	print request.form
	session_id = request.form.get("session_id")
	print session_id
	unique_token = opentok_sdk.generate_token(session_id, None, None, None)
	return render_template("screentest.html", session_id = session_id)

@app.route("/navigate")
def navigate():
    dest_url = request.args['destination_url']
    leader_id = request.args['leader_id']
    g.pusher['channel_name'].trigger("URL_change", {"url": dest_url, "leader_id": leader_id})
    return ""

@app.route("/click")
def click():
	x, y = request.args['x'], request.args['y']
	leader_id = request.args['leader_id']
	g.pusher['channel_name'].trigger("click", {"x": x, "y": y, "leader_id": leader_id})
	return ""

@app.route("/scroll")
def scroll():
	offset_x, offset_y = request.args['offset_x'], request.args['offset_y']
	leader_id = request.args['leader_id']
	g.pusher['channel_name'].trigger("scroll", {"offset_x": offset_x, "offset_y": offset_y, "leader_id": leader_id})
	return ""

@app.route("/key")
def key():
	code = request.args['code']
	leader_id = request.args['leader_id']
	g.pusher['channel_name'].trigger("key", {"code": code, "leader_id": leader_id})
	return ""

@app.route ("/test1")
def test1():
	return render_template("playground.html")

@app.route ("/test2")
def test2():
	return render_template("test2.html")

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")


