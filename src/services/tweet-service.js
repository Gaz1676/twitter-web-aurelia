import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';

@inject(Fixtures)
export default class TweetService {

  tweets = [];
  tweeters = [];

  constructor(data) {
    this.tweets = data.tweets;
    this.tweeters = data.tweeters;
  }

  sendTweet(tweeter, text) {
    if (( tweeter && tweeter !== null) && ( text && text !== null)) {
      const tweet = {
        tweeter: tweeter,
        text: text
      };
      this.tweets.push(tweet);
    }
    console.log(text + ' - Tweeted by: ' + tweeter.firstName + ' ' + tweeter.lastName);
  }
}
