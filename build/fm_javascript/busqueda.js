function busqueda(b){if(b){dojo.stopEvent(b)}var a=dijit.byId("searchForm");if(a.validate()){activarCargando();processSearch(a)}else{alert("Alguno de los datos no es válido.")}}function processSearch(b){var c=b.getValues().ubigeo;var p=b.getValues().nombre_iiee;var f=b.getValues().codigo_modular;var i=b.getValues().codigo_local;var h=b.getValues().nombre_ccpp1;var a=b.getValues().localidad;var e=b.getValues().nivel_modalidad==null?"":b.getValues().nivel_modalidad;var n=b.getValues().gestion==null?"":b.getValues().gestion;var g=b.getValues().nombre_ccpp2;var l=b.getValues().codigo_ccpp1;var j=b.getValues().codigo_ccpp2;var m=b.getValues().codigo_ugel;var k={url:"http://escale.minedu.gob.pe/mapaeducativolenguas/restservicesig/service/restsig.svc/padron",handleAs:"json",content:{codgeo:c,codugel:m,codmod:f,anexo:"",nombreie:p,codlocal:i,direccion:"",cenpob:h,localidad:a,nivmod:e,gesdep:n,codcp:l},load:processFormIE};var d={url:"http://escale.minedu.gob.pe/mapaeducativolenguas/restservicesig/service/restsig.svc/ccpp",handleAs:"json",content:{ubigeo:c,codcp:j,codugel:m,nomcp:g,ubicado:"",area:"",fuentecp:""},load:processFormCP};if(dijit.byId("tabs2").selectedChildWidget.title=="Padrón II.EE."){var o=dojo.xhrGet(k)}if(dijit.byId("tabs2").selectedChildWidget.title=="Centros Poblados"){var o=dojo.xhrGet(d)}}function processFormIE(b){var a=dojo.json.parse(b);datos={items:[]};layout=[[{name:"Ubigeo",field:"ubigeo"}],[{name:"Departamento",field:"departamento"}],[{name:"Provincia",field:"provincia"}],[{name:"Distrito",field:"distrito"}],[{name:"Nombre del Centro Poblado",field:"nombre_del_centro_poblado"}],[{name:"Código del Centro Poblado",field:"codigo_del_centro_poblado"}],[{name:"Localidad",field:"localidad"}],[{name:"Código Local",field:"codigo_local"}],[{name:"Código Modular",field:"codigo_modular"}],[{name:"Nombre IE",field:"nombre_ie"}],[{name:"Nivel",field:"nivel"}],[{name:"Dirección",field:"direccion"}],[{name:"Docentes",field:"docentes"}],[{name:"Alumnos",field:"alumnos"}],[{name:"Altitud",field:"altitud"}],[{name:"Fuente CP",field:"fuente_cp"}],[{name:"Latitud",field:"latitud"}],[{name:"Longitud",field:"longitud"}],[{name:"Enlaces",field:"enlaces"}]];datosExporter={items:[]};layoutExporter=[[{name:"Ubigeo",field:"ubigeo"},{name:"Departamento",field:"departamento"},{name:"Provincia",field:"provincia"},{name:"Distrito",field:"distrito"},{name:"Nombre del Centro Poblado",field:"nombre_del_centro_poblado"},{name:"Código del Centro Poblado",field:"codigo_del_centro_poblado"},{name:"Localidad",field:"localidad"},{name:"Código Local",field:"codigo_local"},{name:"Código Modular",field:"codigo_modular"},{name:"Nombre IE",field:"nombre_ie"},{name:"Nivel",field:"nivel"},{name:"Dirección",field:"direccion"},{name:"Docentes",field:"docentes"},{name:"Alumnos",field:"alumnos"},{name:"Altitud",field:"altitud"},{name:"Fuente CP",field:"fuente_cp"},{name:"Latitud",field:"latitud"},{name:"Longitud",field:"longitud"}]];dojo.forEach(a.Rows,function(c){items={ubigeo:"Ubigeo: "+c.CODIGO_UBIGEO,departamento:"Departamento: "+c.DEPARTAMENTO,provincia:"Provincia: "+c.PROVINCIA,distrito:"Distrito: "+c.DISTRITO,nombre_del_centro_poblado:"Nombre del Centro Poblado: "+c.NOMBRE_CENTRO_POBLADO,codigo_del_centro_poblado:"Código del Centro Poblado: "+c.COD_CENTRO_POBLADO,localidad:"Localidad: "+c.NOMBRE_LOCALIDAD,codigo_local:"Código Local: "+c.CODIGO_LOCAL,codigo_modular:"Código Modular: "+c.CODIGO_MODULAR,nombre_ie:"Nombre de la IE: "+c.NOMBRE_ESCUELA,nivel:"Nivel: "+c.NIVEL_MODALIDAD,direccion:"Dirección: "+c.DIRECCION_ESCUELA,docentes:"Docentes: "+c.TOTAL_DOCENTES,alumnos:"Alumnos: "+c.TOTAL_ALUMNOS,altitud:"Altitud: "+c.ALTITUD,fuente_cp:"Fuente CP: "+c.FUENTECP,latitud:"Latitud: "+c.LATITUD_DEC,longitud:"Longitud: "+c.LONGITUD_DEC,enlaces:"<a class='img-enlaces' onclick='hacerZoom("+c.LONGITUD_DEC+","+c.LATITUD_DEC+");'><img src='images/zoom.png'></a><a class='img-enlaces' onclick='irAFicha(\""+c.CODIGO_MODULAR+'","'+c.ANEXO+"\");'><img src='images/ficha.png'></a>"};itemsExporter={ubigeo:c.CODIGO_UBIGEO,departamento:c.DEPARTAMENTO,provincia:c.PROVINCIA,distrito:c.DISTRITO,nombre_del_centro_poblado:c.NOMBRE_CENTRO_POBLADO,codigo_del_centro_poblado:c.COD_CENTRO_POBLADO,localidad:c.NOMBRE_LOCALIDAD,codigo_local:c.CODIGO_LOCAL,codigo_modular:c.CODIGO_MODULAR,nombre_ie:c.NOMBRE_ESCUELA,nivel:c.NIVEL_MODALIDAD,direccion:c.DIRECCION_ESCUELA,docentes:c.TOTAL_DOCENTES,alumnos:c.TOTAL_ALUMNOS,altitud:c.ALTITUD,fuente_cp:c.FUENTECP,latitud:c.LATITUD_DEC,longitud:c.LONGITUD_DEC};datos.items.push(items);datosExporter.items.push(itemsExporter)});store=new dojo.data.ItemFileWriteStore({data:datos});grid.setStructure(layout);grid.setStore(store);storeExporter=new dojo.data.ItemFileWriteStore({data:datosExporter});gridExporter.setStructure(layoutExporter);gridExporter.setStore(storeExporter);gridExporter.exportGrid("csv",function(c){console.log(c);dojo.byId("csv").value=c});gridMemory.memory.push({store:store,storeExporter:storeExporter,layout:layout,layoutExporter:layoutExporter});gridMemory.selectedIndex=gridMemory.memory.length-1;dojo.query(".fm_button").removeClass("fm_button_active");dojo.query(".fm_results_trigger").addClass("fm_button_active");dojo.query(".fm_panel").style("display","none");dojo.query(".fm_results").style("display","block");desactivarCargando()}function processFormCP(b){var a=dojo.json.parse(b);datos={items:[]};layout=[[{name:"Ubigeo",field:"ubigeo"}],[{name:"Departamento",field:"departamento"}],[{name:"Provincia",field:"provincia"}],[{name:"Distrito",field:"distrito"}],[{name:"Código del Centro Poblado",field:"codigo_del_centro_poblado"}],[{name:"Nombre del Centro Poblado",field:"nombre_del_centro_poblado"}],[{name:"¿Tiene institución educativa?",field:"con_iiee"}],[{name:"Número de Instituciones Educativas",field:"numero_de_iiee"}],[{name:"Nivel",field:"nivel"}],[{name:"¿Es capital?",field:"capital"}],[{name:"Fuente CP",field:"fuente_cp"}],[{name:"Altitud",field:"altitud"}],[{name:"Latitud",field:"latitud"}],[{name:"Longitud",field:"longitud"}],[{name:"Enlaces",field:"enlaces"}]];datosExporter={items:[]};layoutExporter=[[{name:"Ubigeo",field:"ubigeo"},{name:"Departamento",field:"departamento"},{name:"Provincia",field:"provincia"},{name:"Distrito",field:"distrito"},{name:"Código del Centro Poblado",field:"codigo_del_centro_poblado"},{name:"Nombre del Centro Poblado",field:"nombre_del_centro_poblado"},{name:"¿Tiene institución educativa?",field:"con_iiee"},{name:"Número de Instituciones Educativas",field:"numero_de_iiee"},{name:"Nivel",field:"nivel"},{name:"¿Es capital?",field:"capital"},{name:"Fuente CP",field:"fuente_cp"},{name:"Altitud",field:"altitud"},{name:"Latitud",field:"latitud"},{name:"Longitud",field:"longitud"}]];dojo.forEach(a.Rows,function(c){items={ubigeo:"Ubigeo: "+c.UBIGEO,departamento:"Departamento: "+c.DEPARTAMENTO,provincia:"Provincia: "+c.PROVINCIA,distrito:"Distrito: "+c.DISTRITO,codigo_del_centro_poblado:"Código del Centro Poblado: "+c.CODCP,nombre_del_centro_poblado:"Código del Centro Poblado: "+c.DENOMINACION,con_iiee:"¿Tiene IE?: "+c.CON_IE,numero_de_iiee:"Número de Instituciones Educativas: "+c.N_IIEE,nivel:"Nivel: "+c.NIVEL,capital:"¿Es capital?: "+c.CAPITAL,fuente_cp:"Fuente CP: "+c.FUENTE_SIG,altitud:"Altitud: "+c.ALT_CP,latitud:"Latitud: "+c.LATITUD_DEC,longitud:"Longitud: "+c.LONGITUD_DEC,enlaces:"<a class='img-enlaces' onclick='hacerZoom("+c.LONGITUD_DEC+","+c.LATITUD_DEC+");'><img src='images/zoom.png'></a><a class='img-enlaces' onclick='irAIE("+c.CODCP+")'><img src='images/ficha.png'></a>"};itemsExporter={ubigeo:c.UBIGEO,departamento:c.DEPARTAMENTO,provincia:c.PROVINCIA,distrito:c.DISTRITO,codigo_del_centro_poblado:c.CODCP,nombre_del_centro_poblado:c.DENOMINACION,con_iiee:c.CON_IE,numero_de_iiee:c.N_IIEE,nivel:c.NIVEL,capital:c.CAPITAL,fuente_cp:c.FUENTE_SIG,altitud:c.ALT_CP,latitud:c.LATITUD_DEC,longitud:c.LONGITUD_DEC,};datos.items.push(items);datosExporter.items.push(itemsExporter)});store=new dojo.data.ItemFileWriteStore({data:datos});grid.setStructure(layout);grid.setStore(store);storeExporter=new dojo.data.ItemFileWriteStore({data:datosExporter});gridExporter.setStructure(layoutExporter);gridExporter.setStore(storeExporter);gridExporter.exportGrid("csv",function(c){console.log(c);dojo.byId("csv").value=c});gridMemory.memory.push({store:store,storeExporter:storeExporter,layout:layout,layoutExporter:layoutExporter});gridMemory.selectedIndex=gridMemory.memory.length-1;dojo.query(".fm_button").removeClass("fm_button_active");dojo.query(".fm_results_trigger").addClass("fm_button_active");dojo.query(".fm_panel").style("display","none");dojo.query(".fm_results").style("display","block");desactivarCargando()}function irAFicha(b,a){console.log(b);console.log(a);window.open("http://escale.minedu.gob.pe/PadronWeb/info/ce?cod_mod="+b+"&anexo="+a)}function irAIE(a){searchForm=dijit.byId("searchForm");tabs2=dijit.byId("tabs2");searchPrevValues=searchForm.getValues();tabs2PrevChild=tabs2.selectedChildWidget;searchForm.reset();newValues=searchForm.getValues();newValues.codigo_ccpp1=String(a);searchForm.setValues(newValues);tabs2.selectChild(tabs2.getChildren()[0]);busqueda();searchForm.reset();searchForm.setValues(searchPrevValues);tabs2.selectChild(tabs2PrevChild)};