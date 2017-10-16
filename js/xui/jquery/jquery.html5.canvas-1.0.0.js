(function($){
	function drawRound(context, x, y, a, b){
	   var k = .5522848,
	   x = x + (a / 2),
	   y = y + (b / 2),
	   a = a / 2,
	   b = b / 2,
	   ox = a * k, // 水平控制点偏移量
	   oy = b * k; // 垂直控制点偏移量
	   
	   //从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
	   context.moveTo(x - a, y);
	   context.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
	   context.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
	   context.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
	   context.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
	}
	function drawRoundRect(context, x, y, w, h, r){
		var round;
		
		if (w < 2 * r) r = w / 2;
		if (h < 2 * r) r = h / 2;
		
		if(typeof(r) == 'object')
			round = r;
		else
			round = [r, r, r, r];
		
		context.moveTo(x + round[1], y);
		context.arcTo(x + w, y, x + w, y + h, round[1]);
		context.arcTo(x + w, y + h, x, y + h, round[2]);
		context.arcTo(x, y + h, x, y, round[3]);
		context.arcTo(x, y, x + w, y, round[0]);
	}
	function getLinearGradientCoord(fill, degree){
		var fill_x2 = fill[0] + fill[2], fill_y2 = fill[1] + fill[3];
		var x1 = fill[0], y1 = fill[1];
		var r = Math.sqrt(Math.pow(fill[0] - fill_x2, 2) + Math.pow(fill[1] - fill_y2, 2));
		var x2 = fill[0] + r * Math.cos(degree * Math.PI / 180);
		var y2 = fill[1] + r * Math.sin(degree * Math.PI / 180);
		x2 = (x2 > fill_x2) ? fill_x2 : x2, y2 = (y2 > fill_y2) ? fill_y2 : y2;
		if(degree > 90)
			x1 += fill[2], x2 += fill[2];
		else if(degree < -90)
			x1 += fill[2], x2 += fill[2], y1 += fill[3], y2 += fill[3];
		else if(degree < 0)
			y1 += fill[3], y2 += fill[3];
		
		if(degree > 90 || degree < -90 || degree < 0)
			x2 = (x2 < fill[0]) ? fill[0] : x2, y2 = (y2 < fill[1]) ? fill[1] : y2;
		
		return [x1, y1, x2, y2];
	}
	function commonDrawAttr(context, parameter, type){
		context.lineWidth = parameter.lineSize;
		context.strokeStyle = getGradient(context, parameter, type, parameter.lineColor);
		if(type != "image")
			context.fillStyle = getGradient(context, parameter, type, parameter.fillColor);
		context.globalCompositeOperation = parameter.layer;
		if(parameter.shadow != null){
			context.save();
			context.shadowOffsetX = parameter.shadow[0];
			context.shadowOffsetY = parameter.shadow[1];
			context.shadowBlur = (parameter.shadow.length == 3) ? parameter.shadow[2] : 0;
			context.shadowColor = parameter.shadowColor;
		}
	}
	function getGradient(context, parameter, type, color){
		var gr;
		if(typeof(color) == 'object' && color != null){
			var fill = parameter.fill;
			fill = (type == "line") ? parameter.line : ((type == "font") ? parameter : fill);
			fill = $(this).getRotatePar(fill, type);
			
			if(typeof(color[0]) == 'object' && color[0].length == 4){
				gr = context.createLinearGradient(color[0][0],color[0][1],color[0][2],color[0][3]);
				var i = 1;
			}else if(typeof(color[0]) == 'object' && color[0].length == 6){
				gr = context.createRadialGradient(color[0][0],color[0][1],color[0][2],color[0][3],color[0][4],color[0][5]);
				var i = 1;
			}else if(color[0] == "radial"){
				var centerX = fill.x + (fill.width / 2), centerY = fill.y + (fill.height / 2);
				var maxR = Math.max(fill.width, fill.height);
				gr = context.createRadialGradient(centerX, centerY, ((maxR / 2) * 0.15), centerX, centerY, (maxR / 2));
				var i = 1;
			}
			
			if(typeof(color[0]) == 'object' && color[0].length == 2 || typeof(color[0]) == 'number'){
				var degree = (typeof(color[0]) == 'number') ? color[0] : 90;
				var coord = getLinearGradientCoord([fill.x, fill.y, fill.width, fill.height], degree);
				gr = context.createLinearGradient(coord[0], coord[1], coord[2], coord[3]);
				var i = (typeof(color[0]) == 'number') ? 1 : 0;
			}
			for(; i < color.length; i++){
				gr.addColorStop((color[i][0] / 100), color[i][1]);
			}
		}else{
			gr = color;
		}
		return gr;
	}
	
	$.operateNum = new Array(), $.rotateParameter = new Array();
	var histroyImage = null;
	$.fn.extend({
		drawType : function(contextID){
			if(contextID == null) contextID = "2d";
			var contexts = Array();
			var i = 0;
			$(this).each(function(index, element) {
				contexts[i++] = $(element)[0].getContext(contextID);
            });
			$.contexts = contexts;
			return this;
		},
		drawTypeEach : function (fn){
			if($.contexts == null) this.drawType();
			for(var i = 0; i < $.contexts.length; i++){
				var context = $.contexts[i];
				context.beginPath();
				fn(i, context);
				context.closePath();
			}
			$.contexts = null;
			return this;
		},
		line : function (parameter){
			//parameter.lineSize  线条宽度
			//parameter.lineColor  线条颜色
			//parameter.line  线条坐标
			//parameter.fillColor  线条填充颜色
			$.parameter.lineSize = 1;
			var parameter = $.extend({}, $.parameter, parameter);
			var $this = this;
			$this.imageLoad(function (){
				$this.rotatePar($this.getRotatePar(parameter.line, "line"));
				
				$this.drawTypeEach(function (index, context){
					context.moveTo(parameter.line[0][0],parameter.line[0][1]);
					for(var i = 1; i < parameter.line.length; i++){
						context.lineTo(parameter.line[i][0],parameter.line[i][1]);
					}
					commonDrawAttr(context, parameter, "line");
					
					if(parameter.fillColor != null) context.fill();
					if(parameter.lineSize != null && parameter.lineSize != 0) context.stroke();
					$this.restoreAll(index, context, parameter);
				});
				$.operateNum = new Array(), $.rotateParameter = new Array();
			});
			return this;
		},
		rect : function (parameter){
			var parameter = $.extend({}, $.parameter, parameter);
			var $this = this;
			$this.imageLoad(function (){
				var fill = parameter.fill;
				
				$this.rotatePar($this.getRotatePar(fill, "rect"));
				
				$this.drawTypeEach(function (index, context){
					commonDrawAttr(context, parameter, "rect");
					
					if(parameter.round != null){
						drawRoundRect(context, fill[0], fill[1], fill[2], fill[3], parameter.round);
						
						if(parameter.fillColor != null) context.fill();
						if(parameter.lineSize != null && parameter.lineSize != 0) context.stroke();
					}else{
						if(parameter.fillColor != null) context.fillRect(fill[0], fill[1], fill[2], fill[3]);
						if(parameter.lineSize != null && parameter.lineSize != 0) context.strokeRect(fill[0], fill[1], fill[2], fill[3]);
					}
					
					$this.restoreAll(index, context, parameter);
				});
				$.operateNum = new Array(), $.rotateParameter = new Array();
			});
			return this;
		},
		round : function (parameter){
			var parameter = $.extend({}, $.parameter, parameter);
			var $this = this;
			$this.imageLoad(function (){
				var fill = parameter.fill;
				$this.rotatePar($this.getRotatePar(fill, "round"));
				
				$this.drawTypeEach(function (index, context){
					commonDrawAttr(context, parameter, "round");
					
					drawRound(context, fill[0], fill[1], fill[2], fill[3]);
					
					if(parameter.fillColor != null) context.fill();
					if(parameter.lineSize != null && parameter.lineSize != 0) context.stroke();
					$this.restoreAll(index, context, parameter);
				});
				$.operateNum = new Array(), $.rotateParameter = new Array();
			});
			return this;
		},
		image : function (parameter){
			var parameter = $.extend({}, $.parameter, parameter);
			var fill = parameter.fill;
			var img = new Image();
			img.src = parameter.src;
			histroyImage = img;
			var $this = this;
			
			$this.imageLoad(function (){
				if(fill.length == 2){
					fill[2] = img.width;
					fill[3] = img.height;
				}else if(fill.length == 3){
					fill[3] = Math.floor((fill[2] / img.width) * img.height);
				}else if(fill.length == 4 && fill[2] == null){
					fill[2] = Math.floor((fill[3] / img.height) * img.width);
				}
			
			
				$this.rotatePar($this.getRotatePar(fill, "image"));
				
				$this.drawTypeEach(function (index, context){
					commonDrawAttr(context, parameter, "image");
					
					if(parameter.fill != null && parameter.src != null) context.drawImage(img, fill[0], fill[1], fill[2], fill[3]);
					if(parameter.lineSize != null && parameter.lineSize != 0) context.strokeRect(fill[0], fill[1], fill[2], fill[3]);
					$this.restoreAll(index, context, parameter);
				});
				$.operateNum = new Array(), $.rotateParameter = new Array();
			});
			return this;
		},
		imageLoad : function (callback){
			if(histroyImage != null){
				$(histroyImage).load(function (){
					callback();
				});
			}else{
				callback();
			}
		},
		font : function (parameter){
			var parameter = $.extend({}, $.parameter, parameter);
			var $this = this;
			$this.imageLoad(function (){
				var fill = parameter.fill;
				$this.rotatePar($this.getRotatePar(parameter, "font"));
				
				$this.drawTypeEach(function (index, context){
					commonDrawAttr(context, parameter, "font");
					
					context.font = parameter.font;
					
					if(fill.length == 2){
						if(parameter.fillColor != null) context.fillText(parameter.text, fill[0], fill[1]);
						if(parameter.lineSize != null && parameter.lineSize != 0) context.strokeText(parameter.text, fill[0], fill[1]);
					}else if(fill.length == 3){
						if(parameter.fillColor != null) context.fillText(parameter.text, fill[0], fill[1], fill[2]);
						if(parameter.lineSize != null && parameter.lineSize != 0) context.strokeText(parameter.text, fill[0], fill[1], fill[2]);
					}
					
					$this.restoreAll(index, context, parameter);
				});
				$.operateNum = new Array(), $.rotateParameter = new Array();
			});
			return this;
		},
		move : function (x, y){
			var $this = this;
			$this.imageLoad(function (){
				$this.drawTypeEach(function (index, context){
					$.operateNum[index] = ($.operateNum[index] == null) ? 1 : $.operateNum[index] + 1;
					
					context.save();
					context.translate(x, y);
				});
			});
			return this;
		},
		zoom : function (x, y){
			var $this = this;
			$this.imageLoad(function (){
				$this.drawTypeEach(function (index, context){
					$.operateNum[index] = ($.operateNum[index] == null) ? 1 : $.operateNum[index] + 1;
					
					context.save();
					context.scale(x, y);
				});
			});
			return this;
		},
		rotate : function (degree, x, y){
			var $this = this;
			$this.imageLoad(function (){
				$.rotateParameter[$.rotateParameter.length] = [degree, x, y];
			});
			return this;
		},
		rotatePar : function (parameter){
			for(var i = 0; i < $.rotateParameter.length; i++){
				var rotateParameter = $.rotateParameter[i];
				var degree = parseInt(rotateParameter[0]);
				var x = rotateParameter[1];
				var y = rotateParameter[2];
				
				this.drawTypeEach(function (index, context){
					$.operateNum[index] = ($.operateNum[index] == null) ? 1 : $.operateNum[index] + 1;
					
					var rotatPointX = ((x == null ||x == '' || x == 'center') ? (parameter.x + (parameter.width / 2)) : ((x == 'left') ? parameter.x : ((x == 'right') ? (parameter.x + parameter.width) : parseInt(x)) ));
					var rotatPointY = ((y == null ||y == '' || y == 'center') ? (parameter.y + (parameter.height / 2)) : ((y == 'top') ? parameter.y : ((y == 'bottom') ? (parameter.y + parameter.height) : parseInt(y)) ));
					
					context.save();
					context.translate(rotatPointX, rotatPointY);
					context.rotate(Math.PI * degree / 180);
					context.translate(-rotatPointX, -rotatPointY);
				});
			}
		},
		getRotatePar : function (parameters, type){
			var parameter = {};
			if(type == 'line'){
				var historyX = 0, historyY = 0, historyWidth = 0, historyHeight = 0;
				for(var i = 0; i < parameters.length; i++){
					var x = parameters[i][0];
					var y = parameters[i][1];
					if(historyX > x)
						historyX = x;
					if(historyY > y)
						historyY = y;
					if(historyWidth < x)
						historyWidth = x;
					if(historyHeight < y)
						historyHeight = y;
				}
				parameter.x = historyX;
				parameter.y = historyY;
				parameter.width = historyWidth;
				parameter.height = historyHeight;
			}else if(type == 'font'){
				var width, height;
				height = parseInt(parameters.font.match(/\d+[px]/)[0].replace(/[px]/, ""));
				if(parameters.fill.length == 2){
					width = height * parameters.text.length;
				}else if(parameters.fill.length == 3){
					width = parameters.fill[2];
				}
				parameter.x = parameters.fill[0];
				parameter.y = parameters.fill[1];
				parameter.width = width;
				parameter.height = height;
			}else if(type == 'rect' || type == 'round' || type == 'image'){
				parameter.x = parameters[0];
				parameter.y = parameters[1];
				parameter.width = parameters[2];
				parameter.height = parameters[3];
			}
			
			return parameter;
		},
		restoreAll : function (index, context, parameter){
			for(var i = 0; i < $.operateNum[index]; i++){
				context.restore();
			}
			if(parameter.shadow != null) context.restore();
		},
		clear : function (x, y, width, height){
			var $this = this;
			var jqThis = $(this);
			$this.imageLoad(function (){
				$this.drawTypeEach(function (index, context){
					if(x == null && y == null && width == null && height == null)
						context.clearRect(0, 0, jqThis.width(), jqThis.height());
					else
						context.clearRect(x, y, width, height);
					
				});
			});
			return this;
		}
	});
	$.parameter = {
		line : null,
		lineSize : 0,
		lineColor : "#000000",
		fill : null,
		fillColor : null,
		shadow : null,
		shadowColor : "#000000",
		layer : "source-over"
	};
})(jQuery);