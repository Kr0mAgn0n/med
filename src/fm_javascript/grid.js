var store, storeExporter, grid, gridExporter, datos, datosExporter;
var gridMemory = {
	memory : [],
	//selectedIndex,
	//tipo
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
				description : true,
				sizeSwitch : false,
				pageStepper : true,
				gotoButton : true,
				maxPageStep : 4,
				position : "top"
			},
			indirectSelection : {
				width : "0",
				styles : "text-align: center;"
			}
		}
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
	point = new esri.geometry.Point(longitud, latitud, new esri.SpatialReference({
		wkid : 5373
	}));
	point = esri.geometry.geographicToWebMercator(point);
	graphic = new esri.Graphic(point, new esri.symbol.PictureMarkerSymbol('images/i_target.png', 38, 38));
	map.graphics.add(graphic);
	map.centerAndZoom(point, 14);
}

function exportarTodo() {
	gridExporter.exportGrid("csv", function(str) {
		//window.open('data:text/csv;charset=utf-8,' + escape(str));

	});
}

function prevGrid() {
	console.log(gridMemory);
	if (gridMemory.selectedIndex - 1 >= 0) {
		grid.setStructure(gridMemory.memory[gridMemory.selectedIndex - 1].layout);
		grid.setStore(gridMemory.memory[gridMemory.selectedIndex - 1].store);
		gridExporter.setStructure(gridMemory.memory[gridMemory.selectedIndex - 1].layoutExporter);
		gridExporter.setStore(gridMemory.memory[gridMemory.selectedIndex - 1].storeExporter);

		gridExporter.exportGrid("csv", function(str) {
			console.log(str);
			dojo.byId("csv").value = str;
		});

		switch (gridMemory.memory[gridMemory.selectedIndex - 1].tipo) {
			case 'ie':
				dojo.byId("resultMessage").innerHTML = "Filtro por Instituciones Educativas";
				break;

			case 'cp':
				dojo.byId("resultMessage").innerHTML = "Filtro por Centros Poblados";
				break;

			case 'identifyCP':
				dojo.byId("resultMessage").innerHTML = "Identificador de Centros Poblados";
				break;
		};

		gridMemory.selectedIndex--;
	}
}

function nextGrid() {
	console.log(gridMemory);
	if (gridMemory.selectedIndex + 1 < gridMemory.memory.length) {
		grid.setStructure(gridMemory.memory[gridMemory.selectedIndex + 1].layout);
		grid.setStore(gridMemory.memory[gridMemory.selectedIndex + 1].store);
		gridExporter.setStructure(gridMemory.memory[gridMemory.selectedIndex + 1].layoutExporter);
		gridExporter.setStore(gridMemory.memory[gridMemory.selectedIndex + 1].storeExporter);

		gridExporter.exportGrid("csv", function(str) {
			console.log(str);
			dojo.byId("csv").value = str;
		});

		switch (gridMemory.memory[gridMemory.selectedIndex + 1].tipo) {
			case 'ie':
				dojo.byId("resultMessage").innerHTML = "Filtro por Instituciones Educativas";
				break;

			case 'cp':
				dojo.byId("resultMessage").innerHTML = "Filtro por Centros Poblados";
				break;

			case 'identifyCP':
				dojo.byId("resultMessage").innerHTML = "Identificador de Centros Poblados";
				break;
		};

		gridMemory.selectedIndex++
	}
}

function zoomToSelection() {
	map.graphics.clear();
	gridExporter.selection.deselectAll();
		
	rowsSelected = grid.selection.getSelected();
	
	dojo.forEach(rowsSelected, function(row) {
		gridExporter.selection.addToSelection(row._0);
	});

	points = dojo.map(gridExporter.selection.getSelected(), function(row) {
		return [row.longitud[0], row.latitud[0]];
	});

	console.log(points);

	mpJson = {
		"points" : points,
		"spatialReference" : ( {
			" wkid" : 5373
		})
	};
	
	multipoint = esri.geometry.geographicToWebMercator(new esri.geometry.Multipoint(mpJson));
	
	console.log(multipoint);
	
	graphic = new esri.Graphic(multipoint, new esri.symbol.PictureMarkerSymbol('images/i_target.png', 38, 38));
	
	map.graphics.add(graphic);
	map.setExtent(multipoint.getExtent(), true);
}
