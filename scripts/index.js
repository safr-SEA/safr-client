'use strict';

app = app || {};

( function( module ) {
  let productionApiUrl = 'https://safr-sea.herokuapp.com/';
  let developmentApiUrl = 'http://localhost:3000';

  module.isProductioon = /^(?!localhost|127)/.test( window.location.hostname );
  module.ENVIRONMENT = {
    apiURl: module.isProduction ? productionApiUrl : developmentApiUrl
  };
  
} )( app );