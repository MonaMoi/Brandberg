$.getJSON('../database/json/datenBank.json', function (data) {
  var daten = data;

  require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
    "esri/PopupTemplate"

  ], function (Map, SceneView, GraphicsLayer, Graphic, PopupTemplate) {
    var numTotal = 0;

    var graphicsLayer = new GraphicsLayer();

    var map = new Map({
      basemap: "hybrid",
      ground: "world-elevation"
    });

    //Da hier ein anderer Blickwinkel für die Ansicht auf die Karte gebraucht wird, ist Dieser unter dem "position" festgelegt.
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
        {
        type: "text",
        text: "Die Gorge {Gorge} enthält {NumTotal} {Temp0}"
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

    //Die Funktion sucht in der Datenbank unter den Punkt "Number_of_Figures" nach der Anzahl der Motive in einer Site.
    //Dieser werden addiert in Prozent umgerechnet und mit einem Faktor Multipliziert, damit eine ästhetische Ansicht auf der Karte möglich ist.
    //für jede Gorge werden der Wert, Name der Gorge, tatsächliche Anzahl an Motive der GOrge und eine Statusvariable als Parameter weitergegeben.
    function getFigureNumberofGorge() {
      var numOfFig = 0;
      var numOfFigTemp = 0;
      var numOfFigTotal = 0;
      var tempGorge = daten[0].Gorge;
      var tempGorge1;
      var last = "Umuab";
      var NumberInPercent;

      for (var i = 0; i < daten.length; i++) {
        if (tempGorge == daten[i].Gorge) {
          tempGorge = daten[i].Gorge;
          tempGorge1 = tempGorge;
          numOfFigTemp = daten[i].Number_of_Figures;
          numOfFig = numOfFig + numOfFigTemp;
          
        } else if (tempGorge != daten[i].Gorge) {
          tempGorge = daten[i].Gorge;
          numOfFigTemp = daten[i].Number_of_Figures;
          numOfFigTotal = numOfFig;
          numOfFig = 0;
          if (tempGorge == last) {
            numOfFigTotal = 258;
          }
          NumberInPercent = (numOfFigTotal * 100) / 45.620;
          NumberInPercent = NumberInPercent * 0.09 + 300;
          var a = 1;

          numTotal = numOfFigTotal
          getGorgeBars(NumberInPercent, tempGorge1, numTotal, a);
          numOfFigTotal = 0;
          numOfFig = numOfFigTemp;
        }
      }





    }

    //Funktioniert ähnlich wie getFigureNumberofGorge(), allerdings wird hier die Anzahl der Sites in einer Gorge ermittelt.
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
          numTotal = numberofSitesinGorge
          getGorgeBars(NumberInPercent, temp, numTotal, a);
          temp = daten[i].Gorge;
          numberofSitesinGorge = 1;
        }
      }
    }

    //Es werden die zuvor ermittelten Werte mit Koordinaten der einzelnen Gorges kombiniert und der addBar() wird für jede Gorge ausgeführt.
    function getGorgeBars(NumberInPercent, temp, numTotal, a) {
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

      for (var j = 0; j <= gorgeBarsCoordinates.length; j++) {
        if (temp == gorgeBarsCoordinates[j + 3]) {
          addBar(j, gorgeBarsCoordinates, numOfSites, numTotal, a);
        }
      }

    }

    //addBar() funktioniert so wie addPoint() nur werden hier Balken und Punkte definiert und dem Layer hinzugefügt.
    function addBar(j, gorgeBarsCoordinates, numOfSites, numTotal, a) {
      var temp0;
      var sum = numTotal;
      if (a == 0) {
        temp0 = "Sites";
      } else if(a == 1) {
        temp0 = "Einzelfiguren";
      }

      var gorge = gorgeBarsCoordinates[j + 3];
      
      var attributes = {
        Gorge: gorge,
        Temp0: temp0,
        NumTotal: numTotal
      };

      var polyline = {
        type: "polyline",
        paths: [
          [gorgeBarsCoordinates[j], gorgeBarsCoordinates[j + 1], 0],
          [gorgeBarsCoordinates[j], gorgeBarsCoordinates[j + 1], numOfSites]
        ]
      };

      lineSymbol = {
        type: "simple-line",
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
        x: gorgeBarsCoordinates[j],
        y: gorgeBarsCoordinates[j + 1],
        z: numOfSites + 10
      };
      
      markerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],
        outline: {
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

    //Die folgenden 20 Zeilen verwalten den Status der Radiobutton,
    //woraufhin dann entwerder die Fuktion getSitesNumberofGorge() oder getFigureNumberofGorge() ausführt wird.
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