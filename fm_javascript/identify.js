var punto, mano_alzada, extension;
var drawToolbar;

function iniciarIdentify() {
	drawToolbar = new esri.toolbars.Draw(map);

	punto = new dijit.form.ToggleButton({
		iconClass : 'identifyPuntoIcon',
		label : 'Punto'
	}, dojo.byId("punto"));

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
			mano_alzada.setChecked(false);
			extension.setChecked(false);
			drawToolbar.activate(esri.toolbars.Draw.POINT);
		} else
			drawToolbar.deactivate();
	});

	dojo.connect(mano_alzada, "onClick", function() {
		if (mano_alzada.checked == true) {
			punto.setChecked(false);
			extension.setChecked(false);
			drawToolbar.activate(esri.toolbars.Draw.FREEHAND_POLYGON);
		} else
			drawToolbar.deactivate();
	});

	dojo.connect(extension, "onClick", function() {
		if (extension.checked == true) {
			punto.setChecked(false);
			mano_alzada.setChecked(false);
			drawToolbar.activate(esri.toolbars.Draw.EXTENT);
		} else
			drawToolbar.deactivate();
	});

	dojo.connect(drawToolbar, "onDrawEnd", manejadorDrawEnd);
}

function manejadorDrawEnd(geometria) {
	activarCargando();

	identifyTask = new esri.tasks.IdentifyTask(
			"http://escale.minedu.gob.pe/medgis/rest/services/carto_base/cp/MapServer");
	identifyParams = new esri.tasks.IdentifyParameters();
	identifyParams.geometry = geometria;
	identifyParams.tolerance = 3;
	identifyParams.returnGeometry = false;
	identifyParams.width = map.width;
	identifyParams.height = map.height;
	identifyParams.mapExtent = map.extent;
	identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE;
	var deferred = identifyTask.execute(identifyParams);

	deferred.then(function(respuesta) {
		datos = {
			items : []
		};

		layout = [ [ {
			'name' : 'Ubigeo',
			'field' : 'ubigeo'
		} ], [ {
			'name' : 'Nombre del Centro Poblado',
			'field' : 'nombre_del_centro_poblado'
		} ], [ {
			'name' : 'Código del Centro Poblado',
			'field' : 'codigo_del_centro_poblado'
		} ], [ {
			'name' : 'Con Institución Educativa',
			'field' : 'con_ie'
		} ], [ {
			'name' : 'Fuente',
			'field' : 'fuente_g'
		} ], [ {
			'name' : 'Altitud',
			'field' : 'altitud'
		} ], [ {
			'name' : 'Latitud',
			'field' : 'latitud'
		} ], [ {
			'name' : 'Longitud',
			'field' : 'longitud'
		} ] ];

		dojo.forEach(respuesta, function(respuesta) {
			items = {
				ubigeo : 'Ubigeo: ' + respuesta.feature.attributes.UBIGEO,
				codigo_del_centro_poblado : 'Código del Centro Poblado: '
						+ respuesta.feature.attributes.CODCP,
				nombre_del_centro_poblado : 'Nombre del Centro Poblado: '
						+ respuesta.feature.attributes.NOMCP,
				con_ie : '¿Tiene IE?: ' + respuesta.feature.attributes.CON_IE,
				fuente_g : 'Fuente: ' + respuesta.feature.attributes.FUENTE_G,
				altitud : 'Altitud: ' + respuesta.feature.attributes.Z,
				latitud : 'Latitud: ' + respuesta.feature.attributes.YGD,
				longitud : 'Longitud: ' + respuesta.feature.attributes.XGD
			};
			datos.items.push(items);
		});

		store = new dojo.data.ItemFileWriteStore({
			data : datos
		});
		grid.setStructure(layout);
		grid.setStore(store);

		dojo.query(".fm_button").removeClass("fm_button_active");
		dojo.query(".fm_results_trigger").addClass("fm_button_active");
		dojo.query(".fm_panel").style('display', 'none');
		dojo.query(".fm_results").style('display', 'block');

		desactivarCargando();
	});
}