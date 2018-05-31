'use strict';

var app = app || {};

(function(module) {

  const view = {};

  view.initReport = function() {
    $.get(`${app.ENVIRONMENT.apiUrl}/data/sea-gov`)
      .then(console.log)
      .catch(console.error)
  }

  view.initLoginPage = function () {
    
  }

  module.view = view;

})(app);