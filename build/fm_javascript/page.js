var res;function responsive(){var a=this;a.mobile=false;a.collapse=false;this.setResponsive=function(){a.jRes=jRespond([{label:"mobile",enter:0,exit:999},{label:"desktop",enter:1000,exit:100000}]);a.jRes.addFunc({breakpoint:"desktop",enter:function(){$(".fm_left_content").show();$(".fm_right_content").show();$(".fm_close.fm_hide").hide();a.collapse=false;console.log(">>> desktop enter <<<")},exit:function(){$(".fm_close.fm_hide").show();a.collapse=true;console.log("<<< desktop exit >>>")}});a.jRes.addFunc({breakpoint:"mobile",enter:function(){a.mobile=true;a.collapse=true;a.setActiveTab(null);$(".fm_show").hide();$(".fm_left_content").hide();$(".fm_right_content").hide();console.log(">>> mobile enter <<<")},exit:function(){a.mobile=false;a.collapse=false;$(".fm_show").show();$(".fm_left_content").show();$(".fm_right_content").show();console.log("<<< mobile exit >>>")}})};this.setBindings=function(){$(".fm_find_me").click(function(){if($(this).hasClass("fm_on")){$(this).removeClass("fm_on")}else{res.findMe();$(this).addClass("fm_on")}});$(".fm_close").click(function(){if($(this).hasClass("fm_hide")){$(this).hide()}$(this).parent().hide();if(a.collapse){a.setActiveTab(null)}if($(this).parent().hasClass("fm_measurement")){measurement.setTool("area",false);measurement.setTool("distance",false);measurement.setTool("location",false);measurement.clearResult()}if($(this).parent().hasClass("fm_identify")){punto.setChecked(false);mano_alzada.setChecked(false);extension.setChecked(false);drawToolbar.deactivate();map.graphics.clear()}if($(this).parent().hasClass("fm_print")){destruirImpresion()}});$(".fm_basemap_trigger").click(function(b){b.preventDefault();if(a.collapse){a.setActiveTab(null);$(".fm_right_content").hide()}measurement.setTool("area",false);measurement.setTool("distance",false);measurement.setTool("location",false);measurement.clearResult();punto.setChecked(false);mano_alzada.setChecked(false);extension.setChecked(false);drawToolbar.deactivate();$(".fm_measurement").hide();$(".fm_identify").hide();$(".fm_navegacion").hide();$(".fm_print").hide();$(".fm_basemap_list").toggle();return false});$(".fm_measure_trigger").click(function(b){b.preventDefault();if(a.collapse){a.setActiveTab(null);$(".fm_right_content").hide()}punto.setChecked(false);mano_alzada.setChecked(false);extension.setChecked(false);drawToolbar.deactivate();$(".fm_basemap_list").hide();$(".fm_identify").hide();$(".fm_navegacion").hide();$(".fm_print").hide();$(".fm_measurement").toggle();return false});$(".fm_identify_trigger").click(function(b){b.preventDefault();if(a.collapse){a.setActiveTab(null);$(".fm_right_content").hide()}measurement.setTool("area",false);measurement.setTool("distance",false);measurement.setTool("location",false);measurement.clearResult();$(".fm_measurement").hide();$(".fm_basemap_list").hide();$(".fm_navegacion").hide();$(".fm_print").hide();$(".fm_identify").toggle();return false});$(".fm_navegacion_trigger").click(function(b){b.preventDefault();if(a.collapse){a.setActiveTab(null);$(".fm_right_content").hide()}measurement.setTool("area",false);measurement.setTool("distance",false);measurement.setTool("location",false);measurement.clearResult();punto.setChecked(false);mano_alzada.setChecked(false);extension.setChecked(false);drawToolbar.deactivate();$(".fm_measurement").hide();$(".fm_basemap_list").hide();$(".fm_navegacion").toggle();$(".fm_print").hide();$(".fm_identify").hide();return false});$(".fm_print_trigger").click(function(b){b.preventDefault();if(a.collapse){a.setActiveTab(null);$(".fm_right_content").hide()}measurement.setTool("area",false);measurement.setTool("distance",false);measurement.setTool("location",false);measurement.clearResult();punto.setChecked(false);mano_alzada.setChecked(false);extension.setChecked(false);drawToolbar.deactivate();$(".fm_measurement").hide();$(".fm_basemap_list").hide();$(".fm_navegacion").hide();$(".fm_identify").hide();$(".fm_print").toggle();iniciarImpresion();return false});$(".fm_share_trigger").click(function(){a.generateEmbedCode()});$(".fm_trigger").click(function(c){c.preventDefault();a.setActiveTab(this);var b=$(this).data("panel");a.showPanel(b)})};this.setActiveTab=function(b){$(".fm_button").each(function(){$(this).removeClass("fm_button_active")});if(b){$(b).addClass("fm_button_active")}};this.showPanel=function(b){$(".fm_right_content").show();if(a.collapse){$(".fm_right_content").find(".fm_close").show()}$(".fm_panel").hide();b="."+b;$(b).show()};this.populateMapInfo=function(b){document.title=b.title;$(".fm_title_bar").html(b.title);var c="Map Creator: "+b.owner;$(".fm_description").html(b.description+"<p>"+c+"</p>")};this.showCoords=function(b){try{var d=esri.geometry.webMercatorToGeographic(b.mapPoint||b);if(d===null||d===undefined){return}var c="<b>Lat:</b> "+Math.abs(d.y.toFixed(2))+"°"+((d.y<0)?"S":"N")+"&nbsp;&nbsp;<b>Lon:</b> "+Math.abs(d.x.toFixed(2))+"°"+((d.x<0)?"W":"E");$(".fm_coordsinfo").html(c)}catch(f){console.log(f)}};this.updateScaleInfo=function(b,c){$(".fm_scaleinfo").html("<b>Escala:</b> 1 <b>:</b> "+b);$(".fm_zoomlevelinfo").html("<b>Zoom:</b> "+c)};this.embedSetup=function(){console.log("styling page for embeding");$("header").hide();$("footer").hide();if(a.mobile){$(".fm_container_main").css("top","0px")}else{$("nav").css("top","0px");$(".fm_container_main").css("bottom","0px").css("top","2.2em")}};this.generateEmbedCode=function(){var c=window.location.href;var b="<iframe src='"+c+"' style='border:0px  none;' name='responsiveViewer' scrolling='no' frameborder='0' marginheight='0px' marginwidth='0px' height='60px' width='468px'></iframe>";$(".fm_embed_code").html(b)};this.showLoading=function(){console.log("show loading")};this.hideLoading=function(){console.log("hide loading")};this.findMe=function(){if(navigator.geolocation){navigator.geolocation.getCurrentPosition(function(b){if(map&&b&&b.coords){var c=esri.geometry.geographicToWebMercator(new esri.geometry.Point(b.coords.longitude,b.coords.latitude));if(b.accuracy<10000){map.centerAndZoom(c,16)}else{map.centerAndZoom(c,14)}var d=new esri.Graphic(c,new esri.symbol.PictureMarkerSymbol("images/i_target.png",38,38));a.animateMapSymbol(d)}},function(b){console.log(b);$(".fm_find_me").removeClass("fm_on")})}};this.animateMapSymbol=function(f){var d=1;var c=f.symbol.color;var e=f.geometry.type;var h=f.symbol;if(e==="extent"){h.outline.color.a=d;h.color.a=0}else{h.color.a=d}map.graphics.add(f);var b=setInterval(function(){if(e!=="extent"){h.setColor(new dojo.Color([c.r,c.g,c.b,d]))}if(h.outline){var g=h.outline.color;h.outline.setColor(new dojo.Color([g.r,g.g,g.b,d]))}f.setSymbol(h);if(d<0.01){clearInterval(b);map.graphics.remove(f)}d-=0.01},20)};this.initApp=function(){a.setBindings();a.generateEmbedCode();a.setResponsive();$(".fm_measurement").draggable({cursor:"move"});$(".fm_identify").draggable({cursor:"move"});$(".fm_navegacion").draggable({cursor:"move"});$(".fm_basemap_list").draggable({cursor:"move"});$(".fm_find").show();if(!(a.collapse)){a.setActiveTab(".fm_find_trigger")}}}$(document).ready(function(){res=new responsive();res.initApp()});