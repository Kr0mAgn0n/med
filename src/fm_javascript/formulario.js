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

	/*require(["esri/tasks/query"], function() {
	 // Creando QueryTask para llamar los departamentos
	 depQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/lim_pol/MapServer/1");
	 // Creando Query para llamar a los departamentos
	 depQuery = new esri.tasks.Query();
	 depQuery.where = "1=1";
	 // Notar que son sentencias SQL
	 depQuery.returnGeometry = false;
	 // Retorna un punto, un polígono, etc, dependiendo de la geometría del servicio
	 depQuery.outFields = ["IDDPTO", "NOMBDEP"];
	 // Estos son los campos a llamar
	 depQueryTask.execute(depQuery, function(resultado) {
	 var departamentoOptions = [];
	 var direccionRegionalOptions = [];
	 dojo.forEach(resultado.features, function(feature) {// Los campos se guardan en el campo de features del resultado del query
	 departamentoOptions.push({
	 value : feature.attributes["IDDPTO"], // Los campos se llaman como atributos dentro del campo features del resultado
	 label : feature.attributes["NOMBDEP"]
	 });

	 direccionRegionalOptions.push({
	 value : feature.attributes["IDDPTO"], // Los campos se llaman como atributos dentro del campo features del resultado
	 label : feature.attributes["NOMBDEP"]
	 });
	 });

	 departamento.addOption(departamentoOptions);
	 direccion_regional.addOption(direccionRegionalOptions);
	 });
	 });*/

	var xhrArgsDep = {
		url : "http://escale.minedu.gob.pe/servicios/rest/service/restsig.svc/regiones",
		handleAs : "json",
		content : {
			codregion : '',
			nomregion : ''
		},
		load : function(resp) {
			data = dojo.json.parse(resp);

			//console.log(data);

			var departamentoOptions = [];
			var direccionRegionalOptions = [];

			dojo.forEach(data.Rows, function(row) {
				departamentoOptions.push({
					value : row.CODREGION,
					label : row.NOMBRE,
					latitud : row.LATITUD,
					longitud : row.LONGITUD,
					zoom : row.ZOOM
				});

				direccionRegionalOptions.push({
					value : row.CODREGION,
					label : row.NOMBRE,
					latitud : row.LATITUD,
					longitud : row.LONGITUD,
					zoom : row.ZOOM
				});
			});

			departamento.addOption(departamentoOptions);
			direccion_regional.addOption(direccionRegionalOptions);
		},
		error : function(error) {
			desactivarCargando();
			alert("Un error inesperado a ocurrido: " + error);
		}
	};

	dojo.xhrGet(xhrArgsDep);

	// Enlazando el envento 'onchange' al select del departamento para cargar dinámicamente los campos de provincias
	dojo.connect(departamento, "onChange", function(newvalue) {
		//console.log("Departamento cambió.");
		//console.log(newvalue);

		if (newvalue && newvalue !== '') {
			//console.log("Estoy ejecutando peticiones.");
			onDepartamentoChange(ubigeo, departamento, provincia, distrito, newvalue);
		} else {
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
			
			ubigeo.setValue(newvalue);
		}

	});

	dojo.connect(provincia, "onChange", function(newvalue) {
		//console.log("Provincia cambió.");
		//console.log(newvalue);

		if (newvalue && newvalue !== '')
			onProvinciaChange(ubigeo, departamento, provincia, distrito, newvalue);
		else {
			distrito.removeOption(distrito.getOptions());
			distrito.addOption({
				label : ':: Seleccione ::',
				value : ''
			});
			distrito.setValue('');
			
			ubigeo.setValue(departamento.value);
		}

	});

	dojo.connect(distrito, "onChange", function(newvalue) {
		//console.log("Distrito cambió.");
		//console.log(newvalue);

		if (distrito.value !== '') {
			/*require(["esri/tasks/query"], function() {
			 distGeometryQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/lim_pol/MapServer/3");
			 distGeometryQuery = new esri.tasks.Query();
			 distGeometryQuery.where = "IDDIST='" + newvalue + "'";
			 distGeometryQuery.returnGeometry = true;
			 distGeometryQuery.outFields = [];
			 distGeometryQueryTask.execute(distGeometryQuery, function(resultado) {
			 console.log(resultado);
			 feature = resultado.features[0];
			 centrarExtent(feature.geometry.getExtent());
			 });
			 });*/

			disSelectedOption = distrito.getOptions(newvalue);
			//console.log(depSelectedOption);

			point = new esri.geometry.Point(disSelectedOption.longitud, disSelectedOption.latitud, new esri.SpatialReference({
				wkid : 5373
			}));
			point = esri.geometry.geographicToWebMercator(point);
			map.centerAndZoom(point, disSelectedOption.zoom);

			ubigeo.set('value', distrito.value);
		} else
			if (provincia.value !== '')
				ubigeo.set('value', provincia.value);
			else
				ubigeo.set('value', departamento.value);
			
	});

	dojo.connect(direccion_regional, "onChange", function(newvalue) {
		if (newvalue && newvalue !== '')
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

		if (ugel.value !== '') {
			/*require(["esri/tasks/query"], function() {
			 ugelGeometryQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/ugel/MapServer/1");
			 ugelGeometryQuery = new esri.tasks.Query();
			 ugelGeometryQuery.where = "CODUGEL='" + newvalue + "'";
			 ugelGeometryQuery.returnGeometry = true;
			 ugelGeometryQuery.outFields = [];
			 ugelGeometryQueryTask.execute(ugelGeometryQuery, function(resultado) {
			 feature = resultado.features[0];
			 centrarExtent(feature.geometry.getExtent());
			 });
			 });*/

			console.log("UGEL cambió.");
			ugelSelectedOption = ugel.getOptions(newvalue);
			//console.log(depSelectedOption);

			point = new esri.geometry.Point(ugelSelectedOption.longitud, ugelSelectedOption.latitud, new esri.SpatialReference({
				wkid : 5373
			}));
			point = esri.geometry.geographicToWebMercator(point);
			map.centerAndZoom(point, ugelSelectedOption.zoom);

			codigo_ugel.set('value', ugel.value);
		} else
			codigo_ugel.set('value', direccion_regional.value);
	});

	// Lenado del campo Nivel/Modalidad
	nivelOptions = [];

	nivelOptions.push({
		label : "Inicial",
		value : "A1|A2|A3"
	});

	nivelOptions.push({
		label : "Programa",
		value : "A5"
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
		value : "K0|T0|M0"
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
		label : "Ministerio de Educación",
		value : "A1"
	});

	gestionOptions.push({
		label : "Otro sector público (FF.AA)",
		value : "A2"
	});

	gestionOptions.push({
		label : "Municipalidad",
		value : "A3"
	});

	gestionOptions.push({
		label : "Nacionales en convenio",
		value : "A4"
	});

	gestionOptions.push({
		label : "Cooperativo",
		value : "B1"
	});

	gestionOptions.push({
		label : "Comunidad o asociación religiosa",
		value : "B2"
	});

	gestionOptions.push({
		label : "Comunidad",
		value : "B3"
	});

	gestionOptions.push({
		label : "Particular",
		value : "B4"
	});

	gestionOptions.push({
		label : "Empresa",
		value : "B5"
	});

	gestionOptions.push({
		label : "Asociación civil / Institución benéfica",
		value : "B6"
	});

	gestion.addOption(gestionOptions);

	//Este código resulve el problema de display de las tabs
	dojo.connect(dojo.query(".fm_find_trigger")[0], "onclick", function() {
		dijit.byId("tabs1").resize();
		dijit.byId("tabs2").resize();
	});
	
	console.log("Se cargó el hilo del formulario.");
}

