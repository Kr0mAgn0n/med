var grid,gridExporter;var gridMemory={memory:[]};function iniciarGrid(){datos={items:[]};datosExporter={items:[]};grid=new dojox.grid.EnhancedGrid({escapeHTMLInData:false,plugins:{pagination:{id:"gridPaginator",description:true,sizeSwitch:false,pageStepper:true,gotoButton:true,maxPageStep:4,position:"top",defaultPageSize:25,onPageStep:function(){grid.selection.clear()}},indirectSelection:{width:"5px",styles:"text-align: center;"}},onSelectionChanged:markSelected},dojo.create("div",{},dojo.byId("fm_results")));grid.startup();dojo.connect(window,"onresize",function(){grid.resize();grid.update()});dojo.connect(grid,"");gridExporter=new dojox.grid.EnhancedGrid({plugins:{exporter:true}})}function hacerZoom(b,a){map.graphics.clear();point=new esri.geometry.Point(b,a,new esri.SpatialReference({wkid:5373}));point=esri.geometry.geographicToWebMercator(point);graphic=new esri.Graphic(point,new esri.symbol.PictureMarkerSymbol("images/i_target.png",38,38));map.graphics.add(graphic);map.centerAndZoom(point,14)}function exportarTodo(){gridExporter.exportGrid("csv",function(a){})}function prevGrid(){console.log(gridMemory);map.graphics.clear();dijit.byId("selectAll").setChecked(false);if(gridMemory.selectedIndex-1>=0){grid.setStructure(gridMemory.memory[gridMemory.selectedIndex-1].layout);grid.setStore(gridMemory.memory[gridMemory.selectedIndex-1].store);gridExporter.setStructure(gridMemory.memory[gridMemory.selectedIndex-1].layoutExporter);gridExporter.setStore(gridMemory.memory[gridMemory.selectedIndex-1].storeExporter);gridExporter.exportGrid("csv",function(a){console.log(a);dojo.byId("csv").value=a});gridMemory.selectedIndex--}}function nextGrid(){console.log(gridMemory);map.graphics.clear();dijit.byId("selectAll").setChecked(false);if(gridMemory.selectedIndex+1<gridMemory.memory.length){grid.setStructure(gridMemory.memory[gridMemory.selectedIndex+1].layout);grid.setStore(gridMemory.memory[gridMemory.selectedIndex+1].store);gridExporter.setStructure(gridMemory.memory[gridMemory.selectedIndex+1].layoutExporter);gridExporter.setStore(gridMemory.memory[gridMemory.selectedIndex+1].storeExporter);gridExporter.exportGrid("csv",function(a){console.log(a);dojo.byId("csv").value=a});gridMemory.selectedIndex++}}function selectAllCallback(a){console.log(a);if(a===true){grid.selection.selectRange(0,grid.scroller.rowCount-1)}else{grid.selection.deselectRange(0,grid.scroller.rowCount-1)}}function markSelected(){map.graphics.clear();var a=grid.selection.getSelected();if(a.length!==0){points=dojo.map(a,function(b){return[dojo.trim(b.longitud[0].split(":")[1]),dojo.trim(b.latitud[0].split(":")[1])]});mpJson={points:points,spatialReference:{" wkid":5373}};multipoint=esri.geometry.geographicToWebMercator(new esri.geometry.Multipoint(mpJson));graphic=new esri.Graphic(multipoint,new esri.symbol.PictureMarkerSymbol("images/i_target.png",38,38));map.graphics.add(graphic);map.setExtent(multipoint.getExtent(),true)}}function isDeselectedAll(a){rowsSelected=a.selection.getSelected();if(rowsSelected.length===0){return true}else{return false}};