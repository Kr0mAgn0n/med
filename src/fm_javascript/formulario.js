function llenarFormulario() {
	// Guardando inputs del formulario en variables
	var departamento = dijit.byId("departamento");
	var provincia = dijit.byId("provincia");
	var distrito = dijit.byId("distrito");
	var ubigeo = dijit.byId("ubigeo");
	var nivel_modalidad = dijit.byId("nivel_modalidad");
	var gestion = dijit.byId("gestion");

	var direccion_regional = dijit.byId("direccion_regional");
	var ugel = dijit.byId("ugel");
	var codigo_ugel = dijit.byId("codigo_ugel");

	// Creando QueryTask para llamar los departamentos
	depQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/pol/MapServer/1");
	// Creando Query para llamar a los departamentos
	depQuery = new esri.tasks.Query();
	depQuery.where = "1=1";
	// Notar que son sentencias SQL
	depQuery.returnGeometry = true;
	// Retorna un punto, un polígono, etc, dependiendo de la geometría del servicio
	depQuery.outFields = ["IDDPTO", "NOMBDEP"];
	// Estos son los campos a llamar
	depQueryTask.execute(depQuery, function(resultado) {
		var departamentoOptions = [];
		var direccionRegionalOptions = []
		dojo.forEach(resultado.features, function(feature) {// Los campos se guardan en el campo de features del resultado del query
			departamentoOptions.push({
				value : feature.attributes["IDDPTO"], // Los campos se llaman como atributos dentro del campo features del resultado
				label : feature.attributes["NOMBDEP"],
				extent : feature.geometry.getExtent()
			});

			direccionRegionalOptions.push({
				value : feature.attributes["IDDPTO"], // Los campos se llaman como atributos dentro del campo features del resultado
				label : feature.attributes["NOMBDEP"],
				extent : feature.geometry.getExtent()
			});
		});

		departamento.addOption(departamentoOptions);
		direccion_regional.addOption(direccionRegionalOptions);
	});

	// Enlazando el envento 'onchange' al select del departamento para cargar dinámicamente los campos de provincias
	dojo.connect(departamento, "onChange", function(newvalue) {
		console.log("Departamento cambió.");
		console.log(newvalue);

		if (newvalue && newvalue != '')
			onDepartamentoChange(ubigeo, departamento, provincia, distrito, newvalue);
		else {
			provincia.removeOption(provincia.getOptions());
			provincia.addOption({
				label : ':: Seleccione ::',
				value : ''
			});
			provincia.setValue('');
			distrito.removeOption(distrito.getOptions());
			distrito.addOption({
				label : ':: Seleccione ::',
				value : ''
			});
			distrito.setValue('');
		}

	});

	dojo.connect(provincia, "onChange", function(newvalue) {
		console.log("Provincia cambió.");
		console.log(newvalue);

		if (newvalue && newvalue != '')
			onProvinciaChange(ubigeo, departamento, provincia, distrito, newvalue);
		else {
			distrito.removeOption(distrito.getOptions());
			distrito.addOption({
				label : ':: Seleccione ::',
				value : ''
			});
			distrito.setValue('');
		}

	});

	dojo.connect(distrito, "onChange", function(newvalue) {
		console.log("Distrito cambió.");
		console.log(newvalue);

		if (distrito.value != '') {
			centrarExtent(distrito.getOptions(newvalue).extent);
			ubigeo.set('value', distrito.value);
		} else
			ubigeo.set('value', provincia.value);
	});

	dojo.connect(direccion_regional, "onChange", function(newvalue) {
		if (newvalue && newvalue != '')
			onDireccionRegionalChange(codigo_ugel, direccion_regional, ugel, newvalue);
		else {
			ugel.removeOption(ugel.getOptions());
			ugel.addOption({
				label : ':: Seleccione ::',
				value : ''
			});
		}

	});

	dojo.connect(ugel, "onChange", function(newvalue) {

		if (ugel.value != '') {
			centrarExtent(ugel.getOptions(newvalue).extent);
			codigo_ugel.set('value', ugel.value);
		} else
			codigo_ugel.set('value', direccion_regional.value);
	});

	// Lenado del campo Nivel/Modalidad
	nivelOptions = [];

	nivelOptions.push({
		label : "Inicial",
		value : "A1"
	});

	nivelOptions.push({
		label : "Proyecto"
	});

	nivelOptions.push({
		label : "Primaria EBR",
		value : "B0"
	});

	nivelOptions.push({
		label : "Secundaria EBR",
		value : "F0"
	});

	nivelOptions.push({
		label : "Primaria EDA",
		value : "C0"
	});

	nivelOptions.push({
		label : "Secundaria EDA",
		value : "G0"
	});

	nivelOptions.push({
		label : "Básica alternativa",
		value : "D0"
	});

	nivelOptions.push({
		label : "Superior no universitaria",
		value : "K0"
	});

	nivelOptions.push({
		label : "Especial",
		value : "E0"
	});

	nivelOptions.push({
		label : "CETPRO",
		value : "L0"
	});

	nivel_modalidad.addOption(nivelOptions);

	// Llenado de campo Gestión
	gestionOptions = [];

	gestionOptions.push({
		label : "Ministerio de Educación"
	});

	gestionOptions.push({
		label : "Otro sector público (FF.AA)"
	});

	gestionOptions.push({
		label : "Municipalidad"
	});

	gestionOptions.push({
		label : "Nacionales en convenio"
	});

	gestionOptions.push({
		label : "Cooperativo"
	});

	gestionOptions.push({
		label : "Comunidad o asociación religiosa"
	});

	gestionOptions.push({
		label : "Comunidad"
	});

	gestionOptions.push({
		label : "Particular"
	});

	gestionOptions.push({
		label : "Empresa"
	});

	gestionOptions.push({
		label : "Asociación civil / Institución benéfica"
	});

	gestion.addOption(gestionOptions);

	//Este código resulve el problema de display de las tabs
	dojo.connect(dojo.query(".fm_find_trigger")[0], "onclick", function() {
		dijit.byId("tabs1").resize();
		dijit.byId("tabs2").resize();
	});
}

