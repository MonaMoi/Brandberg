

$.getJSON('../database/json/TabelleMitCoordinatesUndBildern.json', function(data) {
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

      document.getElementById("search").value = "";
      var getSitesLayerToggle = document.getElementById("0");
      getSitesLayerToggle.checked = true;
      getSitesLayerToggle.addEventListener("change", function() {
        if(getSitesLayerToggle.checked){
          getSites();
          document.getElementById("search").value = "";
        }
      });

        $("#search").keydown(function (e) {
          if (e.keyCode == 13) {
            searchForSite();
          }
        });

        $('#button1').click(function(){
          searchForSite();
        });

      function searchForSite(){
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
            if(site == input){

              getSitesLayerToggle.checked = false;
              clearLayer();
              addPoint(i);
            }else if(gorge == input){
              if(state == 0){
                clearLayer();
                getSitesLayerToggle.checked = false;
                state = 1;
              }else{
                addPoint(i);
              }
            }
          }
      }
      
      
        
        

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
      view.watch("stationary", function(isStationary) {
        showCoordinates(view.center);
      });
      view.on("pointer-move", function(evt) {
        showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
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

          
          
        function clearLayer() {

            graphicsLayer.removeAll();
        }  

        function getSites() {
          clearLayer();
          
          for (var i = 0; i < daten.length; i++) {
              addPoint(i);
            }
            addPolygon();
        }

        function addPoint(i) {
          if(daten[i].Gorge == "Sesaub / Basswaldrinne"){
            var gorgeSesaub = ", für diese Gorge liegen keine Bilddaten vor.";
          }else{
            var discription ="Dies ist ein Bild aus der Gorge ";
          }
          var lat = daten[i].Latitude;
          var long = daten[i].Longitude;
          var site = daten[i].Site;
          var gorge = daten[i].Gorge;
          var siteIMG1 = daten[i].SiteIMG1, siteIMG2 = daten[i].SiteIMG2, siteIMG3 = daten[i].SiteIMG3, siteIMG4 = daten[i].SiteIMG4, siteIMG5 = daten[i].SiteIMG5, siteIMG6 = daten[i].SiteIMG6, siteIMG7 = daten[i].SiteIMG7, siteIMG8 = daten[i].SiteIMG8, siteIMG9 = daten[i].SiteIMG9, siteIMG10 = daten[i].SiteIMG10;
          var img1 = daten[i].Picture_Link_to_gorge1, img2 = daten[i].Picture_Link_to_gorge2, img3 = daten[i].Picture_Link_to_gorge3, img4 = daten[i].Picture_Link_to_gorge4, img5 = daten[i].Picture_Link_to_gorge5, img6 = daten[i].Picture_Link_to_gorge6, img7 = daten[i].Picture_Link_to_gorge7, img8 = daten[i].Picture_Link_to_gorge8, img9 = daten[i].Picture_Link_to_gorge9, img10 = daten[i].Picture_Link_to_gorge10;
          
          var attributes = {
              Lat: lat,
              Long: long,
              Site: site,
              Gorge: gorge,
              GorgeSesaub: gorgeSesaub,
              Discription: discription,
              IMG1: img1, IMG2: img2, IMG3: img3, IMG4: img4, IMG5: img5, IMG6: img6, IMG7: img7, IMG8: img8, IMG9: img9, IMG10: img10,
              SiteIMG1: siteIMG1, SiteIMG2: siteIMG2, SiteIMG3: siteIMG3, SiteIMG4: siteIMG4, SiteIMG5: siteIMG5, SiteIMG6: siteIMG6, SiteIMG7: siteIMG7, SiteIMG8: siteIMG8, SiteIMG9: siteIMG9, SiteIMG10: siteIMG10
            };
          
          var simpleMarkerSymbol = {
            type: "simple-marker",
            color: [226, 119, 40],
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

        function addPolygon(){
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
            symbol: fillSymbol
            });

            graphicsLayer.graphics.add(polygonGraphic);
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
      
    
      getSites();
      
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

