#pull official base image
FROM python:3.11.0-slim-buster

#set work directory
WORKDIR /usr/src/goodi/services/server

#set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV TZ="Asia/Jerusalem"

#install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt  /usr/src/goodi/services/server/requirements.txt
RUN pip install -r requirements.txt

#copy project
COPY . /usr/src/goodi/services/server