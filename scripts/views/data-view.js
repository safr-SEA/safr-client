'use strict';

var app = app || {};

(function(module) {

  let initPlotly = (result) => {
    let crimes = result.map((obj) => obj.summarized_offense_description);
    let crimeUnique = crimes.filter((v, i, a) => a.indexOf(v) === i);
    let crimeCount = crimeUnique.map((ele) => crimes.reduce((v, i) => (v + (i == ele)), 0));

    var data = [{
      values: crimeCount,
      labels: crimeUnique,
      type: 'pie'
    }];

    var layout = {
      height: 400,
      width: 700
    };

    Plotly.newPlot('data-vis', data, layout);
  };

  module.initPlotly = initPlotly;

})(app);