# easy-twitter
A basic Twitter API for Node.js / io.js written in ECMAScript 6.
Follow, unfollow, tweet, get infos about a twitter account and more ...

### Getting started
When you have installed and include this twitter module, you have to create a new instance:

#### Introduction
To use this module, you need to use either:
- Node.Js v4.0.0.
- Io.js v3.3.0

#### Installation

```bash
npm install easy-twitter --save
```

#### Launch your application
You need to use `use_strict` parameter:

```bash
node --use_strict your-app.js
```

#### Include the module

```javascript
var TwitterClient = require('easy-twitter');
//_Create a new Twitter app and get the keys needed
var twitter = new TwitterClient({consumer_key: "xxxx", 
                                 consumer_secret: "yyyy",
                                 access_token_key: "zzzz", 
                                 access_token_secret : "aaaa"});
```
___
### Usage
#### Create a tweet (message)
If you want to tweet a message you can use the method `Twitter.tweet()`. This method returns a promise with the `message` in parameter when succeed.

```javascript
var message = 'Hello world !';
twitter.tweet(message)
            .then(function(data) {
                //_Successfully tweet the message
                console.log('Posted the tweet:' + data.tweet);
            })
            .catch(function(err) {
                //_If failed to tweet
                console.log(err.error);
            });
```

#### Create a tweet with image
The first parameter is the `message` you want to post and the second parameter is the `path` to the image that you want to post.

```javascript
var message = 'I like Twitter !';
var path    = '/foo/bar/image.png';

twitter.uploadMedia(message, path)
    .then(function(data) {
        console.log('Tweeted the message: ' + data.message);
    })
    .catch(function(err) {
        console.log(err.error);
    });
```

#### Follow a twitter account
You can follow someone with the method `follow()` with the `name` of the twitter account in parameter. You can pass in parameter the name of the account with or without the '@'.

```javascript
//_Both the variables are correct
var twitterAccount = 'iAmAlphaZz'
var secondTwitterAccount = '@iAmAlphaZz'

twitter.follow(twitterAccount)
    .then(function(data) {
        console.log('You\'re now following :' + data.user);    
    })
    .catch(function(err) {
        console.log(err.error);
    });
```

#### Unfollow a twitter account
The `unfollow()` method is used like the `follow()` method: you just have to pass in parameter the name of the twitter account.

```javascript
//_Both the variables are correct
var twitterAccount = 'iAmAlphaZz'
var secondTwitterAccount = '@iAmAlphaZz'

twitter.unfollow(twitterAccount)
    .then(function(data) {
        console.log('You\'re now following :' + data.user);    
    })
    .catch(function(err) {
        console.log(err.error);
    });
```
