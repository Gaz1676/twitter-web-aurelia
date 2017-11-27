import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Login {


  constructor(ts) {
    this.tweetService = ts;
    this.prompt = '';
  }

  login(e) {
    console.log(`Trying to log in ${this.email}`);
    this.tweetService.login(this.email, this.password);
  }
}