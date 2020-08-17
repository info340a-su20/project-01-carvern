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