function centrarExtent(extent) {
	map.setExtent(extent);
}

function onDepartamentoChange(ubigeo, departamento, provincia, distrito, newvalue) {
	centrarExtent(departamento.getOptions(newvalue).extent);
	ubigeo.set('value', departamento.value);
	provincia.removeOption(provincia.getOptions());
	provincia.addOption({
		label : ':: Seleccione ::',
		value : ''
	});
	distrito.removeOption(distrito.getOptions());
	distrito.addOption({
		label : ':: Seleccione ::',
		value : ''
	});

	provQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/pol/MapServer/2");
	provQuery = new esri.tasks.Query();
	provQuery.where = "IDPROV LIKE '" + departamento.value + "%'";
	provQuery.returnGeometry = true;
	provQuery.outFields = ["IDPROV", "NOMBPROV"];
	provQueryTask.execute(provQuery, function(resultado) {

		var provinciaOptions = []
		dojo.forEach(resultado.features, function(feature) {
			provinciaOptions.push({
				value : feature.attributes["IDPROV"],
				label : feature.attributes["NOMBPROV"],
				extent : feature.geometry.getExtent()
			});
		});
		provincia.addOption(provinciaOptions);
	});

}

function onProvinciaChange(ubigeo, departamento, provincia, distrito, newvalue) {
	centrarExtent(provincia.getOptions(newvalue).extent);

	if (provincia.value != '')
		ubigeo.set('value', provincia.value);
	else
		ubigeo.set('value', departamento.value);

	distrito.removeOption(distrito.getOptions());
	distrito.addOption({
		label : ':: Seleccione ::',
		value : ''
	});

	distQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/pol/MapServer/3");
	distQuery = new esri.tasks.Query();
	distQuery.where = "IDPROV LIKE '" + provincia.value + "%'";
	distQuery.returnGeometry = true;
	distQuery.outFields = ["IDDIST", "NOMBDIST"];
	distQueryTask.execute(distQuery, function(resultado) {
		var distritoOptions = []
		dojo.forEach(resultado.features, function(feature) {
			distritoOptions.push({
				value : feature.attributes["IDDIST"],
				label : feature.attributes["NOMBDIST"],
				extent : feature.geometry.getExtent()
			});
		});
		distrito.addOption(distritoOptions);
	});

}

function onDireccionRegionalChange(codigo_ugel, direccion_regional, ugel, newvalue) {
	centrarExtent(direccion_regional.getOptions(newvalue).extent);

	codigo_ugel.set('value', direccion_regional.value);
	ugel.removeOption(ugel.getOptions());
	ugel.addOption({
		label : ':: Seleccione ::',
		value : ''
	});

	ugelQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/ugel/MapServer/1");
	ugelQuery = new esri.tasks.Query();
	ugelQuery.where = "CODUGEL LIKE '" + direccion_regional.value + "%'";
	ugelQuery.returnGeometry = true;
	ugelQuery.outFields = ["CODUGEL", "UGEL"];
	ugelQueryTask.execute(ugelQuery, function(resultado) {
		var ugelOptions = [];
		dojo.forEach(resultado.features, function(feature) {
			ugelOptions.push({
				value : feature.attributes["CODUGEL"],
				label : feature.attributes["UGEL"],
				extent : feature.geometry.getExtent()
			});
		});
		ugel.addOption(ugelOptions);
	});

}
