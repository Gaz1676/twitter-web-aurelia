import {inject} from 'aurelia-framework';
import {PostsUpdate} from '../../services/messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import TweetService from '../../services/tweet-service';


@inject(EventAggregator, TweetService)
export class Stats {

  posts = 0;

  constructor(ea, ts) {
    this.ts = ts;
    ea.subscribe(PostsUpdate, msg => {
      this.posts = msg.posts;
    });
  }

  attached() {
    this.posts = this.ts.posts;
  }
}
