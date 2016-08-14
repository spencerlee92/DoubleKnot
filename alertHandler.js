var FB = require('fb');
toRemove =[];
toAlert = [];

function writeData(data) {
	var alert = data;
	if(alert.messageType == 0){
		var msg = "Hey guys, I'm about to go on the " + alert.trackName + "! I should be back in " + alert.etaValue + " days.";
		postFb(alert.token, msg);
		toAlert.push(alert);
	}
	if(alert.messageType == 2){
		var safe = "Hey! I'm back from my trip now.";
		postFb(alert.token, safe);
		toRemove.push(alert);
	}
}
function processData() {
	for(var i = 0; i < toAlert.length; i++){
		if(!toRemove.find(function (item){return item.token == toAlert[i].token})){
			console.log("Active alert");
			var alertTime = new Date(toAlert[i].time);
			var currentTime = new Date();
			if (currentTime.getTime()> alertTime.getTime()) {
				//create post on facebook
				var warning = "I should've been back from my trip by now. Please try to contact me ASAP. - Posted automatically by DoubleKnot";
				postFb(toAlert[i].token, warning);
			
				toRemove.push(toAlert[i])
			}
		}
	}
}
function postFb(accessToken, post){
	FB.setAccessToken(accessToken);
	FB.api('/me/feed', 'post', { message: post }, function(response) {
	  if (!response || response.error) {
	    console.log('Error occured');
	  } else {
	    console.log('Post ID: ' + response.id);
  }
});

}
exports = module.exports = {writeData: writeData, processData:processData};