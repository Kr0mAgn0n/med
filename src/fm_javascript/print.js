var print_map, print_basemapGallery, print_legend;
var print_centros_poblados, print_limites_politicos;
// print_ie;

function iniciarImpresion() {

	if (dojo.isFF) {
		print_dialog = dijit.byId("print_dialog");
		print_dialog.show();
	}

	print_map = new esri.Map("print_map", {
		extent : initExtent,
		slider : false,
		logo : false
	});
	
	print_map.setExtent(initExtent, true)

	require(["esri/dijit/Scalebar"], function() {
		print_scalebar = new esri.dijit.Scalebar({
			map : print_map,
			scalebarUnit : 'metric',
			attachTo : "bottom-left"
		});
	});

	print_basemapGallery = createBasemapGallery(print_map, "");

	print_centros_poblados = new esri.layers.ArcGISTiledMapServiceLayer("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/cp_ie/MapServer");

	print_limites_politicos = new esri.layers.ArcGISTiledMapServiceLayer("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/lim_pol/MapServer");

	//print_ie = new esri.layers.ArcGISDynamicMapServiceLayer("http://escale.minedu.gob.pe/medgis/rest/services/carto_base/ie/MapServer");

	print_layerInfos = [];

	print_layerInfos.push({
		layer : print_limites_politicos,
		title : "Límites Políticos"
	});
	
	print_layerInfos.push({
		layer : print_centros_poblados,
		title : "Centros Poblados"
	});

	

	/*print_layerInfos.push({
	 layer : print_ie,
	 title : "Instituciones Educativas"
	 });*/

	dojo.connect(print_map, 'onLayersAddResult', function(results) {
		require(["esri/dijit/Legend"], function() {
			print_legend = new esri.dijit.Legend({
				map : print_map,
				layerInfos : print_layerInfos
			}, "print_legend");
			print_legend.startup();
			print_map.setExtent(map.extent);
		});

	});

	print_map.addLayers([print_centros_poblados, print_limites_politicos]);

	activar_print_centros_poblados = dojo.byId("activar_print_centros_poblados");
	activar_print_limites_politicos = dojo.byId("activar_print_limites_politicos");
	//activar_print_ie = dojo.byId("activar_print_ie");

	dojo.connect(activar_print_centros_poblados, "onclick", function() {
		if (activar_print_centros_poblados.checked) {
			print_centros_poblados.show();
		} else {
			print_centros_poblados.hide();
		}
	});

	dojo.connect(activar_print_limites_politicos, "onclick", function() {
		if (activar_print_limites_politicos.checked) {
			print_limites_politicos.show();
		} else {
			print_limites_politicos.hide();
		}
	});

	/*dojo.connect(activar_print_ie, "onclick", function() {
	 if (activar_print_ie.checked) {
	 print_ie.show();
	 } else {
	 print_ie.hide();
	 }
	 });*/

	print_map_size = dijit.byId("print_map_size");
	page_size = dojo.byId("page_size");

	console.log(page_size);

	dojo.connect(print_map_size, "onChange", function(val) {
		console.log(val);

		switch (val) {
			case "a4_apaisada":
				dojo.style("print_area", {
					'width' : '212mm',
					'height' : '150mm'
					//'transform' : 'scale(0.8)',
					//'-webkit-transform' : 'scale(0.8)'
				});

				dojo.style("print_map", {
					'width' : '65%',
					'height' : '90%',
					'float' : 'left'
				});

				dojo.empty(page_size);
				page_size.innerHTML = "@page{size:A4 landscape;margin: 12.7mm;}";
				print_map.resize(true);
				print_map.setExtent(map.extent);
				break;

			case "a4_normal":
				dojo.style("print_area", {
					'width' : '150mm',
					'height' : '212mm'
					//'transform' : 'scale(1)',
					//'-webkit-transform' : 'scale(1)'
				});

				dojo.style("print_map", {
					'width' : '100%',
					'height' : '40%',
					'float' : 'none'
				});

				dojo.empty(page_size);
				page_size.innerHTML = "@page{size:A4;margin:12.7mm;}";
				print_map.resize(true);
				print_map.setExtent(map.extent);
				break;

			case "a3_apaisada":
				dojo.style("print_area", {
					'width' : '325mm',
					'height' : '230mm'
					//'transform' : 'scale(0.6) translate(-30%, -30%)',
					//'-webkit-transform' : 'scale(0.6) translate(-30%, -30%)'
				});

				dojo.style("print_map", {
					'width' : '60%',
					'height' : '90%',
					'float' : 'left'
				});

				dojo.empty(page_size);
				page_size.innerHTML = "@page{size:A3 landscape;margin:12.7mm;}";
				print_map.resize(true);
				print_map.setExtent(map.extent);
				break;

			case "a3_normal":
				dojo.style("print_area", {
					'width' : '230mm',
					'height' : '325mm'
					//'transform' : 'scale(0.8) translate(-10%, -10%)',
					//'-webkit-transform' : 'scale(0.8) translate(-10%, -10%)'
				});

				dojo.style("print_map", {
					'width' : '100%',
					'height' : '60%',
					'float' : 'none'
				});

				dojo.empty(page_size);
				page_size.innerHTML = "@page{size:A3;margin:12.7mm;}";
				print_map.resize(true);
				print_map.setExtent(map.extent);
				break;
		}

	});

	map_title = dojo.byId("map_title");
	map_subtitle = dojo.byId("map_subtitle");
	print_tile = dojo.byId("print_title");
	print_subtitle = dojo.byId("print_subtitle");

	dojo.connect(map_title, "onkeyup", function() {
		dojo.html.set(print_title, map_title.value);
	});

	dojo.connect(map_subtitle, "onkeyup", function() {
		dojo.html.set(print_subtitle, map_subtitle.value);
	});

	dojo.connect(dijit.byId("imprimir"), "onClick", function() {
		window.print();
	});
}

function destruirImpresion() {
	print_basemapGallery.destroy();
	print_legend.destroy();
	print_map.destroy();
	dojo.create("div", {
		'id' : 'print_basemapGallery'
	}, dojo.byId("print_basemapGallery_container"));
	dojo.create("div", {
		'id' : 'print_legend'
	}, dojo.byId("print_legend_container"));
}
