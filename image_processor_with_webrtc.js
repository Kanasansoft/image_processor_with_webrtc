if (!("requestAnimationFrame" in window)) {
	window.requestAnimationFrame = 
			window.msRequestAnimationFrame        ||
			window.webkitRequestAnimationFrame    ||
			window.oRequestAnimationFrame         ||
			window.mozCancelRequestAnimationFrame ;
}

var video;
var original;
var modify;

var originalContext;
var modifyContext;

var videoWidth;
var videoHeight;

var imageProcessor;
var imageProcessors = [];

//outline
imageProcessors.push(
	function(context, original) {

		var modify = context.createImageData(original);

		var originalData = original.data;
		var modifyData   = modify.data;

		var width = original.width;
		var height = original.height;

		for (var y = 0; y < height; y++) {

			var offsetY = y * width;

			for (var x = 0; x < width; x++) {

				var offsetXY = (offsetY + x) * 4;

				var r = originalData[offsetXY + 0];
				var g = originalData[offsetXY + 1];
				var b = originalData[offsetXY + 2];

				var rr = 0;
				var gg = 0;
				var bb = 0;
				var rrggbb = 0;

				var counter = 0;
				for (var yy = y - 1; yy <= y + 1; yy++){
					if (yy < 0 || height <= yy) {continue;}
					var offsetYY = yy * width;
					for (var xx = x - 1; xx <= x + 1; xx++){
						if (xx < 0 || width <= xx) {continue;}
						var offsetXXYY = (offsetYY + xx) * 4;
						rrggbb +=
								Math.abs(r - originalData[offsetXXYY + 0]) +
								Math.abs(g - originalData[offsetXXYY + 1]) +
								Math.abs(b - originalData[offsetXXYY + 2]) ;
						counter++;
					}
				}

				var rgb = rrggbb / counter;

				modifyData[offsetXY + 0] = 
				modifyData[offsetXY + 1] = 
				modifyData[offsetXY + 2] = rgb;
				modifyData[offsetXY + 3] = 255;

			}
		}

		return modify;

	}
);

//outlien & noiseless
imageProcessors.push(
	function(context, original) {

		var modify = context.createImageData(original);

		var originalData = original.data;
		var modifyData   = modify.data;

		var width = original.width;
		var height = original.height;

		for (var y = 0; y < height; y++) {

			var offsetY = y * width;

			for (var x = 0; x < width; x++) {

				var offsetXY = (offsetY + x) * 4;

				var r = originalData[offsetXY + 0];
				var g = originalData[offsetXY + 1];
				var b = originalData[offsetXY + 2];

				var rr = 0;
				var gg = 0;
				var bb = 0;
				var rrggbb = 0;

				var counter = 0;
				for (var yy = y - 1; yy <= y + 1; yy++){
					if (yy < 0 || height <= yy) {continue;}
					var offsetYY = yy * width;
					for (var xx = x - 1; xx <= x + 1; xx++){
						if (xx < 0 || width <= xx) {continue;}
						var offsetXXYY = (offsetYY + xx) * 4;
						rrggbb +=
								Math.abs(r - originalData[offsetXXYY + 0]) +
								Math.abs(g - originalData[offsetXXYY + 1]) +
								Math.abs(b - originalData[offsetXXYY + 2]) ;
						counter++;
					}
				}

				var rgb = rrggbb / counter > 32 ? rrggbb / counter : 0;

				modifyData[offsetXY + 0] = 
				modifyData[offsetXY + 1] = 
				modifyData[offsetXY + 2] = rgb;
				modifyData[offsetXY + 3] = 255;

			}
		}

		return modify;

	}
);

//outlien & noiseless & reverse
imageProcessors.push(
	function(context, original) {

		var modify = context.createImageData(original);

		var originalData = original.data;
		var modifyData   = modify.data;

		var width = original.width;
		var height = original.height;

		for (var y = 0; y < height; y++) {

			var offsetY = y * width;

			for (var x = 0; x < width; x++) {

				var offsetXY = (offsetY + x) * 4;

				var r = originalData[offsetXY + 0];
				var g = originalData[offsetXY + 1];
				var b = originalData[offsetXY + 2];

				var rr = 0;
				var gg = 0;
				var bb = 0;
				var rrggbb = 0;

				var counter = 0;
				for (var yy = y - 1; yy <= y + 1; yy++){
					if (yy < 0 || height <= yy) {continue;}
					var offsetYY = yy * width;
					for (var xx = x - 1; xx <= x + 1; xx++){
						if (xx < 0 || width <= xx) {continue;}
						var offsetXXYY = (offsetYY + xx) * 4;
						rrggbb +=
								Math.abs(r - originalData[offsetXXYY + 0]) +
								Math.abs(g - originalData[offsetXXYY + 1]) +
								Math.abs(b - originalData[offsetXXYY + 2]) ;
						counter++;
					}
				}

				var rgb = rrggbb / counter > 32 ? rrggbb / counter : 0;

				modifyData[offsetXY + 0] = 
				modifyData[offsetXY + 1] = 
				modifyData[offsetXY + 2] = 255 - rgb;
				modifyData[offsetXY + 3] = 255;

			}
		}

		return modify;

	}
);

