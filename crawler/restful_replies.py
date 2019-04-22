#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 1/04/2019 8:46 PM
# @Author  : Pengfei Xiao
# @FileName: restful_replies.py
# @Software: PyCharm

from tweepy import OAuthHandler, TweepError, API
from tweepy import Cursor
import pandas as pd
import numpy as np
from functools import reduce
from pymongo import MongoClient
from tweet_analyser import TweetAnalyser
from multiprocessing import Process
import threading
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
class RestfulReplies(threading.Thread):
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
        self.SCREEN_NAME = screen_name  # 'ScottMorrisonMP'

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
        NUM_PER_QUERY = 100
        records_count = 0

        # print('Start crawling replies.')

        while True:
            try:
                replies = []  # Replies for one tweet
                replies_info = {}  # Replies info
                reply_tid = []
                in_reply_to_tid = []
                create_date = []
                df = pd.DataFrame()
                tweet_reply = self.twitter_client_api.search(q='to:' + self.SCREEN_NAME, result_type='recent',
                                                             tweet_mode='extended', max_id=max_id, count=NUM_PER_QUERY)
                if len(tweet_reply) == 0:
                    print("No more replies found.")
                    print('In total {} replies are stored in DB.'.format(records_count))
                    print('-----')
                    break

                for tweet in tweet_reply:
                    if hasattr(tweet, 'in_reply_to_status_id_str') and tweet.in_reply_to_status_id_str != None:
                        reply_tid.append(tweet.id_str)
                        in_reply_to_tid.append(tweet.in_reply_to_status_id_str)
                        create_date.append(tweet.created_at)
                        replies_info['Re_tID'] = tweet.id_str
                        replies_info['Re_Content'] = tweet.full_text
                        replies_info['Hash_Tag'] = tweet.entities['hashtags']
                        replies_info['Re_Sentiment'] = TweetAnalyser().analyze_sentiment(tweet.full_text)
                        replies_info['Created_at'] = tweet.created_at
                        replies_info['Screen_name'] = tweet.user.screen_name
                        replies_info['Location'] = tweet.user.location
                        replies_info['coordinates'] = tweet.coordinates
                        replies.append(replies_info)
                        replies_info = {}
                max_id = tweet_reply[-1].id - 1
                df['Reply_tID'] = reply_tid
                df['Date'] = create_date
                df['In_Reply_to_Status_ID'] = in_reply_to_tid
                df['Reply_Content'] = replies
                if df.shape[0] != 0:
                    self.save_data(df, 'Replies')
                    records_count += len(reply_tid)
                    # print('{} new replies stored.'.format(len(reply_tid)))

            except TweepError as e:
                print('Restful reply error:')
                print(e)
                break
                # if 'Failed to send request:' in e.reason:
                #     print("Time out error caught. Sleep 180 seconds.")
                #     time.sleep(180)

        # df['Replies_Count'] = reply_count
        # df['Avg_Reply_Sentiment'] = avg_sentiment
        # df.to_csv('Replies_Info.csv', index=False)
        # df.to_json('Replies_Info.json', orient='records')
