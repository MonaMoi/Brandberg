var graphicsLayer;
var long;
var lat;
var site;
var gorge;
var simpleMarkerSymbol;
var point;
var daten;
var graphic;
var img1;
var img2;
var siteIMG1;
var siteIMG2;

$.getJSON('../database/json/TabelleTestIMG.json', function(data) {
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
        
        

          var PopupTemplate = { // autocasts as new PopupTemplate()
            title: "Fundstelle {Gorge} ",
  
            // Set content elements in the order to display.
            // The first element displayed here is the fieldInfos.
            content: [{
              // It is also possible to set the fieldInfos outside of the content
              // directly in the popupTemplate. If no fieldInfos is specifically set
              // in the content, it defaults to whatever may be set within the popupTemplate.
              type: "fields", // FieldsContentElement
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
              // You can also set a descriptive text element. This element
              // uses an attribute from the featurelayer which displays a
              // sentence giving the total amount of trees value within a
              // specified census block. Text elements can only be set within the content.
              type: "text", // TextContentElement
              text: "{Lat} <br> {Long} <br> Diese Site {Site} liegt in der Gorge {Gorge}."
            }, {
              // You can set a media element within the popup as well. This
              // can be either an image or a chart. You specify this within
              // the mediaInfos. The following creates a pie chart in addition
              // to two separate images. The chart is also set up to work with
              // related tables. Similar to text elements, media can only be set within the content.
              type: "media", // MediaContentElement
              mediaInfos: [{
                title: "Felsmalerei",
                type: "image",
                caption: "Dies ist ein Bild aus der Gorge {Gorge}",
                value: {
                  sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG1}/zz_additional_data/Photo/preview_1600_{IMG1}.png"
                }
              }, {
                title: "Indian Laurel Fig",
                caption: "tree species",
                value: {
                  sourceURL: "http://datenportal.ianus-fdz.de/components/fileBrowser/getPreview.jsp?filePath=/web_derivatives/Brandberg-Daureb-Pager/{Gorge}/{SiteIMG2}/zz_additional_data/Photo/preview_1600_{IMG2}.png"
                }
              }]
            }]
          }  

        function getSites() {
            for (var i = 0; i < daten.length; i++) {

                lat = daten[i].Latitude;
                long = daten[i].Longitude;
                site = daten[i].Site;
                siteIMG1 = daten[i].SiteIMG1;
                siteIMG2 = daten[i].SiteIMG2;
                gorge = daten[i].Gorge;
                img1 = daten[i].IMG1;
                img2 = daten[i].IMG2;
                console.log(gorge);
                console.log(img2);
                console.log(siteIMG2);

                point = {
                    type: "point",
                    longitude: long,
                    latitude: lat
                };

                var attributes = {
                    Lat: lat,
                    Long: long,
                    Site: site,
                    Gorge: gorge,
                    IMG1: img1,
                    IMG2: img2,
                    SiteIMG1: siteIMG1,
                    SiteIMG2: siteIMG2
                  };

                graphic = new Graphic({
                    geometry: point,
                    symbol: simpleMarkerSymbol,
                    attributes: attributes,
                    popupTemplate: PopupTemplate
                });

                graphicsLayer.graphics.add(graphic);
            }
        }

        getSites();
    });
});