//random
imageProcessors.push(
	function(context, original) {

		var modify = context.createImageData(original);

		var originalData = original.data;
		var modifyData   = modify.data;

		var width = original.width;
		var height = original.height;

		for (var y = 0; y < height; y++) {

			var offsetY = y * width;

			for (var x = 0; x < width; x++) {

				var offsetXY = (offsetY + x) * 4;

				var r = originalData[offsetXY + 0];
				var g = originalData[offsetXY + 1];
				var b = originalData[offsetXY + 2];

				var rr = 0;
				var gg = 0;
				var bb = 0;
				var rrggbb = 0;

				var counter = 0;
				for (var yy = y - 1; yy <= y + 1; yy++){
					if (yy < 0 || height <= yy) {continue;}
					var offsetYY = yy * width;
					for (var xx = x - 1; xx <= x + 1; xx++){
						if (xx < 0 || width <= xx) {continue;}
						var offsetXXYY = (offsetYY + xx) * 4;
						rrggbb +=
								Math.abs(r - originalData[offsetXXYY + 0]) +
								Math.abs(g - originalData[offsetXXYY + 1]) +
								Math.abs(b - originalData[offsetXXYY + 2]) ;
						counter++;
					}
				}

				var rgb = rrggbb / counter > 32 ? rrggbb / counter : 0;

				modifyData[offsetXY + 0] = originalData[offsetXY + 0] + 10 * (Math.random() - Math.random()) * rgb;
				modifyData[offsetXY + 1] = originalData[offsetXY + 1] + 10 * (Math.random() - Math.random()) * rgb;
				modifyData[offsetXY + 2] = originalData[offsetXY + 2] + 10 * (Math.random() - Math.random()) * rgb;
				modifyData[offsetXY + 3] = 255;

			}
		}

		return modify;

	}
);

//frame
imageProcessors.push(
	(
		function() {

			var olddtm = 0;
			var buffer;

			return function(context, original) {

				var curdtm = new Date().getTime();
				if (olddtm + 5000 < curdtm) {
					buffer = context.createImageData(original);
				}
				olddtm = curdtm;

				var modify = context.createImageData(original);

				var originalData = original.data;
				var modifyData   = modify.data;
				var bufferData   = buffer.data;

				var width = original.width;
				var height = original.height;

				for (var y = 0; y < height; y++) {

					var offsetY = y * width;

					for (var x = 0; x < width; x++) {

						var offsetXY = (offsetY + x) * 4;

						var r = originalData[offsetXY + 0];
						var g = originalData[offsetXY + 1];
						var b = originalData[offsetXY + 2];

						var rr = 0;
						var gg = 0;
						var bb = 0;
						var rrggbb = 0;

						var counter = 0;
						for (var yy = y - 1; yy <= y + 1; yy++){
							if (yy < 0 || height <= yy) {continue;}
							var offsetYY = yy * width;
							for (var xx = x - 1; xx <= x + 1; xx++){
								if (xx < 0 || width <= xx) {continue;}
								var offsetXXYY = (offsetYY + xx) * 4;
								rrggbb +=
										Math.abs(r - originalData[offsetXXYY + 0]) +
										Math.abs(g - originalData[offsetXXYY + 1]) +
										Math.abs(b - originalData[offsetXXYY + 2]) ;
								counter++;
							}
						}

						var rgb = rrggbb / counter > 32 ? rrggbb / counter : 0;

						bufferData[offsetXY + 0] = bufferData[offsetXY + width * 4 + 0] * (Math.random()/4 + 0.75) + rgb * Math.random() * 10;
						bufferData[offsetXY + 1] = bufferData[offsetXY + width * 4 + 1] * (Math.random()/8 + 0.5) + rgb * Math.random() * 1;
//						bufferData[offsetXY + 2] = 0;
						bufferData[offsetXY + 3] = 255;

						modifyData[offsetXY + 0] = bufferData[offsetXY + 0] + originalData[offsetXY + 0];
						modifyData[offsetXY + 1] = bufferData[offsetXY + 1] + originalData[offsetXY + 1];
						modifyData[offsetXY + 2] = bufferData[offsetXY + 2] + originalData[offsetXY + 2];
						modifyData[offsetXY + 3] = 255;

					}
				}

				return modify;

			};

		}
	)()
);