function centrarExtent(extent) {
	map.setExtent(extent);
}

function onDepartamentoChange(ubigeo, departamento, provincia, distrito, newvalue) {
	/*require(["esri/tasks/query"], function() {
	 depGeometryQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/lim_pol/MapServer/1");
	 depGeometryQuery = new esri.tasks.Query();
	 depGeometryQuery.where = "IDDPTO='" + newvalue + "'";
	 depGeometryQuery.returnGeometry = true;
	 depGeometryQuery.outFields = [];
	 depGeometryQueryTask.execute(depGeometryQuery, function(resultado) {
	 feature = resultado.features[0];
	 centrarExtent(feature.geometry.getExtent());
	 });
	 });*/

	depSelectedOption = departamento.getOptions(newvalue);
	//console.log(depSelectedOption);

	point = new esri.geometry.Point(depSelectedOption.longitud, depSelectedOption.latitud, new esri.SpatialReference({
		wkid : 5373
	}));
	point = esri.geometry.geographicToWebMercator(point);
	map.centerAndZoom(point, depSelectedOption.zoom);

	ubigeo.set('value', newvalue);
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

	/*require(["esri/tasks/query"], function() {
	 provQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/lim_pol/MapServer/2");
	 provQuery = new esri.tasks.Query();
	 provQuery.where = "IDPROV LIKE '" + departamento.value + "%'";
	 provQuery.returnGeometry = false;
	 provQuery.outFields = ["IDPROV", "NOMBPROV"];
	 provQueryTask.execute(provQuery, function(resultado) {
	 var provinciaOptions = [];
	 dojo.forEach(resultado.features, function(feature) {
	 provinciaOptions.push({
	 value : feature.attributes["IDPROV"],
	 label : feature.attributes["NOMBPROV"]
	 });
	 });
	 provincia.addOption(provinciaOptions);
	 });
	 });*/

	var xhrArgsProv = {
		url : "http://escale.minedu.gob.pe/servicios/rest/service/restsig.svc/provincias",
		handleAs : "json",
		content : {
			codregion : newvalue,
			codprovincia : '',
			nomprovincia : ''
		},
		load : function(resp) {
			data = dojo.json.parse(resp);

			//console.log(data);

			var provinciaOptions = [];

			dojo.forEach(data.Rows, function(row) {
				provinciaOptions.push({
					value : row.CODPROVINCIA,
					label : row.NOMBRE,
					latitud : row.LATITUD,
					longitud : row.LONGITUD,
					zoom : row.ZOOM
				});
			});

			provincia.addOption(provinciaOptions);

		},
		error : function(error) {
			desactivarCargando();
			alert("Un error inesperado a ocurrido: " + error);
		}
	};

	dojo.xhrGet(xhrArgsProv);

}

