dojo.require("esri.dijit.Measurement");
dojo.require("esri.dijit.Scalebar");
dojo.require("esri.map");
dojo.require("esri.tasks.Locator");
dojo.require("esri.arcgis.utils");
dojo.require("agsjs.layers.GoogleMapsLayer");
dojo.require("agsjs.dijit.TOC");
dojo.require("dojo.fx");
dojo.require("esri.dijit.OverviewMap");
dojo.require("esri.layers.FeatureLayer");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("esri.tasks.query");
dojo.require("esri.tasks.find");
dojo.require("esri.layers.agstiled");
dojo.require("dojo.string");
dojo.require("dojo.io.script");
dojo.require("dojox.data.XmlStore");
dojo.require("dojox.grid.EnhancedGrid");
dojo.require("dojo.data.ItemFileWriteStore");
dojo.require("esri.dijit.Print");
dojo.require("dijit.Toolbar");
dojo.require("esri.toolbars.draw");
dojo.require("esri.toolbars.Navigation");

var map;
var currentBasemap;
var geocoder;
var webmapResponse;
var identifyTask, identifyParams;
var centros_poblados;
var store, grid, datos;
var initExtent;

/*
 * var basemaps = { "currentVersion": 10.01, "folders": ["Canvas",
 * "Demographics", "Elevation", "Reference", "Specialty"], "services": [{
 * "name": "NatGeo_World_Map", "type": "MapServer", 'image': 'bm-natgeo.jpg',
 * 'title': 'National Geographic' }, { "name": "Ocean_Basemap", "type":
 * "MapServer", 'image': 'bm-ocean.jpg', 'title': 'Oceans' }, //
 * {"name":"USA_Topo_Maps","type":"MapServer"}, { "name": "World_Imagery",
 * "type": "MapServer", 'image': 'bm-imagery.jpg', 'title': 'Imagery' }, {
 * "name": "World_Street_Map", "type": "MapServer", 'image': 'bm-street.jpg',
 * 'title': 'Street Map' }, { "name": "World_Terrain_Base", "type": "MapServer",
 * 'image': 'bm-terrain.png', 'title': 'Terrain' }, { "name": "World_Topo_Map",
 * "type": "MapServer", 'image': 'bm-topo.jpg', 'title': 'Topography' }] };
 */

