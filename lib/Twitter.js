var twitter = require('twitter');
var promise = require('promise');
var fs = require('fs');

class Twitter {
	
	/**
	 * oAuth - All the keys in JSON format
	 * FORMAT : {consumer_key: "xxxx", consumer_secret: "yyyy",
	 *  access_token_key: "zzzz", access_token_secret : "aaaa"}
	 */
	constructor(oAuth) {
		this.oAuthKeys = oAuth;
		this.client = new twitter(oAuth);
	}
	
	/**
	 * message - Message to tweet
	 * return  - promise
	 */
	tweet(message) {
		var client = this.client;
		
		return new Promise(function(resolve, reject){
			client.post('statuses/update', {status: message}, function(err, tweet, res) {
				if(err) {
					reject(err);
					return -1;
				}
				
				resolve(tweet);
				return 0;
			});
		});
	}
	
	/**
	 * Upload a media in a tweet
	 * message - Message to tweet
	 * pathMedia - Path to the media to upload
	 */
	uploadMedia(message, pathMedia) {
		var client = this.client;
		var messageTweet = message;
		var pathToMedia = pathMedia;
		
		return new Promise(function(resolve, reject) {
			fs.readFile(pathToMedia, function(err, media) {		//_Reading the media to upload
				if(err) {
					reject(err);
					return -1;
				}
				
				//_Upload the file, but doesn't post !!
				client.post('media/upload', {media: media}, function(error, media, response) {
					if(error) {
						reject(error);
						return -2;
					}
					
					//_Send the tweet
					client.post('statuses/update', {status: messageTweet, media_ids: media.media_id_string}, function(err, tweet, res) {
						if(err) {
							reject(err);
							return -1;
						}
						
						resolve({media : media,
							 message: message});
				 		return 0;
					});
				});
			});
		});
	}
	
	/**
	 * Follow a twitter account
	 * twitterName : Name of the twitter account to follow
	 * return : 
	 */
	follow(twitterName) {
		var client = this.client;

		return new Promise(function(resolve, reject) {
			//_Delete the '@' from the name if it exists
			if(twitterName.substr(0,1) === '@') {
				//console.log('Delete @ from the name ...');
				twitterName = twitterName.substr(1);
			}

			//_Follow the account named 'twitterName'
			client.post('friendships/create', {screen_name : twitterName}, function(err, tweet, res) {
				//console.log('Following ' + twitterName + ' ...');
				if(err) {
					reject({error: err, user : twitterName});
					return -1;
				}

				resolve({ opt: tweet, res: res, user : twitterName});
			});
		});
	}

	/**
	 *	Unfollow a twitter account
	 */
	unfollow(twitterName) {
		var client = this.client;

		return new Promise(function(resolve, reject) {
			//_Delete the '@' from the name if it exists
			if(twitterName.substr(0,1) === '@') {
				//console.log('Delete @ from the name ...');
				twitterName = twitterName.substr(1);
			}

			//_Unfollow the account named 'twitterName'
			client.post('friendships/destroy', {screen_name : twitterName}, function(err, tweet, res) {
				if(err) {
					reject({error: err, user : twitterName});
					return -1;
				}

				resolve({ opt: tweet, res: res, user : twitterName});
			});
		});
	}

	/**
	 * Return a follower's list
	 * twitterName: get the followers list of this account
	 * count : Count of followers, default = 20
	 */
	getFollowersList(twitterName, count) {
		var client = this.client;

		return new Promise(function(resolve, reject) {
			//_Delete the '@' from the name if it exists
			if(twitterName.substr(0,1) === '@') {
				//console.log('Delete @ from the name ...');
				twitterName = twitterName.substr(1);
			}

			//_Get the list of followers
			client.get('followers/list', {screen_name : twitterName, count : count}, function(err, list, res) {
				if(err) {
					reject({error: err, user : twitterName});
					return -1;
				}

				//_Set into an array the name of the followers
				var followersArray = [];
				for(var i=0; i < list.users.length; i++) {
					followersArray.push(list.users[i].screen_name);
				}

				resolve({ followers: followersArray, fullInfos : list,  res: res, user : twitterName});
			});
		});
	}

	getFriendsList(twitterName, count, page) {
		var client = this.client;

		if(page == null) {
			page = -1;
		}

		return new Promise(function(resolve, reject) {
			//_Delete the '@' from the name if it exists
			if(twitterName.substr(0,1) === '@') {
				//console.log('Delete @ from the name ...');
				twitterName = twitterName.substr(1);
			}

			//_Get the list of followers
			client.get('friends/list', {screen_name : twitterName, count : count}, function(err, list, res) {
				if(err) {
					reject({error: err, user : twitterName});
					return -1;
				}

				//_Set into an array the name of the followers
				var friendsArray = [];
				for(var i=0; i < list.users.length; i++) {
					friendsArray.push(list.users[i].screen_name);
				}

				resolve({ friends: friendsArray, fullInfos : list,  res: res, user : twitterName});
			});
		});
	}

	/**
	 * @deprecated : Since 0.0.7 : use getCounts() instead
	 */
	getFollowersCount(twitterName) {
		var client = this.client;

		return new Promise(function(resolve, reject) {
			//_Delete the '@' from the name if it exists
			if(twitterName.substr(0,1) === '@') {
				//console.log('Delete @ from the name ...');
				twitterName = twitterName.substr(1);
			}

			client.get('users/show', {screen_name : twitterName}, function(err, infos, res) {
				if(err) {
					reject({error: err, user: twitterName});
					return -1;
				}

				resolve({followersCount : infos.followers_count, friendsCount: infos.friends_count, user: twitterName});
			});
		});
	}

	/**
	 * A method which returns the follower count and the friend count of a twitter account
	 */
	getCounts(twitterName) {
		var client = this.client;

		return new Promise(function(resolve, reject) {
			//_Delete the '@' from the name if it exists
			if(twitterName.substr(0,1) === '@') {
				//console.log('Delete @ from the name ...');
				twitterName = twitterName.substr(1);
			}

			client.get('users/show', {screen_name : twitterName}, function(err, infos, res) {
				if(err) {
					reject({error: err, user: twitterName});
					return -1;
				}

				resolve({followersCount : infos.followers_count, friendsCount: infos.friends_count, user: twitterName});
			});
		});
	}
}

module.exports = Twitter;