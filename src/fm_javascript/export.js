function exportGrid () {
	gridExporter.exportGrid("csv", function(str) {
		dojo.byId("csv").value = str;
		dijit.byId("exportador").submit();
	});
	
	
}