function init() {
	/*
	 * var urlObject = esri.urlToObject(document.location.href); urlObject.query =
	 * urlObject.query || {}; var webmap = null; var embed = false;
	 * 
	 * if (urlObject.query.embed && urlObject.query.embed === 'true')
	 * res.embedSetup();
	 * 
	 * //check for webmap id if(urlObject.query.webmap) { //if
	 * (urlObject.query.embed && urlObject.query.embed === 'true')
	 * res.embedSetup();
	 * 
	 * webmap = urlObject.query.webmap; var mapDeferred =
	 * esri.arcgis.utils.createMap(webmap, "map", { mapOptions : { slider :
	 * true, nav : false, wrapAround180 : true }, ignorePopups : false,
	 * geometryServiceURL :
	 * "http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer"
	 * });
	 * 
	 * mapDeferred.addCallback(function(response){ webmapResponse = response;
	 * 
	 * //current basemap code currentBasemap =
	 * webmapResponse.itemInfo.itemData.baseMap.baseMapLayers[0].layerObject;
	 * 
	 * map = response.map; if(map.loaded) { onMapLoaded(); } else {
	 * dojo.connect(map, 'onLoad', onMapLoaded); } });
	 * 
	 * mapDeferred.addErrback(function(error) { console.log("CreateMap failed: ",
	 * dojo.toJson(error)); //alert("Unable to load Webmap - " +
	 * dojo.toJson(error)); }); } else {
	 */
	initExtent = new esri.geometry.Extent({
		"xmin" : -9052049.2735,
		"ymin" : -2078120.579,
		"xmax" : -7643108.7015,
		"ymax" : -10153.778299998492,
		"spatialReference" : {
			"wkid" : 102100
		}
	});

	var popup = new esri.dijit.Popup({
		fillSymbol : new esri.symbol.SimpleFillSymbol(
				esri.symbol.SimpleFillSymbol.STYLE_SOLID,
				new esri.symbol.SimpleLineSymbol(
						esri.symbol.SimpleLineSymbol.STYLE_SOLID,
						new dojo.Color([ 255, 0, 0 ]), 2), new dojo.Color([
						255, 255, 0, 0.25 ]))
	}, dojo.create("div"));

	map = new esri.Map("map", {
		extent : initExtent,
		wrapAround180 : true,
		sliderStyle : "small",
		logo : false,
		infoWindow : popup
	});

	dojo.connect(map, 'onUpdateStart', function() {
		activarCargando();
	});

	dojo.connect(map, 'onUpdateEnd', function() {
		desactivarCargando();
	});

	// Add the topographic layer to the map. View the ArcGIS Online site for
	// services
	// http://arcgisonline/home/search.html?t=content&f=typekeywords:service
	/*
	 * var basemap = new
	 * esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer", {
	 * id: 'basemap' }); currentBasemap = basemap; map.addLayer(currentBasemap);
	 */

	var basemap = new agsjs.layers.GoogleMapsLayer({
		// id: 'google', // optional. esri layer id.
		apiOptions : { // load google API should be loaded.
			v : '3.6' // API version. use a specific version is recommended
		// for
		// production system.
		// client: gme-myclientID // for enterprise accounts;
		},
		mapOptions : { // options passed to google.maps.Map contrustor
			streetViewControl : false
		// whether to display street view control. Default is true.
		}
	});
	currentBasemap = basemap;
	map.addLayer(currentBasemap);

	centros_poblados = new esri.layers.ArcGISDynamicMapServiceLayer(
			"http://escale.minedu.gob.pe/medgis/rest/services/carto_base/cp/MapServer");
	map.addLayer(centros_poblados);

	/*
	 * var limites_politicos = new
	 * esri.layers.ArcGISTiledMapServiceLayer("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/pol/MapServer");
	 * map.addLayer(limites_politicos);
	 */

	// Add some basic layers
	/*
	 * var rivers = new
	 * esri.layers.FeatureLayer("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Hydrography/Watershed173811/MapServer/1", {
	 * mode: esri.layers.FeatureLayer.MODE_ONDEMAND, outFields: ["*"] }); var
	 * waterbodies = new
	 * esri.layers.FeatureLayer("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Hydrography/Watershed173811/MapServer/0", {
	 * mode: esri.layers.FeatureLayer.MODE_ONDEMAND, outFields: ["*"] });
	 * 
	 * map.addLayers([waterbodies,rivers]);
	 */

	// dojo.connect(map, 'onLoad', onMapLoaded);
	/*
	 * var toc = new agsjs.dijit.TOC({ map: map, layerInfos: [{ layer:
	 * centros_poblados, title: "Centros Poblados" }, { layer:
	 * limites_politicos, title: "Límites Políticos" }] }, 'toc');
	 * toc.startup();
	 */

	// La declaración de la capa de OpenStreet es necesaria para el
	// funcionamiento del Overview
	osml = new esri.layers.OpenStreetMapLayer();
	var overviewMapDijit = new esri.dijit.OverviewMap({
		map : map,
		baseLayer : osml,
		height : 0.25 * map.height,
		width : 0.25 * map.width
	});
	overviewMapDijit.startup();

	llenarFormulario();

	dojo.connect(dojo.byId("buscar"), "onclick", busqueda);

	dojo.connect(window, "onresize", function() {
		if (map)
			map.resize();
	});

	// createBasemapGallery()

	datos = {
		items : []
	};

	grid = new dojox.grid.EnhancedGrid({}, dojo.create("div", {}, dojo
			.byId("fm_results")));

	grid.startup();

	dojo.connect(window, "onresize", function() {
		grid.resize();
		grid.update();
	});

	dojo.connect(grid, "onRowClick", function(e) {
		map.graphics.clear();
		aux = grid.getItem(e.rowIndex).longitud[0].split(" ");
		aux2 = grid.getItem(e.rowIndex).latitud[0].split(" ");
		point = new esri.geometry.Point(aux[1], aux2[1],
				new esri.SpatialReference({
					wkid : 5373
				}));
		point = esri.geometry.geographicToWebMercator(point);
		var graphic = new esri.Graphic(point,
				new esri.symbol.PictureMarkerSymbol('images/i_target.png', 38,
						38));
		map.graphics.add(graphic);
		map.centerAndZoom(point, 14);
	});

	printer = new esri.dijit.Print(
			{
				map : map,
				templates : [ {
					label : "Map",
					format : "PDF",
					layout : "MAP_ONLY",
					exportOptions : {
						width : 500,
						height : 400,
						dpi : 96
					}
				}, {
					label : "Layout",
					format : "PDF",
					layout : "A4 Portrait",
					layoutOptions : {
						titleText : "My Print",
						authorText : "esri",
						copyrightText : "My Company",
						scalebarUnit : "Miles",
					}
				} ],
				url : "http://escale.minedu.gob.pe/medgis/rest/services/Utilities/PrintingTools/GPServer/Export Web Map Task"
			}, dojo.byId("printer"));

	printer.startup();

	iniciarIdentify();

	iniciarNavegacion();

	onMapLoaded();

	dojo.style('cargando', 'opacity', 0.5);
	dojo.style('cargando', 'display', 'none');
	// }
}

