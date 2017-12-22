import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import Fixtures from './fixtures';
import {LoginStatus} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';

/**
 * This is a new class, which will encapsulate access to the aurelia-http-client we installed in the last step
 */

@inject(HttpClient, Fixtures, EventAggregator)
export default class AsyncHttpClient {

  loggedInUser;

  constructor(httpClient, fixtures, ea) {
    this.http = httpClient;
    this.http.configure(http => {
      http.withBaseUrl(fixtures.baseUrl);
    });
    this.ea = ea;
  }

  get(url) {
    return this.http.get(url);
  }

  post(url, obj) {
    return this.http.post(url, obj);
  }

  delete(url) {
    return this.http.delete(url);
  }

  tweet(url, tweet) {
    this.http.post(url, tweet);
  }

  /**
   * recover a token (if present), and install it in our default request headers for subsequent api access
   * @returns {boolean} true if it found a token
   */

  isAuthenticated() {
    let authenticated = false;
    if (localStorage.donation !== 'null') {
      authenticated = true;
      this.http.configure(http => {
        const auth = JSON.parse(localStorage.donation);
        http.withHeader('Authorization', 'bearer ' + auth.token);
      });
    }
    return authenticated;
  }

  /**
   * introduce a new method to authenticate a user to the api.
   * This (invoked in the next step from tweet-service),
   * will post to an authenticate url - and if successful,
   * attaches the returned token to all subsequent invocations.
   * It will also store the token in local storage in case our app is suspended
   * @param url
   * @param user
   */

  authenticate(url, user) {
    this.http.post(url, user).then(response => {
      const status = response.content;
      this.loggedInUser = status.user;
      if (status.success) {
        localStorage.tweet = JSON.stringify(response.content);
        this.http.configure(configuration => {
          configuration.withHeader('Authorization', 'bearer ' + response.content.token);
        });
      }
      this.ea.publish(new LoginStatus(status));
    }).catch(error => {
      const status = {
        success: false,
        message: 'service not available'
      };
      this.ea.publish(new LoginStatus(status));
    });
  }

  /**
   * Clear method to accompany the authenticate method
   */

  clearAuthentication() {
    localStorage.tweet = null;
    this.http.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
  }
}
