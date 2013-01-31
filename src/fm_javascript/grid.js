//var store, storeExporter
var grid, gridExporter;
// datos, datosExporter;
var gridMemory = {
	memory : []
	//selectedIndex
};

function iniciarGrid() {
	datos = {
		items : []
	};

	datosExporter = {
		items : []
	};

	grid = new dojox.grid.EnhancedGrid({
		escapeHTMLInData : false,
		plugins : {
			pagination : {
				id : "gridPaginator",
				description : true,
				sizeSwitch : false,
				pageStepper : true,
				gotoButton : true,
				maxPageStep : 4,
				position : "top",
				defaultPageSize : 25,
				onPageStep : function() {
					grid.selection.clear();
					dijit.byId("selectAll").setChecked(false);
				}
			},
			indirectSelection : {
				width : "5px",
				styles : "text-align: center;"
			}
		},
		onSelectionChanged : markSelected
		/*onSelectionChanged : markSelected,
		 onDeselected : function (rowIndex) {
		 if (isDeselectedAll(this)) {
		 console.log("Se deseleccionó todo.");
		 onDeselectedAll();
		 }
		 }*/
	}, dojo.create("div", {}, dojo.byId("fm_results")));

	grid.startup();

	dojo.connect(window, "onresize", function() {
		grid.resize();
		grid.update();
	});

	gridExporter = new dojox.grid.EnhancedGrid({
		//rowsPerPage : 0,
		plugins : {
			exporter : true,
			pagination : {
				id : "gridExporterPaginator",
				description : true,
				sizeSwitch : false,
				pageStepper : true,
				gotoButton : true,
				maxPageStep : 4,
				position : "top",
				defaultPageSize : 25,
			},
		}
	});

	console.log("Se cargó el hilo del grid.");
}

function hacerZoom(longitud, latitud) {
	if (longitud !== '-80' && latitud !== '-10') {
		map.graphics.clear();
		point = new esri.geometry.Point(longitud, latitud, new esri.SpatialReference({
			wkid : 5373
		}));
		point = esri.geometry.geographicToWebMercator(point);
		graphic = new esri.Graphic(point, new esri.symbol.PictureMarkerSymbol('images/i_target.png', 38, 38));
		map.graphics.add(graphic);
		map.centerAndZoom(point, 14);
	} else {
		alert("El Centro Poblado o Institución Educativa no está ubicado.");
	}

}

function exportarTodo() {
	gridExporter.exportGrid("csv", function(str) {
		//window.open('data:text/csv;charset=utf-8,' + escape(str));

	});
}

function prevGrid() {
	console.log(gridMemory);
	map.graphics.clear();
	dijit.byId("selectAll").setChecked(false);
	if (gridMemory.selectedIndex - 1 >= 0) {
		switch (gridMemory.memory[gridMemory.selectedIndex - 1].type) {
			case 'identify':
				grid.onStyleRow = styleRowIdentify;
				break;
			case 'ie':
				grid.onStyleRow = styleRowIE;
				break;
			case 'cp':
				grid.onStyleRow = styleRowCP;
				break;
		}

		grid.setStructure(gridMemory.memory[gridMemory.selectedIndex - 1].layout);
		grid.setStore(gridMemory.memory[gridMemory.selectedIndex - 1].store);
		gridExporter.setStructure(gridMemory.memory[gridMemory.selectedIndex - 1].layoutExporter);
		gridExporter.setStore(gridMemory.memory[gridMemory.selectedIndex - 1].storeExporter);

		/*gridExporter.exportGrid("csv", function(str) {
		 console.log(str);
		 dojo.byId("csv").value = str;
		 });*/

		gridMemory.selectedIndex--;
	}
}

function nextGrid() {
	console.log(gridMemory);
	map.graphics.clear();
	dijit.byId("selectAll").setChecked(false);
	if (gridMemory.selectedIndex + 1 < gridMemory.memory.length) {
		switch (gridMemory.memory[gridMemory.selectedIndex + 1].type) {
			case 'identify':
				grid.onStyleRow = styleRowIdentify;
				break;
			case 'ie':
				grid.onStyleRow = styleRowIE;
				break;
			case 'cp':
				grid.onStyleRow = styleRowCP;
				break;
		}

		grid.setStructure(gridMemory.memory[gridMemory.selectedIndex + 1].layout);
		grid.setStore(gridMemory.memory[gridMemory.selectedIndex + 1].store);
		gridExporter.setStructure(gridMemory.memory[gridMemory.selectedIndex + 1].layoutExporter);
		gridExporter.setStore(gridMemory.memory[gridMemory.selectedIndex + 1].storeExporter);

		/*gridExporter.exportGrid("csv", function(str) {
		 console.log(str);
		 dojo.byId("csv").value = str;
		 });*/

		gridMemory.selectedIndex++;
	}
}

function selectAllCallback(newvalue) {
	console.log(newvalue);

	if (newvalue === true)
		grid.selection.selectRange(0, grid.scroller.rowCount - 1);
	else {
		//var rowsSelected = grid.selection.getSelected();
		grid.selection.deselectRange(0, grid.scroller.rowCount - 1);
		/*if (rowsSelected.length !== 0) {
		 points = dojo.map(rowsSelected, function(row) {
		 return [dojo.trim(row.longitud[0].split(":")[1]), dojo.trim(row.latitud[0].split(":")[1])];
		 });

		 mpJson = {
		 "points" : points,
		 "spatialReference" : {
		 " wkid" : 5373
		 }
		 };

		 multipoint = esri.geometry.geographicToWebMercator(new esri.geometry.Multipoint(mpJson));

		 map.setExtent(multipoint.getExtent(), true);
		 }*/
	}

}

function markSelected() {
	map.graphics.clear();

	var rowsSelected = grid.selection.getSelected();

	gridExporter.selection.deselectAll();
	
	dojo.forEach(rowsSelected, function(obj) {
		gridExporter.selection.addToSelection(obj._0);
	});

	if (rowsSelected.length !== 0) {
		var points = [];
		dojo.forEach(rowsSelected, function(row) {
			if (dojo.trim(row.longitud[0].split(":")[1]) !== '-80' && dojo.trim(row.latitud[0].split(":")[1]) !== '-10')
				points.push([dojo.trim(row.longitud[0].split(":")[1]), dojo.trim(row.latitud[0].split(":")[1])]);
		});

		mpJson = {
			"points" : points,
			"spatialReference" : {
				" wkid" : 5373
			}
		};

		multipoint = esri.geometry.geographicToWebMercator(new esri.geometry.Multipoint(mpJson));

		graphic = new esri.Graphic(multipoint, new esri.symbol.PictureMarkerSymbol('images/i_target.png', 38, 38));

		map.graphics.add(graphic);
		map.setExtent(multipoint.getExtent(), true);
	}

}

function isDeselectedAll(somegrid) {
	rowsSelected = somegrid.selection.getSelected();

	if (rowsSelected.length === 0) {
		return true;
	} else {
		return false;
	}

}

/*function onDeselectedAll () {
 map.graphics.clear();
 }*/
