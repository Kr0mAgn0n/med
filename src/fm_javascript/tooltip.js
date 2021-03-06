function initTooltips() {
	require(["dijit/Tooltip"], function() {
		new dijit.Tooltip({
			connectId : dojo.query(".fm_basemap_trigger"),
			label : "Mapas Base",
			position : ["below", "above"]
		});

		new dijit.Tooltip({
			connectId : dojo.query(".fm_measure_trigger"),
			label : "Medición",
			position : ["below", "above"]
		});

		new dijit.Tooltip({
			connectId : dojo.query(".fm_identify_trigger"),
			label : "Identificador",
			position : ["below", "above"]
		});

		new dijit.Tooltip({
			connectId : dojo.query(".fm_prevExtent_trigger"),
			label : "Extensión previa",
			position : ["below", "above"]
		});

		new dijit.Tooltip({
			connectId : dojo.query(".fm_nextExtent_trigger"),
			label : "Extensión siguiente",
			position : ["below", "above"]
		});

		new dijit.Tooltip({
			connectId : dojo.query(".fm_fullExtent_trigger"),
			label : "Extensión total",
			position : ["below", "above"]
		});

		new dijit.Tooltip({
			connectId : dojo.query(".fm_print_trigger"),
			label : "Impresión",
			position : ["below", "above"]
		});

		new dijit.Tooltip({
			connectId : dojo.query(".fm_legend_trigger"),
			label : "Leyenda y Selección de Capas",
			position : ["below", "above"]
		});

		new dijit.Tooltip({
			connectId : dojo.query(".fm_find_trigger"),
			label : "Búsqueda",
			position : ["below", "above"]
		});

		new dijit.Tooltip({
			connectId : dojo.query(".fm_results_trigger"),
			label : "Resultados",
			position : ["below", "above"]
		});
	});

	console.log("Se cargó el hilo de los Tooltips.");
}
