function iniciarNavegacion() {
	require(["esri/toolbars/Navigation"], function() {
		navToolbar = new esri.toolbars.Navigation(map);

		/*prevExtent = new dijit.form.Button({
		 iconClass : 'prevExtentIcon',
		 label : 'Extensión previa',
		 onClick : function() {
		 if (!navToolbar.isFirstExtent())
		 navToolbar.zoomToPrevExtent();
		 }

		 }, dojo.byId("prevExtent"));

		 nextExtent = new dijit.form.Button({
		 iconClass : 'nextExtentIcon',
		 label: 'Extensión siguiente',
		 onClick : function() {
		 if (!navToolbar.isLastExtent())
		 navToolbar.zoomToNextExtent();
		 }
		 }, dojo.byId("nextExtent"));

		 fullExtent = new dijit.form.Button({
		 iconClass : 'fullExtentIcon',
		 label: 'Extensión completa',
		 onClick : function() {
		 map.setExtent(initExtent);
		 }
		 }, dojo.byId("fullExtent"));*/

		fm_prevExtent_trigger = dojo.query(".fm_prevExtent_trigger")[0];
		fm_nextExtent_trigger = dojo.query(".fm_nextExtent_trigger")[0];
		fm_fullExtent_trigger = dojo.query(".fm_fullExtent_trigger")[0];

		dojo.connect(fm_prevExtent_trigger, "onclick", function() {
			if (!navToolbar.isFirstExtent())
				navToolbar.zoomToPrevExtent();
		});

		dojo.connect(fm_nextExtent_trigger, "onclick", function() {
			if (!navToolbar.isLastExtent())
				navToolbar.zoomToNextExtent();
		});

		dojo.connect(fm_fullExtent_trigger, "onclick", function() {
			map.setExtent(initExtent);
		});
	});

}