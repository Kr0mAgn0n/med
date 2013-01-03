function initTooltips () {
	new dijit.Tooltip({
		connectId: dojo.query(".fm_basemap_trigger"),
		label: "Mapas Base",
		position: ["below"]
	});
	
	new dijit.Tooltip({
		connectId: dojo.query(".fm_measure_trigger"),
		label: "Medición",
		position: ["below"]
	});
	
	new dijit.Tooltip({
		connectId: dojo.query(".fm_identify_trigger"),
		label: "Identificador",
		position: ["below"]
	});
	
	new dijit.Tooltip({
		connectId: dojo.query(".fm_navegacion_trigger"),
		label: "Navegación",
		position: ["below"]
	});
	
	new dijit.Tooltip({
		connectId: dojo.query(".fm_print_trigger"),
		label: "Impresión",
		position: ["below"]
	});
	
	new dijit.Tooltip({
		connectId: dojo.query(".fm_legend_trigger"),
		label: "Leyenda y Selección de Capas",
		position: ["below"]
	});
	
	new dijit.Tooltip({
		connectId: dojo.query(".fm_find_trigger"),
		label: "Búsqueda",
		position: ["below"]
	});
	
	new dijit.Tooltip({
		connectId: dojo.query(".fm_results_trigger"),
		label: "Resultados",
		position: ["below"]
	});
}
