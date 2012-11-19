var store, grid, datos;

function inicializarGrid() {
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
}
