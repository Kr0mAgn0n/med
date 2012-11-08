function llenarFormulario() {
    // Guardando inputs del formulario en variables
	departamento = dojo.byId("departamento");
    provincia = dojo.byId("provincia");
    distrito = dojo.byId("distrito");
    ubigeo = dojo.byId("ubigeo");    
    nivel_modalidad = dojo.byId("nivel_modalidad");
    gestion = dojo.byId("gestion");

    // Creando QueryTask para llamar los departamentos
    depQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/pol/MapServer/1");
    // Creando Query para llamar a los departamentos
    depQuery = new esri.tasks.Query();
    depQuery.where = "1=1"; // Notar que son sentencias SQL
    depQuery.returnGeometry = false; // Retorna un punto, un polígono, etc, dependiendo de la geometría del servicio
    depQuery.outFields = ["IDDPTO", "NOMBDEP"]; // Estos son los campos a llamar
    depQueryTask.execute(depQuery, function (resultado) {
        dojo.forEach(resultado.features, function (feature) { // Los campos se guardan en el campo de features del resultado del query
            dojo.create("option", {
                value: feature.attributes["IDDPTO"], // Los campos se llaman como atributos dentro del campo features del resultado
                innerHTML: feature.attributes["NOMBDEP"]
            }, departamento);
        });
    });

    // Enlazando el envento 'onchange' al select del departamento para cargar dinámicamente los campos de provincias
    dojo.connect(
    departamento, "onchange",

    function () {
        ubigeo.value = departamento.value;
    	dojo.empty(provincia);
        dojo.create("option", {}, provincia);
        dojo.empty(distrito);
        dojo.create("option", {}, distrito);
        if (departamento.value != '') {
            provQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/pol/MapServer/2");
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
            distQueryTask = new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/pol/MapServer/3");
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
    
    // Lenado del campo Nivel/Modalidad
    dojo.create("option", {
    	innerHTML: "Inicial",
    	value: "A1"
    }, nivel_modalidad);
    dojo.create("option", {
    	innerHTML: "Proyecto"
    }, nivel_modalidad);
    dojo.create("option", {
    	innerHTML: "Primaria EBR",
    	value: "B0"
    }, nivel_modalidad);
    dojo.create("option", {
    	innerHTML: "Secundaria EBR",
    	value: "F0"
    }, nivel_modalidad);
    dojo.create("option", {
    	innerHTML: "Primaria EDA",
    	value: "C0"
    }, nivel_modalidad);
    dojo.create("option", {
    	innerHTML: "Secundaria EDA",
    	value: "G0"
    }, nivel_modalidad);
    dojo.create("option", {
    	innerHTML: "Básica alternativa",
    	value: "D0"
    }, nivel_modalidad);
    dojo.create("option", {
    	innerHTML: "Superior no universitaria",
    	value: "K0"
    }, nivel_modalidad);
    dojo.create("option", {
    	innerHTML: "Especial",
    	value: "E0"
    }, nivel_modalidad);
    dojo.create("option", {
    	innerHTML: "CETPRO",
    	value: "L0"
    }, nivel_modalidad);
    
    // Llenado de campo Gestión
    dojo.create("option", {
    	innerHTML: "Ministerio de Educación"
    }, gestion);
    dojo.create("option", {
    	innerHTML: "Otro sector público (FF.AA)"
    }, gestion);
    dojo.create("option", {
    	innerHTML: "Municipalidad"
    }, gestion);
    dojo.create("option", {
    	innerHTML: "Nacionales en convenio"
    }, gestion);
    dojo.create("option", {
    	innerHTML: "Cooperativo"
    }, gestion);
    dojo.create("option", {
    	innerHTML: "Comunidad o asociación religiosa"
    }, gestion);
    dojo.create("option", {
    	innerHTML: "Comunidad"
    }, gestion);
    dojo.create("option", {
    	innerHTML: "Particular"
    }, gestion);
    dojo.create("option", {
    	innerHTML: "Empresa"
    }, gestion);
    dojo.create("option", {
    	innerHTML: "Asociación civil / Institución benéfica"
    }, gestion);
}