#pull official base image
FROM mongo:6.0.2

#set work directory
WORKDIR /usr/src/Goodi/services/mongodb

#copy js init
COPY init-db.js /docker-entrypoint-initdb.d/