const error = document.getElementById("error");
const scriptApi = document.getElementById("api");

window.addEventListener("load", getLocation);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  alt = position.coords.altitude;

  latlon = new google.maps.LatLng(lat, lon);
  mapholder = document.getElementById("map");
  mapholder.style.height = "250px";
  mapholder.style.width = "500px";

  var myOptions = {
    center: latlon,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL,
    },
  };

  var map = new google.maps.Map(document.getElementById("map"), myOptions);
  var marker = new google.maps.Marker({
    position: latlon,
    map: map,
    title: "You are here!",
  });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("localisation non autorisé par l'utilisateur.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("L'information sur la localisation et indisponible.");
      break;
    case error.TIMEOUT:
      alert("le temps de réponce est dépasé.");
      break;
    case error.UNKNOWN_ERROR:
      alert("Une erreur inconu a été rencontrée.");
      break;
  }
}
