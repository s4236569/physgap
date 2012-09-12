function onLoad(){
  document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
  navigator.splashscreen.hide();
}

var mathjax_loaded = false;
function callmj () {
  if(mathjax_loaded)
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  else{
    MathJax.Hub.Startup.onload();
    mathjax_loaded = true;
  }
}

// $( document ).on( "pageinit", function() {
//     $( ".animation iframe" )
//         .attr( "width", 0 )
//         .attr( "height", 0 );
// 	 	     
//     $( ".animation" ).on({
//         popupbeforeposition: function() {
//             var size = scale( 480, 320, 0, 1 ),
//                 w = size.width,
//                 h = size.height;
// 
//             $( ".animation iframe" )
//                 .attr( "width", w )
//                 .attr( "height", h );
// 					 
//         },
//         popupafterclose: function() {
//             $( ".animation iframe" )
//                 .attr( "width", 0 )
//                 .attr( "height", 0 );
//         }
//     });
// });
