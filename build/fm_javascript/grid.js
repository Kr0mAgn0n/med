var store,grid,gridExporter,datos,datosExporter;function inicializarGrid(){datos={items:[]};datosExporter={items:[]};grid=new dojox.grid.EnhancedGrid({escapeHTMLInData:false,},dojo.create("div",{},dojo.byId("fm_results")));grid.startup();dojo.connect(window,"onresize",function(){grid.resize();grid.update()});gridExporter=new dojox.grid.EnhancedGrid({plugins:{exporter:true}})}function hacerZoom(b,a){map.graphics.clear();point=new esri.geometry.Point(b,a,new esri.SpatialReference({wkid:5373}));point=esri.geometry.geographicToWebMercator(point);var c=new esri.Graphic(point,new esri.symbol.PictureMarkerSymbol("images/i_target.png",38,38));map.graphics.add(c);map.centerAndZoom(point,14)}function exportarTodo(){grid.exportGrid("csv",function(a){console.log(a)})};