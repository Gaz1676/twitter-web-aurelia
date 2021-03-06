import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Signup {

  firstName = 'Marge';
  lastName = 'Simpson';
  email = 'marge@simpson.com';
  password = 'secret';

  constructor(ts) {
    this.tweetService = ts;
  }

  register(e) {
    this.showSignup = false;
    this.tweetService.register(this.firstName, this.lastName, this.email, this.password);
    this.tweetService.login(this.email, this.password);
  }
}
