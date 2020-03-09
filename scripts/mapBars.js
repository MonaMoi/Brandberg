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
            
            camera: {
                // autocasts as new Camera()
                position: {
                  // autocasts as new Point()
                  x:  14.547518,
                  y: -21.367804,   
                  z: 9000.7049653716385
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
         
        function getSitesNumberofGorge(){
            var numberofSitesinGorge = 0;
            var temp = daten[0].Gorge;
            var NumberInPercent;
            for (var i = 0; i < daten.length; i++) {
                if(daten[i].Gorge == temp){
                    temp = daten[i].Gorge;
                    numberofSitesinGorge = numberofSitesinGorge + 1;
                }else{
                    console.log(numberofSitesinGorge);
                    NumberInPercent = (839 / 100) * numberofSitesinGorge;
                    getGorgeBars(NumberInPercent, temp);
                    temp = daten[i].Gorge;
                    numberofSitesinGorge = 1;
                }
            }
        }  

        function getGorgeBars(NumberInPercent, temp) {
          //clearLayer();
          //console.log(temp);
          var numOfSites = NumberInPercent * 10;
          //console.log(numOfSites);
          var gorgeBarsCoordinates = [
            14.483873, -21.177530, numOfSites, "Amis",
            14.470143, -21.120104, numOfSites, "Circus",
            14.458018, -21.169877, numOfSites, "Dom",
            14.589272, -21.215102, numOfSites, "Eros",
            14.551528, -21.210224, numOfSites, "Furrow",
            14.573625, -21.210378, numOfSites, "Ga'aseb",
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
          
          for(var i = 0; i < gorgeBarsCoordinates.length; i++){
            if(temp == gorgeBarsCoordinates[i+3]){  
                addBar(i, gorgeBarsCoordinates, numOfSites);
            }
          }
            
        }

        function addBar(i, gorgeBarsCoordinates, numOfSites){
            var polyline = {
                type: "polyline", // autocasts as new Polyline()
                paths: [
                    [gorgeBarsCoordinates[i], gorgeBarsCoordinates[i+1], 0],
                    [gorgeBarsCoordinates[i], gorgeBarsCoordinates[i+1], numOfSites]
                ]
              };
      
              lineSymbol = {
                type: "simple-line", // autocasts as SimpleLineSymbol()
                color: [226, 119, 40],
                width: 4
              };
      
              var polylineGraphic = new Graphic({
                geometry: polyline,
                symbol: lineSymbol
              });
      
            
            graphicsLayer.graphics.add(polylineGraphic);

            var point = {
                type: "point", // autocasts as new Point()
                x: gorgeBarsCoordinates[i], 
                y: gorgeBarsCoordinates[i+1],
                z: numOfSites + 10
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
                symbol: markerSymbol
              });

              graphicsLayer.graphics.add(pointGraphic);
        }  

          

        /*
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
        */
          
      map.add(graphicsLayer);
      getSitesNumberofGorge()
    
      
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