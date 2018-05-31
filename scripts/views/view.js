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
    $(window).resize(() => {
      if ($(document).width() <= 640) {
        $('.menu-links').hide();

        $('.icon-menu').on('click', () => {
          $('.menu-links').slideDown('slow');
        })
        
        $('#map-whole').on('click', () => {
          $('.menu-links').hide('slow');
        })
      } else {
        $('.menu-links').show();
      }
    })
  };

  view.menuToggle();

  module.view = view;

})(app);