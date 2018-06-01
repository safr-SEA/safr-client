'use strict';

var app = app || {};

(function(module) {

  $('#close').on('click', () => $('#data-vis').animate({top:'100vh'}, 'ease'));
  let initPlotly = (result) => {

    $('#data-vis').animate({
      top: '47vh'
    }, 'ease');

    let crimes = result.map((obj) => obj.summarized_offense_description);
    let crimeUnique = crimes.filter((v, i, a) => a.indexOf(v) === i);
    let crimeCount = crimeUnique.map((ele) => crimes.reduce((v, i) => (v + (i == ele)), 0));
    
    var data = [{
      values: crimeCount,
      labels: crimeUnique,
      type: 'pie'
    }];

    var layout = {
      paper_bgcolor:"rgba(0,0,0,0)",
      height:390,
      width:390,
      showlegend: true,
      legend: {"orientation": "h"},
      font: {
        family: 'Quicksand',
        size: 17,
        color: 'white'
      }
    };

    Plotly.newPlot('plotly', data, layout, {displayModeBar:false});
  };

  module.initPlotly = initPlotly;

})(app);