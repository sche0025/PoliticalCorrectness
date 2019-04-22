#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 30/03/2019 7:06 PM
# @Author  : Pengfei Xiao
# @FileName: restful_crawler.py
# @Software: PyCharm

from tweepy import OAuthHandler, API, TweepError
import pandas as pd
import numpy as np
from functools import reduce
from pymongo import MongoClient
from tweet_analyser import TweetAnalyser
from multiprocessing import Process
import threading
import datetime
import time
import gc

gc.enable()

# Twitter API Keys-Siyu
CONSUMER_KEY = "wWFHsJ71LrXoX0LRFNCVYxLoY"
CONSUMER_SECRET = "dpOn4LvtZ0MqxgtFZB0XXFKz9wK7csAHLkusJ8JasUJIxFt6Qm"
ACCESS_TOKEN = "1104525213847318529-S0OLx8OztXjSxeGCGITcGhVa2EMz5b"
ACCESS_TOKEN_SECRET = "wEAjXPqWPygScOzAc8RRwiHzeg1G0mGVt20qZLoJGQuDe"


# # # # TWITTER AUTHENTICATER # # # #
class TwitterAuthenticator():
    """

    """

    def authenticate_twitter_app(self):
        """

        :return:
        """
        auth = OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
        auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
        return auth


# class RestfulCrawler(Process):
class RestfulCrawler(threading.Thread):
    """

    """

    def __init__(self, screen_name):
        """
        :param twitter_user:
        """
        # super().__init__()
        threading.Thread.__init__(self)
        self.auth = TwitterAuthenticator().authenticate_twitter_app()
        self.twitter_client_api = API(self.auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, timeout=200)
        self.SCREEN_NAME = screen_name

    def save_data(self, df, collection_name):
        """
        The function is used to save data into MongoDB.

        :param tweets: list
            This list contains all crawled raw tweets.
        :param collection_name: string
            This string is used to define collection name.

        :return: null
        """
        client = MongoClient('mongodb+srv://chen:123@nlptest-r26bl.gcp.mongodb.net/test?retryWrites=true')
        # client = MongoClient('mongodb://admin:0m6UqUfE3qXZzoWb@SG-NLP-19409.servers.mongodirector.com:27017/')
        db = client.test
        collection = db[collection_name]
        collection.insert_many(df.to_dict('records'))

    def run(self):
        max_id = None
        TWEETS_PER_QUERY = 100
        records_count = 0
        start_date = datetime.datetime(2019, 1, 1, 0, 0, 0)
        # print('Start crawling tweets.')

        while True:
            try:
                df = pd.DataFrame()
                raw_tweets = self.twitter_client_api.user_timeline(screen_name=self.SCREEN_NAME, tweet_mode='extended',
                                                                   count=TWEETS_PER_QUERY, max_id=max_id)
                if len(raw_tweets) == 0:
                    print("No more tweets found.")
                    print('In total {} tweets are stored in DB.'.format(records_count))
                    print('-----')
                    break

                df['ID'] = np.array([tweet.id_str for tweet in raw_tweets])
                df['Screen_Name'] = np.array([tweet.user.screen_name for tweet in raw_tweets])
                df['Date'] = np.array([TweetAnalyser().timezone_convert(tweet.created_at) for tweet in raw_tweets])
                df['Tweets'] = np.array([tweet.full_text for tweet in raw_tweets])
                df['Content_Sentiment'] = np.array(
                    [TweetAnalyser().analyze_sentiment(tweet.full_text) for tweet in raw_tweets])
                df['Length'] = np.array([len(tweet.full_text) for tweet in raw_tweets])
                df['Language'] = np.array([tweet.lang for tweet in raw_tweets])
                df['Likes'] = np.array([tweet.favorite_count for tweet in raw_tweets])
                df['Retweets'] = np.array([tweet.retweet_count for tweet in raw_tweets])
                df['In_Reply_to_Status_id'] = np.array([tweet.in_reply_to_status_id_str for tweet in raw_tweets])
                df['In_Reply_to_User_id'] = np.array([tweet.in_reply_to_user_id_str for tweet in raw_tweets])
                # df['Followers'] = np.array([tweet.user.followers_count for tweet in raw_tweets])
                # df['Friends'] = np.array([tweet.user.friends_count for tweet in raw_tweets])
                # df['Listed_Count'] = np.array([tweet.user.listed_count for tweet in raw_tweets])
                # df['Total_Tweets'] = np.array([tweet.user.statuses_count for tweet in raw_tweets])
                df['Hash_Tag'] = [[]] * df.shape[0]
                df['Hash_Tag'] = np.array([tweet.entities['hashtags'] for tweet in raw_tweets])
                df['Location'] = np.array([tweet.user.location for tweet in raw_tweets])
                df['Coordinates'] = np.array([tweet.coordinates for tweet in raw_tweets])
                df['Source'] = np.array([tweet.source for tweet in raw_tweets])
                max_id = raw_tweets[-1].id - 1
                if df.shape[0] != 0:
                    records_count += df.shape[0]
                    self.save_data(df, 'Tweets')
                    # print('{} new tweets stored.'.format(df.shape[0]))
                if raw_tweets[-1].created_at < start_date:
                    print('Date boundary reached.')
                    print('In total {} tweets are stored in DB.'.format(records_count))
                    print('-----')
                    break

            except TweepError as e:
                print('Restful tweets error:')
                print(e)
                break
                # if 'Not authorized.' in e.reason:
                #     print("Protected account met.")
                #     break
                # if '\'code\': 34' in e.reason:
                #     print("Page not found error caught.")
                #     break
                # if 'Failed to send request:' in e.reason:
                #     print("Time out error caught. Sleep 180 seconds.")
                #     time.sleep(180)
                # continue
