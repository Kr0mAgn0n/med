function busqueda(e) {
	dojo.stopEvent(e);

	console.log(e);

	activarCargando();

	ubigeo = e.currentTarget.ubigeo;
	nombre_iiee = e.currentTarget.nombre_iiee;
	codigo_modular = e.currentTarget.codigo_modular;
	codigo_local = e.currentTarget.codigo_local;
	//direccion = e.currentTarget.direccion;
	nombre_ccpp1 = e.currentTarget.nombre_ccpp1;
	localidad = e.currentTarget.localidad;
	nivel_modalidad = e.currentTarget.nivel_modalidad;
	gestion = e.currentTarget.gestion;
	nombre_ccpp2 = e.currentTarget.nombre_ccpp2;
	codigo_ccpp1 = e.currentTarget.codigo_ccpp1;
	codigo_ccpp2 = e.currentTarget.codigo_ccpp2;
	codigo_ugel = e.currentTarget.codigo_ugel;

	var xhrArgsIE = {
		url : "http://escale.minedu.gob.pe/mapaeducativolenguas/restservicesig/service/restsig.svc/padron",
		handleAs : "json",
		content : {
			codgeo : ubigeo.value,
			codugel : codigo_ugel.value,
			codmod : codigo_modular.value,
			anexo : '',
			nombreie : nombre_iiee.value,
			codlocal : codigo_local.value,
			direccion : '',
			cenpob : nombre_ccpp1.value,
			localidad : localidad.vaue,
			nivmod : nivel_modalidad.value,
			gesdep : gestion.value,
			codcp : codigo_ccpp1.value
		},
		load: processFormIE
	}
	
	var xhrArgsCP = {
		url : "http://escale.minedu.gob.pe/mapaeducativolenguas/restservicesig/service/restsig.svc/ccpp",
		handleAs : "json",
		content : {
			codgeo : ubigeo.value,
			codcp : codigo_ccpp2.value,
			codugel : codigo_ugel.value,
			nomcp : nombre_ccpp2.value,
			ubicado : '',
			area : '',
			fuentecp : ''
		},
		load: processFormCP
	}

	if (dijit.byId("tabs2").selectedChildWidget.title == "Padrón II.EE.") {
		var deferred = dojo.xhrGet(xhrArgsIE);
	}
	
	if (dijit.byId("tabs2").selectedChildWidget.title == "Centros Poblados") {
		var deferred = dojo.xhrGet(xhrArgsCP);
	}
	

}