function onProvinciaChange(ubigeo, departamento, provincia, distrito, newvalue) {
	/*require(["esri/tasks/query"], function() {
	 provGeometryQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/lim_pol/MapServer/2");
	 provGeometryQuery = new esri.tasks.Query();
	 provGeometryQuery.where = "IDPROV='" + newvalue + "'";
	 provGeometryQuery.returnGeometry = true;
	 provGeometryQuery.outFields = [];
	 provGeometryQueryTask.execute(depGeometryQuery, function(resultado) {
	 feature = resultado.features[0];
	 centrarExtent(feature.geometry.getExtent());
	 });
	 });*/

	provSelectedOption = provincia.getOptions(newvalue);
	//console.log(depSelectedOption);

	point = new esri.geometry.Point(provSelectedOption.longitud, provSelectedOption.latitud, new esri.SpatialReference({
		wkid : 5373
	}));
	point = esri.geometry.geographicToWebMercator(point);
	map.centerAndZoom(point, provSelectedOption.zoom);

	if (provincia.value !== '')
		ubigeo.set('value', provincia.value);
	else
		ubigeo.set('value', departamento.value);

	distrito.removeOption(distrito.getOptions());
	distrito.addOption({
		label : ':: Seleccione ::',
		value : ''
	});

	/*require(["esri/tasks/query"], function() {
	 distQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/lim_pol/MapServer/3");
	 distQuery = new esri.tasks.Query();
	 distQuery.where = "IDPROV LIKE '" + provincia.value + "%'";
	 distQuery.returnGeometry = false;
	 distQuery.outFields = ["IDDIST", "NOMBDIST"];
	 distQueryTask.execute(distQuery, function(resultado) {
	 var distritoOptions = [];
	 dojo.forEach(resultado.features, function(feature) {
	 distritoOptions.push({
	 value : feature.attributes["IDDIST"],
	 label : feature.attributes["NOMBDIST"]
	 });
	 });
	 distrito.addOption(distritoOptions);
	 });
	 });*/

	var xhrArgsDist = {
		url : "http://escale.minedu.gob.pe/servicios/rest/service/restsig.svc/distritos",
		handleAs : "json",
		content : {
			codregion : '',
			codprovincia : newvalue,
			coddistrito : '',
			nomdistrito : ''
		},
		load : function(resp) {
			data = dojo.json.parse(resp);

			//console.log(data);

			var distritoOptions = [];

			dojo.forEach(data.Rows, function(row) {
				distritoOptions.push({
					value : row.CODUBIGEO,
					label : row.NOMBRE,
					latitud : row.LATITUD,
					longitud : row.LONGITUD,
					zoom : row.ZOOM
				});
			});

			distrito.addOption(distritoOptions);

		},
		error : function(error) {
			desactivarCargando();
			alert("Un error inesperado a ocurrido: " + error);
		}
	};

	dojo.xhrGet(xhrArgsDist);

}

