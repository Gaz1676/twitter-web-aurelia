import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Friend {

  tweets = [];

  constructor(ts) {
    this.tweetService = ts;
    this.tweets = ts.tweets;
    let membersTweet = [];

    this.tweets.forEach(tweet => {
      if (membersTweet.indexOf(tweet) === -1) {
        membersTweet.push(tweet);
      }
      return membersTweet;
    });
  }
}
