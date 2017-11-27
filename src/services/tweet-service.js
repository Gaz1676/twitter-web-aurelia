import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {PostsUpdate, LoginStatus} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Fixtures, EventAggregator)
export default class TweetService {

  tweets = [];
  users = [];
  posts = 0;
  loggedInUser = [];

  constructor(data, ea) {
    this.tweets = data.tweets;
    this.users = data.users;
    this.ea = ea;
  }

  register(firstName, lastName, email, password) {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    this.users[email] = newUser;
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }

  login(email, password) {
    const status = {
      success: false,
      message: ''
    };

    if (this.users[email]) {
      if (this.users[email].password === password) {
        status.success = true;
        status.message = 'logged in';
        this.loggedInUser = this.users[email];
      } else {
        status.message = 'Incorrect password';
      }
    } else {
      status.message = 'Unknown user';
    }
    this.ea.publish(new LoginStatus(status));
  }

  logout() {
    const status = {
      success: false,
      message: ''
    };
    this.ea.publish(new LoginStatus(new LoginStatus(status)));
  }

  sendTweet(tweeter, text) {
    if (( tweeter && tweeter !== null) && ( text && text !== null)) {
      const tweet = {
        tweeter: tweeter,
        text: text
      };
      this.tweets.push(tweet);
      this.posts = parseInt(this.tweets.length, 10);
      this.ea.publish(new PostsUpdate(this.posts));
      console.log(tweeter.firstName + ' tweeted: ' + text);
      console.log('Total tweets: ' + this.tweets.length);
    } else {
      console.log('Message cannot be empty! Must supply Tweeters name');
      console.log('Total tweets: ' + this.tweets.length);
    }
  }

  addFriend(selectedFriend) {
    const friend = {
      firstName: selectedFriend.firstName,
      lastName: selectedFriend.lastName
    };
    console.log('Following: ' + friend.firstName + ' ' + friend.lastName);
  }
}
