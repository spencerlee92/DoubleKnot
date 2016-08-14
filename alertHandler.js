var FB = require('fb');
toRemove =[];
toAlert = [];

function writeData(data) {
	var alert = data;
	if(alert.messageType == 0){
		toAlert.push(alert);
	}
	if(alert.messageType == 2){
		postFb(alert.token, "Test Post 2");
		toRemove.push(alert);
	}
	console.log(toAlert);
}
function processData() {
	for(var i = 0; i < toAlert.length; i++){
		if(!toRemove.find(function (item){return item.token == toAlert[i].token})){
			var alertTime = new Date(toAlert[i].time);
			var currentTime = new Date();
			if (currentTime.getTime()> alertTime.getTime()) {
				//create post on facebook
				postFb(toAlert[i].token, "Test Post 0");
			
				toRemove.push(toAlert[i])
			}
		}
	}
}
function postFb(accessToken, post){
	FB.setAccessToken(accessToken);
	var body = body;
	FB.api('me/feed', 'post', { message: body }, function (res) {
	  if(!res || res.error) {
	    console.log(!res ? 'error occurred' : res.error);
	    return;
	  }
	  console.log('Post Id: ' + res.id);
	});
}
exports = module.exports = {writeData: writeData, processData:processData};