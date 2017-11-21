export default class Fixtures {

  tweeters = [
    {
      firstName: 'Homer',
      lastName: 'Simpson'
    },
    {
      firstName: 'Marge',
      lastName: 'Simpson'
    }
  ];

  tweets = [
    {
      tweeter: this.tweeters[0],
      text: 'MMMmmmmmmm beeeerrrrrrr!!'
    },
    {
      tweeter: this.tweeters[1],
      text: 'Well Hello There World!'
    }
  ];
}
