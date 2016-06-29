var lat=0, long,location;
var city = "";
var state = "";
var weather = "";
getLocation();
//console.log(val);
function getLocation(){
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    $("#latlong").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
    //$('#latlong').text(position.coords.latitude); 
    lat = position.coords.latitude;
    console.log("lat" + lat);
    long = position.coords.longitude;
    getValues({lat:position.coords.latitude,long:position.coords.longitude});
    //return {latitude:lat,longitude:long};
  
});
   //console.log($('#latlong').text());
}
}


/*function  getLocation(fn){
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
console.log("loc2"+location[0]+location[1]);*/
function getValues(location){
  lat=location.lat;
  long=location.long;

var geocodingAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&location_type=ROOFTOP&result_type=street_address&key=AIzaSyAYljQ2VnfRg2QMzZUVRNkb-jyrlQ1Vi3M";



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
getCityState({city:city,state:state});
});
  function getCityState(place){
    city = place.city;
    state = place.state;
    if (city.toLowerCase()=='mysuru'){city='mysore';}
    console.log("inside:"+city+state);
    var weatherAPI = "https://api.wunderground.com/api/d595c3c2b957c073/conditions/q/"+state+"/"+city+".json";
    //var weatherAPI = "https://api.wunderground.com/api/d595c3c2b957c073/conditions/q/IN/Bangalore.json";
    //var weatherAPI = "https://api.wunderground.com/api/d595c3c2b957c073/conditions/q/IN/Mysore.json";
    $.getJSON(weatherAPI, function(json) {
      alert(weatherAPI);
  alert(json.current_observation);
  document.getElementById("temp_f").innerHTML = json.current_observation.temp_f;
  document.getElementById("temp_c").innerHTML = json.current_observation.temp_c;
  document.getElementById("icon").innerHTML = json.current_observation.icon_url;
  document.getElementById("weather").innerHTML = json.current_observation.weather;
  weather = json.current_observation.weather;
      
  changeBg(weather);
  console.log("weather1" + weather);
});
  }
  //console.log("outside:"+city+state);




/*$( window ).ready(function() {
       changeBg(weather);
  console.log(weather);
   });*/
 }
function getBg(weatherArr,weather){
  for(i=0;i<weatherArr.length;i++){
    var val=new RegExp(weatherArr[i], "gi");
    alert(weather);
    alert(val);
      alert(weather.search(val));
    if (weather.search(val) > -1){
      alert (true);
      return true;
    }
  }
}
function changeBg(weather) {
  console.log("weather2" + weather);

  //var weatherWords=weather.split(" ");
  var fog = ['fog', 'dust', 'sand', 'mist', 'ash', 'haze'];
  var rain = ['rain', 'thunder', 'hail', 'drizzle'];
  var cloudy = ['cloud', 'overcast'];
  var sunny = ['sun'];
  var freeze = ['freez', 'frost'];
  var bool1, bool2, bool3, bool4, bool5;
  bool1 = bool2 = bool3 = bool4 = bool5 = false;
  console.log("bools" + bool1+bool2+bool3+bool4+bool5);
  var weatherRegex;
  //var re = new RegExp(testing, 'g');
  var bool1=getBg(fog,weather);
  var bool2=getBg(rain,weather);
  var bool3=getBg(cloudy,weather);
  var bool4=getBg(sunny,weather);
  var bool5=getBg(freeze,weather);
  console.log("bools" + bool1+bool2+bool3+bool4+bool5);

  _.each(fog, function(val) {
    weatherRegex=new RegExp(val,"gi");
    if (weather.search(weatherRegex) > -1) bool1 = true;
  });
  
  _.each(rain, function(val) {
    weatherRegex=new RegExp(val,"gi");
    if (weather.search(weatherRegex) > -1) bool2 = true;
  });

  _.each(cloudy, function(val) {
    weatherRegex=new RegExp(val,"gi");
    console.log("val2" + weatherRegex);
    console.log("val" + val);
    console.log(weather.search(weatherRegex) > -1); {
      bool3 = true;
      console.log("bool3" + bool3);
    }
  });

  _.each(sunny, function(val) {
    weatherRegex=new RegExp(val,"gi");
    if (weather.search(weatherRegex) > -1) bool4 = true;
  });
  _.each(freeze, function(val) {
    weatherRegex=new RegExp(val,"gi");
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
