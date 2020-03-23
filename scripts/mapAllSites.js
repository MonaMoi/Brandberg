//GetJSON() braucht mindestens einen lokalen Server.
//Hier wird die JSON Datei in eine Variable geladen.
//Die Funktion umfasst die folgende Funktione, damit Diese auf "daten" zugreifen kann.
$.getJSON('../database/json/datenBank.json', function (data) {
  var daten = data;

  //Startende Esri Funktion.
  //Sie umfasst alle weiteren Funktionen.
  //Hier werden sowohl Karte als auch Layer erstellt und befüllt.
  require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
    "esri/PopupTemplate"
  ], function (Map, SceneView, GraphicsLayer, Graphic, PopupTemplate) {

    //Layer wird erstellt, er enthält später alle Punkte, Linien oder Polygone, welche gezeigt werden sollen.
    var graphicsLayer = new GraphicsLayer();

    //Neue Map(Karte) wird definiert.
    var map = new Map({
      basemap: "hybrid",
      ground: "world-elevation"
    });

    //View wird erstellt. Das ist der Blickwinkel aus dem die Rezipienten auf die Karte schauen.
    var view = new SceneView({
      container: "viewDiv",
      map: map,
      center: [14.554717, -21.136488],
      zoom: 11.8,

      popup: {
        dockEnabled: true,
        dockOptions: {
          buttonEnabled: false,
          breakpoint: false
        }
      }
    });

    //Das Javascript Objekt PopupTemplate wird hier mit Informationen bestückt.
    //Es wird später "graphic" mitgegeben damit es auf der Karte als Popup angezeigt werden kann.
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

    //ein zweites Template für das Polygon in mapAllSites.html
    var template = {
      title: "Undiscovered",
      content: "Dieser Bereich ist noch nicht erforscht.",
    };

    //Die nächsten 17 Zeilen beschreiben die Erstellung und das Hinzufügen eines Widgets zur Map.
    //Es ist ein Koordinaten Widget und zegt immer die aktuellen Koordinaten der Mauszeigerposition an.
    //Es wurde fast unveränder von der ArcGIS Seite übernommen.
    //https://developers.arcgis.com/javascript/latest/guide/get-map-coordinates/
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

    //Die folgenden 11 Zeilen verwalten den Checkbox Status auf der Seite mappAllSites.html
    //Wenn die Seite geladen wurde ist der Haken gesetzt und alle Sites werden angezeigt.
    //Außerdem wird das Suchfeld geleert.
    //Wird der Status verändert werden die Sites nicht mehr angezeigt oder wieder angezeitgt.
    //Das Suchfeld wird ebensfalls geleert, wenn der Haken gesetzt wird.
    document.getElementById("search").value = "";
    var getSitesLayerToggle = document.getElementById("0");
    getSitesLayerToggle.checked = true;
    getSitesLayerToggle.addEventListener("change", function () {
      if (getSitesLayerToggle.checked) {
        getSites();
        document.getElementById("search").value = "";
      } else if (!getSitesLayerToggle.checked) {
        clearLayer();
      }
    });

    //Wenn die Taste "Enter" gedrückt wird, wird die Funktion searchForSite() ausgeführt.
    //Wir verwenden Hier JQuery, da so leichter die HTML elemente angesteuert und mit Funktionen belegt werden können.
    $("#search").keydown(function (e) {
      if (e.keyCode == 13) {
        searchForSite();
      }
    });

    //Wenn der Button neben dem Suchfeld angeklickt wird, wird die Funktion searchForSite() ausgeführt.
    $('#button1').click(function () {
      searchForSite();
    });

    //Die Eingabe des Users wird abgefragt. Es werden Leerstellen entfernt und Die Buchstaben in kleine umgewandelt.
    //Für jeden String aus der unserer Datenbank unter dem Punkt "Gorge" oder "Site" wird das gleiche gemacht um mögliche Fehler zu vermeiden.
    //Stimmt die eingebae des Users mit einer gesuchten Site oder Gorge wird der Layer geleert und nur das Gesuchte Ergebnis angezeigt.
    function searchForSite() {
      var input = document.getElementById("search").value;
      var site;
      var gorge;
      var state = 0;
      input = input.toLowerCase();
      input = input.replace(/ /g, '');
      for (var i = 0; i < daten.length; i++) {
        gorge = daten[i].Gorge;
        gorge = gorge.toLowerCase();
        gorge = gorge.replace(/ /g, '');
        site = daten[i].Site;
        site = site.toLowerCase();
        site = site.replace(/ /g, '');
        if (site == input) {

          getSitesLayerToggle.checked = false;
          clearLayer();
          addPoint(i);
        } else if (gorge == input) {
          if (state == 0) {
            clearLayer();
            getSitesLayerToggle.checked = false;
            state = 1;
          } else {
            addPoint(i);
          }
        }
      }
    }

    //Leert den Layer
    function clearLayer() {

      graphicsLayer.removeAll();
    }

    //Läuft per for Schleife durch die Datenbank. Für jeden Eintrag wird addPoint() und am Ende addPolygon() ausgeführt.
    function getSites() {
      clearLayer();

      for (var i = 0; i < daten.length; i++) {
        addPoint(i);
      }
      addPolygon();
    }

    //zunächst werden Variablen mit Informationen aus der DatenbNk belegt.
    //Die Attribute für das PopUp werden gesetzt.
    //simplemarkerSymbol, point und graphic werden erstellt.
    //simplemarkerSymbol beschreibt das aussehen der Graphic, point ist der Typ, bestimmt also die Form und enthält die Koordinaten.
    //graphic ist das Objekt welches dem Layer hinzugefügt wird. es enthält point, simpleMarkerSymbol, attributesund das PopupTemplate.
    function addPoint(i) {
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
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
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

    //Fügt das Polygon zum Layer hinzu.
    function addPolygon() {
      var polygon = {
        type: "polygon",
        rings: [
          [14.567988, -21.026032],
          [14.576892, -21.066444],
          [14.579845, -21.076203],
          [14.578668, -21.082714],
          [14.576360, -21.090961],
          [14.572514, -21.093505],
          [14.578734, -21.103087],
          [14.562788, -21.111770],
          [14.572675, -21.126702],
          [14.589679, -21.188398],
          [14.601220, -21.177878],
          [14.657098, -21.143921],
          [14.675094, -21.117051],
          [14.686745, -21.104411],
          [14.671904, -21.068789],
          [14.639504, -21.042081],
          [14.602096, -21.035809],
          [14.567988, -21.026032]
        ]
      };

      var fillSymbol = {
        type: "simple-fill",
        color: [227, 139, 79, 0.8],
        outline: {
          color: [255, 255, 255],
          width: 1
        }
      };

      var polygonGraphic = new Graphic({
        geometry: polygon,
        symbol: fillSymbol,
        popupTemplate: template
      });

      graphicsLayer.graphics.add(polygonGraphic);
    }

    //fügt den Layer zu Map hinzu.
    map.add(graphicsLayer);

    //getSites() wird beim Laden der HTML Seite augeführt, da direkt alle Sites angezeigt werden sollen.
    getSites();
  });
});