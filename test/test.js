var version = process.version.substr(1,1);

if(version >= 4) {
	console.log('You\'re version of node can use easy-twitter');
} else {
	console.log('ERR !!! Upgrade your node version to v4.0.0.0 or more');
}