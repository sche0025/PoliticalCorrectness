#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 19/03/2019 9:47 PM
# @Author  : Pengfei Xiao
# @FileName: twitter_client.py
# @Software: PyCharm
# # # # TWITTER CLIENT # # # #
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from tweepy import API
from tweepy import Cursor
import numpy as np
import pandas as pd
from pytz import timezone
from textblob import TextBlob
import re
from functools import reduce
import gc
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from pymongo import MongoClient
import pprint
import time
gc.enable()

# Twitter API Keys-Siyu
CONSUMER_KEY = "wWFHsJ71LrXoX0LRFNCVYxLoY"
CONSUMER_SECRET = "dpOn4LvtZ0MqxgtFZB0XXFKz9wK7csAHLkusJ8JasUJIxFt6Qm"
ACCESS_TOKEN = "1104525213847318529-S0OLx8OztXjSxeGCGITcGhVa2EMz5b"
ACCESS_TOKEN_SECRET = "wEAjXPqWPygScOzAc8RRwiHzeg1G0mGVt20qZLoJGQuDe"



# # # # TWITTER AUTHENTICATER # # # #
class TwitterAuthenticator():

    def authenticate_twitter_app(self):
        auth = OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
        auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
        return auth

class TwitterClient():
    def __init__(self, twitter_user=None):
        self.auth = TwitterAuthenticator().authenticate_twitter_app()
        self.twitter_client_api = API(self.auth, wait_on_rate_limit=True)

        self.twitter_user = twitter_user
    def get_twitter_client_api(self):
        return self.twitter_client_api


    def get_user_timeline_tweets(self, num_tweets):
        """The tweets on the personal page, only contains your own tweets."""
        tweets = []
        for tweet in Cursor(self.twitter_client.user_timeline, id=self.twitter_user).items(num_tweets):
            tweets.append(tweet)
        return tweets

    def get_friend_list(self, num_friends):
        friend_list = []
        for friend in Cursor(self.twitter_client.friends, id=self.twitter_user).items(num_friends):
            friend_list.append(friend)
        return friend_list

    def get_home_timeline_tweets(self, num_tweets):
        """The tweets on the homepage, including a stream of Tweets from you and your friends."""
        home_timeline_tweets = []
        for tweet in Cursor(self.twitter_client.home_timeline, id=self.twitter_user).items(num_tweets):
            home_timeline_tweets.append(tweet)
        return home_timeline_tweets
