import config
import pusher
from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash
app = Flask(__name__)
app.config.from_object(__name__)
app.config.from_envvar("FLASKR_SETTINGS", silent = True)


pusher_application_key = config.pusher_application_key
pusher.app_id = config.pusher_app_id
pusher.key = config.pusher_key
pusher.secret = config.pusher_secret

p = pusher.Pusher()


@app.route ("/")
def home():
	return render_template("pushertest.html", key = pusher.key, app_id = pusher.app_id)

@app.route("/")
def url_route():
	url = request.form("URL")
	print url


#p["browser_channel"].trigger("url_change", {"hola": "gato"})

#def main():


if __name__ == '__main__':
    app.run()


