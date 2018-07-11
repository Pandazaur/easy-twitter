# easy-twitter
A basic Twitter API for Node.js v4.0+.
Follow, unfollow, tweet, get infos about a twitter account and more ...

### Getting started
When you have installed and include this twitter module, you have to create a new instance:

#### Requirements
- Node.js v4.0 or more

#### Installation

```bash
npm install easy-twitter --save
```

#### Include the module

```javascript
const  TwitterClient = require('easy-twitter');
//_Create a new Twitter app and get the keys needed
const twitter = new TwitterClient({consumer_key: "xxxx",
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

// using promise
twitter.tweet(message)
    .then(data => {
        // Successfully tweet the message
        console.log('Posted the tweet:' + data.tweet);
    })
    .catch(err => {
        // Failed to tweet
        console.error(err.error);
    });

// using async/await
try {
    const data = await twitter.tweet(message)
} catch (e) {
    throw e
}

```

#### Create a tweet with image
The first parameter is the `message` you want to post and the second parameter is the `path` to the image that you want to post.

```javascript
const message = 'I like Twitter !';
const path    = '/foo/bar/image.png';

// using promise
twitter.uploadMedia(message, path)
    .then(data => {
        console.log('Tweeted the message: ' + data.message);
    })
    .catch(err => {
        console.error(err.error);
    });

// using async/await
try {
    const data = await twitter.uploadMedia(message, path)
} catch (e) {
    throw e
}
```

#### Follow a twitter account
You can follow someone with the method `follow()` with the `name` of the twitter account in parameter. You can pass in parameter the name of the account with or without the '@'.

```javascript
// Both the variables are correct
const twitterAccount = 'iAmAlphaZz';
const secondTwitterAccount = '@iAmAlphaZz';

// using promise
twitter.follow(twitterAccount)
    .then(data => {
        console.log('You\'re now following :' + data.user);
    })
    .catch(err => {
        console.error(err.error);
    });

// using async/await
try {
    const data = await twitter.follow(twitterAccount)
} catch (e) {
    throw e
}
```

#### Unfollow a twitter account
The `unfollow()` method is used like the `follow()` method: you just have to pass in parameter the name of the twitter account.

```javascript
// Both the variables are correct
const twitterAccount = 'iAmAlphaZz';
const secondTwitterAccount = '@iAmAlphaZz';

// using promise
twitter.unfollow(twitterAccount)
    .then(data => {
        console.log('You\'re now following :' + data.user);    
    })
    .catch(err => {
        console.error(err.error);
    });

// using async/await
try {
    const data = await twitter.unfollow(twitterAccount)
} catch (e) {
    throw e
}
```

#### Get the followers of a twitter account
Get the `count` (max: 200) followers list of `twitterAccount`

```javascript
const twitterAccount = 'iAmAlphaZz';
const count = 12;

// using promise
twitter.getFollowersList(twitterAccount, count)
    .then(data => {
        // data.followers : Array of the followers name ( 12 followers because count = 12)
        // data.fullInfos : More infos below
        // data.user : 'iAmAlphaZz' in this case
    })
    .catch(err => {
        console.error(err.error);
    });

// using async/await
try {
    const data = await twitter.getFollowersList(twitterAccount, count)
} catch (e) {
    throw e
}
```

The method `getFollowersList()` return three datas:
- `followers`: An array with the account names of the followers
- `fullInfos`: A JSON Object which contains a lot of informations. Here is a link showing the differents informations returned in this object ( look the 'Example Result' : https://dev.twitter.com/rest/reference/get/followers/list)
- `user`: Is the user name of the twitter account you entered in parameter to the method.


#### Get the friends of a twitter account
Get the `count` (max: 200) people from the friend list of `twitterAccount`.
Actually, it returns only the `count` lasts. The `page` parameter will able to choose more precisely.

```javascript
const twitterAccount = 'iAmAlphaZz';
const count = 50;
const page = 1;

// using promise
twitter.getFriendsList(twitterAccount, count, page)
    .then(data => {
        // data.friends : Array of the friends name ( 50 followers because count = 50)
        // data.fullInfos : More infos below
        // data.user : 'iAmAlphaZz' in this case
    })
    .catch(err => {
        console.error(err.error);
    });

// using async/await
try {
    const data = await twitter.getFriendsList(twitterAccount, count, page)
} catch (e) {
    throw e
}
```

The method `getFollowersList()` returns:
- `followers`: An array with the account names of the followers
- `fullInfos`: A JSON Object which contains a lot of informations. Here is a link showing the differents informations returned in this object ( look the 'Example Result' : https://dev.twitter.com/rest/reference/get/friends/list)
- `user`: Is the user name of the twitter account you entered in parameter to the method.
- `page`: Is not yet implemented...

#### Get the followers count & friends count
```javascript

// using promise
twitter.getCounts('iAmAlphaZz')
    .then(data => {
        // data.user : In this case 'iAmAlphaZz'
        // data.followersCount : Count of people following the account in parameter
        // data.friendsCount : count of people the twitter account in parameter is following
    })
    .catch(err => {
        console.error(err.error);
    })

// using async/await
try {
    const data = await twitter.getCounts('iAmAlphaZz')
} catch (e) {
    throw e
}
```
