'use strict';

var app = app || {};

( function ( module ) {

  const view = {};

  view.initReport = function () {
    $.get( `${ app.ENVIRONMENT.apiUrl }/data/sea-gov` )
      .then( console.log )
      .catch( console.error )
  }

  view.initLoginPage = function () {
    $( '.container' ).hide();
    $( '#login-page' ).fadeIn( 'slow' );
  }

  view.initAboutPage = function () { 
    $( '.container' ).hide();
    $( '#nav-menu' ).fadeIn( 'slow' );
    $( '#about-page' ).fadeIn( 'slow' );
    view.menuToggle();
  }
  
  view.initSearchPage = function () {
    $( '.container' ).hide();
    $( '#nav-menu' ).fadeIn( 'slow' );
    $( '#map-whole' ).fadeIn( 'slow' );
    view.menuToggle();
  }
  
  view.menuToggle = function () {
      let toggle = () => {
        if ( $( document ).width() <= 640 ) {
          console.log( 'inside the if' )
          $( '.menu-links' ).hide();

          $( '.icon-menu' ).on( 'click', () => {
            console.log( 'icon-menu on click with slide toggle' );
            $( '.menu-links' ).slideDown( 'slow' );
          } )

          $( '#map-whole' ).on( 'click', () => {
            console.log( 'map-whole when clicked hide menu links' )
            $( '.menu-links' ).hide( 'slow' );
          } )

        } else {
          console.log( 'hitting the else statement' )
          $( '.menu-links' ).show();
        }
      }
    toggle();
    $( window ).resize( () => {
        toggle();
      } )
    }

  module.view = view;

} )( app );