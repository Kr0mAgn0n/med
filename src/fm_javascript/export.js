function exportGrid() {
	if (grid.selection.getSelectedCount() === 0) {
		gridExporter.exportGrid("csv", function(str) {
			dojo.byId("csv").value = str;
			dijit.byId("exportador").submit();
		});
	} else {
		//gridExporter.selection.deselectAll();
		//gridExporter.gotoPage(grid.currentPage());
		
		/*selected = grid.selection.getSelected();
		
		
		dojo.forEach(selected, function(obj){
			gridExporter.selection.select(obj._0);
		});*/
		
		//gridExporter.selection.selected = grid.selection.selected;
		
		//gridExporter.update();
		
		var str = gridExporter.exportSelected("csv");
		dojo.byId("csv").value = str;
		dijit.byId("exportador").submit();
	}

}
