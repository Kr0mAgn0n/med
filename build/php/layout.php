<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Printing: Layout Page</title>
    
    <link rel="stylesheet" type="text/css" href="http://serverapi.arcgisonline.com/jsapi/arcgis/1.3/js/dojo/dijit/themes/tundra/tundra.css">
    
    <script type="text/javascript" src="http://serverapi.arcgisonline.com/jsapi/arcgis/?v=1.3"></script>
    <script type="text/javascript" src="../js/printing.js"></script>
    <script type="text/javascript" src="../js/printablelayer.js"></script>
    
    <script type="text/javascript" charset="utf-8">
      dojo.require("esri.map");
    
      var appState = <?php echo $_POST["appState"] ?>;
      var map;
      
      function init() {
        //create map
        map = new esri.Map("mapDiv", {
          extent: new esri.geometry.Extent(appState.map.extent),
          showInfoWindowOnClick: false,
          slider: false
        });
        
        //on load, add graphics to map
        dojo.connect(map, "onLoad", addGraphicsToMap);

        //configure custom PrintableLayer
        esri.config.defaults.io.proxyUrl = "../../proxy.php";
        var layer = new my.PrintableLayer("http://localhost/devsummit09/printing/php/mergeAndOutput.php", {
          layers:appState.map.layers,
          extent: new esri.geometry.Extent(appState.map.extent)
        });
        dojo.connect(layer, "onError", errorHandler);
        
        //add layer to map
        map.addLayer(layer);
      }
      
      function errorHandler(err) {
        alert(err);
      }
      
      //deserialize graphics and add to map
      function addGraphicsToMap() {
        dojo.forEach(appState.map.graphics, function(graphic) {
          map.graphics.add(new esri.Graphic(graphic));
        });
        
        //open print dialog
        // window.print();
      }
      
      dojo.addOnLoad(init);
    </script>
  </head>
  <body class="tundra">
    <h2>Printing: Layout Page</h2>
    
    <div id="mapDiv" style="width:600px; height:400px; border:1px solid #000;"></div>
    
    <br />
    <b>Instructions:</b>
    <ul>
      <li>The map now uses a custom layer</li>
      <li>Custom layer information is passed from <a href="webpage.html" target="_blank">printing web page</a></li>
      <li>The custom layer makes calls to a server-side for map images</li>
      <li>The server-side code exports map images, merges them and returns the url to the merged image</li>
    </ul>
  </body>
</html>
