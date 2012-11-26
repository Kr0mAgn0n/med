dojo.require("esri.dijit.Measurement");
dojo.require("esri.dijit.Scalebar");
dojo.require("esri.map");
dojo.require("agsjs.layers.GoogleMapsLayer");
dojo.require("agsjs.dijit.TOC");
dojo.require("dojo.fx");
dojo.require("esri.dijit.OverviewMap");
dojo.require("esri.layers.FeatureLayer");
dojo.require("esri.tasks.query");
dojo.require("dojox.grid.EnhancedGrid");
dojo.require("dojo.data.ItemFileWriteStore");
dojo.require("dojox.grid.enhanced.plugins.exporter.CSVWriter");
dojo.require("esri.dijit.Print");
dojo.require("dijit.Toolbar");
dojo.require("esri.toolbars.draw");
dojo.require("esri.toolbars.Navigation");

var map;
var currentBasemap;
var identifyTask, identifyParams;
var initExtent;
var measurement

function init() {

	initExtent = new esri.geometry.Extent({
		"xmin" : -9052049.2735,
		"ymin" : -2078120.579,
		"xmax" : -7643108.7015,
		"ymax" : -10153.778299998492,
		"spatialReference" : {
			"wkid" : 102100
		}
	});

	map = new esri.Map("map", {
		extent : initExtent,
		wrapAround180 : true,
		sliderStyle : "small",
		logo : false,
	});

	createBasemapGallery()

	centros_poblados = new esri.layers.ArcGISDynamicMapServiceLayer(
			"http://escale.minedu.gob.pe/medgis/rest/services/carto_base/cp/MapServer");
	map.addLayer(centros_poblados);

	limites_politicos = new esri.layers.ArcGISTiledMapServiceLayer(
			"http://escale.minedu.gob.pe/medgis/rest/services/carto_base/pol/MapServer");
	// map.addLayer(limites_politicos);

	ie = new esri.layers.ArcGISDynamicMapServiceLayer(
			"http://escale.minedu.gob.pe/medgis/rest/services/carto_base/ie/MapServer");
	// map.addLayer(ie);

	var toc = new agsjs.dijit.TOC({
		map : map,
		layerInfos : [ {
			layer : centros_poblados,
			title : "Centros Poblados"
		}, {
			layer : limites_politicos,
			title : "Límites Políticos"
		}, {
			layer : ie,
			title : "Instituciones Educativas"
		} ]
	}, 'toc');
	toc.startup();

	/*
	 * La declaración de la capa de OpenStreet es necesaria para el
	 * funcionamiento del Overview
	 */
	osml = new esri.layers.OpenStreetMapLayer();
	var overviewMapDijit = new esri.dijit.OverviewMap({
		map : map,
		baseLayer : osml,
		height : 0.25 * map.height,
		width : 0.25 * map.width
	});
	overviewMapDijit.startup();

	llenarFormulario();

	dojo.connect(dojo.byId("formulario"), "onsubmit", busqueda);
	//$("#formulario").submit(busqueda);

	dojo.connect(window, "onresize", function() {
		if (map)
			map.resize();
	});

	inicializarGrid();

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

	desactivarCargando();

	dojo.style('cargando', 'opacity', 0.5);

}

function createBasemapGallery() {
	var basemaps = [];
	basemaps.push(new esri.dijit.Basemap({
		layers : [ new esri.dijit.BasemapLayer({
			type : 'GoogleMapsRoad'
		}) ],
		title : "Google Road",
		id : 'GoogleRoad',
		thumbnailUrl : dojo.moduleUrl("agsjs.dijit", "images/googleroad.png")
	}));
	basemaps.push(new esri.dijit.Basemap({
		layers : [ new esri.dijit.BasemapLayer({
			type : 'GoogleMapsSatellite'
		}) ],
		title : "Google Satellite",
		id : 'GoogleSatellite',
		thumbnailUrl : dojo.moduleUrl("agsjs.dijit",
				"images/googlesatellite.png")
	}));
	basemaps.push(new esri.dijit.Basemap({
		layers : [ new esri.dijit.BasemapLayer({
			type : 'GoogleMapsHybrid'
		}) ],
		title : "Google Hybrid",
		id : 'GoogleHybrid',
		thumbnailUrl : dojo.moduleUrl("agsjs.dijit", "images/googlehybrid.png")
	}));
	basemaps.push(new esri.dijit.Basemap({
		layers : [ new esri.dijit.BasemapLayer({
			type : 'OpenStreetMap'
		}) ],
		title : "OpenStreet",
		id : 'OpenStreetMap',
		thumbnailUrl : "images/bm-street.jpg"
	}));

	var basemapGallery = new esri.dijit.BasemapGallery({
		showArcGISBasemaps : false,
		basemaps : basemaps,
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
	basemapGallery.select('GoogleHybrid');

	dojo.connect(basemapGallery, "onError", function(msg) {
		if (console)
			console.log(msg)
	});
}

function onMapLoaded() {
	console.log('map loaded enter');

	var scalebar = new esri.dijit.Scalebar({
		map : map,
		attachTo : "bottom-left",
		scalebarUnit : 'metric'
	});

	measurement = new esri.dijit.Measurement({
		map : map,
		defaultAreaUnit : esri.Units.SQUARE_KILOMETERS,
		defaultLengthUnit : esri.Units.KILOMETERS
	}, dojo.byId('measurementDiv'));
	measurement.startup();

	dojo.connect(map, 'onMouseMove', res.showCoords);
	res.showCoords(map.extent.getCenter());

	dojo.connect(map, 'onExtentChange', onMapExtentChange);
	onMapExtentChange();

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

dojo.ready(init);