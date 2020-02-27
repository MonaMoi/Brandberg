var graphicsLayer;
var long;
var lat;
var simpleMarkerSymbol;
var point;
var daten;
var graphic;

$.getJSON('../database/json/TabelleMitCoordinates.json', function(data) {
    daten = data;

    require([
        "esri/Map",
        "esri/views/SceneView",
        "esri/layers/GraphicsLayer",
        "esri/Graphic",


    ], function(Map, SceneView, GraphicsLayer, Graphic) {




        var map = new Map({
            basemap: "hybrid",
            ground: "world-elevation"
        });

        var view = new SceneView({
            container: "viewDiv",
            map: map,
            center: [14.5586, -21.12681],
            zoom: 11,

            popup: {
                dockEnabled: true,
                dockOptions: {
                    buttonEnabled: false,
                    breakpoint: false
                }
            }
        });

        graphicsLayer = new GraphicsLayer();

        map.add(graphicsLayer);




        simpleMarkerSymbol = {
            type: "simple-marker",
            color: [226, 119, 40], // orange
            outline: {
                color: [255, 255, 255], // white
                width: 1,
            },
            size: 5

        };
        var popupTemplate = {};




        function getSites() {
            for (var i = 0; i < daten.length; i++) {

                lat = daten[i].Latitude;
                long = daten[i].Longitude;


                point = {
                    type: "point",
                    longitude: long,
                    latitude: lat
                };

                graphic = new Graphic({
                    geometry: point,
                    symbol: simpleMarkerSymbol,
                    popupTemplate: popupTemplate
                });

                graphicsLayer.graphics.add(graphic);
            }
        }

        getSites();
    });
});