var graphicsLayer;
var long;
var lat;
var site;
var gorge;
var year;
var month;
var simpleMarkerSymbol;
var point;
var daten;
var graphic;
var img1, img2, img3, img4, img5, img6, img7, img8, img9, img10;
var siteIMG1, siteIMG2, siteIMG3, siteIMG4, siteIMG5, siteIMG6, siteIMG7, siteIMG8, siteIMG9, siteIMG10;

$.getJSON('../database/json/TabelleMitCoordinates.json', function(data) {
    daten = data;



    require([
        "esri/Map",
        "esri/views/SceneView",
        "esri/layers/GraphicsLayer",
        "esri/Graphic",
        "esri/PopupTemplate"

    ], function(Map, SceneView, GraphicsLayer, Graphic, PopupTemplate) {

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

        

        simpleMarkerSymbol = {
            type: "simple-marker",
            color: [226, 119, 40], // orange
            outline: {
                color: [255, 255, 255], // white
                width: 1,
            },
            size: 5
        };

        var attributes = {
          Lat: lat,
          Long: long,
          Site: site,
          Gorge: gorge,
          IMG1: img1, IMG2: img2, IMG3: img3, IMG4: img4, IMG5: img5, IMG6: img6, IMG7: img7, IMG8: img8, IMG9: img9, IMG10: img10,
          SiteIMG1: siteIMG1, SiteIMG2: siteIMG2, SiteIMG3: siteIMG3, SiteIMG4: siteIMG4, SiteIMG5: siteIMG5, SiteIMG6: siteIMG6, SiteIMG7: siteIMG7, SiteIMG8: siteIMG8, SiteIMG9: siteIMG9, SiteIMG10: siteIMG10
        };
        
        

          var PopupTemplate = {
            title: "Fundstelle {Gorge} ",
  
            content: [{
              type: "fields",
              fieldInfos: [{
                fieldName: "Point_Count",
                visible: false,
                label: "Count of Points",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              }, {
                fieldName: "relationships/0/Point_Count_COMMON",
                visible: false,
                label: "Number of figures",
                format: {
                  places: 0,
                  digitSeparator: true
                },
                statisticType: "sum"
              }, {
                fieldName: "relationships/0/COMMON",
                visible: false,
                label: "Common Name"
              }, {
                fieldName: "BLOCKCE10",
                visible: false,
                label: "Block"
              }]
            }, {
              type: "text", // TextContentElement
              text: "{Lat} <br> {Long} <br> Diese Site {Site} liegt in der Gorge {Gorge}."
            }, {
              type: "media", // MediaContentElement
              mediaInfos: [{
                title: "Felsmalerei",
                type: "image",
                caption: "Dies ist ein Bild aus der Gorge {Gorge}",
                value: {
                  sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG1}/zz_additional_data/Photo/preview_1600_{IMG1}.png"
                }
              }, {
                title: "Felsmalerei",
                type: "image",
                caption: "Dies ist ein Bild aus der Gorge {Gorge}",
                value: {
                  sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG2}/zz_additional_data/Photo/preview_1600_{IMG2}.png"
                }
              }, {
                title: "Felsmalerei",
                type: "image",
                caption: "Dies ist ein Bild aus der Gorge {Gorge}",
                value: {
                  sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG3}/zz_additional_data/Photo/preview_1600_{IMG3}.png"
                }
              }, {
                title: "Felsmalerei",
                type: "image",
                caption: "Dies ist ein Bild aus der Gorge {Gorge}",
                value: {
                  sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG4}/zz_additional_data/Photo/preview_1600_{IMG4}.png"
                }
              }, {
                title: "Felsmalerei",
                type: "image",
                caption: "Dies ist ein Bild aus der Gorge {Gorge}",
                value: {
                  sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG5}/zz_additional_data/Photo/preview_1600_{IMG5}.png"
                }
              }, {
                title: "Felsmalerei",
                type: "image",
                caption: "Dies ist ein Bild aus der Gorge {Gorge}",
                value: {
                  sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG6}/zz_additional_data/Photo/preview_1600_{IMG6}.png"
                }
              }, {
                title: "Felsmalerei",
                type: "image",
                caption: "Dies ist ein Bild aus der Gorge {Gorge}",
                value: {
                  sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG7}/zz_additional_data/Photo/preview_1600_{IMG7}.png"
                }
              }, {
                title: "Felsmalerei",
                type: "image",
                caption: "Dies ist ein Bild aus der Gorge {Gorge}",
                value: {
                  sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG8}/zz_additional_data/Photo/preview_1600_{IMG8}.png"
                }
              }, {
                title: "Felsmalerei",
                type: "image",
                caption: "Dies ist ein Bild aus der Gorge {Gorge}",
                value: {
                  sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG9}/zz_additional_data/Photo/preview_1600_{IMG9}.png"
                }
              }, {
                title: "Felsmalerei",
                type: "image",
                caption: "Dies ist ein Bild aus der Gorge {Gorge}",
                value: {
                  sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG10}/zz_additional_data/Photo/preview_1600_{IMG10}.png"
                }
              }]
            }]
          } 
          
          function clearLayer() {

            graphicsLayer.removeAll();
        }  

        function getGorges(a) {
          clearLayer();
          switch (a) {
            case 0:
              a = "Amis";
              break;
            case 1:
              a = "Circus";
              break;
            case 2:
              a = "Dom";
              break;
            case 3:
              a = "Eros";
              break;
            case 4:
              a = "Furrow";
              break;
            case 5:
              a = "Gaaseb";
              break;
            case  7:
              a = "Hungorob";
              break;
            case  8:
              a = "Karoab";
              break;
            case  9:
              a = "Märchen";
              break;
            case  10:
              a = "Naib";
              break;
            case  11:
              a = "Numas";
              break;
            case  12:
              a = "Nuwuarib";
              break;
            case  13:
              a = "Orabes";
              break;
            case  14:
              a = "Porters";
              break;
            case  15:
              a = "Quagga";
              break;
            case  16:
              a = "Raiders";
              break;
            case  17:
              a = "Tsisab";
              break;
            case  17:
              a = "Hungorob";
              break;
            case  18:
              a = "Uis";
              break;
            case  19:
              a = "Umuab";
              break;
          }

          let state = false;
          for (var i = 0; i < daten.length; i++) {
            
            if(a == daten[i].Gorge) {
              addPoint(i);
              state = true;
            } else if(state == true){
                break;
            }
              }
                    
        }
        
        function addPoint(i) {
          lat = daten[i].Latitude;
          long = daten[i].Longitude;
          site = daten[i].Site;
          gorge = daten[i].Gorge;
          siteIMG1 = daten[i].SiteIMG1, siteIMG2 = daten[i].SiteIMG2, siteIMG3 = daten[i].SiteIMG3, siteIMG4 = daten[i].SiteIMG4, siteIMG5 = daten[i].SiteIMG5, siteIMG6 = daten[i].SiteIMG6, siteIMG7 = daten[i].SiteIMG7, siteIMG8 = daten[i].SiteIMG8, siteIMG9 = daten[i].SiteIMG9, siteIMG10 = daten[i].SiteIMG10;
          img1 = daten[i].IMG1, img2 = daten[i].IMG2, img3 = daten[i].IMG3, img4 = daten[i].IMG4, img5 = daten[i].IMG5, img6 = daten[i].IMG6, img7 = daten[i].IMG7, img8 = daten[i].IMG8, img9 = daten[i].IMG9, img10 = daten[i].IMG10;
          
          point = {
            type: "point",
            longitude: long,
            latitude: lat
          };

          graphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
            attributes: attributes,
            popupTemplate: PopupTemplate
          });

          graphicsLayer.graphics.add(graphic);
        }
          
       map.add(graphicsLayer);

      var a = 1;
      getGorges(a);
      
      
    });
});