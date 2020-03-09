$.getJSON('../database/json/TabelleMitCoordinates.json', function(data) {
    var daten = data;
    
    require([
        "esri/Map",
        "esri/views/SceneView",
        "esri/layers/GraphicsLayer",
        "esri/Graphic",
        "esri/PopupTemplate"

    ], function(Map, SceneView, GraphicsLayer, Graphic, PopupTemplate) {

        var graphicsLayer = new GraphicsLayer();

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

        var simpleMarkerSymbol = {
            type: "simple-marker",
            color: [226, 119, 40], // orange
            outline: {
                color: [255, 255, 255], // white
                width: 1,
            },
            size: 5
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

        function getSites() {
          clearLayer();
          
          var coulor = [];
            for (var i = 0; i < daten.length; i++) {
              var discoverer = daten[i].Discoverer;
              discoverer = discoverer.toLowerCase();
              discoverer = discoverer.replace(/ /g, '');
              discoverer = discoverer.replace('/', '');
              discoverer = discoverer.replace('&', '');
              
              
              switch(discoverer) {
                case "toiwoshipahu":
                  coulor = [0, 255, 0]; //green
                  break;
                case "toiwo" || "j.toiwo":
                  coulor = [0, 0, 255]; //blue
                  break;
                case "toiwolameka":
                  coulor = [];
                  break;
                case "shipahu":
                  coulor = [255, 255, 0]; // yellow
                  break;
                case "shipahupaulus":
                  coulor = [];
                  break;
                case "shipahupager":
                  coulor = [];
                  break;
                case "s.a.pager":
                  coulor = [226, 119, 40]; // orange
                  break;
                case "pagermatheus":
                  coulor = [];
                  break;
                case "matheus" || "e.matheus":
                  coulor = [];
                  break; 
                case "camby" || "camby´srock":
                  coulor = [];
                  break;
                case "roth" || "h.roth":
                  coulor = [];
                  break;
                case "lempproth":
                  coulor = [];
                  break;
                case "lempp" || "h.lempp":
                  coulor = [];
                  break;
                case "viereck" || "a.viereck":
                  coulor = [];
                  break;
                case "paulus" || "f.paulus":
                  coulor = [];
                  break;
                case "clauss" || "clauss-darrer":
                  coulor = [];
                  break;
                case "walter" || "j.j.d.walter":
                  coulor = [];
                  break;
                case "rudner" || "j.rudner":
                  coulor = [];
                  break;
                case "craven" || "dr.craven" || "dr.d.craven":
                  coulor = [];
                  break;
                case "jipsen":
                  coulor = [];
                  break;
                case "keyenstüber" || "kleyenstüber":
                  coulor = [];
                  break;
                case "nashilengo" || "j.nashilongo" || "nashilongo" || "nshilongo":
                  coulor = [];
                  break;
                case "kambonde":
                  coulor = [];
                  break;
                case "scherze":
                  coulor = [];
                  break;                                     
                default:
                break;
              }

              addPoint(i, coulor);
            }
        }

        function getSitesByYearMonth (y, m){
          clearLayer();
          var coulor = [226, 119, 40];
          for (var i = 0; i < daten.length; i++) {
            var year, month, discoverer;
            year = daten[i].Date_of_Discovery, month = daten[i].Date_of_Discovery;
            year = year.slice(6, 10), month = month.slice(3, 5);
            year = parseInt(year), month = parseInt(month);

            discoverer = daten[i].Discoverer;
            console.log(discoverer);
            
            if(year < y ||  year <= y && month <= m ){
              addPoint(i, coulor);
            }
          }
        }

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
              a = "Ga'aseb";
              coulor = [0, 0, 255]; // blau
              break;
            case  6:
              a = "Hungorob";
              coulor = [128, 128, 128]; // hellgrau
              break;
            case  7:
              a = "Karoab";
              coulor = [0, 191, 255]; // hellblau
              break;
            case  8:
              a = "Märchen";
              coulor = [0, 0, 0]; // schwarz
              break;
            case  9:
              a = "Naib";
              coulor = [184, 134, 11]; // gold
              break;
            case  10:
              a = "Numas";
              coulor = [153, 51, 153]; // violet
              break;
            case  11:
              a = "Orabes";
              coulor = [0, 128, 0]; // grün
              break;
            case  12:
              a = "Porters";
              coulor = [139, 0, 0]; // dunkelrot
              break;
            case  13:
              a = "Quagga";
              coulor = [255, 255, 255]; // weiß
              break;
            case  14:
              a = "Raiders";
              coulor = [102, 255, 51]; // knallgrün
              break;
            case  15:
              a = "Umuab";
              coulor = [238, 130, 238]; // rosa
              break;
          }
          
          let state = false;
          for (var i = 0; i < daten.length; i++) {
            
            if(a == daten[i].Gorge) {
              addPoint(i, coulor);
              state = true;
            } else if(state == true){
                break;
            }
          }
        }

        function addPoint(i, coulor) {
          var lat = daten[i].Latitude;
          var long = daten[i].Longitude;
          var site = daten[i].Site;
          var gorge = daten[i].Gorge;
          var siteIMG1 = daten[i].SiteIMG1, siteIMG2 = daten[i].SiteIMG2, siteIMG3 = daten[i].SiteIMG3, siteIMG4 = daten[i].SiteIMG4, siteIMG5 = daten[i].SiteIMG5, siteIMG6 = daten[i].SiteIMG6, siteIMG7 = daten[i].SiteIMG7, siteIMG8 = daten[i].SiteIMG8, siteIMG9 = daten[i].SiteIMG9, siteIMG10 = daten[i].SiteIMG10;
          var img1 = daten[i].IMG1, img2 = daten[i].IMG2, img3 = daten[i].IMG3, img4 = daten[i].IMG4, img5 = daten[i].IMG5, img6 = daten[i].IMG6, img7 = daten[i].IMG7, img8 = daten[i].IMG8, img9 = daten[i].IMG9, img10 = daten[i].IMG10;
          
          var attributes = {
            Lat: lat,
            Long: long,
            Site: site,
            Gorge: gorge,
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

        //Die folgenden 25 Zeilen händeln die Funktionen der GorgesMap (checkboxes).
        var getGorgesLayerToggle = document.getElementsByClassName("box");
        
        for(let i = 0; i < getGorgesLayerToggle.length; i++)
        {
          getGorgesLayerToggle[i].checked = false;
        }

        for(let i=0; i < getGorgesLayerToggle.length; i++)
        {
          var gorgeID = document.getElementById(i);
          gorgeID.addEventListener("change", function() {
            if(getGorgesLayerToggle[i].checked){
              b = false;
              getGorges(i);
            } else{
              clearLayer();
              for(let j = 0; j < getGorgesLayerToggle.length; j++){
                gorgeID = document.getElementById(j);
                if(gorgeID.checked){
                  getGorges(j);
                }
              }
            }
          });
        }
          
      map.add(graphicsLayer);
      
      var y = 1980;
      var m = 03;
      //getSites();
      //getSitesByYearMonth (y, m);
    });
});





/*
*
*
*
  ToDoooo
  HTML
    Layout
    Dropdown
    Map einbindung
    Startseite Inhalte
    Galerie Inhalte

  MAP
    Animation
    Layer Interaktion
      implementieren

      Gorges farbig
      timebar farbig (Discoverer)
      Balken

      getAllSites() - search for Site



    PopUp gestalten - Inhalte
*
*
*
 */

/*

1"Toiwo & Shipahu"

"Toiwo/ Shipahu"

"Toiwo/Shipahu"

2"Toiwo"

"J. Toiwo"

3"Toiwo/ Lameka"

4"Shipahu"

5"Shipahu/Paulus"

6"Shipahu/Pager"

7"S.A. Pager"

8"Pager/Matheus"

9"Matheus"

"E.Matheus"

10"Camby´s Rock"
​
"Camby"

11"Roth"

"H. Roth"

12"Lempp/ Roth"

13"Lempp"

"H. Lempp"

14"Viereck"
​
"A. Viereck"

15"Paulus"

"F.Paulus"

"F. Paulus"

16"Clauss"

"Clauss- Darrer"

"Clauss-Darrer"

17"Walter"

"J.J.D.Walter"

18"Rudner"

"J. Rudner"

19"Craven"

"Dr. Craven"

"Dr. D. Craven"
​
20"Jipsen"
​​​
21"Keyenstüber"

"Kleyenstüber"
​
22"Nashilengo"

"J. Nashilongo"

"Nashilongo"
​
"Nshilongo"
​​​
23"Kambonde"

24"Scherz"

*/