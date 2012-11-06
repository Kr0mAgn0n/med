function busqueda() {
	activarCargando();

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

	var xhrArgs = {
		url : "padron.php",
		handleAs : "json",
		content : {
			ubigeo : ubigeo.value,
			// codDreUgel:
			codCentroPoblado : codigo_ccpp.value,
			nomCentroPoblado : nombre_ccpp1.value,
			codigoModular : codigo_modular.value,
			nombreIE : nombre_iiee.value,
			codigoLocal : codigo_local.value,
			direccionIE : direccion.value,
			// progarti:
			// progise:
			gestiones : gestion.value,
			niveles : nivel_modalidad.value
		// areas:
		}
	};

	/*
	 * var xhrArgs = { url: "http://escale.minedu.gob.pe/padron/rest/regiones",
	 * headers: { "Accept": "application/json", "X-Request-With":
	 * "XMLHttpRequest", "Content-Type": "application/json" }, handleAs: "json",
	 * content: { //codmod: codigo_modular.value, //codlocal:
	 * codigo_local.value, //ubigeo: ubigeo.value, //codDreUgel: //nombreCP:
	 * nombre_ccpp1.value, //nombreIE: nombre_iiee.value, //codCentroPoblado:
	 * codigo_ccpp.value, //niveles: nivel_modalidad.value, //gestiones:
	 * gestion.value //direccionIE: direccion.value, //progarti: //progise:
	 * //areas: } };
	 */

	var deferred = dojo.xhrGet(xhrArgs);

	deferred.then(function(data) {
		datos = {
			items : []
		};
		
		layout = [ [ {
			'name' : 'Ubigeo',
			'field' : 'ubigeo'
		} ], [ {
			'name' : 'Departamento',
			'field' : 'departamento'
		} ], [ {
			'name' : 'Provincia',
			'field' : 'provincia'
		} ], [ {
			'name' : 'Distrito',
			'field' : 'distrito'
		} ], [ {
			'name' : 'Nombre del Centro Poblado',
			'field' : 'nombre_del_centro_poblado'
		} ], [ {
			'name' : 'Código del Centro Poblado',
			'field' : 'codigo_del_centro_poblado'
		} ], [ {
			'name' : 'Código Local',
			'field' : 'codigo_local'
		} ], [ {
			'name' : 'Código Modular',
			'field' : 'codigo_modular'
		} ], [ {
			'name' : 'Nombre IE',
			'field' : 'nombre_ie'
		} ], [ {
			'name' : 'Nivel',
			'field' : 'nivel'
		} ], [ {
			'name' : 'Dirección',
			'field' : 'direccion'
		} ], [ {
			'name' : 'Docentes',
			'field' : 'docentes'
		} ], [ {
			'name' : 'Alumnos',
			'field' : 'alumnos'
		} ], [ {
			'name' : 'Latitud',
			'field' : 'latitud'
		} ], [ {
			'name' : 'Longitud',
			'field' : 'longitud'
		} ] ];

		
		if (isEmpty(data)) {
			alert("La busqueda no devolvió resultados.");
		} else {

			// dojo.style(dojo.query(".fm_results")[0], 'display', 'block');

			/*
			 * Esta condicional es importante porque hay caso en que data.items
			 * es un objeto y necesitamos que sea un array para poder pasarlo
			 * por dojo.forEach
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
					ubigeo : 'Ubigeo: ' + item.ubigeo,
					departamento : 'Departamento: ' + item.departamento,
					provincia : 'Provincia: ' + item.provincia,
					distrito : 'Distrito: ' + item.distrito,
					nombre_del_centro_poblado : 'Nombre del Centro Poblado: ' + item.centroPoblado,
					codigo_del_centro_poblado : 'Código del Centro Poblado: ' + item.codCentroPoblado,
					codigo_local : 'Código Local: ' + item.codigoLocal,
					codigo_modular : 'Código Modular: ' + item.codigoModular,
					nombre_ie : 'Nombre de la IE: ' + item.nombreIE,
					nivel : 'Nivel: ' + item.nivelModalidad,
					direccion : 'Dirección: ' + item.direccion,
					docentes : 'Docentes: ' + item.docentes,
					alumnos : 'Alumnos: ' + item.alumnos,
					latitud : 'Latitud: ' + item.coordY,
					longitud : 'Longitud: ' + item.coordX
				};
				datos.items.push(items);
			});

			// console.log(datos.items);

			store = new dojo.data.ItemFileWriteStore({
				data : datos
			});

			grid.setStructure(layout);
			
			grid.setStore(store);

		}
		console.log(data);
		
		dojo.query(".fm_button").removeClass("fm_button_active");
		dojo.query(".fm_results_trigger").addClass("fm_button_active");
		dojo.query(".fm_panel").style('display', 'none');
        dojo.query(".fm_results").style('display', 'block');
		
		desactivarCargando();
	});

}

function isEmpty(obj) {
	for ( var prop in obj)
		if (obj.hasOwnProperty(prop))
			return false;

	return true;
}