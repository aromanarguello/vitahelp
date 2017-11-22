$(document).ready( () => {
  $('.icon').click( ()=> {
    if ( $('.sub-navbar').css("visibility") === "hidden" ) {
      $( '.sub-navbar' ).css( "visibility", "visible" );
    }
    else {
      $( '.sub-navbar' ).css( "visibility", "hidden" );
    }
  });


// main.js
function startMap() {
  var brickellMia = {
  	lat: 25.7601793,
  	lng: -80.1958755};
  var map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 15,
      center: brickellMia
    }
  );

  var brickellMarker = new google.maps.Marker({
      position: brickellMia,
      map: map,
      title: 'Hello World!'
    });

}

startMap();



});
