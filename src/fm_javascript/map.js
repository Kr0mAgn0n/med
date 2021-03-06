dojo.require("esri.map");
//dojo.require("esri.dijit.Legend");
//dojo.require("esri.arcgis.utils");
//dojo.require("esri.dijit.Measurement");
//dojo.require("esri.dijit.Scalebar");
//dojo.require("esri.dijit.OverviewMap");
//dojo.require("esri.tasks.query");
//dojo.require("esri.toolbars.draw");
//dojo.require("esri.toolbars.Navigation");
//dojo.require("esri.layers.osm");
dojo.require("esri.dijit.BasemapGallery");
dojo.require("dojo.json");
dojo.require("dojo.data.ItemFileWriteStore");
dojo.require("dojo.fx");
dojo.require("dojox.grid.EnhancedGrid");
dojo.require("dojox.grid.enhanced.plugins.exporter.CSVWriter");
dojo.require("dojox.grid.enhanced.plugins.Pagination");
dojo.require("dojox.grid.enhanced.plugins.IndirectSelection");
//dojo.require("dijit.Toolbar");
dojo.require("dijit.form.Select");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.CheckBox");
dojo.require("dijit.form.Button");
dojo.require("dijit.Dialog");
//dojo.require("dijit.Tooltip");
dojo.require("dijit.form.Form");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");

dojo.require("agsjs.dijit.TOC");
dojo.require("agsjs.layers.GoogleMapsLayer");

var map, initExtent;
var basemaps;
var identifyTask, identifyParams;
var initExtent;
var measurement;
var cp, ie, limites_politicos, ugel_layer;

function init() {
	var bienvenida_dialog = dijit.byId("bienvenida_dialog");
	bienvenida_dialog.show();

	initTooltips();

	/*
	 * La declaración de la capa de OpenStreet es necesaria para el
	 * funcionamiento del Overview
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
	

	map = new esri.Map("map", {
		extent : initExtent,
		wrapAround180 : true,
		sliderStyle : "small",
		logo : false
	});


	var basemapGallery = createBasemapGallery(map, "basemapList");

	console.log(basemapGallery);

	cp = new esri.layers.ArcGISDynamicMapServiceLayer("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/cp/MapServer");

	ie = new esri.layers.ArcGISDynamicMapServiceLayer("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/ie/MapServer");

	limites_politicos = new esri.layers.ArcGISTiledMapServiceLayer("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/lim_pol/MapServer");

	ugel_layer = new esri.layers.ArcGISTiledMapServiceLayer("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/lim_ugel/MapServer");

	map.addLayers([cp, ie, limites_politicos, ugel_layer]);

	require(["esri/layers/osm", "esri/dijit/OverviewMap"], function() {

		var layerInfos = [];

		layerInfos.push({
			layer : cp,
			title : "Centros Poblados"
		});

		layerInfos.push({
			layer : ie,
			title : "Instituciones Educativas"
		});

		layerInfos.push({
			layer : limites_politicos,
			title : "Límites Políticos"
		});

		layerInfos.push({
			layer : ugel_layer,
			title : "UGEL"
		});

		dojo.connect(map, 'onLayersAddResult', function(results) {
			var toc = new agsjs.dijit.TOC({
				map : map,
				layerInfos : layerInfos
			}, 'legendDiv');
			toc.startup();
		});

		ugel_layer.setVisibility(false);

		var osml = new esri.layers.OpenStreetMapLayer();
		var overviewMapDijit = new esri.dijit.OverviewMap({
			map : map,
			baseLayer : osml,
			height : 0.25 * map.height,
			width : 0.25 * map.width
		});
		overviewMapDijit.startup();

		console.log("Se cargó el hilo del Overview.")
	});

	llenarFormulario();
	dojo.connect(dijit.byId("searchForm"), "onSubmit", busqueda);

	dojo.connect(window, "onresize", function() {
		if (map) {
			map.resize();
			map.setExtent(map.extent);
		}

	});

	//initCustom();

	iniciarGrid();

	iniciarIdentify();

	iniciarNavegacion();

	onMapLoaded();

	desactivarCargando();

	dijit.byId("tabs1").resize();
	dijit.byId("tabs2").resize();

	dojo.style('cargando', 'opacity', 0.5);
}

function createBasemapGallery(mapa, div) {
	basemaps = [];
	basemaps.push(new esri.dijit.Basemap({
		layers : [new esri.dijit.BasemapLayer({
			type : 'GoogleMapsRoad'
		})],
		title : "Google Road",
		id : 'GoogleRoad',
		thumbnailUrl : dojo.moduleUrl("agsjs.dijit", "images/googleroad.png")
	}));
	basemaps.push(new esri.dijit.Basemap({
		layers : [new esri.dijit.BasemapLayer({
			type : 'GoogleMapsSatellite'
		})],
		title : "Google Satellite",
		id : 'GoogleSatellite',
		thumbnailUrl : dojo.moduleUrl("agsjs.dijit", "images/googlesatellite.png")
	}));
	basemaps.push(new esri.dijit.Basemap({
		layers : [new esri.dijit.BasemapLayer({
			type : 'GoogleMapsHybrid'
		})],
		title : "Google Hybrid",
		id : 'GoogleHybrid',
		thumbnailUrl : dojo.moduleUrl("agsjs.dijit", "images/googlehybrid.png")
	}));
	basemaps.push(new esri.dijit.Basemap({
		layers : [new esri.dijit.BasemapLayer({
			type : 'OpenStreetMap'
		})],
		title : "OpenStreet",
		id : 'OpenStreetMap',
		thumbnailUrl : "images/osm.jpg"
	}));

	basemaps.push(new esri.dijit.Basemap({
		layers : [new esri.dijit.BasemapLayer({
			url : 'http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer'
		})],
		title : "Lona Gris",
		id : 'LonaGris',
		thumbnailUrl : "images/lonagris.png"
	}));

	var gallery = new esri.dijit.BasemapGallery({
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
		map : mapa
	}, div);

	gallery.startup();
	gallery.select('GoogleHybrid');

	return gallery;

}

function onMapLoaded() {
	console.log('map loaded enter');

	require(["esri/dijit/Scalebar"], function() {
		var scalebar = new esri.dijit.Scalebar({
			map : map,
			attachTo : "bottom-left",
			scalebarUnit : 'metric'
		});
	});

	require(["esri/dijit/Measurement"], function() {
		measurement = new esri.dijit.Measurement({
			map : map,
			defaultAreaUnit : esri.Units.SQUARE_KILOMETERS,
			defaultLengthUnit : esri.Units.KILOMETERS
		}, dojo.byId('measurementDiv'));
		measurement.startup();
	});

	console.log(res);

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
	} else {
		console.log('map not found');
	}

};

window.onresize = function() {
	if (map) {
		map.resize();
		dijit.byId("tabs1").resize();
		dijit.byId("tabs2").resize();
	} else {
		console.log('map not found');
	}

};

dojo.addOnLoad(init);
