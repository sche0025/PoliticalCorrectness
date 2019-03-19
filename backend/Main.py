import os
from multiprocessing import Process
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from pymongo import MongoClient
from twitter_client import TwitterClient
from tweepy import Cursor
import time
import gc
gc.enable()

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


def save_data(tweets, collection_name):
    """
    The function is used to save data into MongoDB.

    :param tweets: list
        This list contains all crawled raw tweets.
    :param collection_name: string
        This string is used to define collection name.

    :return: null
    """
    client = MongoClient('mongodb://admin:0m6UqUfE3qXZzoWb@SG-NLP-19409.servers.mongodirector.com:27017/')
    db = client.test
    collection = db.collection_name
    for t in tweets:
        if not collection.find_one(t._json):  # Has problems since the retweet number and like number is changing
            collection.insert_one(t._json)


def find_data(collection_name):
    """
    The function is used to show all the data stored in MongoDB.

    :param collection_name: string
        This string is used to set specific collection name.

    :return: null
    """
    client = MongoClient('mongodb://admin:0m6UqUfE3qXZzoWb@SG-NLP-19409.servers.mongodirector.com:27017/')
    db = client.test
    collection = db.collection_name
    for tweet in collection.find():
        print(tweet)
        print('==========================')


if __name__ == '__main__':
    # main()

    print("Start crawling.")
    start_time = time.time()
    twitter_client = TwitterClient()
    api = twitter_client.get_twitter_client_api()
    SCREEN_NAME = 'ScottMorrisonMP'
    MAX_TWEETS = 2
    tweets = []
    for tweet in Cursor(api.user_timeline, tweet_mode='extended', screen_name=SCREEN_NAME).items(MAX_TWEETS):
        tweets.append(tweet)

    print("Start storing.")
    save_data(tweets, 'raw_tweets')

    print("Start finding.")
    find_data('raw_tweets')

    gc.collect()
    print('Time used: %f mins' % ((time.time() - start_time) / 60))
