#pull official base image
FROM python:3.11.0-slim-buster

#set work directory
WORKDIR /usr/src/goodi/services/queue_worker

#set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
#ENV TZ="Asia/Jerusalem"

#install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt  /usr/src/goodi/services/queue_worker/requirements.txt
RUN pip install -r requirements.txt

#copy project
COPY . /usr/src/goodi/services/queue_worker