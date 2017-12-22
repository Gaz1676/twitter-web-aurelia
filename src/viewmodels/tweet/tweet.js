import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';
import $ from 'jquery';

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

  attached() {
    $('#flip')
      .transition('horizontal flip', '500ms')
      .transition('horizontal flip')
    ;
  }
}
