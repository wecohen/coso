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

@app.before_request
def setup_function():
    g.pusher = pusher.Pusher()


@app.route ("/")
def home():
	return render_template("screentest.html")

@app.route("/navigate")
def navigate():
    dest_url = request.args['destination_url']
    g.pusher['channel_name'].trigger("URL_change", {"url": dest_url})
    return ""

if __name__ == '__main__':
    app.run(debug=True)


