var prevExtent, nextExtent, fullExtent;
var navToolbar;

function iniciarNavegacion() {
	navToolbar = new esri.toolbars.Navigation(map);
	
	prevExtent = new dijit.form.Button({
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
	}, dojo.byId("fullExtent"));

}