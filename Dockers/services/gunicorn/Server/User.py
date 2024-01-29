from flask_login import UserMixin
class User(UserMixin):
    def __init__(self, dbUser):
        self._id = dbUser['_id']
        self.username = dbUser['username']
        self.password = dbUser['password']
        self.games_amount = dbUser['games_amount']
        self.creation_date = dbUser['creation_date']
        
    def get_id(self):
        return self.username
