$.getJSON('../database/json/TabelleMitCoordinatesUndBildern.json', function (data) {
  var daten = data;

  require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
    "esri/PopupTemplate"

  ], function (Map, SceneView, GraphicsLayer, Graphic, PopupTemplate) {

    var graphicsLayer = new GraphicsLayer();

    var map = new Map({
      basemap: "hybrid",
      ground: "world-elevation"
    });

    var view = new SceneView({
      container: "viewDiv",
      map: map,

      camera: {
        // autocasts as new Camera()
        position: {
          // autocasts as new Point()
          x: 14.536339,
          y: -21.544651,
          z: 20000
        },
        heading: 0.34445102566290225,
        tilt: 70.95536300536367
      },

      popup: {
        dockEnabled: true,
        dockOptions: {
          buttonEnabled: false,
          breakpoint: false
        }
      }
    });

    var PopupTemplate = {
      title: "Gorge {Gorge} ",

      content: [
        { //ÄNDERN
        type: "text", // TextContentElement
        text: "{Diagramm}",
        }
      ]
    }

    var coordsWidget = document.createElement("div");
    coordsWidget.id = "coordsWidget";
    coordsWidget.className = "esri-widget esri-component";
    coordsWidget.style.padding = "7px 15px 5px";
    coordsWidget.style.margin = "7px 10px 47px";
    view.ui.add(coordsWidget, "bottom-right");
    function showCoordinates(pt) {
      var coords = "Lat/Lon " + pt.latitude.toFixed(6) + " " + pt.longitude.toFixed(6) +
        " | Scale 1:" + Math.round(view.scale * 1) / 1;
      coordsWidget.innerHTML = coords;
    }
    view.watch("stationary", function (isStationary) {
      showCoordinates(view.center);
    });
    view.on("pointer-move", function (evt) {
      showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
    });

    function clearLayer() {
      graphicsLayer.removeAll();
    }

    function getFigureNumberofGorge() {
      var numOfFig = 0;
      var numOfFigTemp = 0;
      var numOfFigTotal = 0;
      var tempGorge = daten[0].Gorge;
      var last = "Umuab";
      var NumberInPercent;

      for (var i = 0; i < daten.length; i++) {
        if (tempGorge == daten[i].Gorge) {
          tempGorge = daten[i].Gorge;
          numOfFigTemp = daten[i].Number_of_Figures;
          numOfFig = numOfFig + numOfFigTemp;
        } else if (tempGorge != daten[i].Gorge) {
          tempGorge = daten[i].Gorge;
          numOfFigTemp = daten[i].Number_of_Figures;
          numOfFigTotal = numOfFig;
          numOfFig = 0;
          if (tempGorge == last) {
            numOfFigTotal = 3679;
          }
          NumberInPercent = (numOfFigTotal * 100) / 45.620;
          NumberInPercent = NumberInPercent * 0.09 + 300;
          var a = 1;
          getGorgeBars(NumberInPercent, tempGorge, a);
          numOfFigTotal = 0;
          numOfFig = numOfFigTemp;
        }
      }





    }

    function getSitesNumberofGorge() {
      var numberofSitesinGorge = 0;
      var temp = daten[0].Gorge;
      var NumberInPercent;
      for (var i = 0; i < daten.length; i++) {
        if (daten[i].Gorge == temp) {
          temp = daten[i].Gorge;

          numberofSitesinGorge = numberofSitesinGorge + 1;
        } else {

          NumberInPercent = (numberofSitesinGorge * 100) / 839;
          NumberInPercent = NumberInPercent * 45 + 250;
          var a = 0;
          getGorgeBars(NumberInPercent, temp, a);
          temp = daten[i].Gorge;
          numberofSitesinGorge = 1;
        }
      }
    }

    function getGorgeBars(NumberInPercent, temp, a) {
      var numOfSites = NumberInPercent * 10;
      var gorgeBarsCoordinates = [
        14.483873, -21.177530, numOfSites, "Amis",
        14.470143, -21.120104, numOfSites, "Circus",
        14.458018, -21.169877, numOfSites, "Dom",
        14.589272, -21.215102, numOfSites, "Eros",
        14.634025, -21.182337, numOfSites, "Sesaub / Basswaldrinne",
        14.573625, -21.210378, numOfSites, "Gaaseb",
        14.543473, -21.187160, numOfSites, "Hungorob",
        14.518668, -21.079570, numOfSites, "Karoab",
        14.499378, -21.068345, numOfSites, "Märchen",
        14.507687, -21.106128, numOfSites, "Naib",
        14.523142, -21.140443, numOfSites, "Numas",
        14.603448, -21.188027, numOfSites, "Orabes",
        14.488744, -21.072506, numOfSites, "Porters",
        14.591888, -21.204358, numOfSites, "Quagga",
        14.477188, -21.072382, numOfSites, "Raiders",
        14.562196, -21.079732, numOfSites, "Umab",
      ];

      for (var i = 0; i < gorgeBarsCoordinates.length; i++) {
        if (temp == gorgeBarsCoordinates[i + 3]) {
          addBar(i, gorgeBarsCoordinates, numOfSites, a);
        }
      }

    }

    function addBar(i, gorgeBarsCoordinates, numOfSites, a) {
      var polyline = {
        type: "polyline", // autocasts as new Polyline()
        paths: [
          [gorgeBarsCoordinates[i], gorgeBarsCoordinates[i + 1], 0],
          [gorgeBarsCoordinates[i], gorgeBarsCoordinates[i + 1], numOfSites]
        ]
      };

      lineSymbol = {
        type: "simple-line", // autocasts as SimpleLineSymbol()
        color: [226, 119, 40],
        width: 4
      };

      var polylineGraphic = new Graphic({
        geometry: polyline,
        symbol: lineSymbol,
        attributes: attributes,
        popupTemplate: PopupTemplate
      });


      graphicsLayer.graphics.add(polylineGraphic);

      var point = {
        type: "point", // autocasts as new Point()
        x: gorgeBarsCoordinates[i],
        y: gorgeBarsCoordinates[i + 1],
        z: numOfSites + 10
      };
      var diagramm = a;
      if (diagramm == 0) {
        diagramm = "Diese {Gorge} enthält {SiteNum} Sites";
      } else if(diagramm == 1) {
        diagramm = "Diese {Gorge} enthält {FiguresNum} Einzelfiguren";
      }

      
      var gorge = daten[i].Gorge;
      
console.log(gorge);
console.log(diagramm);
      var attributes = {
        Gorge: gorge,
        Diagramm : diagramm
        };

      markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [226, 119, 40],
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      };

      var pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
        attributes: attributes,
        popupTemplate: PopupTemplate
      });

      graphicsLayer.graphics.add(pointGraphic);
    }

    var getGorgesLayerToggle = document.getElementsByClassName("box");
    getGorgesLayerToggle[0].checked = true;
    getGorgesLayerToggle[1].checked = false;
    if (getGorgesLayerToggle[0].checked) {
      getSitesNumberofGorge();
    }

    var gorgeID1 = document.getElementById("0");
    var gorgeID2 = document.getElementById("1");
    gorgeID1.addEventListener("change", function () {
      if (getGorgesLayerToggle[0].checked) {
        clearLayer();
        getSitesNumberofGorge();
      }
    });
    gorgeID2.addEventListener("change", function () {
      if (getGorgesLayerToggle[1].checked) {
        clearLayer();
        getFigureNumberofGorge();
      }
    });

    map.add(graphicsLayer);
  });
});