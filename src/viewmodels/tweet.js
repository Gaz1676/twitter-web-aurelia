import {inject} from 'aurelia-framework';
import TweetService from '../services/tweet-service';

@inject(TweetService)
export class Tweet {

  text = '';
  tweeters = [];
  selectedTweeter = '';

  constructor(ts) {
    this.tweetService = ts;
    this.tweeters = ts.tweeters;
    this.selectedTweeter = this.tweeters[0];
  }

  createTweet() {
    this.tweetService.sendTweet(this.selectedTweeter, this.text);
    this.text = '';
    this.selectedTweeter = '';
  }
}
