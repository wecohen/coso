import os

pusher_application_key = 'b31d655fa7f11bd6f11d'
pusher_app_id = '24605'
pusher_key = os.getenv("PUSHER_KEY", "")
pusher_secret = os.getenv("PUSHER_SECRET", "")

OT_apiKey = os.getenv("OT_KEY", "")
OT_sessionID = "2_MX4xNjgwMTQxMn5-MjAxMi0wNy0yNCAyMjo1OToxOC4zNDQyODkrMDA6MDB-MC4xNTQyODA0MzQxODJ-" # Replace with your own session ID.
                    # See http://www.tokbox.com/opentok/api/tools/generator
OT_token = "devtoken" # Replace with a generated token that has been assigned the moderator role.
                # See http://www.tokbox.com/opentok/api/tools/generator
OT_apiSecret = os.getenv("OT_SECRET", "")

thing = "This is the thing"

print OT_apiSecret

#try:
#  from config_local import *
#except:
#  pass
