var punto, multipunto, mano_alzada, extension;
var drawToolbar;

function iniciarIdentify() {
	drawToolbar = new esri.toolbars.Draw(map);

	punto = new dijit.form.ToggleButton({
		iconClass : 'identifyPuntoIcon',
		label : 'Punto'
	}, dojo.byId("punto"));
	
	/*multipunto = new dijit.form.ToggleButton({
		iconClass : 'identifyPuntoIcon',
		label : 'Multipunto'
	}, dojo.byId("multipunto"));*/

	mano_alzada = new dijit.form.ToggleButton({
		iconClass : 'identifyFreeHandIcon',
		label : 'Mano Alzada'
	}, dojo.byId("mano-alzada"));

	extension = new dijit.form.ToggleButton({
		iconClass : 'identifyExtentIcon',
		label : 'Extensión'
	}, dojo.byId("extension"));

	dojo.connect(punto, "onClick", function() {
		if (punto.checked == true) {
			//multipunto.setChecked(false);
			mano_alzada.setChecked(false);
			extension.setChecked(false);
			drawToolbar.activate(esri.toolbars.Draw.POINT);
		} else
			drawToolbar.deactivate();
	});
	
	/*dojo.connect(multipunto, "onClick", function() {
		if (multipunto.checked == true) {
			punto.setChecked(false);
			mano_alzada.setChecked(false);
			extension.setChecked(false);
			drawToolbar.activate(esri.toolbars.Draw.MULTI_POINT);
		} else
			drawToolbar.deactivate();
	});*/

	dojo.connect(mano_alzada, "onClick", function() {
		if (mano_alzada.checked == true) {
			punto.setChecked(false);
			//multipunto.setChecked(false);
			extension.setChecked(false);
			drawToolbar.activate(esri.toolbars.Draw.FREEHAND_POLYGON);
		} else
			drawToolbar.deactivate();
	});

	dojo.connect(extension, "onClick", function() {
		if (extension.checked == true) {
			punto.setChecked(false);
			//multipunto.setChecked(false);
			mano_alzada.setChecked(false);
			drawToolbar.activate(esri.toolbars.Draw.EXTENT);
		} else
			drawToolbar.deactivate();
	});

	dojo.connect(drawToolbar, "onDrawEnd", manejadorDrawEnd);
}

function manejadorDrawEnd(geometria) {
	map.graphics.clear();
	graphic = new esri.Graphic(geometria, new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.5])));
	map.graphics.add(graphic);

	activarCargando();

	identifyTask = new esri.tasks.IdentifyTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/cp_ie/MapServer");
	identifyParams = new esri.tasks.IdentifyParameters();
	identifyParams.geometry = geometria;
	identifyParams.tolerance = 3;
	identifyParams.returnGeometry = false;
	identifyParams.width = map.width;
	identifyParams.height = map.height;
	identifyParams.mapExtent = map.extent;
	identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE;
	identifyParams.layersIds = [4];
	identifyTask.execute(identifyParams, identifyCallbackCP, identifyError);

}

