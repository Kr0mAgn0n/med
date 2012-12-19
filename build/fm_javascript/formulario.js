function llenarFormulario(){var c=dijit.byId("departamento");var e=dijit.byId("provincia");var d=dijit.byId("distrito");var f=dijit.byId("ubigeo");var g=dijit.byId("nivel_modalidad");var i=dijit.byId("gestion");var a=dijit.byId("direccion_regional");var b=dijit.byId("ugel");var h=dijit.byId("codigo_ugel");depQueryTask=new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/pol/MapServer/1");depQuery=new esri.tasks.Query();depQuery.where="1=1";depQuery.returnGeometry=true;depQuery.outFields=["IDDPTO","NOMBDEP"];depQueryTask.execute(depQuery,function(k){var l=[];var j=[];dojo.forEach(k.features,function(m){l.push({value:m.attributes.IDDPTO,label:m.attributes.NOMBDEP,extent:m.geometry.getExtent()});j.push({value:m.attributes.IDDPTO,label:m.attributes.NOMBDEP,extent:m.geometry.getExtent()})});c.addOption(l);a.addOption(j)});dojo.connect(c,"onChange",function(j){centrarExtent(c.getOptions(j).extent);f.set("value",c.value);e.removeOption(e.getOptions());e.addOption(dojo.create("option",{}));d.removeOption(d.getOptions());d.addOption(dojo.create("option",{}));if(c.value!=""){provQueryTask=new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/pol/MapServer/2");provQuery=new esri.tasks.Query();provQuery.where="IDPROV LIKE '"+c.value+"%'";provQuery.returnGeometry=true;provQuery.outFields=["IDPROV","NOMBPROV"];provQueryTask.execute(provQuery,function(l){var k=[];dojo.forEach(l.features,function(m){k.push({value:m.attributes.IDPROV,label:m.attributes.NOMBPROV,extent:m.geometry.getExtent()})});e.addOption(k)})}});dojo.connect(e,"onChange",function(j){centrarExtent(e.getOptions(j).extent);if(e.value!=""){f.set("value",e.value)}else{f.set("value",c.value)}d.removeOption(d.getOptions());d.addOption(dojo.create("option",{}));if(e.value!=""){distQueryTask=new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/pol/MapServer/3");distQuery=new esri.tasks.Query();distQuery.where="IDPROV LIKE '"+e.value+"%'";distQuery.returnGeometry=true;distQuery.outFields=["IDDIST","NOMBDIST"];distQueryTask.execute(distQuery,function(k){var l=[];dojo.forEach(k.features,function(m){l.push({value:m.attributes.IDDIST,label:m.attributes.NOMBDIST,extent:m.geometry.getExtent()})});d.addOption(l)})}});dojo.connect(d,"onChange",function(j){centrarExtent(d.getOptions(j).extent);if(d.value!=""){f.set("value",d.value)}else{f.set("value",e.value)}});dojo.connect(a,"onChange",function(j){centrarExtent(a.getOptions(j).extent);h.set("value",a.value);b.removeOption(b.getOptions());b.addOption(dojo.create("option",{}));if(a.value!=""){ugelQueryTask=new esri.tasks.QueryTask("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/ugel/MapServer/1");ugelQuery=new esri.tasks.Query();ugelQuery.where="CODUGEL LIKE '"+a.value+"%'";ugelQuery.returnGeometry=true;ugelQuery.outFields=["CODUGEL","UGEL"];ugelQueryTask.execute(ugelQuery,function(l){var k=[];dojo.forEach(l.features,function(m){k.push({value:m.attributes.CODUGEL,label:m.attributes.UGEL,extent:m.geometry.getExtent()})});b.addOption(k)})}});dojo.connect(b,"onChange",function(j){centrarExtent(b.getOptions(j).extent);if(b.value!=""){h.set("value",b.value)}else{h.set("value",a.value)}});nivelOptions=[];nivelOptions.push({label:"Inicial",value:"A1"});nivelOptions.push({label:"Proyecto"});nivelOptions.push({label:"Primaria EBR",value:"B0"});nivelOptions.push({label:"Secundaria EBR",value:"F0"});nivelOptions.push({label:"Primaria EDA",value:"C0"});nivelOptions.push({label:"Secundaria EDA",value:"G0"});nivelOptions.push({label:"Básica alternativa",value:"D0"});nivelOptions.push({label:"Superior no universitaria",value:"K0"});nivelOptions.push({label:"Especial",value:"E0"});nivelOptions.push({label:"CETPRO",value:"L0"});g.addOption(nivelOptions);gestionOptions=[];gestionOptions.push({label:"Ministerio de Educación"});gestionOptions.push({label:"Otro sector público (FF.AA)"});gestionOptions.push({label:"Municipalidad"});gestionOptions.push({label:"Nacionales en convenio"});gestionOptions.push({label:"Cooperativo"});gestionOptions.push({label:"Comunidad o asociación religiosa"});gestionOptions.push({label:"Comunidad"});gestionOptions.push({label:"Particular"});gestionOptions.push({label:"Empresa"});gestionOptions.push({label:"Asociación civil / Institución benéfica"});i.addOption(gestionOptions);dojo.connect(dojo.query(".fm_find_trigger")[0],"onclick",function(){dijit.byId("tabs1").resize();dijit.byId("tabs2").resize()})}function centrarExtent(a){map.setExtent(a)};