function createBasemapGallery() {
	// add the basemap gallery, in this case we'll display maps from ArcGIS.com
	// including bing maps
	var basemapGallery = new esri.dijit.BasemapGallery({
		// showArcGISBasemaps: true,
		toggleReference : true,
		google : {
			apiOptions : {
				v : '3.6'
			},
			mapOptions : {
				streetViewControl : false
			}
		},
		map : map
	}, "basemapList");

	basemapGallery.startup();

	dojo.connect(basemapGallery, "onError", function(msg) {
		if (console)
			console.log(msg)
	});
}

function onMapLoaded() {
	console.log('map loaded enter');

	// initialize map elements
	var scalebar = new esri.dijit.Scalebar({
		map : map,
		attachTo : "bottom-left",
		scalebarUnit : 'metric'
	});
	// $(".esriScalebarLabel").each(function(){
	// this.style.width = 'auto';
	// }

	// add measurement tool
	var measurement = new esri.dijit.Measurement({
		map : map
	}, dojo.byId('measurementDiv'));
	measurement.startup();

	// create legend - only show legend for operational & graphic layers

	/*
	 * var legend = null; var layerInfos = []; if(webmapResponse &&
	 * webmapResponse.itemInfo && webmapResponse.itemInfo.itemData &&
	 * webmapResponse.itemInfo.itemData.operationalLayers.length > 0) {
	 * dojo.forEach(webmapResponse.itemInfo.itemData.operationalLayers,
	 * function(layer) {
	 * layerInfos.push({"title":layer.title,"layer":layer.layerObject}); }); }
	 * 
	 * if (layerInfos.length > 0 && false){ var legend = new esri.dijit.Legend({
	 * map : map, layerInfos : layerInfos, respectCurrentMapScale : true },
	 * "fm_legendDiv"); legend.startup(); } else{ var legend = new
	 * esri.dijit.Legend({ map : map, //layerInfos : layerInfos,
	 * respectCurrentMapScale : true }, "fm_legendDiv"); legend.startup(); }
	 */

	// populate information for map
	if (webmapResponse && webmapResponse.itemInfo
			&& webmapResponse.itemInfo.item) {
		res.populateMapInfo(webmapResponse.itemInfo.item);
	}

	// keep map coords updated
	dojo.connect(map, 'onMouseMove', res.showCoords);
	res.showCoords(map.extent.getCenter());
	// keep map info updated
	dojo.connect(map, 'onExtentChange', onMapExtentChange);
	onMapExtentChange();

	// call appropriate popup based on device type
	if (res.mobile)
		switchToMobile();
	else
		switchToDesktop();

	console.log('map loaded exit');
}