function onDireccionRegionalChange(codigo_ugel, direccion_regional, ugel, newvalue) {
	/*require(["esri/tasks/query"], function() {
	 direccionGeometryQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/lim_pol/MapServer/2");
	 direccionGeometryQuery = new esri.tasks.Query();
	 direccionGeometryQuery.where = "IDDPTO='" + newvalue + "'";
	 direccionGeometryQuery.returnGeometry = true;
	 direccionGeometryQuery.outFields = [];
	 direccionGeometryQueryTask.execute(direccionGeometryQuery, function(resultado) {
	 feature = resultado.features[0];
	 centrarExtent(feature.geometry.getExtent());
	 });
	 });*/

	direccion_regionalSelectedOption = direccion_regional.getOptions(newvalue);
	//console.log(depSelectedOption);

	point = new esri.geometry.Point(direccion_regionalSelectedOption.longitud, direccion_regionalSelectedOption.latitud, new esri.SpatialReference({
		wkid : 5373
	}));
	point = esri.geometry.geographicToWebMercator(point);
	map.centerAndZoom(point, direccion_regionalSelectedOption.zoom);

	codigo_ugel.set('value', direccion_regional.value);
	ugel.removeOption(ugel.getOptions());
	ugel.addOption({
		label : ':: Seleccione ::',
		value : ''
	});

	/*require(["esri/tasks/query"], function() {
	 ugelQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/ugel/MapServer/1");
	 ugelQuery = new esri.tasks.Query();
	 ugelQuery.where = "CODUGEL LIKE '" + direccion_regional.value + "%'";
	 ugelQuery.returnGeometry = false;
	 ugelQuery.outFields = ["CODUGEL", "UGEL"];
	 ugelQueryTask.execute(ugelQuery, function(resultado) {
	 var ugelOptions = [];
	 dojo.forEach(resultado.features, function(feature) {
	 ugelOptions.push({
	 value : feature.attributes["CODUGEL"],
	 label : feature.attributes["UGEL"]
	 });
	 });
	 ugel.addOption(ugelOptions);
	 });
	 });*/

	var xhrArgsUgel = {
		url : "http://escale.minedu.gob.pe/servicios/rest/service/restsig.svc/ugel",
		handleAs : "json",
		content : {
			codregion : newvalue,
			codugel : '',
			nomugel : ''
		},
		load : function(resp) {
			data = dojo.json.parse(resp);

			//console.log(data);

			var ugelOptions = [];

			dojo.forEach(data.Rows, function(row) {
				ugelOptions.push({
					value : row.CODUGEL,
					label : row.NOMBRE,
					latitud : row.LATITUD,
					longitud : row.LONGITUD,
					zoom : row.ZOOM
				});
			});

			ugel.addOption(ugelOptions);

		},
		error : function(error) {
			desactivarCargando();
			alert("Un error inesperado a ocurrido: " + error);
		}
	};

	dojo.xhrGet(xhrArgsUgel);
}
