function busqueda(){
	ubigeo=dojo.byId("ubigeo");
	fm_results=dojo.byId("fm_results");
	dojo.empty(fm_results);
	
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
    });
}