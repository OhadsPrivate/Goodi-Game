from flask import Flask, request
from flask_login import login_required, current_user, logout_user
from datetime import datetime
from random import randint
from bson.objectid import ObjectId

def user_functions(app,db):
    #Roll the dice
    @app.route('/roll_the_dice', methods=['GET'])
    @login_required
    def roll_the_dice():
        if request.method == 'GET':
            cubes = [randint(1,6) for cube in range(6)]
            creation_date = datetime.now()
            addTurnQuery = {"username" : current_user.username,
                            "cubes" : cubes,
                            "game_id" : current_user.games_amount,
                            "creation_date" : creation_date}
            db.Turns.insert_one(addTurnQuery)
            return { "cubes" : cubes }
        return {"Error" : "Wrong_Method"}

    #Load current game results
    @app.route('/load_current_game_results', methods=['GET'])
    @login_required
    def load_current_game_results():
        if request.method == 'GET':
            pipeline = [
                {
                    "$match" : {
                        "username" : current_user.username,
                        "game_id" : current_user.games_amount
                    }
                },
                {
                    "$project" : {
                        "_id" : 0,
                        "cubes" : 1
                    }
                }
            ]
            turns = list(db.Turns.aggregate(pipeline))
            return turns
        return {"Error" : "Wrong_Method"}

    #Finish game
    @app.route('/finish_game', methods=['GET'])
    @login_required
    def finish_game():
        if request.method == 'GET':
            pipeline = [
                {
                    "$match" : {
                        "username" : current_user.username,
                        "game_id" : current_user.games_amount
                    }
                },
                {
                    "$project" : {
                        "_id" : 0,
                        "cubes" : 1
                    }
                }
            ]
            turns = list(db.Turns.aggregate(pipeline))
            
            #calculate luckiest
            luckiest = True

            userQuery = { "username" : current_user.username }
            updateUserQuery = {"$inc" :{ "games_amount" : 1}}
            db.Users.update_one(userQuery, updateUserQuery)
            
            if luckiest:
                return { "Luckiest" : "true"}
            else:
                return { "Luckiest" : "false"}
        return {"Error" : "Wrong_Method"}
