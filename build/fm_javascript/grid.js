var store,grid,datos;function inicializarGrid(){datos={items:[]};grid=new dojox.grid.EnhancedGrid({},dojo.create("div",{},dojo.byId("fm_results")));grid.startup();dojo.connect(window,"onresize",function(){grid.resize();grid.update()});dojo.connect(grid,"onRowClick",function(a){map.graphics.clear();aux=grid.getItem(a.rowIndex).longitud[0].split(" ");aux2=grid.getItem(a.rowIndex).latitud[0].split(" ");point=new esri.geometry.Point(aux[1],aux2[1],new esri.SpatialReference({wkid:5373}));point=esri.geometry.geographicToWebMercator(point);var b=new esri.Graphic(point,new esri.symbol.PictureMarkerSymbol("images/i_target.png",38,38));map.graphics.add(b);map.centerAndZoom(point,14)})};