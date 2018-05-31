'use strict';

var app = app || {};



(function(module) {

  const view = {};

  view.initReport = function() {
    $.get(`${app.ENVIRONMENT.apiUrl}/data/sea-gov`)
      .then(console.log)
      .catch(console.error)
  }

  view.menuToggle = function() {
    $('.menu-links').hide();
    $('.icon-menu').on('click', () => {
      $('.menu-links').slideToggle('slow');
    })
    $('#map-whole').on('click', () => {
      $('.menu-links').hide('slow');
    })
  };

  view.menuToggle();

  module.view = view;

})(app);