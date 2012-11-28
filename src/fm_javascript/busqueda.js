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
			codCentroPoblado : codigo_ccpp.value,
			nomCentroPoblado : nombre_ccpp1.value,
			codigoModular : codigo_modular.value,
			nombreIE : nombre_iiee.value,
			codigoLocal : codigo_local.value,
			direccionIE : direccion.value,
			gestiones : gestion.value,
			niveles : nivel_modalidad.value
		},
		load : function(data) {
			console.log(data);
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
				'name' : 'Latitud',
				'field' : 'latitud'
			}], [{
				'name' : 'Longitud',
				'field' : 'longitud'
			}], [{
				'name' : 'Enlaces',
				'field' : 'enlaces'
			}]];

			layoutExporter = [[{
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
				'name' : 'Latitud',
				'field' : 'latitud'
			}], [{
				'name' : 'Longitud',
				'field' : 'longitud'
			}]];

			if (isEmpty(data)) {
				alert("La busqueda no devolvió resultados.");
			} else {
				/*
				 * Esta condicional es importante porque hay caso en que
				 * data.items es un objeto y necesitamos que sea un array
				 * para poder pasarlo por dojo.forEach
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
						longitud : 'Longitud: ' + item.coordX,
						enlaces : '<a class="img-enlaces" onclick="hacerZoom(' + item.coordX + ',' + item.coordY + ');"><img src="images/zoom.png"></a><a class="img-enlaces"><img src="images/ficha.png"></a>'
					};

					itemsExporter = {
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
						longitud : item.coordX,
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
					dojo.byId("csv").value = str;
				});

			}
			console.log(data);

			dojo.query(".fm_button").removeClass("fm_button_active");
			dojo.query(".fm_results_trigger").addClass("fm_button_active");
			dojo.query(".fm_panel").style('display', 'none');
			dojo.query(".fm_results").style('display', 'block');

			desactivarCargando();
		}
	};

	var deferred = dojo.xhrGet(xhrArgs);

}

function isEmpty(obj) {
	for (var prop in obj)
	if (obj.hasOwnProperty(prop))
		return false;

	return true;
}