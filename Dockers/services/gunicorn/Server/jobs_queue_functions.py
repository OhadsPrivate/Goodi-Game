from flask import Flask, request
from flask_login import login_required, current_user, logout_user
from datetime import datetime
from bson.objectid import ObjectId

def jobs_queue_functions(app,db):
    #Insert Job
    @app.route('/insert_job', methods=['POST'])
    @login_required
    def insert_job():
        if request.method == 'POST':
            data = request.get_json()
            target_username = data['username']
            if(target_username == "ME"):
                target_username = current_user.username

            jobInQueue = db.Jobs.find_one({"by" : current_user.username,
                                           "seen" : False})
            if jobInQueue:
                if jobInQueue["status"] == "PENDING":
                    return { "job" : { "status" : "PENDING",
                                       "job_id" : str(jobInQueue["_id"])
                                       }
                            }
                elif not jobInQueue["seen"]:
                    return { "job" : { "status" : "UNSEEN",
                                       "job_id" : str(jobInQueue["_id"])
                                     }
                            }
                                           
            userExists = db.Users.find_one({"username" : target_username})
            if not userExists:
                return { "job" : { "status" : "USER_NOT_EXISTS" } }
            
            creation_date = datetime.now()
            addJobQuery = { "by" : current_user.username,
                            "target" : target_username,
                            "status" : "PENDING",
                            "creation_date" : creation_date,
                            "results" : None,
                            "completion_date" : None,
                            "notification_date" : None,
                            "seen" : False}
            _id = db.Jobs.insert_one(addJobQuery)
            return { "job" : { "status" : "SENT",
                              "job_id" : str(_id.inserted_id)
                            }
                    }
        return {"Error" : "Wrong_Method"}

    #Check For Completed Job Notification
    @app.route('/check_for_completed_job_notification', methods=['GET'])
    @login_required
    def check_for_completed_job_notification():
        if request.method == 'GET':
            job = db.Jobs.find_one( { "by" : current_user.username,
                                     "status" : "COMPLETED",
                                     "notification_date" : None })
            job_id = ""
            if job:
                job_id = str(job["_id"])
                notification_date = datetime.now()
                jobQuery = { "_id" : job["_id"] }
                updateJobQuery = {"$set" : { "notification_date" : notification_date } }
                db.Jobs.update_one(jobQuery, updateJobQuery)
                
            return { "job_id" : job_id }
        return {"Error" : "Wrong_Method"}

    #Mark Job as Seen
    def markJobAsSeen(job_id):
        jobQuery = { "_id" : ObjectId(job_id) }
        updateJobQuery = {"$set" : { "seen" : True } }
        db.Jobs.update_one(jobQuery, updateJobQuery)
    
    #Watch Job Results
    @app.route('/watch_job' ,methods=['POST'])
    @login_required
    def watch_job():
        if request.method == 'POST':
            data = request.get_json()
            job_id = data['job_id']
            job = db.Jobs.find_one({ "_id" : ObjectId(job_id) ,
                                     "by" : current_user.username })

            if job:
                markJobAsSeen(job_id)

                job.pop("_id")
            return { "job" : job }
        return {"Error" : "Wrong_Method"}

    #Dismiss Job Results
    @app.route('/dismiss_job' ,methods=['POST'])
    @login_required
    def dismiss_job():
        if request.method == 'POST':
            data = request.get_json()
            job_id = data['job_id']
            job = db.Jobs.find_one({ "_id" : ObjectId(job_id),
                                     "by" : current_user.username })
            if job:
                markJobAsSeen(job_id)
                
            return { "Dismissed" : True }
        return {"Error" : "Wrong_Method"}
