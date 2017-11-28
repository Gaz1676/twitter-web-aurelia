import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';
import $ from 'jquery';

@inject(TweetService)
export class Timeline {

  tweets = [];

  constructor(ts) {
    this.tweetService = ts;
    this.tweets = ts.tweets;
  }

  attached() {
    $('#tada')
      .transition('tada', '1200ms')
    ;
  }
}
