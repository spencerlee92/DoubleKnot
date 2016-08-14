///<reference path="./typings/globals/jquery/index.d.ts"/>

declare var loca: Loca;


var weatherAppKey = "da19b41f404b6d19d524acba8b28bd05";

var weatherAPI = "http://api.openweathermap.org/data/2.5/weather";

var showWea = $("#showWea")[0];

var testBtn = $("#test");
var icon =$("#icon");


class Loca{
    name: String;
    lat:number;
    lon:number;
    constructor(public locaName, public locaLat, public locaLon){
        this.name = locaName;
        this.lat = locaLat;
        this.lon = locaLon;
    }
}

var LakeWaikaremoana = new Loca("Lake Waikaremoana",-38.80001185914108,177.1208242562802);
var TongariroNorthernCircuit = new Loca("Tongariro Northern Circuit",-39.145363,175.625221);
var WhanganuiJourney = new Loca("Whanganui Journey",-39.226220,174.924714);
var AbelTasmanCoastTrack = new Loca("Abel Tasman Coast Track",-40.914423,173.044860);
var HeaphyTrack = new Loca("Heaphy Track",-40.886141,172.302828);
var MilfordTrack = new Loca("Milford Track",-44.827498,167.792513);
var KeplerTrack = new Loca("Kepler Track",-45.450636,167.574948);
var RouteburnTrack = new Loca("Routeburn Track",-44.767406,168.173007);
var RakiuraTrack = new Loca("Rakiura Track",-46.860646,168.057203);



function sendRequest(loca, callback) : void {
    
    weatherAPI += "?"+"lat="+loca.lat+"&"+"lon="+loca.lon+"&"+"appid="+weatherAppKey;

    $.ajax({
      
       url:weatherAPI,
        type: "GET",  
    })
        .done(function (data) {
            if (data.length != 0) { 
                
                var mainWea = data;
                callback(data);
            } else {
                showWea.innerHTML = "Hmm, we can't find the weather. Try another?";
            }
        })
        .fail(function (error) {
            showWea.innerHTML = "Sorry, something went wrong. :( Try again in a bit?";
            console.log(error.getAllResponseHeaders());
        });
}

$(document).ready(function(){
sendRequest(LakeWaikaremoana, function (data) {
        /*if(data.weather[0].main =="Clear"){
            $(".").attr("src","./img/sunny.png");
        }*/
       
        var num = data.main.temp_max*0.0215 ;
        num = Math.round(num);

        showWea.innerHTML = num+"&deg";
    });
});

