$.getJSON('../database/json/datenBank.json', function (data) {
  var daten = data;

  require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/ScaleBar",
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
    "esri/PopupTemplate"

  ], function (Map, MapView, ScaleBar, GraphicsLayer, Graphic, PopupTemplate) {

    var graphicsLayer = new GraphicsLayer();

    var map = new Map({
      basemap: "hybrid"
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [14.554717, -21.136488],
      zoom: 11.9,

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

      content: [{
        type: "fields",
        fieldInfos: [
        {
          fieldName: "Lat",
          visible: true,
          label: "Latitude",
        },
        {
          fieldName: "Long",
          visible: true,
          label: "Longitude",
        },
        {
          fieldName: "Spatiality",
          visible: true,
          label: "Spatiality"
        },
        {
          fieldName: "WaterAvailability",
          visible: true,
          label: "Water Availability"
        },
        {
          fieldName: "LivingPlace",
          visible: true,
          label: "Living Place"
        },
        {
          fieldName: "OpenField",
          visible: true,
          label: "Open Field"
        },
        {
          fieldName: "QuantityOfArtefacts",
          visible: true,
          label: "Quantity of Artefacts"
        }
      ]
      }, {
        type: "text", // TextContentElement
        text: "Diese Site {Site} liegt in der Gorge {Gorge}."
      },  {
        type: "media", // MediaContentElement
        mediaInfos: [{
          title: "Felsmalerei",
          type: "image",
          caption: "{Discription}{Gorge}{GorgeSesaub}",
          value: {
            sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG1}/zz_additional_data/Photo/preview_1600_{IMG1}.png"
          }
        }, {
          title: "Felsmalerei",
          type: "image",
          caption: "{Discription}{Gorge}{GorgeSesaub}",
          value: {
            sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG2}/zz_additional_data/Photo/preview_1600_{IMG2}.png"
          }
        }, {
          title: "Felsmalerei",
          type: "image",
          caption: "{Discription}{Gorge}{GorgeSesaub}",
          value: {
            sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG3}/zz_additional_data/Photo/preview_1600_{IMG3}.png"
          }
        }, {
          title: "Felsmalerei",
          type: "image",
          caption: "{Discription}{Gorge}{GorgeSesaub}",
          value: {
            sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG4}/zz_additional_data/Photo/preview_1600_{IMG4}.png"
          }
        }, {
          title: "Felsmalerei",
          type: "image",
          caption: "{Discription}{Gorge}{GorgeSesaub}",
          value: {
            sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG5}/zz_additional_data/Photo/preview_1600_{IMG5}.png"
          }
        }, {
          title: "Felsmalerei",
          type: "image",
          caption: "{Discription}{Gorge}{GorgeSesaub}",
          value: {
            sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG6}/zz_additional_data/Photo/preview_1600_{IMG6}.png"
          }
        }, {
          title: "Felsmalerei",
          type: "image",
          caption: "{Discription}{Gorge}{GorgeSesaub}",
          value: {
            sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG7}/zz_additional_data/Photo/preview_1600_{IMG7}.png"
          }
        }, {
          title: "Felsmalerei",
          type: "image",
          caption: "{Discription}{Gorge}{GorgeSesaub}",
          value: {
            sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG8}/zz_additional_data/Photo/preview_1600_{IMG8}.png"
          }
        }, {
          title: "Felsmalerei",
          type: "image",
          caption: "{Discription}{Gorge}{GorgeSesaub}",
          value: {
            sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG9}/zz_additional_data/Photo/preview_1600_{IMG9}.png"
          }
        }, {
          title: "Felsmalerei",
          type: "image",
          caption: "{Discription}{Gorge}{GorgeSesaub}",
          value: {
            sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG10}/zz_additional_data/Photo/preview_1600_{IMG10}.png"
          }
        }]
      }]
    }

    var scaleBar = new ScaleBar({
      view: view,
      unit: "dual" // The scale bar displays both metric and non-metric units.
    });

    view.ui.add(scaleBar, {
      position: "top-left"
    });

    var coordsWidget = document.createElement("div");
    coordsWidget.id = "coordsWidget";
    coordsWidget.className = "esri-widget esri-component";
    coordsWidget.style.padding = "7px 15px 5px";
    coordsWidget.style.margin = "7px 10px 47px";
    view.ui.add(coordsWidget, "bottom-right");
    function showCoordinates(pt) {
      var coords = "Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) +
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

    //Jenachdem welche Eingabe die User gewählt haben, wird "coulor" per SwitchCase eine Farbe zugewiesen.
    //Danach wird führ jeden passenden Punkt, welcher in der Datenbank gesucht wurde, die funktion addPoint ausgeführt.
    //Ihr werden die stelle des Punktes in der Datenbank sowie die Farbe als Parameter mitgegeben.
    function getGorges(a) {
      var coulor;
      switch (a) {
        case 0:
          a = "Amis";
          coulor = [255, 215, 0]; // gelb
          break;
        case 1:
          a = "Circus";
          coulor = [255, 0, 0]; // rot
          break;
        case 2:
          a = "Dom";
          coulor = [0, 153, 153]; // türkis
          break;
        case 3:
          a = "Eros";
          coulor = [255, 165, 0]; // orange
          break;
        case 4:
          a = "Furrow";
          coulor = [255, 0, 255]; // pink
          break;
        case 5:
          a = "Gaaseb";
          coulor = [0, 0, 255]; // blau
          break;
        case 6:
          a = "Hungorob";
          coulor = [128, 128, 128]; // hellgrau
          break;
        case 7:
          a = "Karoab";
          coulor = [0, 191, 255]; // hellblau
          break;
        case 8:
          a = "Märchen";
          coulor = [0, 0, 0]; // schwarz
          break;
        case 9:
          a = "Naib";
          coulor = [184, 134, 11]; // gold
          break;
        case 10:
          a = "Numas";
          coulor = [153, 51, 153]; // violet
          break;
        case 11:
          a = "Orabes";
          coulor = [0, 128, 0]; // grün
          break;
        case 12:
          a = "Porters";
          coulor = [139, 0, 0]; // dunkelrot
          break;
        case 13:
          a = "Quagga";
          coulor = [255, 255, 255]; // weiß
          break;
        case 14:
          a = "Raiders";
          coulor = [102, 255, 51]; // knallgrün
          break;
        case 15:
          a = "Umuab";
          coulor = [238, 130, 238]; // rosa
          break;
        case 16:
          a = "Sesaub / Basswaldrinne";
          coulor = [238, 130, 238]; // rosa
          break;
      }

      let state = false;
      for (var i = 0; i < daten.length; i++) {

        if (a == daten[i].Gorge) {
          addPoint(i, coulor);
          state = true;
        } else if (state == true) {
          break;
        }
      }
    }

    function addPoint(i, coulor) {
      if (daten[i].Gorge == "Sesaub / Basswaldrinne") {
        var gorgeSesaub = ", für diese Gorge liegen keine Bilddaten vor.";
      } else {
        var discription = "Dies ist ein Bild aus der Gorge ";
      }
      var lat = daten[i].Latitude;
      var long = daten[i].Longitude;
      var site = daten[i].Site;
      var gorge = daten[i].Gorge;
      var spatiality = daten[i].Spatiality;
      var wateravailability = daten[i].Water_Availability;
      var livingplace = daten[i].Living_Place;
      var openfield = daten[i].Open_Field;
      var quantityofartefacts = daten[i].Quantity_of_Artefacts;
      var siteIMG1 = daten[i].SiteIMG1, siteIMG2 = daten[i].SiteIMG2, siteIMG3 = daten[i].SiteIMG3, siteIMG4 = daten[i].SiteIMG4, siteIMG5 = daten[i].SiteIMG5, siteIMG6 = daten[i].SiteIMG6, siteIMG7 = daten[i].SiteIMG7, siteIMG8 = daten[i].SiteIMG8, siteIMG9 = daten[i].SiteIMG9, siteIMG10 = daten[i].SiteIMG10;
      var img1 = daten[i].Picture_Link_to_gorge1, img2 = daten[i].Picture_Link_to_gorge2, img3 = daten[i].Picture_Link_to_gorge3, img4 = daten[i].Picture_Link_to_gorge4, img5 = daten[i].Picture_Link_to_gorge5, img6 = daten[i].Picture_Link_to_gorge6, img7 = daten[i].Picture_Link_to_gorge7, img8 = daten[i].Picture_Link_to_gorge8, img9 = daten[i].Picture_Link_to_gorge9, img10 = daten[i].Picture_Link_to_gorge10;

      var attributes = {
        Lat: lat,
        Long: long,
        Site: site,
        Gorge: gorge,
        Spatiality: spatiality,
        WaterAvailability: wateravailability,
        LivingPlace: livingplace,
        OpenField: openfield,
        QuantityOfArtefacts: quantityofartefacts,
        GorgeSesaub: gorgeSesaub,
        Discription: discription,
        IMG1: img1, IMG2: img2, IMG3: img3, IMG4: img4, IMG5: img5, IMG6: img6, IMG7: img7, IMG8: img8, IMG9: img9, IMG10: img10,
        SiteIMG1: siteIMG1, SiteIMG2: siteIMG2, SiteIMG3: siteIMG3, SiteIMG4: siteIMG4, SiteIMG5: siteIMG5, SiteIMG6: siteIMG6, SiteIMG7: siteIMG7, SiteIMG8: siteIMG8, SiteIMG9: siteIMG9, SiteIMG10: siteIMG10
      };

      var simpleMarkerSymbol = {
        type: "simple-marker",
        color: coulor,
        outline: {
          color: [255, 255, 255], // white
          width: 1,
        },
        size: 5
      };

      var point = {
        type: "point",
        longitude: long,
        latitude: lat
      };

      var graphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol,
        attributes: attributes,
        popupTemplate: PopupTemplate
      });

      graphicsLayer.graphics.add(graphic);
    }

    //Die folgenden 21 Zeilen händeln die Funktionen der GorgesMap (checkboxes).
    var getGorgesLayerToggle = document.getElementsByClassName("box");
    for (let i = 0; i < getGorgesLayerToggle.length; i++) {
      getGorgesLayerToggle[i].checked = false;
    }
    for (let i = 0; i < getGorgesLayerToggle.length; i++) {
      var gorgeID = document.getElementById(i);
      gorgeID.addEventListener("change", function () {
        if (getGorgesLayerToggle[i].checked) {
          b = false;
          getGorges(i);
        } else {
          clearLayer();
          for (let j = 0; j < getGorgesLayerToggle.length; j++) {
            gorgeID = document.getElementById(j);
            if (gorgeID.checked) {
              getGorges(j);
            }
          }
        }
      });
    }

    map.add(graphicsLayer);
  });
});