function busqueda(){activarCargando();ubigeo=dojo.byId("ubigeo");nombre_iiee=dojo.byId("nombre_iiee");codigo_modular=dojo.byId("codigo_modular");codigo_local=dojo.byId("codigo_local");direccion=dojo.byId("direccion");nombre_ccpp1=dojo.byId("nombre_ccpp1");localidad=dojo.byId("localidad");nivel_modalidad=dojo.byId("nivel_modalidad");gestion=dojo.byId("gestion");nombre_ccpp2=dojo.byId("nombre_ccpp2");codigo_ccpp=dojo.byId("codigo_ccpp");var b={url:"padron.php",handleAs:"json",content:{ubigeo:ubigeo.value,codCentroPoblado:codigo_ccpp.value,nomCentroPoblado:nombre_ccpp1.value,codigoModular:codigo_modular.value,nombreIE:nombre_iiee.value,codigoLocal:codigo_local.value,direccionIE:direccion.value,gestiones:gestion.value,niveles:nivel_modalidad.value}};var a=dojo.xhrGet(b);a.then(function(c){datos={items:[]};layout=[[{name:"Ubigeo",field:"ubigeo"}],[{name:"Departamento",field:"departamento"}],[{name:"Provincia",field:"provincia"}],[{name:"Distrito",field:"distrito"}],[{name:"Nombre del Centro Poblado",field:"nombre_del_centro_poblado"}],[{name:"Código del Centro Poblado",field:"codigo_del_centro_poblado"}],[{name:"Código Local",field:"codigo_local"}],[{name:"Código Modular",field:"codigo_modular"}],[{name:"Nombre IE",field:"nombre_ie"}],[{name:"Nivel",field:"nivel"}],[{name:"Dirección",field:"direccion"}],[{name:"Docentes",field:"docentes"}],[{name:"Alumnos",field:"alumnos"}],[{name:"Latitud",field:"latitud"}],[{name:"Longitud",field:"longitud"}]];if(isEmpty(c)){alert("La busqueda no devolvió resultados.")}else{if(!dojo.isArray(c.items)){aux=c.items;c={items:[]};c.items.push(aux)}dojo.forEach(c.items,function(d){items={ubigeo:"Ubigeo: "+d.ubigeo,departamento:"Departamento: "+d.departamento,provincia:"Provincia: "+d.provincia,distrito:"Distrito: "+d.distrito,nombre_del_centro_poblado:"Nombre del Centro Poblado: "+d.centroPoblado,codigo_del_centro_poblado:"Código del Centro Poblado: "+d.codCentroPoblado,codigo_local:"Código Local: "+d.codigoLocal,codigo_modular:"Código Modular: "+d.codigoModular,nombre_ie:"Nombre de la IE: "+d.nombreIE,nivel:"Nivel: "+d.nivelModalidad,direccion:"Dirección: "+d.direccion,docentes:"Docentes: "+d.docentes,alumnos:"Alumnos: "+d.alumnos,latitud:"Latitud: "+d.coordY,longitud:"Longitud: "+d.coordX};datos.items.push(items)});store=new dojo.data.ItemFileWriteStore({data:datos});grid.setStructure(layout);grid.setStore(store)}console.log(c);dojo.query(".fm_button").removeClass("fm_button_active");dojo.query(".fm_results_trigger").addClass("fm_button_active");dojo.query(".fm_panel").style("display","none");dojo.query(".fm_results").style("display","block");desactivarCargando()})}function isEmpty(a){for(var b in a){if(a.hasOwnProperty(b)){return false}}return true};