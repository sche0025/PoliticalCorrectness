#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 30/03/2019 7:13 PM
# @Author  : Pengfei Xiao
# @FileName: tweet_analyser.py
# @Software: PyCharm

import pandas as pd
import numpy as np
from pytz import timezone
from pymongo import MongoClient, UpdateOne
from textblob import TextBlob
import emoji
import re
import gc

gc.enable()


class TweetAnalyser():
    """
    Functionality for analyzing and categorizing content from tweets.
    """

    def timezone_convert(self, utc_dt):
        au_tz = timezone('Australia/Sydney')
        fmt = '%Y-%m-%d %H:%M:%S %Z%z'
        au_dt = utc_dt.astimezone(au_tz)
        au_dt.strftime(fmt)
        return au_dt

    def clean_tweet(self, tweet):
        tweet = emoji.demojize(tweet)  # interpret emoji
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())

    def analyze_sentiment(self, tweet):
        analysis = TextBlob(self.clean_tweet(tweet))

        if analysis.sentiment.polarity > 0:
            return 1
        elif analysis.sentiment.polarity == 0:
            return 0
        else:
            return -1

    def tweets_to_dataframe(self, raw_tweets):
        df = pd.DataFrame()
        contents = []
        tags = []
        mentioned = []
        df['ID'] = np.array([tweet.id_str for tweet in raw_tweets])
        df['Screen_Name'] = np.array([tweet.user.screen_name for tweet in raw_tweets])
        df['Date'] = np.array([tweet.created_at for tweet in raw_tweets])
        for tweet in raw_tweets:
            mentioned_single = [user['screen_name'] for user in tweet.entities['user_mentions']]
            mentioned.append(mentioned_single)
            if 'retweeted_status' in tweet._json:
                contents.append(
                    'RT @' + tweet._json['retweeted_status']['user']['screen_name'] + ': ' +
                    tweet._json['retweeted_status']['full_text'])
                tags_single = [item['text'] for item in tweet._json['retweeted_status']['entities']['hashtags']]
                tags.append(tags_single)
            else:
                contents.append(tweet.full_text)
                tags_single = [item['text'] for item in tweet.entities['hashtags']]
                tags.append(tags_single)
        df['Tweets'] = contents
        df['Hash_Tag'] = tags
        df['Mentioned_Screen_Name'] = mentioned
        df['Content_Sentiment'] = np.array([self.analyze_sentiment(tweet.full_text) for tweet in raw_tweets])
        df['Length'] = np.array([len(tweet.full_text) for tweet in raw_tweets])
        df['Language'] = np.array([tweet.lang for tweet in raw_tweets])
        df['Likes'] = np.array([tweet.favorite_count for tweet in raw_tweets])
        df['Retweets'] = np.array([tweet.retweet_count for tweet in raw_tweets])
        df['In_Reply_to_Status_id'] = np.array([tweet.in_reply_to_status_id_str for tweet in raw_tweets])
        df['In_Reply_to_Screen_Name'] = np.array([tweet.in_reply_to_screen_name for tweet in raw_tweets])
        df['Location'] = np.array([tweet.user.location for tweet in raw_tweets])
        df['Coordinates'] = np.array([tweet.coordinates for tweet in raw_tweets])
        df['Source'] = np.array([tweet.source for tweet in raw_tweets])
        return df

    def save_data(self, df, db_name, collection_name):
        """
        The function is used to update/insert data into MongoDB.
        :param df: dataframe
            This dataframe contains all preprocessed raw tweets.
        :param db_name:
            Specify the DB we want to store in.
        :param collection_name:
            Specify the collection we want to store in.

        :return: null
        """
        # client = MongoClient('mongodb+srv://chen:123@nlptest-r26bl.gcp.mongodb.net/test?retryWrites=true')
        client = MongoClient("mongodb://admin:123@115.146.85.107/")
        db = client[db_name]
        collection = db[collection_name]
        # collection.insert_many(df.to_dict('records'))
        operations = []
        for item in df.to_dict('records'):
            operations.append(UpdateOne({'ID': item['ID']}, {'$set': item}, upsert=True))
        collection.bulk_write(operations, ordered=False)
