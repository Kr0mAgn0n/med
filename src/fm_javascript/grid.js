var store, storeExporter, grid, gridExporter, datos, datosExporter;

function inicializarGrid() {
	datos = {
		items : []
	};

	datosExporter = {
		items : []
	};

	grid = new dojox.grid.EnhancedGrid({
		escapeHTMLInData : false,
	}, dojo.create("div", {}, dojo.byId("fm_results")));

	grid.startup();

	dojo.connect(window, "onresize", function() {
		grid.resize();
		grid.update();
	});

	gridExporter = new dojox.grid.EnhancedGrid({
		plugins : {
			exporter : true
		}
	});

}

function hacerZoom(longitud, latitud) {
	map.graphics.clear();
	point = new esri.geometry.Point(longitud, latitud,
			new esri.SpatialReference({
				wkid : 5373
			}));
	point = esri.geometry.geographicToWebMercator(point);
	var graphic = new esri.Graphic(point, new esri.symbol.PictureMarkerSymbol(
			'images/i_target.png', 38, 38));
	map.graphics.add(graphic);
	map.centerAndZoom(point, 14);
}

function exportarTodo() {
	gridExporter.exportGrid("csv", function(str) {
		//window.open('data:text/csv;charset=utf-8,' + escape(str));
		
	});
};