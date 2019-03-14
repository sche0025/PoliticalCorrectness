import os
from multiprocessing import Process
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo




# this process consistently crawls data from tweeter
def crawl_run():

    pass

# this process aims to fetch data from DB and forward to frontend
def retriever_run():
    # initialise flask_api
    app = Flask(__name__)
    app.config['MONGO_URI'] = 'mongodb://admin:0m6UqUfE3qXZzoWb@SG-NLP-19409.servers.mongodirector.com:27017/admin'
    mongo = PyMongo(app)
    app.run(debug=True)
    pass

# run 2 processes concurrently
def main():
    crawl_process = Process(target=crawl_run)
    retriever_process = Process(target=retriever_run)
    crawl_process.start()
    retriever_process.start()

if __name__ == '__main__':
    main()

