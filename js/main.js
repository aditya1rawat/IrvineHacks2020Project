var myLatLng = { lat: 0.0, lng: 0.0 };
var mapOptions = {
  center: myLatLng,
  zoom: 1,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};

var avgMpg = 24.9;
const avgCarbonE = 19.64;
// const distnaceString = result.routes[0].legs[0].distance.text;
// const convertToNum =

// Hide result box
document.getElementById("output").style.display = "none";

// Create/Init map
var map = new google.maps.Map(
  document.getElementById("google-map"),
  mapOptions
);

// Create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

// Create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

// Bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

function inputVehicle(a) {
  if (a == 1) {
    console.log("Small Vehicle");
    document.getElementById("option").innerText = "Small Vehicle";
    avgMpg = 24.2;
  }

  if (a == 2) {
    console.log("SUV");
    document.getElementById("option").innerText = "SUV";
    avgMpg = 32;
  }

  if (a == 3) {
    console.log("Pickup Truck");
    document.getElementById("option").innerText = "Pickup Truck";
    avgMpg = 28.6;
  }

  if (a == 4) {
    console.log("All Electric");
    document.getElementById("option").innerText = "All Electric";
    avgMpg = 136;
  }

  if (a == 5) {
    console.log("Hybrid");
    document.getElementById("option").innerText = "Hybrid";
    avgMpg = 56;
  }

  if (a == 6) {
    console.log("Luxury");
    document.getElementById("option").innerText = "Luxury";
    avgMpg = 41;
  }
}

// Define calcRoute function
function calcRoute() {
  //create request
  //console.log("Hello");

  var request = {
    origin: document.getElementById("location-1").value,
    destination: document.getElementById("location-2").value,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL
  };

  // Routing
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      let text = result.routes[0].legs[0].distance.text;
      let replace = text.replace(",", "");
      let convertToNum = parseInt(replace);
      //   console.log(convertToNum);
      let carbonEm = (convertToNum / avgMpg) * avgCarbonE;
      //Get distance and time

      $("#output").html(
        "<div class='result-table'> <h3>Driving Distance: " +
          result.routes[0].legs[0].distance.text +
          ".<br />Duration: " +
          result.routes[0].legs[0].duration.text +
          ". <br /> Carbon Emission: " +
          Math.round(carbonEm) +
          " Lbs.</h1></div>"
      );
      document.getElementById("output").style.display = "block";
      document.getElementById("linked").href =
        "https://www.google.com/maps/dir/?api=1&origin=" +
        document.getElementById("location-1").value +
        "&destination=" +
        document.getElementById("location-2").value +
        "&travelmode=driving";

      console.log();

      //display route
      directionsDisplay.setDirections(result);
    } else {
      //delete route from map
      directionsDisplay.setDirections({ routes: [] });
      //center map in London
      map.setCenter(myLatLng);

      //Show error message

      alert("Can't find road! Please try again!");
      clearRoute();
    }
  });
}

// Clear results

function clearRoute() {
  document.getElementById("option").innerText = "Select Vehicle Type";
  document.getElementById("output").style.display = "none";
  document.getElementById("location-1").value = "";
  document.getElementById("location-2").value = "";
  directionsDisplay.setDirections({ routes: [] });
}

// Create autocomplete objects for all inputs

var options = {
  types: ["(cities)"]
};

var input1 = document.getElementById("location-1");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("location-2");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
