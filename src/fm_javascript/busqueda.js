function busqueda(e) {
	if (e)
		dojo.stopEvent(e);

	var searchForm = dijit.byId("searchForm");

	if (!isBlank(searchForm)) {
		if (searchForm.validate()) {
			activarCargando();
			processSearch(searchForm);
		} else
			alert("Alguno de los datos no es válido.");
	} else {
		alert("El formulario no puede estar en blanco.");
	}

	dijit.byId("selectAll").setChecked(false);
	grid.selection.deselectAll();
}

function processSearch(searchForm) {
	var ubigeo = searchForm.getValues().ubigeo;
	var nombre_iiee = searchForm.getValues().nombre_iiee;
	var codigo_modular = searchForm.getValues().codigo_modular;
	var codigo_local = searchForm.getValues().codigo_local;
	//var direccion = e.currentTarget.direccion;
	var nombre_ccpp1 = searchForm.getValues().nombre_ccpp1;
	var localidad = searchForm.getValues().localidad;
	var nivel_modalidad = searchForm.getValues().nivel_modalidad === null ? "" : searchForm.getValues().nivel_modalidad;
	var gestion = searchForm.getValues().gestion === null ? "" : searchForm.getValues().gestion;
	var nombre_ccpp2 = searchForm.getValues().nombre_ccpp2;
	var codigo_ccpp1 = searchForm.getValues().codigo_ccpp1;
	var codigo_ccpp2 = searchForm.getValues().codigo_ccpp2;
	var codigo_ugel = searchForm.getValues().codigo_ugel;

	var xhrArgsIE = {
		url : "padron.php",
		handleAs : "json",
		content : {
			codgeo : ubigeo,
			codugel : codigo_ugel,
			codmod : codigo_modular,
			anexo : '',
			nombreie : nombre_iiee,
			codlocal : codigo_local,
			direccion : '',
			cenpob : nombre_ccpp1,
			localidad : localidad,
			nivmod : nivel_modalidad,
			gesdep : gestion,
			codcp : codigo_ccpp1
		},
		load : processFormIE,
		error : function(error) {
			desactivarCargando();
			alert("Un error inesperado a ocurrido: " + error);
		}
	};

	var xhrArgsCP = {
		url : "cp.php",
		handleAs : "json",
		content : {
			ubigeo : ubigeo,
			codcp : codigo_ccpp2,
			codugel : codigo_ugel,
			nomcp : nombre_ccpp2
		},
		load : processFormCP,
		error : function(error) {
			desactivarCargando();
			alert("Un error inesperado a ocurrido: " + error);
		}
	};

	if (dijit.byId("tabs2").selectedChildWidget.title == "Padrón II.EE.") {
		deferred = dojo.xhrGet(xhrArgsIE);
	}

	if (dijit.byId("tabs2").selectedChildWidget.title == "Centros Poblados") {
		deferred = dojo.xhrGet(xhrArgsCP);
	}
}

function processFormIE(resp) {
	
	var data = resp;

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

	console.log("Se declaró los layouts.");

	dojo.forEach(data, function(item) {

		items = {
			ubigeo : 'Ubigeo: ' + item.UBIGEO,
			departamento : 'Departamento: ' + item.DEPARTAMENTO,
			provincia : 'Provincia: ' + item.PROVINCIA,
			distrito : 'Distrito: ' + item.DISTRITO,
			nombre_del_centro_poblado : 'Centro Poblado: ' + item.NOMBRECP,
			codigo_del_centro_poblado : 'Código del Centro Poblado: ' + item.CODIGOCP,
			localidad : item.LOCALIDAD ? 'Localidad: ' + item.LOCALIDAD : 'Localidad: ',
			codigo_local : 'Código Local: ' + item.CODLOCAL,
			codigo_modular : 'Código Modular: ' + item.COD_MOD,
			nombre_ie : 'Nombre de la IE: ' + item.CEN_EDU,
			nivel : 'Nivel: ' + item.NIVEL,
			altitud : 'Altitud: ' + item.ALTITUD,
			fuente_cp : item.FUENTE_G ? 'Fuente CP: ' + item.FUENTE_G : 'Fuente CP: ',
			latitud : 'Latitud: ' + item.LATITUD,
			longitud : 'Longitud: ' + item.LONGITUD,
			enlaces : "<a class='img-enlaces' onclick='hacerZoom(" + item.LONGITUD + "," + item.LATITUD + ");'><img src='images/zoom.png'></a><a class='img-enlaces' onclick='irAFicha(\"" + item.COD_MOD + "\",\"" + item.ANEXO + "\");'><img src='images/ficha.png'></a>"
		};

		itemsExporter = {
			ubigeo : item.UBIGEO,
			departamento : item.DEPARTAMENTO,
			provincia : item.PROVINCIA,
			distrito : item.DISTRITO,
			nombre_del_centro_poblado : item.NOMBRECP,
			codigo_del_centro_poblado : item.CODIGOCP,
			localidad : item.LOCALIDAD,
			codigo_local : item.CODLOCAL,
			codigo_modular : item.COD_MOD,
			nombre_ie : item.CEN_EDU,
			nivel : item.NIVEL,
			altitud : item.ALTITUD,
			fuente_cp : item.FUENTE_G,
			latitud : item.LATITUD,
			longitud : item.LONGITUD
		};
		datos.items.push(items);
		datosExporter.items.push(itemsExporter);

	});

	store = new dojo.data.ItemFileWriteStore({
		data : datos
	});

	dijit.byId("selectAll").setChecked(false);

	grid.onStyleRow = styleRowIE;

	grid.setStructure(layout);

	grid.setStore(store);

	console.log("Store agregado a grid");

	storeExporter = new dojo.data.ItemFileWriteStore({
		data : datosExporter
	});

	gridExporter.setStructure(layoutExporter);

	gridExporter.setStore(storeExporter);

	/*gridExporter.exportGrid("csv", function(str) {
	 dojo.byId("csv").value = str;
	 });*/

	console.log("Store agregado a gridExporter");

	gridMemory.memory.push({
		store : store,
		storeExporter : storeExporter,
		layout : layout,
		layoutExporter : layoutExporter,
		type : 'ie'
	});

	gridMemory.selectedIndex = gridMemory.memory.length - 1;

	dojo.query(".fm_button").removeClass("fm_button_active");
	dojo.query(".fm_results_trigger").addClass("fm_button_active");
	dojo.query(".fm_panel").style('display', 'none');
	dojo.query(".fm_results").style('display', 'block');

	dojo.query(".dojoxGridRowOdd").style({
		'background' : 'red'
	});

	desactivarCargando();
}

