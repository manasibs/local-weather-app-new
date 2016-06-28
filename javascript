var lat=0, long,location;
/*function getLocation(){
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
  //console.log("loc"+location);
}
}

function showPosition(position) {
    $("#latlong").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
    lat = position.coords.latitude;
    //console.log("lat" + lat);
    long = position.coords.longitude;
    //return {latitude:lat,longitude:long};
  */
function  getLocation(fn){
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    $("#latlong").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
  
  fn(location=[position.coords.latitude,position.coords.longitude]);  
  });
}
}

//lat=getLatLong();
getLocation(function(location){console.log("loc"+location[0]+location[1]);  });
          
//console.log("lat2" + lat);
console.log("loc2"+location[0]+location[1]);
var geocodingAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng=12.2596572,76.64088129999999&location_type=ROOFTOP&result_type=street_address&key=AIzaSyAYljQ2VnfRg2QMzZUVRNkb-jyrlQ1Vi3M";
var weatherAPI = "https://api.wunderground.com/api/d595c3c2b957c073/conditions/q/IN/Bangalore.json";
var city = "";
var state = "";
var weather = "";

$.getJSON(geocodingAPI, function(json) {
  if (json.status == "OK") {
    //Check result 0
    result = json.results[0];
    address = result.address_components;

    //console.log(result);
    //console.log(address);
    //console.log(result.address_components[0].d);
    //console.log(result.address_components.length);
    for (i = 0; i < (result.address_components.length); i++) {
      if (address[i].types[0] == "locality") {
        //console.log(address[i].long_name);
        city = address[i].long_name;
        document.getElementById("city").innerHTML = city;
      }

      if (address[i].types[0] == "administrative_area_level_1") {
        //console.log(address[i].short_name);
        state = address[i].short_name;
        document.getElementById("state").innerHTML = state;
      }

    }
  }

});

$.getJSON(weatherAPI, function(json) {
  console.log(json.current_observation.icon_url);
  document.getElementById("temp_f").innerHTML = json.current_observation.temp_f;
  document.getElementById("temp_c").innerHTML = json.current_observation.temp_c;
  document.getElementById("icon").innerHTML = json.current_observation.icon_url;
  document.getElementById("weather").innerHTML = json.current_observation.weather;
  weather = json.current_observation.weather;
  changeBg(weather);
  console.log("weather1" + weather);
});

/*$( window ).ready(function() {
       changeBg(weather);
  console.log(weather);
   });*/

function changeBg(weather) {
  console.log("weather2" + weather);

  //var weatherWords=weather.split(" ");
  var fog = ['fog', 'dust', 'sand', 'mist', 'ash', 'haze'];
  var rain = ['rain', 'thunder', 'hail', 'drizzle'];
  var cloudy = ['Cloud', 'overcast'];
  var sunny = ['sun'];
  var freeze = ['freez', 'frost'];
  var bool1, bool2, bool3, bool4, bool5;
  bool1 = bool2 = bool3 = bool4 = bool5 = false;
  var weatherRegex;
  //var re = new RegExp(testing, 'g');

  _.each(fog, function(val) {
    if (weather.search(weatherRegex) > -1) bool1 = true;
  });
  console.log("bool1" + bool1);
  _.each(rain, function(val) {
    if (weather.search(weatherRegex) > -1) bool2 = true;
  });

  _.each(cloudy, function(val) {
    weatherRegex = /val/gi;
    console.log("val2" + weatherRegex);
    console.log("val" + val);
    console.log(weather.search(weatherRegex) > -1); {
      bool3 = true;
      console.log("bool3" + bool3);
    }
  });

  _.each(sunny, function(val) {
    if (weather.search(weatherRegex) > -1) bool4 = true;
  });
  _.each(freeze, function(val) {
    if (weather.search(weatherRegex) > -1) bool5 = true;
  });
  //console.log("bool3"+bool3);
  if (bool1) {
    document.body.style.backgroundImage = "url('http://awesomewallpapers.in/assets/img/wallpapers/Fog/foggy-morning-river-hd-wallpapers-beautiful-desktop-background-images-free-download-nature-wallpapers.jpg')";
  } else if (bool2) {
    document.body.style.backgroundImage = "url('https://think201.com/think/wp-content/uploads/2014/06/61.jpg')";
  } else if (bool3) {
    document.body.style.backgroundImage = "url('http://74211.com/wallpaper/picture_big/Free-Download-Natural-Scenery-Picture-An-Endless-Wheat-Field-the-Blue-and-Cloudy-Sky-a-Green-Tree-in-the-Middle.jpg')";
    //document.body.style.backgroundSize = "cover";
  } else if (bool4) {
    document.body.style.backgroundImage = "url('http://hdwallpaperia.com/wp-content/uploads/2013/11/Sunny-Beach-Wallpaper.jpg')";
    document.body.style.backgroundSize = "cover";
  } else if (bool5) {
    document.body.style.backgroundImage = "url('https://i.ytimg.com/vi/AQTc1j4sdA0/maxresdefault.jpg')";
  } else {
    document.body.style.backgroundImage = "url('http://wallpapercave.com/wp/xl8hSG3.jpg')";
  }

}
