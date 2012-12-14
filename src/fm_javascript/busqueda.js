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
	codigo_ugel = dojo.byId("codigo_ugel");

	var xhrArgs = {
		url : "http://escale.minedu.gob.pe/mapaeducativolenguas/restservicesig/service/restsig.svc/padron",
		handleAs : "json",
		content : {
			codgeo : ubigeo.value,
			codugel : codigo_ugel.value,
			codmod : codigo_modular.value,
			anexo : '',
			nombreie : nombre_iiee.value,
			codlocal : codigo_local.value,
			direccion : direccion.value,
			cenpob : nombre_ccpp1.value,
			localidad : localidad.vaue,
			nivmod : nivel_modalidad.value,
			gesdep : gestion.value,
			codcp : ''
		},
		load : function(resp) {

			var data = dojo.json.parse(resp);

			//console.log(data);

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

			console.log(datos.items);

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


			dojo.query(".fm_button").removeClass("fm_button_active");
			dojo.query(".fm_results_trigger").addClass("fm_button_active");
			dojo.query(".fm_panel").style('display', 'none');
			dojo.query(".fm_results").style('display', 'block');

			desactivarCargando();
		}
	}

	var deferred = dojo.xhrGet(xhrArgs);

}

function irAFicha(codmod, anexo) {
	console.log(codmod);
	console.log(anexo);
	window.open("http://escale.minedu.gob.pe/PadronWeb/info/ce?cod_mod=" + codmod + "&anexo=" + anexo);
}