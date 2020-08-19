let entireHome,
    privateRoom,
    allRooms;

/* code from jquery ui slider */
$( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 750,
      values: [ 0, 750 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      },
      change: function() {
        remove( () => {
          minPrice = $( "#slider-range" ).slider( "values", 0 );
          maxPrice = $( "#slider-range" ).slider( "values", 1 );
          filterPrices();
        });
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  } );
 
  $( function() {
    $( "#slider2-range" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      slide: function( event, ui ) {
        $( "#amount2" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      },
      change: function() {
        remove( () => {
          minReview = $( "#slider2-range" ).slider( "values", 0 );
          maxReview = $( "#slider2-range" ).slider( "values", 1 );
          filterReviews();
        });
      }
    });
    $( "#amount2" ).val($( "#slider2-range" ).slider( "values", 0 ) +
      " - " + $( "#slider2-range" ).slider( "values", 1 ) );
  } );


    /* slider updates */
    let minPrice = 0;
    let maxPrice = 750;
    let minReview = 0;
    let maxReview = 100;
    
    let roomType = "All";

    function filterPrices() {
      fetch(URL)
      .then(function(response){ return response.json() })
      .then(function(data){

        L.geoJson(data, {
          onEachFeature: function (feature, layer) {
            layer.bindPopup("<b>Name:</b> " + feature.properties.name 
            + "<br><b>Neighborhood:</b> " + feature.properties.neighbourhood
            + "<br><b>Room Type:</b> " + feature.properties.room_type 
            + "<br><b>Price:</b> $" + feature.properties.price);
          }, 
          filter: function(feature) { 
            if(roomType != "All") {
              return (feature.properties.price >= minPrice) && (feature.properties.price <= maxPrice) &&
              (feature.properties.number_of_reviews >= minReview) && (feature.properties.number_of_reviews <= maxReview) && feature.properties.room_type == roomType;
            }

            return (feature.properties.price >= minPrice) && (feature.properties.price <= maxPrice) &&
              (feature.properties.number_of_reviews >= minReview) && (feature.properties.number_of_reviews <= maxReview);
          }
        }).addTo(map);
      })
    } 

    function filterReviews() {
      fetch(URL)
      .then(function(response){ return response.json() })
      .then(function(data){

        L.geoJson(data, {
          onEachFeature: function (feature, layer) {
            layer.bindPopup("<b>Name:</b> " + feature.properties.name 
            + "<br><b>Neighborhood:</b> " + feature.properties.neighbourhood
            + "<br><b>Room Type:</b> " + feature.properties.room_type 
            + "<br><b>Price:</b> $" + feature.properties.price);
          }, 
          filter: function(feature) { 
            if(roomType != "All") {
              return (feature.properties.price >= minPrice) && (feature.properties.price <= maxPrice) &&
              (feature.properties.number_of_reviews >= minReview) && (feature.properties.number_of_reviews <= maxReview) && feature.properties.room_type == roomType;
            }
            
            return (feature.properties.number_of_reviews >= minReview) && (feature.properties.number_of_reviews <= maxReview) 
            && (feature.properties.price >= minPrice) && (feature.properties.price <= maxPrice)}
        }).addTo(map);
      })
    } 



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
  
    entireHome = L.geoJson(data, { 
      onEachFeature: function (feature, layer) {
        layer.bindPopup("<b>Name:</b> " + feature.properties.name 
        + "<br><b>Neighborhood:</b> " + feature.properties.neighbourhood
        + "<br><b>Room Type:</b> " + feature.properties.room_type 
        + "<br><b>Price:</b> $" + feature.properties.price);
      }, 
      filter: function(feature) { 
        if(roomType != "All") {
          return feature.properties.room_type == "Entire home/apt" && (feature.properties.number_of_reviews >= minReview) && (feature.properties.number_of_reviews <= maxReview) 
          && (feature.properties.price >= minPrice) && (feature.properties.price <= maxPrice) && feature.properties.room_type == roomType;
      } 

      return feature.properties.room_type == "Entire home/apt" && (feature.properties.number_of_reviews >= minReview) && (feature.properties.number_of_reviews <= maxReview) 
        && (feature.properties.price >= minPrice) && (feature.properties.price <= maxPrice)}
    });
  
    privateRoom = L.geoJson(data, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup("<b>Name:</b> " + feature.properties.name 
        + "<br><b>Neighborhood:</b> " + feature.properties.neighbourhood
        + "<br><b>Room Type:</b> " + feature.properties.room_type 
        + "<br><b>Price:</b> $" + feature.properties.price);
      }, 
      filter: function(feature) { 
        if(roomType != "All") {
          return feature.properties.room_type == "Private room" && (feature.properties.number_of_reviews >= minReview) && (feature.properties.number_of_reviews <= maxReview) 
          && (feature.properties.price >= minPrice) && (feature.properties.price <= maxPrice) && feature.properties.room_type == roomType;
        }

        return feature.properties.room_type == "Private room" && (feature.properties.number_of_reviews >= minReview) && (feature.properties.number_of_reviews <= maxReview) 
          && (feature.properties.price >= minPrice) && (feature.properties.price <= maxPrice)}
    });

    allRooms = L.featureGroup([entireHome, privateRoom]);
    allRooms.addTo(map);
  
    L.control.layers({
      "All rooms": allRooms,
      "Entire home": entireHome,
      "Private Room": privateRoom
    }).addTo(map);
  });

   /* updates map based on room */

   function remove(_callback) {
      map.eachLayer( (layer) => {
        if (layer.toGeoJSON)
          map.removeLayer(layer);
      });
      _callback();
   }

    var radioButtons = document.getElementsByName('fltRoom');
    for (var r in radioButtons){
      radioButtons[r].onclick = function() {
        if(this.value == "Entire")
          roomType = "Entire home/apt";
        else if(this.value == "Private")
          roomType = "Private room";

        switch (this.value) {
          
          case 'Entire':
            remove( () => {
              entireHome.addTo(map);
            });
            break;
            
          case 'Private':
            remove( () => {
              privateRoom.addTo(map);
            });
            break;
            
          default:
            allRooms.addTo(map);
        }
      }
    }



   // let reviewRange = document.getElementsByName('amount2');

