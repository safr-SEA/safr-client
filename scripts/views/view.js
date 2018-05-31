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
    $( '#nav-menu' ).hide();
    $( '#login-page' ).fadeIn( 'slow' );
  }

  view.initAdminPage = function () { 
    $( '.container' ).hide();
    $( '#admin-page' ).fadeIn( 'slow' );
   }

  module.view = view;

} )( app );

app.view.initLoginPage();