function processFormCP(resp) {

	data = resp;

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
		'name' : 'Código del Centro Poblado',
		'field' : 'codigo_del_centro_poblado'
	}], [{
		'name' : 'Nombre del Centro Poblado',
		'field' : 'nombre_del_centro_poblado'
	}], [{
		'name' : '¿Tiene institución educativa?',
		'field' : 'con_iiee'
	}], [{
		'name' : 'Número de Instituciones Educativas',
		'field' : 'numero_de_iiee'
	}], [{
		'name' : 'Nivel',
		'field' : 'nivel'
	}], [{
		'name' : '¿Es capital?',
		'field' : 'capital'
	}], [{
		'name' : 'Fuente CP',
		'field' : 'fuente_cp'
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
		'name' : 'Código del Centro Poblado',
		'field' : 'codigo_del_centro_poblado'
	}, {
		'name' : 'Nombre del Centro Poblado',
		'field' : 'nombre_del_centro_poblado'
	}, {
		'name' : '¿Tiene institución educativa?',
		'field' : 'con_iiee'
	}, {
		'name' : 'Número de Instituciones Educativas',
		'field' : 'numero_de_iiee'
	}, {
		'name' : 'Nivel',
		'field' : 'nivel'
	}, {
		'name' : '¿Es capital?',
		'field' : 'capital'
	}, {
		'name' : 'Fuente CP',
		'field' : 'fuente_cp'
	}, {
		'name' : 'Altitud',
		'field' : 'altitud'
	}, {
		'name' : 'Latitud',
		'field' : 'latitud'
	}, {
		'name' : 'Longitud',
		'field' : 'longitud'
	}]];

	dojo.forEach(data, function(item) {
		items = {
			ubigeo : 'Ubigeo: ' + item.UBIGEO,
			departamento : 'Departamento: ' + item.DEPARTAMENTO,
			provincia : 'Provincia: ' + item.PROVINCIA,
			distrito : 'Distrito: ' + item.DISTRITO,
			codigo_del_centro_poblado : 'Código del Centro Poblado: ' + item.CODCP,
			nombre_del_centro_poblado : 'Centro Poblado: ' + item.NOMCCPP,
			con_iiee : '¿Tiene IE?: ' + item.CONIIEE,
			numero_de_iiee : 'Número de Instituciones Educativas: ' + item.NROIIEE,
			nivel : 'Nivel: ' + item.NIVEL,
			capital : '¿Es capital?: ' + item.CAPITAL,
			fuente_cp : 'Fuente CP: ' + item.FUENTE_CP,
			altitud : 'Altitud: ' + item.ALTITUD,
			latitud : 'Latitud: ' + item.LATITUD,
			longitud : 'Longitud: ' + item.LONGITUD,
			enlaces : "<a class='img-enlaces' onclick='hacerZoom(" + item.LONGITUD + "," + item.LATITUD + ");'><img src='images/zoom.png'></a><a class='img-enlaces' onclick='irAIE(" + item.CODCP + ")'><img src='images/ficha.png'></a>"
		};

		itemsExporter = {
			ubigeo : item.UBIGEO,
			departamento : item.DEPARTAMENTO,
			provincia : item.PROVINCIA,
			distrito : item.DISTRITO,
			codigo_del_centro_poblado : item.CODCP,
			nombre_del_centro_poblado : item.NOMCCPP,
			con_iiee : item.CONIIEE,
			numero_de_iiee : item.NROIIEE,
			nivel : item.NIVEL,
			capital : item.CAPITAL,
			fuente_cp : item.FUENTE_CP,
			altitud : item.ALTITUD,
			latitud : item.LATITUD,
			longitud : item.LONGITUD
		};

		datos.items.push(items);
		datosExporter.items.push(itemsExporter);
	});

	store = new dojo.data.ItemFileWriteStore({
		data : datos
	});

	dijit.byId("selectAll").setChecked(false);

	grid.onStyleRow = styleRowCP;

	grid.setStructure(layout);

	grid.setStore(store);

	storeExporter = new dojo.data.ItemFileWriteStore({
		data : datosExporter
	});

	gridExporter.setStructure(layoutExporter);

	gridExporter.setStore(storeExporter);

	/*gridExporter.exportGrid("csv", function(str) {
	 console.log(str);
	 dojo.byId("csv").value = str;
	 });*/

	gridMemory.memory.push({
		store : store,
		storeExporter : storeExporter,
		layout : layout,
		layoutExporter : layoutExporter,
		type : 'cp'
	});

	gridMemory.selectedIndex = gridMemory.memory.length - 1;

	dojo.query(".fm_button").removeClass("fm_button_active");
	dojo.query(".fm_results_trigger").addClass("fm_button_active");
	dojo.query(".fm_panel").style('display', 'none');
	dojo.query(".fm_results").style('display', 'block');

	desactivarCargando();
}

