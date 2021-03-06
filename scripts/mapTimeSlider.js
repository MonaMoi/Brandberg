$.getJSON('../database/json/datenBank.json', function (data) {
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
      center: [14.551019, -21.161243],
      zoom: 11.6,

      popup: {
        dockEnabled: true,
        dockOptions: {
          buttonEnabled: false,
          breakpoint: false
        }
      }
    });

    var PopupTemplate = {
      title: "Fundstelle {Site} ",
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
          fieldName: "Discoverer",
          visible: true,
          label: "Discoverer"
        },
        {
          fieldName: "DateDiscovery",
          visible: true,
          label: "Date of Discovery"
        }
      ]
      }, {
        type: "text", // TextContentElement
        text: "Diese Site {Site} liegt in der Gorge {Gorge}."
      }, {
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

    //Der ausgewählte Wert des Sliders wird ermittelt und daraus Monat und Jahr berechnet.
    var slider = document.getElementById("slideValue");
    slider.value = 0;
    slider.addEventListener("input", function () {
      var slideValue = document.getElementById("slideValue").value;
      var year = 1947;
      var month = 12;
      for (var i = 0; i < slideValue; i++) {
        if (month == 12) {
          year = year + 1;
          month = 1;
        } else {
          month = month + 1;
        }
      }
      document.getElementById('rangeValue').innerHTML = month + ". " + year;
      getSitesByYearMonth(year, month);
    });

    //Die zuvor berechneten Zahlen für Monat und Jahr werden mit den Informationen zu Entdeckung der Fundestellen in unserer Datenbank verglichen.
    //Alle Punkte, die zeitlich vor oder auf dem ausgewählten Datum liegen werden dem Layer hinzugefügt.
    //Außerdem werden den verschiedenen Entdeckern Farben zugewiesen.
    function getSitesByYearMonth(y, m) {
      clearLayer();
      var coulor = [226, 119, 40];
      for (var i = 0; i < daten.length; i++) {

        var discoverer = daten[i].Discoverer;
        discoverer = discoverer.toLowerCase();
        discoverer = discoverer.replace(/([ ./&])/g, '');
        console.log(discoverer);

        switch (discoverer) {
          case "toiwoshipahu":
            coulor = [144, 238, 144]; // hellgrün
            break;
          case "toiwo":
            coulor = [0, 0, 255]; // blau
            break;
          case "jtoiwo":
            coulor = [0, 0, 255]; // blau
            break;  
          case "toiwolameka":
            coulor = [204, 153, 0]; // gold
            break;
          case "shipahu":
            coulor = [255, 255, 0]; // gelb
            break;
          case "shipahupaulus":
            coulor = [136, 119, 23]; // grün-gelb
            break;
          case "shipahupager":
            coulor = [255, 255, 255]; // weiß
            break;
          case "sapager":
            coulor = [05, 105, 105]; // grau
            break;
          case "pagermatheus":
            coulor = [255, 105, 180]; // pink
            break;
          case "matheus":
            coulor = [128, 0, 128]; // lila
            break; 
          case "ematheus":
            coulor = [128, 0, 128]; // lila
            break;   
          case "hroth":
            coulor = [226, 119, 40]; // orange
            break;  
          case "lempproth":
            coulor = [210, 105, 30]; // chocolate
            break;
          case "lempp":
            coulor = [255, 182, 193]; // hellrosa
            break;
          case "viereck":
            coulor = [0, 191, 255]; // himmelblau
            break;
          case "aviereck":
            coulor = [0, 191, 255]; // himmelblau
            break;  
          case "paulus":
            coulor = [225, 0, 0]; // rot
            break;
          case "fpaulus":
            coulor = [225, 0, 0]; // rot
            break;  
          case "clauss":
            coulor = [0, 128, 128]; // blaugrün
            break;
          case "walter":
            coulor = [0, 0, 0]; // schwarz
            break;
          case "jjdwalter":
            coulor = [0, 0, 0]; // schwarz
            break;  
          case "rudner":
            coulor = [220, 220, 220]; // hellgrau
            break;
          case "jrudner":
            coulor = [220, 220, 220]; // hellgrau
            break;  
          case "craven":
            coulor = [128, 0, 0]; // kastanienbraun
            break;
          case "drcraven":
            coulor = [128, 0, 0]; // kastanienbraun
            break;
          case "drdcraven":
            coulor = [128, 0, 0]; // kastanienbraun
            break;    
          case "jipsen":
            coulor = [0, 255, 0]; // grün
            break;
          case "keyenstüber":
            coulor = [147, 112, 219]; // helllila
            break;
          case "kleyenstüber":
            coulor = [147, 112, 219]; // helllila
            break;  
          case "nashilengo":
            coulor = [176, 196, 222]; // hellblau
            break;
          case "jnashilongo":
            coulor = [176, 196, 222]; // hellblau
            break;
          case "nashilongo":
            coulor = [176, 196, 222]; // hellblau
            break;
          case "kambonde":
            coulor = [255, 20, 147]; // dunkelpink
            break;
          case "scherz":
            coulor = [0, 0, 128]; // navy
            break;                                     
          default:
          break;
        }

        var year, month;
        year = daten[i].Date_of_Discovery, month = daten[i].Date_of_Discovery;

        if (year != "") {
          console.log(year);
        }
        year = year.slice(6, 10), month = month.slice(3, 5);
        year = parseInt(year), month = parseInt(month);

        if (year < y || year <= y && month <= m) {
          addPoint(i, coulor);
        }
      }
    }

    function clearLayer() {
      graphicsLayer.removeAll();
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
      var discoverer = daten[i].Discoverer;
      var dateofdicovery = daten[i].Date_of_Discovery;
      var siteIMG1 = daten[i].SiteIMG1, siteIMG2 = daten[i].SiteIMG2, siteIMG3 = daten[i].SiteIMG3, siteIMG4 = daten[i].SiteIMG4, siteIMG5 = daten[i].SiteIMG5, siteIMG6 = daten[i].SiteIMG6, siteIMG7 = daten[i].SiteIMG7, siteIMG8 = daten[i].SiteIMG8, siteIMG9 = daten[i].SiteIMG9, siteIMG10 = daten[i].SiteIMG10;
      var img1 = daten[i].Picture_Link_to_gorge1, img2 = daten[i].Picture_Link_to_gorge2, img3 = daten[i].Picture_Link_to_gorge3, img4 = daten[i].Picture_Link_to_gorge4, img5 = daten[i].Picture_Link_to_gorge5, img6 = daten[i].Picture_Link_to_gorge6, img7 = daten[i].Picture_Link_to_gorge7, img8 = daten[i].Picture_Link_to_gorge8, img9 = daten[i].Picture_Link_to_gorge9, img10 = daten[i].Picture_Link_to_gorge10;

      var attributes = {
        Lat: lat,
        Long: long,
        Site: site,
        Gorge: gorge,
        Discoverer: discoverer,
        DateDiscovery: dateofdicovery,
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

    map.add(graphicsLayer);
  });
});