function identifyCallbackCP(respuesta) {

	datos = {
		items : []
	};

	datosExporter = {
		items : []
	};

	layout = [[{
		'name' : 'Ubigeo',
		'field' : 'ubigeo'
	}], [{
		'name' : 'Nombre del Centro Poblado',
		'field' : 'nombre_del_centro_poblado'
	}], [{
		'name' : 'Código del Centro Poblado',
		'field' : 'codigo_del_centro_poblado'
	}], [{
		'name' : 'Con Institución Educativa',
		'field' : 'con_ie'
	}], [{
		'name' : 'Fuente',
		'field' : 'fuente_g'
	}], [{
		'name' : 'Altitud',
		'field' : 'altitud'
	}], [{
		'name' : 'Latitud',
		'field' : 'latitud',
		'hidden' : true
	}], [{
		'name' : 'Longitud',
		'field' : 'longitud',
		'hidden' : true
	}], [{
		'name' : 'Enlaces',
		'field' : 'enlaces'
	}]];

	layoutExporter = [[{
		'name' : 'Ubigeo',
		'field' : 'ubigeo'
	}], [{
		'name' : 'Nombre del Centro Poblado',
		'field' : 'nombre_del_centro_poblado'
	}], [{
		'name' : 'Código del Centro Poblado',
		'field' : 'codigo_del_centro_poblado'
	}], [{
		'name' : 'Con Institución Educativa',
		'field' : 'con_ie'
	}], [{
		'name' : 'Fuente',
		'field' : 'fuente_g'
	}], [{
		'name' : 'Altitud',
		'field' : 'altitud'
	}], [{
		'name' : 'Latitud',
		'field' : 'latitud'
	}], [{
		'name' : 'Longitud',
		'field' : 'longitud'
	}]];

	dojo.forEach(respuesta, function(respuesta) {
		items = {
			ubigeo : 'Ubigeo: ' + respuesta.feature.attributes.UBIGEO,
			codigo_del_centro_poblado : 'Código del Centro Poblado: ' + respuesta.feature.attributes.CODCP,
			nombre_del_centro_poblado : 'Nombre del Centro Poblado: ' + respuesta.feature.attributes.NOMCP,
			con_ie : '¿Tiene IE?: ' + respuesta.feature.attributes.CON_IE,
			fuente_g : 'Fuente: ' + respuesta.feature.attributes.FUENTE_G,
			altitud : 'Altitud: ' + respuesta.feature.attributes.Z,
			latitud : 'Latitud: ' + respuesta.feature.attributes.YGD,
			longitud : 'Longitud: ' + respuesta.feature.attributes.XGD,
			enlaces : "<a class='img-enlaces' onclick='hacerZoom(" + respuesta.feature.attributes.XGD + "," + respuesta.feature.attributes.YGD + ");'><img src='images/zoom.png'></a><a class='img-enlaces' onclick='irAIE(" + respuesta.feature.attributes.CODCP + ")'><img src='images/ficha.png'></a>"

		};

		itemsExporter = {
			ubigeo : respuesta.feature.attributes.UBIGEO,
			codigo_del_centro_poblado : respuesta.feature.attributes.CODCP,
			nombre_del_centro_poblado : respuesta.feature.attributes.NOMCP,
			con_ie : respuesta.feature.attributes.CON_IE,
			fuente_g : respuesta.feature.attributes.FUENTE_G,
			altitud : respuesta.feature.attributes.Z,
			latitud : respuesta.feature.attributes.YGD,
			longitud : respuesta.feature.attributes.XGD
		};

		datos.items.push(items);
		datosExporter.items.push(itemsExporter);
	});

	store = new dojo.data.ItemFileWriteStore({
		data : datos
	});

	grid.onStyleRow = styleRowIdentify;

	grid.setStructure(layout);
	grid.setStore(store);

	storeExporter = new dojo.data.ItemFileWriteStore({
		data : datosExporter
	});
	gridExporter.setStructure(layoutExporter);
	gridExporter.setStore(storeExporter);

	/*gridExporter.exportGrid("csv", function(str) {
	 dojo.byId("csv").value = str;
	 });*/

	gridMemory.memory.push({
		store : store,
		storeExporter : storeExporter,
		layout : layout,
		layoutExporter : layoutExporter,
		type : 'identify'
	});

	gridMemory.selectedIndex = gridMemory.memory.length - 1;

	dojo.query(".fm_button").removeClass("fm_button_active");
	dojo.query(".fm_results_trigger").addClass("fm_button_active");
	dojo.query(".fm_panel").style('display', 'none');
	dojo.query(".fm_results").style('display', 'block');

	desactivarCargando();
}

