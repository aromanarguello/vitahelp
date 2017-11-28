

$(document).ready( () => {
  $('.icon').click( ()=> {
    if ( $('.sub-navbar').css("visibility") === "hidden" ) {
      $( '.sub-navbar' ).css( "visibility", "visible" );
    }
    else {
      $( '.sub-navbar' ).css( "visibility", "hidden" );
    }
  });

function startMap() {
  $(document).ready( () => {
    const lat = $('.locationLat').html();
    const lon = $('.locationLon').html();
  });

  var brickellMia = {
  	lat: 25.7601793,
  	lng: -80.1958755
  };

  var miamiAddictionHelp = {
    lat:  25.763690,
    lng: -80.189430
  };


  var outpatientDrugTherapy = {
    lat: 25.774533,
    lng: -80.190644
  };


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

  var mahMarker = new google.maps.Marker({
    position: miamiAddictionHelp,
    map: map,
    title: "Miami Addicition Help"
  });

  var odtMarker = new google.maps.Marker({
    position: outpatientDrugTherapy,
    map: map,
    title: "Outpatient Drug Therapy"
  });
}

startMap();



});