function onMapExtentChange() {
	var scale = Math.round(esri.geometry.getScale(map));

	if (scale > 999 && scale <= 999999) {
		scale = Math.round(scale / 1000) + " <b>K</b>";
	} else if (scale > 999999) {
		scale = Math.round(scale / 1000000) + " <b>M</b>";
	} else if (scale > 0 && scale <= 999) {
		scale = Math.round(scale) + " <b>Ft</b>";
	}

	res.updateScaleInfo(scale, map.getLevel());
}

function getBasemaps() {
	// add request to get basemaps
	showBasemaps(basemaps.services);
}

function getBasemapUrl(service) {
	return 'http://server.arcgisonline.com/ArcGIS/rest/services/'
			+ service.name + '/' + service.type;
}

function showBasemaps(basemaps) {
	var code = '';
	for (i = 0; i < basemaps.length; i++) {
		var basemap = basemaps[i];
		if (basemap.type === 'MapServer') {
			// code += "<p class='fm_container' >";
			code += "<a href='#' data-name='" + basemap.name
					+ "' class='fm_basemap_option' >" + "<img src='images/"
					+ basemap.image + "' class='fm_basemap_image' />"
					+ "<label>" + basemap.title + "</label>";
			+"</a>";
			// code += "</p>";
		}
	}
	$("#basemapList").html(code);
}

function setBasemap(name) {
	for (i = 0; i < basemaps.services.length; i++) {
		if (basemaps.services[i].name === name) {
			if (currentBasemap)
				map.removeLayer(currentBasemap);

			currentBasemap = new esri.layers.ArcGISTiledMapServiceLayer(
					getBasemapUrl(basemaps.services[i]), {
						id : 'basemap'
					});
			map.addLayer(currentBasemap);
			return true;
		}
	}
}

/*
 * function addLegend(results){ console.log('adding legend');
 * 
 * var layerInfo = dojo.map(results, function(layer,index){ return
 * {layer:layer.layer,title:layer.layer.name}; }); if(layerInfo.length > 0){ var
 * legendDijit = new esri.dijit.Legend({ map:map, layerInfos:layerInfo
 * },'fm_legendDiv'); legendDijit.startup(); } }
 */

dojo.ready(init);

// ** helpers ** DO NOT OVERWRITE
function switchToMobile() {
	// dojo.require("esri.dijit.Popup");
	// dojo.require("esri.dijit.PopupMobile");
	console.log('switch to mobile popup');
	require([ 'esri/dijit/PopupMobile' ], function() {
		if (esri && dojo && map && map.loaded) {
			console.log('changing popup type to mobile');
			var popupDijit = new esri.dijit.PopupMobile(null, dojo
					.create("div"));
			map.setInfoWindow(popupDijit);
		}
	});
}

function switchToDesktop() {
	console.log('switch to desktop popup');
	require([ 'esri/dijit/Popup' ], function() {
		if (esri && dojo && map && map.loaded) {
			console.log('changing popup type to desktop');
			var popupDijit = new esri.dijit.Popup(null, dojo.create("div"));
			map.setInfoWindow(popupDijit);
		}
	});
}

function activarCargando() {
	dojo.style('cargando', 'display', 'block');
}

function desactivarCargando() {
	dojo.style('cargando', 'display', 'none');
}
// ** end helpers **

/* window events */
window.onorientationchange = function() {
	if (map) {
		map.resize();
	} else
		console.log('map not found');
}

window.onresize = function() {
	if (map) {
		map.resize();
	} else
		console.log('map not found');
}