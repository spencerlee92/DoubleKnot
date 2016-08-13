toRemove =[];
toAlert = [];

function writeData(data) {
	var alert = JSON.parse(data)
	if(alert.messageType == 0){
		toAlert.push(alert);
	}
	if(alert.messageType == 2){
		toRemove.push(alert);
	}
}

function processData() {
	for(var i = 0; i < toAlert.length; i++){
		if(!toRemove.find(function (item){return item.token == toAlert[i].token})){
		var alertTime = Date.parse(toAlert[i].time)
		var currentTime = new Date()
		if (currentTime.getTime()> alertTime.getTime()) {
			//create post on facebook
			toRemove.push(toAlert[i])
		}
	}
}

exports = module.exports = {writeData: writeData, processData:processData};