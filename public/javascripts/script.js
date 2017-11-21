$(document).ready( () => {
  $('.icon').click( ()=> {

    if ( $('.sub-navbar').css("visibility", "visible") === false ) {
      $( '.sub-navbar' ).css( "visibility", "visible" );
    }
    else if( $( '.sub-navbar' ).css( "visibility", "visible" ) === true ) {
      $( '.sub-navbar' ).css( "visibility", "hidden" );
    }

  });
});
