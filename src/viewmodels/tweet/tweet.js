import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Tweet {

  text = '';
  tweeter = [];

  constructor(ts) {
    this.tweetService = ts;
    this.tweeter = ts.loggedInUser;
  }

  createTweet() {
    this.tweetService.sendTweet(this.tweeter, this.text);
    this.text = '';
  }
}
