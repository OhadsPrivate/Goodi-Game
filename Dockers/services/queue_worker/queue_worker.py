import os
import urllib
import time
from pymongo import MongoClient
from datetime import datetime, timedelta

#Connect to DB
#Docker Production Connect
#mongo = MongoClient('mongodb://' + os.environ['MONGODB_USERNAME'] + ':' + urllib.parse.quote(os.environ['MONGODB_PASSWORD']) + '@' + os.environ['MONGODB_HOSTNAME'] + ':27017/' + os.environ['MONGODB_DATABASE'])
#db = mongo[os.environ['MONGODB_DATABASE']]
db = MongoClient('localhost',27017).GoodiGame

print("I'm the jobs queue worker :D")

while True:
    pendings_jobs = db.Jobs.find({ "status" : "PENDING" })
    for job in pendings_jobs:
        print("I got to do " + job["by"] + "'s job!")

        pipeline = [
            {
                "$match" : {
                    "username" : job["target"]
                }
            },
            {
                "$group" : {
                    "_id" : "$game_id",
                    "game_id" : {"$first" : "$game_id"},
                    "turns" : { "$push" : "$cubes" }
                }
            },{
                "$sort" : {"game_id" : 1}
            },{
                "$project" : {
                    "_id" : 0,
                    "game_id" : 1,
                    "turns" : 1
                }
            }
        ]
        games = list(db.Turns.aggregate(pipeline))
        
        completion_date = datetime.now()
        jobQuery = { "_id" : job["_id"] }
        updateJobQuery = {"$set" : { "status" : "COMPLETED",
                                     "games" : games,
                                     "completion_date" : completion_date }
                         }
        db.Jobs.update_one(jobQuery, updateJobQuery)
        print("Done!")

    #Jobs Cleaner        
    completed_jobs = db.Jobs.find({ "status" : "COMPLETED" , "notification_date" : {"$ne" : None } })
    for job in completed_jobs:
        if job["seen"] or job["notification_date"] < datetime.now() - timedelta(minutes=10):
              db.Jobs.delete_one({"_id" : job["_id"]})
            
    time.sleep(1)
