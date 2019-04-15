#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 30/03/2019 7:13 PM
# @Author  : Pengfei Xiao
# @FileName: tweet_analyser.py
# @Software: PyCharm

from pytz import timezone
from textblob import TextBlob
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
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())

    def analyze_sentiment(self, tweet):
        analysis = TextBlob(self.clean_tweet(tweet))

        if analysis.sentiment.polarity > 0:
            return 1
        elif analysis.sentiment.polarity == 0:
            return 0
        else:
            return -1
