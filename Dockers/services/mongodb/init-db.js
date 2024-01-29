db = db.getSiblingDB("admin")
db.auth("Goodi","ThisIsVeryStrongPasswordForGoodi.com@$")
db = db.getSiblingDB("Goodi_DB")
db.createUser(
	{
		user: "Goodi",
		pwd: "ThisIsVeryStrongPasswordForGoodi.com@$",
		roles: [
			{
				role: "readWrite",
				db: "Goodi_DB"
			}
		]
	}
);