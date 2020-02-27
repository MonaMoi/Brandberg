var graphicsLayer;
var long;
var lat;
var site;
var gorge;
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
        
        var popupTemplate = {
            "title": "hallo",
            "content": "{Lat} <br> {Long} <br> Diese Site {Site} liegt in der Gorge {Gorge}."
        };

        function getSites() {
            for (var i = 0; i < daten.length; i++) {

                lat = daten[i].Latitude;
                long = daten[i].Longitude;
                site = daten[i].Site;
                gorge = daten[i].Gorge;

                point = {
                    type: "point",
                    longitude: long,
                    latitude: lat
                };

                var attributes = {
                    Lat: lat,
                    Long: long,
                    Site: site,
                    Gorge: gorge
                  };

                graphic = new Graphic({
                    geometry: point,
                    symbol: simpleMarkerSymbol,
                    attributes: attributes,
                    popupTemplate: popupTemplate
                });

                graphicsLayer.graphics.add(graphic);
            }
        }

        getSites();
    });
});