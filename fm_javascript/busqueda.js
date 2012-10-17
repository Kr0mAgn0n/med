function busqueda(){
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
	
	var xhrArgs = {
			url: "http://escale.minedu.gob.pe/padron/rest/iiee",
			handleAs: "xml",
			content: {
				ubigeo: ubigeo.value,
				//codDreUgel:
				codCentroPoblado: codigo_ccpp.value,
				nomCentroPoblado: nombre_ccpp1.value,
				codigoModular: codigo_modular.value,
				nombreIE: nombre_iiee.value,
				codigoLocal: codigo_local.value,
				direccionIE: direccion.value,
				//progarti:
				//progise:
				gestiones: gestion.value
				//areas:
			}
	};
	
	var deferred = dojo.xhrGet(xhrArgs);
	
	deferred.then(function(data) {
		console.log(data);
	});
}