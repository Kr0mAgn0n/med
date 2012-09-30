function llenarFormulario() {
    departamento = dojo.byId("departamento");
    provincia = dojo.byId("provincia");
    distrito = dojo.byId("distrito");
    ubigeo = dojo.byId("ubigeo");

    depQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/MEDGIS/rest/services/DEMO/dep/MapServer/0");
    depQuery = new esri.tasks.Query();
    depQuery.where = "1=1";
    depQuery.returnGeometry = false;
    depQuery.outFields = ["IDDPTO", "NOMBDEP"];
    depQueryTask.execute(depQuery, function (resultado) {
        dojo.forEach(resultado.features, function (feature) {
            dojo.create("option", {
                value: feature.attributes["IDDPTO"],
                innerHTML: feature.attributes["NOMBDEP"]
            }, departamento);
        });
    });

    dojo.connect(
    departamento, "onchange",

    function () {
        ubigeo.value = departamento.value;
    	dojo.empty(provincia);
        dojo.create("option", {}, provincia);
        dojo.empty(distrito);
        dojo.create("option", {}, distrito);
        if (departamento.value != '') {
            provQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/MEDGIS/rest/services/DEMO/prov/MapServer/0");
            provQuery = new esri.tasks.Query();
            provQuery.where = "IDPROV LIKE '" + departamento.value + "%'";
            provQuery.returnGeometry = false;
            provQuery.outFields = ["IDPROV", "NOMBPROV"];
            provQueryTask.execute(
            provQuery,

            function (resultado) {
                dojo.forEach(
                resultado.features,

                function (
                feature) {
                    dojo.create("option", {
                        value: feature.attributes["IDPROV"],
                        innerHTML: feature.attributes["NOMBPROV"]
                    },
                    provincia);
                });
            });
        }
    });

    dojo.connect(
    provincia, "onchange",

    function () {
        if(provincia.value != '')
        	ubigeo.value = provincia.value;
        else
        	ubigeo.value = departamento.value;
    	
    	dojo.empty(distrito);
        dojo.create("option", {}, distrito);
        if (provincia.value != '') {
            distQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/MEDGIS/rest/services/DEMO/dist/MapServer/0");
            distQuery = new esri.tasks.Query();
            distQuery.where = "IDPROV LIKE '" + provincia.value + "%'";
            distQuery.returnGeometry = false;
            distQuery.outFields = ["IDDIST", "NOMBDIST"];
            distQueryTask.execute(
            distQuery,

            function (resultado) {
                dojo.forEach(
                resultado.features,

                function (
                feature) {
                    dojo.create("option", {
                        value: feature.attributes["IDDIST"],
                        innerHTML: feature.attributes["NOMBDIST"]
                    },
                    distrito);
                });
            });
        }
    });
    
    dojo.connect(distrito,"onchange",function(){
    	if (distrito.value != '')
    		ubigeo.value=distrito.value;
    	else
    		ubigeo.value=provincia.value;
    });
}