var version = process.version.substr(1,1);

if(version >= 4) {
	console.log('true');
} else {
	console.log('false');
	console.log('Upgrade your node version');
}