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

  var map = L.map('map',{ center: [47.608013, -122.3321], zoom: 12 });
  L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=mYjABEBBqAVmEo0wwB53',{
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
    crossOrigin: true
  }).addTo(map);

  $.getJSON("data/map.geojson",function(data){
    let mapPoints = L.geoJson(data,{
      onEachFeature: function (feature, layer) {
        layer.bindPopup("Name: " + feature.properties.name + "\nPrice" + feature.properties.price);
  }
}).addTo(map);
});