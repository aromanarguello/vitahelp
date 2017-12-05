x

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


  var brickellMia = {
  	lat: 25.7601793,
  	lng: -80.1958755
  };



  $.get('/clinic-info')
    .then( clinicArray => {
      console.log(clinicArray);
      clinicArray.forEach( oneClinic => {
        var marker = new google.maps.Marker({
          position: {
            lat: oneClinic.locationLat,
            lng: oneClinic.locationLon
          },
          map: map,
          title: 'hello'
        });
      });
    });



    var map = new google.maps.Map(
      document.getElementById('map'),
      {
        zoom: 15,
        center: brickellMia
      }
    );

  // var brickellMarker = new google.maps.Marker({
  //     position: brickellMia,
  //     map: map,
  //     title: 'Hello World!'
  //   });
  //
  // var mahMarker = new google.maps.Marker({
  //   position: miamiAddictionHelp,
  //   map: map,
  //   title: "Miami Addicition Help"
  // });
  //
  // var odtMarker = new google.maps.Marker({
  //   position: outpatientDrugTherapy,
  //   map: map,
  //   title: "Outpatient Drug Therapy"
  // });
}

startMap();

});
