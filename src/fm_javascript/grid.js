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
	var graphic = new esri.Graphic(point, new esri.symbol.PictureMarkerSymbol('images/i_target.png', 38, 38));
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

		if (gridMemory.memory[gridMemory.selectedIndex - 1].tipo == 'ie') {
			dojo.byId("resultMessage").innerHTML = "Filtro por Instituciones Educativas";
		}

		if (gridMemory.memory[gridMemory.selectedIndex - 1].tipo == 'cp') {
			dojo.byId("resultMessage").innerHTML = "Filtro por Centros Poblados";
		}

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

		if (gridMemory.memory[gridMemory.selectedIndex + 1].tipo == 'ie') {
			dojo.byId("resultMessage").innerHTML = "Filtro por Instituciones Educativas";
		}

		if (gridMemory.memory[gridMemory.selectedIndex + 1].tipo == 'cp') {
			dojo.byId("resultMessage").innerHTML = "Filtro por Centros Poblados";
		}

		gridMemory.selectedIndex++
	}
}
