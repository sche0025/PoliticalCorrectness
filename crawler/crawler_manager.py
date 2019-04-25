#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 27/03/2019 12:28 AM
# @Author  : Pengfei Xiao
# @FileName: crawler_manager.py
# @Software: PyCharm

from pymongo import MongoClient
from tweepy import Cursor
import pandas as pd
import time
from restful_replies import RestfulReplies
from restful_crawler import RestfulCrawler
from restful_by_hashtag import RestfulHashtags
from restful_by_mentioned import RestfulByMentioned
import gc

gc.enable()


def find_data(collection_name):
    """
    The function is used to show all the data stored in MongoDB.

    :param collection_name: string
        This string is used to set specific collection name.

    :return: null
    """
    # client = MongoClient('mongodb+srv://chen:123@nlptest-r26bl.gcp.mongodb.net/test?retryWrites=true')
    client = MongoClient("mongodb://admin:123@115.146.85.107/")
    db = client.test
    collection = db[collection_name]
    return collection.find()


if __name__ == '__main__':
    start_time = time.time()

    temp_df = pd.read_csv('Politicians.csv', usecols=['ScreenName'])
    politician_list = temp_df['ScreenName'].dropna().tolist()
    # hashtag_list = ['#Election2019', '#nswpol', '#auspol', '#BuildingOurEconomy', '#budget2019', '#ausvote2019']

    print("Start restful crawling.")
    # for hashtag in hashtag_list:
    #     print('============================================')
    #     print('Process: {}/{}'.format(hashtag_list.index(hashtag) + 1, len(hashtag_list)))
    #     restful_hashtag = RestfulHashtags(hashtag)
    #     print("Crawling tweets by {}.".format(hashtag))
    #     restful_hashtag.start()
    #     restful_hashtag.join()
    for screen_name in politician_list:
        print('============================================')
        print('Process: {}/{}'.format(politician_list.index(screen_name) + 1, len(politician_list)))
        restful_mentioned = RestfulByMentioned(screen_name, 'capstone', 'mentioned')
        restful_replies = RestfulReplies(screen_name, 'capstone', 'mentioned')
        restful_crawler = RestfulCrawler(screen_name, 'capstone', 'Tweets')
        print("Crawling tweets mentioned {}.".format(screen_name))
        restful_mentioned.start()
        print("Crawling tweets from {}.".format(screen_name))
        restful_crawler.start()
        print("Crawling replies to {}.".format(screen_name))
        restful_replies.start()
        restful_replies.join()
        restful_crawler.join()
        restful_mentioned.join()

    print('Finished. Time used: %f mins' % ((time.time() - start_time) / 60))

    gc.collect()
