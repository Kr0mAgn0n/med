function busqueda() {
	fm_results = dojo.byId("fm_results");
	dojo.empty(fm_results);

	ubigeo = dojo.byId("ubigeo");
	nombre_iiee = dojo.byId("nombre_iiee");
	codigo_modular = dojo.byId("codigo_modular");
	codigo_local = dojo.byId("codigo_local");
	direccion = dojo.byId("direccion");
	nombre_ccpp1 = dojo.byId("nombre_ccpp1");
	localidad = dojo.byId("localidad");
	nivel_modalidad = dojo.byId("nivel_modalidad");
	gestion = dojo.byId("gestion");
	nombre_ccpp2 = dojo.byId("nombre_ccpp2");
	codigo_ccpp = dojo.byId("codigo_ccpp");

	/*
	busquedaQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/cp/MapServer/2");
	busquedaQuery = new esri.tasks.Query();
	busquedaQuery.where = "UBIGEO = '" + ubigeo.value + "'";
	busquedaQuery.returnGeometry = true;
	busquedaQuery.outFields = ["CODCP", "NOMCP"];
	busquedaQueryTask.execute(busquedaQuery, function(resultado){
		dojo.forEach(resultado.features, function(feature){
			dojo.create("div",{
				id: feature.attributes["CODCP"],
				class: "resultado",
				innerHTML:"<ul><li>Ubigeo: " + ubigeo.value + "</li><li>Código del Centro Poblado: " + feature.attributes["CODCP"] + "</li><li>Nombre del Centro Poblado: " + feature.attributes["NOMCP"] + "</li><ul/>"
			},fm_results);
			
			dojo.connect(dojo.byId(feature.attributes["CODCP"]), "onclick", function(){
				console.log("Se hizo click.");
				console.log(feature.geometry.x);
				console.log(feature.geometry.x);
				map.centerAndZoom(feature.geometry,14);
			});
		});
	});*/

	var datos = {
		items : []
	};

	var layout = [ {
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
		'name' : 'Latitud',
		'field' : 'latitud'
	}, {
		'name' : 'Longitud',
		'field' : 'longitud'
	} ];

	var store;

	var grid = new dojox.grid.EnhancedGrid({
		structure : layout,
		loadingMessage : 'Cargando ...'
	}, dojo.create("div", {}, fm_results));

	dojo
			.connect(
					grid,
					"onRowClick",
					function(e) {
						punto = new esri.geometry.Point(grid.getItem(e.rowIndex).longitud[0], grid.getItem(e.rowIndex).latitud[0], new esri.SpatialReference({ wkid: 5373 }));
						console.log(punto);
						punto = esri.geometry.geographicToWebMercator(punto);
						console.log(punto);
						map.centerAndZoom(punto, 14);
						/*
						codcp = grid.getItem(e.rowIndex).codigo_del_centro_poblado[0];
						console.log(codcp);

						busquedaQueryTask = new esri.tasks.QueryTask(
								"http://escale.minedu.gob.pe/medgis/rest/services/carto_base/cp/MapServer/2");
						busquedaQuery = new esri.tasks.Query();
						busquedaQuery.where = "UPPER(CODCP) = '" + codcp + "'";
						busquedaQuery.returnGeometry = true;
						busquedaQuery.outFields = [];
						busquedaQueryTask.execute(busquedaQuery, function(
								resultado) {
							console.log(resultado.features);
							map.centerAndZoom(resultado.features[0].geometry,
									14);*/
							/*dojo.forEach(resultado.features, function(feature){	    		
								dojo.create("div",{
									id: feature.attributes["CODCP"],
									class: "resultado",
									innerHTML:"<ul><li>Ubigeo: " + ubigeo.value + "</li><li>Código del Centro Poblado: " + feature.attributes["CODCP"] + "</li><li>Nombre del Centro Poblado: " + feature.attributes["NOMCP"] + "</li><ul/>"
								},fm_results);
								
								dojo.connect(dojo.byId(feature.attributes["CODCP"]), "onclick", function(){
									console.log("Se hizo click.");
									console.log(feature.geometry.x);
									console.log(feature.geometry.x);
									map.centerAndZoom(feature.geometry,14);
								});
							});*/
						//});

					});

	dojo.connect(window, "onresize", function() {
		grid.resize();
		grid.update();
	});

	var xhrArgs = {
		url : "padron.php",
		handleAs : "json",
		content : {
			ubigeo : ubigeo.value,
			//codDreUgel:
			codCentroPoblado : codigo_ccpp.value,
			nomCentroPoblado : nombre_ccpp1.value,
			codigoModular : codigo_modular.value,
			nombreIE : nombre_iiee.value,
			codigoLocal : codigo_local.value,
			direccionIE : direccion.value,
			//progarti:
			//progise:
			gestiones : gestion.value,
			niveles : nivel_modalidad.value
		//areas:
		}
	};

	/*
	var xhrArgs = {
			url: "http://escale.minedu.gob.pe/padron/rest/instituciones",
			headers: {
				"Accept": "application/json"
			},
			handleAs: "json",
			content: {
				codmod: codigo_modular.value,
				codlocal: codigo_local.value,
				ubigeo: ubigeo.value,
				//codDreUgel:
				nombreCP: nombre_ccpp1.value,
				nombreIE: nombre_iiee.value,
				codCentroPoblado: codigo_ccpp.value,
				niveles: nivel_modalidad.value,
				gestiones: gestion.value
				//direccionIE: direccion.value,
				//progarti:
				//progise:
				//areas:
			}
	};
	 */

	var deferred = dojo.xhrGet(xhrArgs);

	deferred.then(function(data) {
		if (isEmpty(data)) {
			alert("La busqueda no devolvió resultados.");
		} else {

			dojo.style(dojo.query(".fm_results")[0], 'display', 'block');

			/* Esta condicional es importante porque hay caso en que data.items es un objeto
			 * y necesitamos que sea un array para poder pasarlo por dojo.forEach
			 */
			if (!dojo.isArray(data.items)) {
				aux = data.items;
				data = {
					items : []
				};
				data.items.push(aux);
			}

			dojo.forEach(data.items, function(item) {
				items = {
					ubigeo : item.ubigeo,
					departamento : item.departamento,
					provincia : item.provincia,
					distrito : item.distrito,
					nombre_del_centro_poblado : item.centroPoblado,
					codigo_del_centro_poblado : item.codCentroPoblado,
					codigo_local : item.codigoLocal,
					codigo_modular : item.codigoModular,
					nombre_ie : item.nombreIE,
					nivel : item.nivelModalidad,
					direccion : item.direccion,
					docentes : item.docentes,
					alumnos : item.alumnos,
					latitud : item.coordY,
					longitud : item.coordX
				};
				datos.items.push(items);
			});

			//console.log(datos.items);

			store = new dojo.data.ItemFileReadStore({
				data : datos
			});

			/*
			var grid = new dojox.grid.EnhancedGrid({
				store: store,
				structure: layout,
				loadingMessage: 'Cargando ...'
			}, dojo.create("div",{},fm_results));
			 */

			grid.store = store;

			grid.startup();

			/*
			dojo.connect(grid, "onRowClick", function(e){
				console.log(e.rowIndex);
				
				
				console.log(grid.getItem(e.rowIndex).latitud[0]);
				console.log(grid.getItem(e.rowIndex).longitud[0]);
				
				punto = new esri.geometry.Point(grid.getItem(e.rowIndex).latitud[0], grid.getItem(e.rowIndex).longitud[0], new esri.SpatialReference({ wkid: 102100 }));
				console.log(punto);
				map.centerAndZoom(punto, 14);
				
			});
			
			
			dojo.connect(window, "onresize", function () {
				if (grid) {
					grid.resize();
					grid.update();
				}
			});
			 */
		}
	});

}

function isEmpty(obj) {
	for ( var prop in obj)
		if (obj.hasOwnProperty(prop))
			return false;

	return true;
}