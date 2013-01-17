var res;

function responsive() {
	var fm = this;

	fm.mobile = false;
	fm.collapse = false;

	// register responsive js
	this.setResponsive = function() {
		fm.jRes = jRespond([{
			label : 'mobile',
			enter : 0,
			exit : 999
		}, {
			label : 'desktop',
			enter : 1000,
			exit : 100000
		}]);

		fm.jRes.addFunc({
			breakpoint : 'desktop',
			enter : function() {
				$(".fm_left_content").show();
				$(".fm_right_content").show();
				$(".fm_close.fm_hide").hide();
				fm.collapse = false;
				console.log('>>> desktop enter <<<');
			},
			exit : function() {
				$(".fm_close.fm_hide").show();
				fm.collapse = true;
				console.log('<<< desktop exit >>>');
			}
		});

		fm.jRes.addFunc({
			breakpoint : 'mobile',
			enter : function() {
				fm.mobile = true;
				fm.collapse = true;
				fm.setActiveTab(null);
				$(".fm_show").hide();
				$(".fm_left_content").hide();
				$(".fm_right_content").hide();
				console.log('>>> mobile enter <<<');
			},
			exit : function() {
				fm.mobile = false;
				fm.collapse = false;

				$(".fm_show").show();
				$(".fm_left_content").show();
				$(".fm_right_content").show();
				console.log('<<< mobile exit >>>');
			}
		});
	};

	this.setBindings = function() {
		$(".fm_find_me").click(function() {
			if ($(this).hasClass('fm_on')) {
				//turn off
				$(this).removeClass('fm_on');
			} else {
				//turn on
				res.findMe();
				$(this).addClass('fm_on');
			}
		});

		$(".fm_close").click(function() {
			if ($(this).hasClass('fm_hide')) {
				$(this).hide();
			}

			$(this).parent().hide();
			if (fm.collapse) {
				fm.setActiveTab(null);
			}

			if ($(this).parent().hasClass('fm_measurement')) {
				measurement.setTool('area', false);
				measurement.setTool('distance', false);
				measurement.setTool('location', false);
				measurement.clearResult();
			}

			if ($(this).parent().hasClass('fm_identify')) {
				punto.setChecked(false);
				mano_alzada.setChecked(false);
				extension.setChecked(false);
				drawToolbar.deactivate();
				map.graphics.clear();
			}

			if ($(this).parent().hasClass('fm_print')) {
				destruirImpresion();
			}

		});

		$(".fm_basemap_trigger").click(function(e) {
			e.preventDefault();
			if (fm.collapse) {
				fm.setActiveTab(null);
				$(".fm_right_content").hide();
			}

			measurement.setTool('area', false);
			measurement.setTool('distance', false);
			measurement.setTool('location', false);
			measurement.clearResult();

			punto.setChecked(false);
			mano_alzada.setChecked(false);
			extension.setChecked(false);
			drawToolbar.deactivate();

			$(".fm_measurement").hide();
			$(".fm_identify").hide();
			$(".fm_navegacion").hide();
			$(".fm_print").hide();
			$(".fm_basemap_list").toggle();
			return false;
		});
		$(".fm_measure_trigger").click(function(e) {
			e.preventDefault();
			if (fm.collapse) {
				fm.setActiveTab(null);
				$(".fm_right_content").hide();
			}

			punto.setChecked(false);
			mano_alzada.setChecked(false);
			extension.setChecked(false);
			drawToolbar.deactivate();

			$(".fm_basemap_list").hide();
			$(".fm_identify").hide();
			$(".fm_navegacion").hide();
			$(".fm_print").hide();
			$(".fm_measurement").toggle();
			return false;
		});
		$(".fm_identify_trigger").click(function(e) {
			e.preventDefault();
			if (fm.collapse) {
				fm.setActiveTab(null);
				$(".fm_right_content").hide();
			}

			measurement.setTool('area', false);
			measurement.setTool('distance', false);
			measurement.setTool('location', false);
			measurement.clearResult();

			$(".fm_measurement").hide();
			$(".fm_basemap_list").hide();
			$(".fm_navegacion").hide();
			$(".fm_print").hide();
			$(".fm_identify").toggle();
			return false;
		});
		$(".fm_navegacion_trigger").click(function(e) {
			e.preventDefault();
			if (fm.collapse) {
				fm.setActiveTab(null);
				$(".fm_right_content").hide();
			}

			measurement.setTool('area', false);
			measurement.setTool('distance', false);
			measurement.setTool('location', false);
			measurement.clearResult();

			punto.setChecked(false);
			mano_alzada.setChecked(false);
			extension.setChecked(false);
			drawToolbar.deactivate();

			$(".fm_measurement").hide();
			$(".fm_basemap_list").hide();
			$(".fm_navegacion").toggle();
			$(".fm_print").hide();
			$(".fm_identify").hide();
			return false;
		});
		$(".fm_print_trigger").click(function(e) {
			e.preventDefault();
			if (fm.collapse) {
				fm.setActiveTab(null);
				$(".fm_right_content").hide();
			}

			measurement.setTool('area', false);
			measurement.setTool('distance', false);
			measurement.setTool('location', false);
			measurement.clearResult();

			punto.setChecked(false);
			mano_alzada.setChecked(false);
			extension.setChecked(false);
			drawToolbar.deactivate();

			$(".fm_measurement").hide();
			$(".fm_basemap_list").hide();
			$(".fm_navegacion").hide();
			$(".fm_identify").hide();
			$(".fm_print").toggle();

			iniciarImpresion();

			return false;
		});

		$(".fm_share_trigger").click(function() {
			fm.generateEmbedCode();
		});

		$(".fm_trigger").click(function(e) {
			e.preventDefault();
			fm.setActiveTab(this);
			var panel = $(this).data('panel');
			fm.showPanel(panel);
		});
	};

	this.setActiveTab = function(tab) {
		$(".fm_button").each(function() {
			$(this).removeClass('fm_button_active');
		});
		if (tab) {
			$(tab).addClass('fm_button_active');
		}

	};

	this.showPanel = function(panel) {
		$(".fm_right_content").show();
		if (fm.collapse) {
			$(".fm_right_content").find(".fm_close").show();
		}

		$(".fm_panel").hide();
		panel = '.' + panel;
		$(panel).show();
	};

	// show map info
	this.populateMapInfo = function(item) {
		document.title = item.title;
		$(".fm_title_bar").html(item.title);
		var mc = 'Map Creator: ' + item.owner;

		$(".fm_description").html(item.description + '<p>' + mc + '</p>');
		// $(".fm_description").html(d + '<p>' + mc + '</p>');
		// $(".fm_footer_content").html(mc);
	};
	this.showCoords = function(ext) {
		try {
			var pnt = esri.geometry.webMercatorToGeographic(ext.mapPoint || ext);

			if (pnt === null || pnt === undefined) {
				return;
			}

			var code = "<b>Lat:</b> " + Math.abs(pnt.y.toFixed(2)) + "°" + ((pnt.y < 0.0) ? "S" : "N") + "&nbsp;&nbsp;<b>Lon:</b> " + Math.abs(pnt.x.toFixed(2)) + "°" + ((pnt.x < 0.0) ? "W" : "E");
			$(".fm_coordsinfo").html(code);
		} catch (e) {
			console.log(e);
		}
	};
	this.updateScaleInfo = function(scale, level) {
		$('.fm_scaleinfo').html("<b>Escala:</b> 1 <b>:</b> " + scale);
		$('.fm_zoomlevelinfo').html("<b>Zoom:</b> " + level);
	};
	// end show map info

	this.embedSetup = function() {
		console.log('styling page for embeding');
		$('header').hide();
		$('footer').hide();
		if (fm.mobile) {
			$('.fm_container_main').css('top', '0px');
		} else {
			$('nav').css('top', '0px');
			$('.fm_container_main').css('bottom', '0px').css('top', '2.2em');
		}
	};

	this.generateEmbedCode = function() {
		var pageUrl = window.location.href;
		var code = "<iframe src='" + pageUrl + "' style='border:0px none;' name='responsiveViewer' scrolling='no' frameborder='0' marginheight='0px' marginwidth='0px' height='60px' width='468px'></iframe>";

		$(".fm_embed_code").html(code);
	};

	this.showLoading = function() {
		console.log('show loading');
	};

	this.hideLoading = function() {
		console.log('hide loading');
	};

	this.findMe = function() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(location) {
				if (map && location && location.coords) {
					// console.log(location.coords);
					// console.log(location.accuracy);
					var pt = esri.geometry.geographicToWebMercator(new esri.geometry.Point(location.coords.longitude, location.coords.latitude));
					if (location.accuracy < 10000) {
						map.centerAndZoom(pt, 16);
					} else {
						map.centerAndZoom(pt, 14);
					}
					var graphic = new esri.Graphic(pt, new esri.symbol.PictureMarkerSymbol('images/i_target.png', 38, 38));

					fm.animateMapSymbol(graphic);
				}

			}, function(error) {
				console.log(error);
				$(".fm_find_me").removeClass('fm_on');
			});
		}
	};

	this.animateMapSymbol = function(g) {
		var opacity = 1.0;
		var color = g.symbol.color;
		var type = g.geometry.type;
		var symbol = g.symbol;
		// debug(type);
		if (type === "extent") {
			symbol.outline.color.a = opacity;
			symbol.color.a = 0.0;
		} else {
			symbol.color.a = opacity;
		}
		map.graphics.add(g);
		// debug(g.symbol.color);

		var interval = setInterval(function() {
			if (type !== "extent") {
				symbol.setColor(new dojo.Color([color.r, color.g, color.b, opacity]));
			}
			if (symbol.outline) {
				var ocolor = symbol.outline.color;
				symbol.outline.setColor(new dojo.Color([ocolor.r, ocolor.g, ocolor.b, opacity]));
			}
			g.setSymbol(symbol);
			if (opacity < 0.01) {
				clearInterval(interval);
				map.graphics.remove(g);
			}
			opacity -= 0.01;
		}, 20);
	};

	this.initApp = function() {
		fm.setBindings();
		fm.generateEmbedCode();
		fm.setResponsive();

		$(".fm_measurement").draggable({
			cursor : 'move'
		});
		$(".fm_identify").draggable({
			cursor : 'move'
		});
		$(".fm_navegacion").draggable({
			cursor : 'move'
		});
		$(".fm_basemap_list").draggable({
			cursor : 'move'
		});

		$(".fm_find").show();
		if (!(fm.collapse)) {
			fm.setActiveTab(".fm_find_trigger");
		}

	};
}

res = new responsive();

$(document).ready(function() {
	
	res.initApp();
}); 