function identifyCallbackIE(respuesta) {

	datos = {
		items : []
	};

	layout = [[{
		'name' : 'Ubigeo',
		'field' : 'ubigeo'
	}], [{
		'name' : 'Departamento',
		'field' : 'departamento'
	}], [{
		'name' : 'Provincia',
		'field' : 'provincia'
	}], [{
		'name' : 'Distrito',
		'field' : 'distrito'
	}], [{
		'name' : 'Nombre del Centro Poblado',
		'field' : 'nombre_del_centro_poblado'
	}], [{
		'name' : 'Código del Centro Poblado',
		'field' : 'codigo_del_centro_poblado'
	}], [{
		'name' : 'Localidad',
		'field' : 'localidad'
	}], [{
		'name' : 'Código Local',
		'field' : 'codigo_local'
	}], [{
		'name' : 'Código Modular',
		'field' : 'codigo_modular'
	}], [{
		'name' : 'Nombre IE',
		'field' : 'nombre_ie'
	}], [{
		'name' : 'Nivel',
		'field' : 'nivel'
	}], [{
		'name' : 'Altitud',
		'field' : 'altitud'
	}], [{
		'name' : 'Fuente CP',
		'field' : 'fuente_cp'
	}], [{
		'name' : 'Latitud',
		'field' : 'latitud',
		'hidden' : true
	}], [{
		'name' : 'Longitud',
		'field' : 'longitud',
		'hidden' : true
	}], [{
		'name' : 'Enlaces',
		'field' : 'enlaces'
	}]];

	datosExporter = {
		items : []
	};

	layoutExporter = [[{
		'name' : 'Ubigeo',
		'field' : 'ubigeo'
	}, {
		'name' : 'Departamento',
		'field' : 'departamento'
	}, {
		'name' : 'Provincia',
		'field' : 'provincia'
	}, {
		'name' : 'Distrito',
		'field' : 'distrito'
	}, {
		'name' : 'Nombre del Centro Poblado',
		'field' : 'nombre_del_centro_poblado'
	}, {
		'name' : 'Código del Centro Poblado',
		'field' : 'codigo_del_centro_poblado'
	}, {
		'name' : 'Localidad',
		'field' : 'localidad'
	}, {
		'name' : 'Código Local',
		'field' : 'codigo_local'
	}, {
		'name' : 'Código Modular',
		'field' : 'codigo_modular'
	}, {
		'name' : 'Nombre IE',
		'field' : 'nombre_ie'
	}, {
		'name' : 'Nivel',
		'field' : 'nivel'
	}, {
		'name' : 'Altitud',
		'field' : 'altitud'
	}, {
		'name' : 'Fuente CP',
		'field' : 'fuente_cp'
	}, {
		'name' : 'Latitud',
		'field' : 'latitud'
	}, {
		'name' : 'Longitud',
		'field' : 'longitud'
	}]];

	dojo.forEach(respuesta, function(respuesta) {
		items = {
			codigo_ugel: respuesta.feature.attributes.CODOOII,
			centro_poblado: respuesta.feature.attributes.ciudad,
			centro_educativo: respuesta.feature.attributes.CEN_EDU,
			estado: respuesta.feature.attributes.ESTADO,
			gestion: respuesta.feature.attributes.GESTION,
			niveles: respuesta.feature.attributes.NIVELES,
			fuente: respuesta.feature.attributes.FUENTE,
			latitud: respuesta.feature.attributes.POINT_Y,
			longitud: respuesta.feature.attributes.POINT_X,
			enlaces : "<a class='img-enlaces' onclick='hacerZoom(" + respuesta.feature.attributes.XGD + "," + respuesta.feature.attributes.YGD + ");'><img src='images/zoom.png'></a><a class='img-enlaces' onclick='irAIE(" + respuesta.feature.attributes.CODCP + ")'><img src='images/ficha.png'></a>"

		};

		itemsExporter = {
			ubigeo : respuesta.feature.attributes.UBIGEO,
			codigo_del_centro_poblado : respuesta.feature.attributes.CODCP,
			nombre_del_centro_poblado : respuesta.feature.attributes.NOMCP,
			con_ie : respuesta.feature.attributes.CON_IE,
			fuente_g : respuesta.feature.attributes.FUENTE_G,
			altitud : respuesta.feature.attributes.Z,
			latitud : respuesta.feature.attributes.YGD,
			longitud : respuesta.feature.attributes.XGD
		};

		datos.items.push(items);
		datosExporter.items.push(itemsExporter);
	});

	store = new dojo.data.ItemFileWriteStore({
		data : datos
	});

	grid.onStyleRow = styleRowIdentify;

	grid.setStructure(layout);
	grid.setStore(store);

	storeExporter = new dojo.data.ItemFileWriteStore({
		data : datosExporter
	});
	gridExporter.setStructure(layoutExporter);
	gridExporter.setStore(storeExporter);

	/*gridExporter.exportGrid("csv", function(str) {
	 dojo.byId("csv").value = str;
	 });*/

	gridMemory.memory.push({
		store : store,
		storeExporter : storeExporter,
		layout : layout,
		layoutExporter : layoutExporter,
		type : 'identify'
	});

	gridMemory.selectedIndex = gridMemory.memory.length - 1;

	dojo.query(".fm_button").removeClass("fm_button_active");
	dojo.query(".fm_results_trigger").addClass("fm_button_active");
	dojo.query(".fm_panel").style('display', 'none');
	dojo.query(".fm_results").style('display', 'block');

	desactivarCargando();
}

function identifyError(error) {
	desactivarCargando();
	alert("La consulta no pudo ser hecha. " + error);
}

function styleRowIdentify(row) {
	console.log(row);
	if (row.index % 2 !== 0) {
		//if (!row.over) {
		row.customStyles += 'background: #D7EB66;';
		//}
	}

	if (row.over) {
		row.customStyles += 'background: #7FC5EB';
	}
	//grid.focus.styleRow(row);
	//grid.edit.styleRow(row);
}