//magic
imageProcessors.push(
	(
		function() {

			var olddtm = 0;
			var old;
			var buffer;

			return function(context, original) {

				var curdtm = new Date().getTime();
				if (olddtm + 5000 < curdtm) {
					old    = original;
					buffer = context.createImageData(original);
				}
				olddtm = curdtm;

				var modify = context.createImageData(original);

				var originalData = original.data;
				var modifyData   = modify.data;
				var oldData      = old.data;
				var bufferData   = buffer.data;

				var width = original.width;
				var height = original.height;

				for (var y = 0; y < height; y++) {

					var offsetY = y * width;

					for (var x = 0; x < width; x++) {

						var offsetXY = (offsetY + x) * 4;

						var rrggbb =
								Math.abs(oldData[offsetXY + 0] - originalData[offsetXY + 0]) +
								Math.abs(oldData[offsetXY + 1] - originalData[offsetXY + 1]) +
								Math.abs(oldData[offsetXY + 2] - originalData[offsetXY + 2]) ;

						var rgb = rrggbb > 64 ? rrggbb : 0;
						rgb *= Math.random();

						bufferData[offsetXY + 0] = bufferData[offsetXY + width * 0 + 0] * (0.9) + rgb * 1;
						bufferData[offsetXY + 1] = bufferData[offsetXY + width * 0 + 1] * (0.9) + rgb * 2;
						bufferData[offsetXY + 2] = bufferData[offsetXY + width * 0 + 2] * (0.9) + rgb * 3;
						bufferData[offsetXY + 3] = 255;

						modifyData[offsetXY + 0] = originalData[offsetXY + 0] + bufferData[offsetXY + 0];
						modifyData[offsetXY + 1] = originalData[offsetXY + 1] + bufferData[offsetXY + 1];
						modifyData[offsetXY + 2] = originalData[offsetXY + 2] + bufferData[offsetXY + 2];
						modifyData[offsetXY + 3] = 255;

					}
				}

				old = original;

				return modify;

			};

		}
	)()
);

//delay
imageProcessors.push(
	(
		function() {

			var olddtm = 0;
			var buffer;

			return function(context, original) {

				var curdtm = new Date().getTime();
				if (olddtm + 5000 < curdtm) {
					buffer = context.createImageData(original);
				}
				olddtm = curdtm;

				var modify = context.createImageData(original);

				var originalData = original.data;
				var modifyData   = modify.data;
				var bufferData   = buffer.data;

				var width = original.width;
				var height = original.height;

				for (var y = 0; y < height; y++) {

					var offsetY = y * width;

					for (var x = 0; x < width; x++) {

						var offsetXY = (offsetY + x) * 4;

						bufferData[offsetXY + 0] = originalData[offsetXY + 0] * 0.05 + bufferData[offsetXY + 0] * 0.95;
						bufferData[offsetXY + 1] = originalData[offsetXY + 1] * 0.05 + bufferData[offsetXY + 1] * 0.95;
						bufferData[offsetXY + 2] = originalData[offsetXY + 2] * 0.05 + bufferData[offsetXY + 2] * 0.95;
						bufferData[offsetXY + 3] = 255;

					}
				}

				return buffer;

			};

		}
	)()
);

function onSuccess(stream){

	var url = webkitURL.createObjectURL(stream);
	document.getElementById("video").src = url;

}

function onError(err){
	console.log(err);
}

function draw() {

	originalContext.drawImage(video, 0, 0);

	try {
		var originalImageData = originalContext.getImageData(0, 0, videoWidth, videoHeight);
		var modifyImageData   = imageProcessor(originalContext, originalImageData);
		modifyContext.putImageData(modifyImageData,0,0);
	} catch(e) {
		console.log(e);
	}

	requestAnimationFrame(draw);

}

function initialize() {

	video    = document.getElementById("video");
	original = document.getElementById("original");
	modify   = document.getElementById("modify");
	originalContext = original.getContext("2d");
	modifyContext   = modify.getContext("2d");

	video.addEventListener(
		"playing",
		function(e){
			var style  = window.getComputedStyle(video, null);
			videoWidth  = parseInt(style.width, 10);
			videoHeight = parseInt(style.height, 10);
			original.width  = videoWidth;
			original.height = videoHeight;
			modify.width    = videoWidth;
			modify.height   = videoHeight;
			draw();
		},
		false
	);

	navigator.webkitGetUserMedia("video,audio", onSuccess, onError);

	var parent = document.getElementById("selectorImageProcessor");
	for (var i = 0, l = imageProcessors.length; i < l; i++) {
		var elem = document.createElement("input");
		elem.type = "radio";
		elem.name = "selectorImageProcessor";
		elem.addEventListener(
			"change",
			(
				function(f){
					return function(){
						imageProcessor = f;
					};
				}
			)(imageProcessors[i]),
			false
		);
		parent.appendChild(elem);
	}

	document.getElementsByName("selectorImageProcessor")[0].checked = true;
	imageProcessor = imageProcessors[0];

}

window.addEventListener("load", initialize, false);
