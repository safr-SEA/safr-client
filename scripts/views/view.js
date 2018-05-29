'use strict';

var app = app || {};

(function(module) {

  const view = {};

  view.initReport = function() {
    console.log(app.ENVIRONMENT.apiUrl);
    $.get(`${app.ENVIRONMENT.apiUrl}/data/sea-gov`)
      .then(console.log)
      .catch(console.error)
  }

  module.view = view;

})(app);