function processFormIE(resp) {

	var data = dojo.json.parse(resp);

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
		'name' : 'Dirección',
		'field' : 'direccion'
	}], [{
		'name' : 'Docentes',
		'field' : 'docentes'
	}], [{
		'name' : 'Alumnos',
		'field' : 'alumnos'
	}], [{
		'name' : 'Altitud',
		'field' : 'altitud'
	}], [{
		'name' : 'Fuente CP',
		'field' : 'fuente_cp'
	}], [{
		'name' : 'Latitud',
		'field' : 'latitud'
	}], [{
		'name' : 'Longitud',
		'field' : 'longitud'
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
		'name' : 'Dirección',
		'field' : 'direccion'
	}, {
		'name' : 'Docentes',
		'field' : 'docentes'
	}, {
		'name' : 'Alumnos',
		'field' : 'alumnos'
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

	dojo.forEach(data.Rows, function(item) {
		items = {
			ubigeo : 'Ubigeo: ' + item.CODIGO_UBIGEO,
			departamento : 'Departamento: ' + item.DEPARTAMENTO,
			provincia : 'Provincia: ' + item.PROVINCIA,
			distrito : 'Distrito: ' + item.DISTRITO,
			nombre_del_centro_poblado : 'Nombre del Centro Poblado: ' + item.NOMBRE_CENTRO_POBLADO,
			codigo_del_centro_poblado : 'Código del Centro Poblado: ' + item.COD_CENTRO_POBLADO,
			localidad : 'Localidad: ' + item.NOMBRE_LOCALIDAD,
			codigo_local : 'Código Local: ' + item.CODIGO_LOCAL,
			codigo_modular : 'Código Modular: ' + item.CODIGO_MODULAR,
			nombre_ie : 'Nombre de la IE: ' + item.NOMBRE_ESCUELA,
			nivel : 'Nivel: ' + item.NIVEL_MODALIDAD,
			direccion : 'Dirección: ' + item.DIRECCION_ESCUELA,
			docentes : 'Docentes: ' + item.TOTAL_DOCENTES,
			alumnos : 'Alumnos: ' + item.TOTAL_ALUMNOS,
			altitud : 'Altitud: ' + item.ALTITUD,
			fuente_cp : 'Fuente CP: ' + item.FUENTECP,
			latitud : 'Latitud: ' + item.LATITUD_DEC,
			longitud : 'Longitud: ' + item.LONGITUD_DEC,
			enlaces : "<a class='img-enlaces' onclick='hacerZoom(" + item.LONGITUD_DEC + "," + item.LATITUD_DEC + ");'><img src='images/zoom.png'></a><a class='img-enlaces' onclick='irAFicha(\"" + item.CODIGO_MODULAR + "\",\"" + item.ANEXO + "\");'><img src='images/ficha.png'></a>"
		};

		itemsExporter = {
			ubigeo : item.CODIGO_UBIGEO,
			departamento : item.DEPARTAMENTO,
			provincia : item.PROVINCIA,
			distrito : item.DISTRITO,
			nombre_del_centro_poblado : item.NOMBRE_CENTRO_POBLADO,
			codigo_del_centro_poblado : item.COD_CENTRO_POBLADO,
			localidad : item.NOMBRE_LOCALIDAD,
			codigo_local : item.CODIGO_LOCAL,
			codigo_modular : item.CODIGO_MODULAR,
			nombre_ie : item.NOMBRE_ESCUELA,
			nivel : item.NIVEL_MODALIDAD,
			direccion : item.DIRECCION_ESCUELA,
			docentes : item.TOTAL_DOCENTES,
			alumnos : item.TOTAL_ALUMNOS,
			altitud : item.ALTITUD,
			fuente_cp : item.FUENTECP,
			latitud : item.LATITUD_DEC,
			longitud : item.LONGITUD_DEC
		};

		datos.items.push(items);
		datosExporter.items.push(itemsExporter);
	});

	store = new dojo.data.ItemFileWriteStore({
		data : datos
	});

	grid.setStructure(layout);

	grid.setStore(store);

	storeExporter = new dojo.data.ItemFileWriteStore({
		data : datosExporter
	});

	gridExporter.setStructure(layoutExporter);

	gridExporter.setStore(storeExporter);

	gridExporter.exportGrid("csv", function(str) {
		console.log(str);
		dojo.byId("csv").value = str;
	});
	
	gridMemory.memory.push({
		store: store,
		storeExporter: storeExporter,
		layout: layout,
		layoutExporter: layoutExporter,
		tipo: 'ie'
	});
	
	gridMemory.selectedIndex = gridMemory.memory.length - 1;

	dojo.query(".fm_button").removeClass("fm_button_active");
	dojo.query(".fm_results_trigger").addClass("fm_button_active");
	dojo.query(".fm_panel").style('display', 'none');
	dojo.query(".fm_results").style('display', 'block');

	desactivarCargando();
}

function processFormCP(resp) {

	var data = dojo.json.parse(resp);

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
		'field' : 'latitud'
	}], [{
		'name' : 'Longitud',
		'field' : 'longitud'
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

	dojo.forEach(data.Rows, function(item) {
		console.log(item);
		console.log(item.NIVEL);
		console.log(item.LONGITUD_DEC)
		items = {
			ubigeo : 'Ubigeo: ' + item.UBIGEO,
			departamento : 'Departamento: ' + item.DEPARTAMENTO,
			provincia : 'Provincia: ' + item.PROVINCIA,
			distrito : 'Distrito: ' + item.DISTRITO,
			codigo_del_centro_poblado : 'Código del Centro Poblado: ' + item.CODCP,
			nombre_del_centro_poblado : 'Código del Centro Poblado: ' + item.DENOMINACION,
			con_iiee : '¿Tiene IE?: ' + item.CON_IE,
			numero_de_iiee : 'Número de Instituciones Educativas: ' + item.N_IIEE,
			nivel : 'Nivel: ' + item.NIVEL,
			capital : '¿Es capital?: ' + item.CAPITAL,
			fuente_cp : 'Fuente CP: ' + item.FUENTE_SIG,
			altitud : 'Altitud: ' + item.ALT_CP,
			latitud : 'Latitud: ' + item.LATITUD_DEC,
			longitud : 'Longitud: ' + item.LONGITUD_DEC,
			enlaces : "<a class='img-enlaces' onclick='hacerZoom(" + item.LONGITUD_DEC + "," + item.LATITUD_DEC + ");'><img src='images/zoom.png'></a><a class='img-enlaces'><img src='images/ficha.png'></a>"
		};

		itemsExporter = {
			ubigeo : item.UBIGEO,
			departamento : item.DEPARTAMENTO,
			provincia : item.PROVINCIA,
			distrito : item.DISTRITO,
			codigo_del_centro_poblado : item.CODCP,
			nombre_del_centro_poblado : item.DENOMINACION,
			con_iiee : item.CON_IE,
			numero_de_iiee : item.N_IIEE,
			nivel : item.NIVEL,
			capital : item.CAPITAL,
			fuente_cp : item.FUENTE_SIG,
			altitud : item.ALT_CP,
			latitud : item.LATITUD_DEC,
			longitud : item.LONGITUD_DEC,
		};

		datos.items.push(items);
		datosExporter.items.push(itemsExporter);
	});

	store = new dojo.data.ItemFileWriteStore({
		data : datos
	});

	grid.setStructure(layout);

	grid.setStore(store);

	storeExporter = new dojo.data.ItemFileWriteStore({
		data : datosExporter
	});

	gridExporter.setStructure(layoutExporter);

	gridExporter.setStore(storeExporter);

	gridExporter.exportGrid("csv", function(str) {
		console.log(str);
		dojo.byId("csv").value = str;
	});
	
	gridMemory.memory.push({
		store: store,
		storeExporter: storeExporter,
		layout: layout,
		layoutExporter: layoutExporter,
		tipo: 'cp'
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