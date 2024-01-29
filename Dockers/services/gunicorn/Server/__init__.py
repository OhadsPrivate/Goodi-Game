from flask import Flask, request
import os
import urllib
from flask_pymongo import PyMongo
from flask_login import LoginManager
from Server.login_functions import login_functions
from Server.user_functions import user_functions
from Server.jobs_queue_functions import jobs_queue_functions

app = Flask(__name__)

#Docker Production Connect
#app.config["MONGO_URI"] = 'mongodb://' + os.environ['MONGODB_USERNAME'] + ':' + urllib.parse.quote(os.environ['MONGODB_PASSWORD']) + '@' + os.environ['MONGODB_HOSTNAME'] + ':27017/' + os.environ['MONGODB_DATABASE']
#Local Connect
app.config["MONGO_DBNAME"] = 'GoodiGame'
app.config["MONGO_URI"] = "mongodb://localhost:27017/GoodiGame"
app.config["MONGO_CONNECT"] = False
mongo = PyMongo(app)
db = mongo.db

login_manager = LoginManager()
login_manager.init_app(app)
app.secret_key = """xFeSSrbcp8UFDfpGLkZQ8o4zQ70hFEQsnVwRcPPsPX0U1lepkIIsE2psnQV4mMMAqAqFJRbP
                    48K9LSFsgV5RS68weLm1vNEzFH5p8tkD2Tj4hFdAD84Bd0cx6YAKvDWSl4nLB4sv3HJFmJnC
                    zYFJIaJQCwrJiRrGGQzKAKYGYyw1iFKhyCFcwC576DNJh0X0sl6qlalldrTU9Cfjo35ses0n
                    H01l5TxbX0Z7SSmnqDr7b4f7TxXlZhg0kSUzEHMxOUXIbyAoJQo8G2Gpb8X23dCHnDfM56C6
                    4LnYHB2noRx76Mq3T248nyFPxGcsP5CSfNYK74eTZbeFIGxbIwA8BfW5d3URVNC2bIyxxLEJ"""


login_functions(app,db,login_manager)
user_functions(app,db)
jobs_queue_functions(app,db)

#Cookies and Origin headers
@app.after_request
def after_request(response):
    if 'HTTP_ORIGIN' in request.environ:
        response.headers.add('Access-Control-Allow-Origin', request.environ['HTTP_ORIGIN'] )
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,charset')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response
