$(document).ready( () => {
  $('.icon').click( ()=> {
    if ( $('.sub-navbar').css("visibility") === "hidden" ) {
      $( '.sub-navbar' ).css( "visibility", "visible" );
    }
    else {
      $( '.sub-navbar' ).css( "visibility", "hidden" );
    }
  });
});
