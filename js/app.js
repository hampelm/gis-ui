/*globals L */

$(function(){
  var pointLayerTemplate = _.template($('#template-layer').html());

  var tileURL = 'http://matth-tiles.herokuapp.com/features/tile.json';
  var baseLayer = L.tileLayer('http://a.tiles.mapbox.com/v3/matth.map-pzt2g69t/{z}/{x}/{y}.png');
  var sat = L.tileLayer('http://a.tiles.mapbox.com/v3/matth.m2afagi8/{z}/{x}/{y}.png');

  var options = {
    editable: true,
    scrollWheelZoom: false
  };

  var map = L.map('map', options).setView([42.34435,-83.056898 ], 2); // detroit
  map.addLayer(baseLayer);


  map.on('editable:created', function (e) {
    console.log("Created a point", e);
    var layer = e.layer;
    var $layerControl = $(pointLayerTemplate());

    // Remove layer
    $layerControl.find('.tool.remove').on('click', function(e) {
      map.removeLayer(layer);
      $layerControl.remove();
    });

    // Hide / show layer:
    var visible = true;
    $layerControl.find('.tool.visibility').on('click', function(e) {
      if (visible) {
        map.removeLayer(layer);
      } else {
        map.addLayer(layer);
      }

      $layerControl.find('.visibility .icon .fa')
                   .toggleClass('fa-eye')
                   .toggleClass('fa-eye-slash');
      visible = !visible;
    });

    $('.layergroup').append($layerControl);
  });

  $('#draw-point').click(function(e) {
    e.preventDefault();
    map.editTools.startMarker();
  });



});
