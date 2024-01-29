from flask import Flask, request
from flask_login import login_required, login_user, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from Server.User import User
import re
from datetime import datetime, timedelta

def login_functions(app,db,login_manager):
    
    #REGEX#
    _RE_ACCEPTED_CHARS = re.compile("^[a-zA-Z\u0590-\u05fe0-9'&\s.@\"]{4,16}$")
    
    #User Loader
    @login_manager.user_loader
    def load_user(username):
        u = db.Users.find_one({"username":username})
        if not u:
            return None
        return User(u)

    #Am I Logged In
    @app.route('/am_i_logged_in', methods=['GET'])
    def am_i_logged_in():
        if request.method == 'GET':
            if current_user.is_authenticated:
                return {"Logged_In" : "true",
                        "Username" : current_user.username}
            return {"Logged_In" : "false"}
        return {"Error" : "Wrong_Method"}

    #Register
    def register(username,password):
        creation_date = datetime.now()
        addUserQuery = { "username" : username,
                         "password" : generate_password_hash(password),
                         "games_amount" : 1,
                         "creation_date" : creation_date }
        db.Users.insert_one(addUserQuery)
    
    #Login
    @app.route('/login', methods=['POST'])
    def login():
        if request.method == 'POST':
            logout_user()
            data = request.get_json()
            
            #Username
            username = data['username']
            #Password
            password = data['password']

            #reCaptcha For production
            reCaptcha_token = data['recaptchaToken']
            #isRobot = not verify_reCaptcha_token(reCaptcha_token)
            #if isRobot:
            #    return {"Error" : "Verified as robot"}
            
            if not _RE_ACCEPTED_CHARS.match(username) or not _RE_ACCEPTED_CHARS.match(password):
                return {"Logged_In" : "false"}
            
            user = load_user(username)
            
            #Register
            if not user:
                register(username,password)
                user = load_user(username)
            
            if check_password_hash(user.password,password):
                login_user(user)
                return {"Logged_In" : "true"}
            return {"Logged_In" : "false"}
        return {"Error" : "Wrong_Method"}

    #Logout
    @app.route('/logout', methods=['GET'])
    @login_required
    def logout():
        if request.method == 'GET':
            logout_user()
            return {"Logged_In" : "false"}
        return {"Error" : "Wrong_Method"}
    
