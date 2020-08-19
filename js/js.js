/* code from jquery ui slider */
$( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 2000,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  } );
 
  $( function() {
    $( "#slider2-range" ).slider({
      range: true,
      min: 50,
      max: 100,
      values: [ 75, 100 ],
      slide: function( event, ui ) {
        $( "#amount2" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      }
    });
    $( "#amount2" ).val($( "#slider2-range" ).slider( "values", 0 ) +
      " - " + $( "#slider2-range" ).slider( "values", 1 ) );
  } );


  /* leaflet map */
  
  let URL = "https://info340a-su20.github.io/project-01-carvern/data/map.geojson";

  var map = L.map('map',{ center: [47.608013, -122.3321], zoom: 12 });
  L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=mYjABEBBqAVmEo0wwB53',{
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
    crossOrigin: true
  }).addTo(map);

  fetch(URL)
  .then(function(response){ return response.json() })
  .then(function(data){
  
    var entireHome = L.geoJson(data, { 
      filter: function(feature) { return feature.properties.room_type == "Entire home/apt" }
    });
  
    var privateRoom = L.geoJson(data, { 
      filter: function(feature) { return feature.properties.room_type == "Private room" }
    });

    var allRooms = L.layerGroup([entireHome, privateRoom]);
    allRooms.addTo(map);
  
    L.control.layers({
      "All rooms": allRooms,
      "Entire home": entireHome,
      "Private Room": privateRoom
    }).addTo(map);
  
  });

  /** 
  var allmapData = $.getJSON(URL,function(data){
    L.geoJson(data,{
      onEachFeature: function (feature, layer) {
        layer.bindPopup("<b>Name:</b> " + feature.properties.name 
        + "<br><b>Neighborhood:</b> " + feature.properties.neighbourhood
        + "<br><b>Room Type:</b> " + feature.properties.room_type 
        + "<br><b>Price:</b> $" + feature.properties.price);
      }
   }).addTo(map);
  });
  
  var entireRoomData = $.getJSON(URL,function(data){
    L.geoJson(data,{
      onEachFeature: function (feature, layer) {
        layer.bindPopup("<b>Name:</b> " + feature.properties.name 
        + "<br><b>Neighborhood:</b> " + feature.properties.neighbourhood
        + "<br><b>Room Type:</b> " + feature.properties.room_type 
        + "<br><b>Price:</b> $" + feature.properties.price);
      },
      filter: function(feature, layer) {

      }
   }).addTo(map);
  });
  
   */