function irAFicha(codmod, anexo) {
	console.log(codmod);
	console.log(anexo);
	window.open("http://escale.minedu.gob.pe/PadronWeb/info/ce?cod_mod=" + codmod + "&anexo=" + anexo);
}

function irAIE(codcp) {
	searchForm = dijit.byId("searchForm");
	tabs2 = dijit.byId("tabs2");

	searchPrevValues = searchForm.getValues();
	tabs2PrevChild = tabs2.selectedChildWidget;

	searchForm.reset();
	newValues = searchForm.getValues();
	newValues.codigo_ccpp1 = String(codcp);
	searchForm.setValues(newValues);
	tabs2.selectChild(tabs2.getChildren()[0]);
	busqueda();
	searchForm.reset();
	searchForm.setValues(searchPrevValues);
	tabs2.selectChild(tabs2PrevChild);
}

function isBlank(searchForm) {
	var ubigeo = searchForm.getValues().ubigeo;
	var nombre_iiee = searchForm.getValues().nombre_iiee;
	var codigo_modular = searchForm.getValues().codigo_modular;
	var codigo_local = searchForm.getValues().codigo_local;
	var nombre_ccpp1 = searchForm.getValues().nombre_ccpp1;
	var localidad = searchForm.getValues().localidad;
	var nivel_modalidad = searchForm.getValues().nivel_modalidad === null ? "" : searchForm.getValues().nivel_modalidad;
	var gestion = searchForm.getValues().gestion === null ? "" : searchForm.getValues().gestion;
	var nombre_ccpp2 = searchForm.getValues().nombre_ccpp2;
	var codigo_ccpp1 = searchForm.getValues().codigo_ccpp1;
	var codigo_ccpp2 = searchForm.getValues().codigo_ccpp2;
	var codigo_ugel = searchForm.getValues().codigo_ugel;

	if (ubigeo === '' && nombre_iiee === '' && codigo_modular === '' && codigo_local === '' && nombre_ccpp1 === '' && localidad === '' && nivel_modalidad === '' && gestion === '' && nombre_ccpp2 === '' && codigo_ccpp1 === '' && codigo_ccpp2 === '' && codigo_ugel === '') {
		return true;
	} else {
		return false;
	}
}

function styleRowIE(row) {
	console.log(row);
	if (row.index % 2 !== 0) {
		//if (!row.over) {
		row.customStyles += 'background: #EBC97A;';
		//}
	}

	if (row.over) {
		row.customStyles += 'background: #7FC5EB';
	}
	//grid.focus.styleRow(row);
	//grid.edit.styleRow(row);
}

function styleRowCP(row) {
	console.log(row);
	if (row.index % 2 !== 0) {
		//if (!row.over) {
		row.customStyles += 'background: #9CEB94;';
		//}
	}

	if (row.over) {
		row.customStyles += 'background: #7FC5EB';
	}
	//grid.focus.styleRow(row);
	//grid.edit.styleRow(row);
}
