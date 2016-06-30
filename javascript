var lat = 0,
  long, location;
var city = "";
var state = "";
var weather = "";
getLocation();
//console.log(val);
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        $("#latlong").html("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
       
      //alert(position.coords.latitude+","+position.coords.longitude);
        //$('#latlong').text(position.coords.latitude); 
        lat = position.coords.latitude;
        console.log("lat" + lat);
        long = position.coords.longitude;
        /**show location on a map*/
        var latlon = position.coords.latitude + "," + position.coords.longitude;
        //var latlon = -97.743+","+30.2676;
        var img_url = "http://maps.googleapis.com/maps/api/staticmap?center=" +
          latlon + "&zoom=10&size=400x300&maptype=hybrid&markers=|" + latlon + "&path=color:0x0000FF80|weight:10|";
        document.getElementById("mapholder").innerHTML = "<img src='" + img_url + "'>";

        getValues({
          lat: position.coords.latitude,
          long: position.coords.longitude
         
        });
      },
      function(error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            $("#latlong").html("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            $("#latlong").html("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            $("#latlong").html("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            $("#latlong").html("An unknown error occurred.");
            break;
        }

      });
    //console.log($('#latlong').text());
  } else {
    $("#latlong").html("Geolocation is not supported by this browser.");
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
function getValues(location) {
 
  lat = location.lat;
  long = location.long;
   
  //alert(location.lat+","+location.long);

  var geocodingAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&location_type=ROOFTOP&result_type=street_address&key=AIzaSyAYljQ2VnfRg2QMzZUVRNkb-jyrlQ1Vi3M";

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
          //document.getElementById("city").innerHTML = city;
        }

        if (address[i].types[0] == "administrative_area_level_1") {
          //console.log(address[i].short_name);
          state = address[i].short_name;
          document.getElementById("citystate").innerHTML = city + ", " + state;
        }

      }
    }
    getCityState({
      city: city,
      state: state
    });
  });

  function getCityState(place) {
    city = place.city;
    state = place.state;

    //replace Mysuru with Mysore so that WUnderground API can recognize
    if (city.toLowerCase() == 'mysuru') {
      city = 'mysore';
    }
    console.log("inside:" + city + state);

    //call WUndergroung API
    var weatherAPI = "https://api.wunderground.com/api/d595c3c2b957c073/conditions/q/" + state + "/" + city + ".json";

    $.getJSON(weatherAPI, function(json) {

      document.getElementById("temp_f").innerHTML = json.current_observation.temp_f + " °F";
      document.getElementById("temp").innerHTML = json.current_observation.temp_c + " °C";

      document.getElementById("temp_c").innerHTML = json.current_observation.temp_c + " °C";

      document.getElementById("weather").innerHTML = json.current_observation.weather;
      weather = json.current_observation.weather;
      document.getElementById("icon").innerHTML = "<img class= \"img-responsive\" alt=" + weather + "  src=" + json.current_observation.icon_url + ">";

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

function getBg(weatherArr, weather) {
  for (i = 0; i < weatherArr.length; i++) {
    var val = new RegExp(weatherArr[i], "gi");

    if (weather.search(val) > -1) {

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
  var bool1 = false,
    bool2 = false,
    bool3 = false,
    bool4 = false,
    bool5 = false;

  console.log("bools" + bool1 + bool2 + bool3 + bool4 + bool5);
  var weatherRegex;
  //var re = new RegExp(testing, 'g');
  bool1 = getBg(fog, weather);

  /*if (bool1!=true){var bool2=getBg(rain,weather);}
  if (bool2!=true){console.log("bool2"+bool3);
                   var bool3=getBg(cloudy,weather);}
 if (bool3!=true){
                  var bool4=getBg(sunny,weather);}
  if (bool4!=true){var bool5=getBg(freeze,weather);}*/
  bool2 = getBg(rain, weather);
  bool3 = getBg(cloudy, weather);
  bool4 = getBg(sunny, weather);
  bool5 = getBg(freeze, weather);
  console.log("bools" + bool1 + bool2 + bool3 + bool4 + bool5);

  /*_.each(fog, function(val) {
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
    */
  //console.log("bool3"+bool3);
  if (bool1) {
    document.body.style.backgroundImage = "url('http://awesomewallpapers.in/assets/img/wallpapers/Fog/foggy-morning-river-hd-wallpapers-beautiful-desktop-background-images-free-download-nature-wallpapers.jpg')";
    document.body.style.backgroundSize = "cover";
  } else if (bool2) {
    document.body.style.backgroundImage = "url('https://think201.com/think/wp-content/uploads/2014/06/61.jpg')";
    document.body.style.backgroundSize = "cover";
  } else if (bool3) {
    document.body.style.backgroundImage = "url('http://74211.com/wallpaper/picture_big/Free-Download-Natural-Scenery-Picture-An-Endless-Wheat-Field-the-Blue-and-Cloudy-Sky-a-Green-Tree-in-the-Middle.jpg')";
    document.body.style.backgroundSize = "cover";
  } else if (bool4) {
    document.body.style.backgroundImage = "url('http://hdwallpaperia.com/wp-content/uploads/2013/11/Sunny-Beach-Wallpaper.jpg')";
    document.body.style.backgroundSize = "cover";
  } else if (bool5) {
    document.body.style.backgroundImage = "url('https://i.ytimg.com/vi/AQTc1j4sdA0/maxresdefault.jpg')";
  } else {
    document.body.style.backgroundImage = "url('http://wallpapercave.com/wp/xl8hSG3.jpg')";
    document.body.style.backgroundSize = "cover";
  }
}

function changeTempUnit() {
  var temp_f = document.getElementById("temp_f").innerText;
  var temp_c = document.getElementById("temp_c").innerText;
  var buttonText = document.getElementById("unitButton").innerText;
  alert(temp_f);
  alert(temp_c);
  alert(buttonText);
  if (buttonText.search(/F/) > -1) {
    document.getElementById("unitButton").innerHTML = "<i class=\"fa fa-eye\" aria-hidden=\"true\"></i> °C";
    document.getElementById("temp").innerText = temp_f;
  }
  if (buttonText.search(/C/) > -1) {
    document.getElementById("unitButton").innerHTML = "<i class=\"fa fa-eye\" aria-hidden=\"true\"></i> °F";
    document.getElementById("temp").innerText = temp_c;
  }
  //document.getElementById("temp").innerText = temp_f;
}
